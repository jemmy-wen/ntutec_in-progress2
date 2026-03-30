/**
 * Gate 0 Auto-Screening Engine (TypeScript)
 *
 * Port of ntutec-core/pipeline/gate0_auto.py G0-1~G0-10
 * This is the Platform SOT for Gate 0 evaluation.
 * Python gate0_auto.py is retained as CLI backup only.
 *
 * Decision: D1=B (2026-03-30 Howard 裁定)
 */

// ─── Types ───

export interface StartupForGate0 {
  id: string
  name_zh: string
  name_en: string | null
  tax_id: string | null
  sector: string | null
  country: string | null
  city: string | null
  funding_stage: string | null
  funding_amount: number | null
  email: string | null
  representative: string | null
  product_oneliner: string | null
  product_status: string | null
  dedup_flag: string | null
  source: string | null
  ntu_affiliation: string | null
  capital_paid: number | null
  bp_url: string | null
  status: string | null
  gcis_status: string | null
  track: string | null
  current_gate: string | null
  current_gate_result: string | null
}

export interface Gate0CheckResult {
  criterion: string     // G0-1 ~ G0-10
  label: string
  type: 'hard_fail' | 'soft_flag' | 'note' | 'pass'
  message: string | null
}

export interface Gate0Result {
  startup_id: string
  startup_name: string
  result: 'pass' | 'fail' | 'borderline'
  checks: Gate0CheckResult[]
  hard_fails: number
  soft_flags: number
  notes: string[]
  fail_reasons: string[]
  flags: string[]
}

// ─── Constants ───

const FORBIDDEN_SECTORS = [
  '博弈', '成人', '軍火', '加密貨幣投機',
  'gambling', 'adult', 'weapons', 'crypto speculation',
]

const LATE_STAGES = ['B', 'B+', 'C', 'D', 'IPO', 'Pre-IPO']
const ALLOWED_STAGES = ['Pre-Seed', 'Seed', 'Pre-A', 'Angel', '', null]
const FLAGGED_STAGES = ['A', 'A-round', 'Series A']

/** Max fundraising amount (NTD) by stage */
const STAGE_ROUND_CAPS: Record<string, number> = {
  'Pre-Seed': 50_000_000,
  'Seed': 100_000_000,
  'Angel': 30_000_000,
  'Pre-A': 150_000_000,
  'A': 500_000_000,
  'A-round': 500_000_000,
  'Series A': 500_000_000,
}

const BIOTECH_SECTORS = ['生技醫療', 'biotech', 'medtech', '醫療', '生醫']

const TAIWAN_VARIANTS = ['Taiwan', 'TW', '台灣', '臺灣', 'taiwan', 'tw']

// ─── Core Screening Logic ───

/**
 * Screen a single startup through G0-1 ~ G0-10 checklist.
 * This is a 1:1 port of Python gate0_auto.py's screen_g0() function.
 */
export function screenGate0(startup: StartupForGate0): Gate0Result {
  const checks: Gate0CheckResult[] = []
  const failReasons: string[] = []
  const flags: string[] = []
  const notes: string[] = []

  // ─── G0-1: Forbidden Sectors ───
  const sector = (startup.sector || '').toLowerCase()
  const isForbidden = FORBIDDEN_SECTORS.some(f => sector.includes(f.toLowerCase()))
  if (isForbidden) {
    checks.push({ criterion: 'G0-1', label: '禁止產業', type: 'hard_fail', message: `禁止產業：${startup.sector}` })
    failReasons.push(`G0-1 禁止產業：${startup.sector}`)
  } else {
    checks.push({ criterion: 'G0-1', label: '禁止產業', type: 'pass', message: null })
  }

  // ─── G0-2: Funding Stage ───
  const fundingStage = startup.funding_stage || ''
  if (LATE_STAGES.some(s => fundingStage.toUpperCase().includes(s.toUpperCase()))) {
    checks.push({ criterion: 'G0-2', label: '融資階段', type: 'hard_fail', message: `後期融資：${fundingStage}` })
    failReasons.push(`G0-2 後期融資階段：${fundingStage}`)
  } else if (FLAGGED_STAGES.some(s => fundingStage.includes(s))) {
    checks.push({ criterion: 'G0-2', label: '融資階段', type: 'soft_flag', message: `A 輪案源，需額外評估：${fundingStage}` })
    flags.push(`G0-2 A 輪案源：${fundingStage}`)
  } else {
    checks.push({ criterion: 'G0-2', label: '融資階段', type: 'pass', message: null })
  }

  // ─── G0-3: Geographic / NTU Link ───
  const country = startup.country || ''
  const isTaiwan = TAIWAN_VARIANTS.some(tw => country.toLowerCase() === tw.toLowerCase()) || country === ''
  const hasNtuAffiliation = !!startup.ntu_affiliation && startup.ntu_affiliation.trim() !== ''
  if (!isTaiwan && !hasNtuAffiliation) {
    checks.push({ criterion: 'G0-3', label: '地域/台大關聯', type: 'soft_flag', message: `非台灣（${country}）且無台大關聯` })
    flags.push(`G0-3 非台灣且無台大關聯：${country}`)
  } else {
    checks.push({ criterion: 'G0-3', label: '地域/台大關聯', type: 'pass', message: null })
  }

  // ─── G0-4: Fundraising Caps ───
  const fundingAmount = startup.funding_amount || 0
  const stageCap = STAGE_ROUND_CAPS[fundingStage] || null
  if (stageCap && fundingAmount > stageCap) {
    checks.push({
      criterion: 'G0-4', label: '募資上限', type: 'soft_flag',
      message: `募資金額 ${(fundingAmount / 1_000_000).toFixed(0)}M 超過 ${fundingStage} 階段上限 ${(stageCap / 1_000_000).toFixed(0)}M`
    })
    flags.push(`G0-4 募資超額：${(fundingAmount / 1_000_000).toFixed(0)}M > ${(stageCap / 1_000_000).toFixed(0)}M`)
  } else {
    checks.push({ criterion: 'G0-4', label: '募資上限', type: 'pass', message: null })
  }

  // ─── G0-5: Company Existence (tax_id) ───
  if (!startup.tax_id || startup.tax_id.trim() === '') {
    checks.push({ criterion: 'G0-5', label: '統編', type: 'soft_flag', message: '無統編' })
    flags.push('G0-5 無統編')
  } else {
    checks.push({ criterion: 'G0-5', label: '統編', type: 'pass', message: null })
  }

  // ─── G0-6: Product Description ───
  const hasOneliner = !!startup.product_oneliner && startup.product_oneliner.trim() !== ''
  const hasProductStatus = !!startup.product_status && startup.product_status.trim() !== ''
  if (!hasOneliner && !hasProductStatus) {
    checks.push({ criterion: 'G0-6', label: '產品描述', type: 'soft_flag', message: '無產品描述' })
    flags.push('G0-6 無產品描述')
  } else {
    checks.push({ criterion: 'G0-6', label: '產品描述', type: 'pass', message: null })
  }

  // ─── G0-7: Contact Info ───
  const hasEmail = !!startup.email && startup.email.trim() !== ''
  const hasRep = !!startup.representative && startup.representative.trim() !== ''
  if (!hasEmail && !hasRep) {
    checks.push({ criterion: 'G0-7', label: '聯絡方式', type: 'hard_fail', message: '無 email 且無聯絡人' })
    failReasons.push('G0-7 無聯絡方式')
  } else if (!hasEmail) {
    checks.push({ criterion: 'G0-7', label: '聯絡方式', type: 'soft_flag', message: '有聯絡人但無 email' })
    flags.push('G0-7 無 email')
  } else {
    checks.push({ criterion: 'G0-7', label: '聯絡方式', type: 'pass', message: null })
  }

  // ─── G0-8: Dedup Check ───
  if (startup.dedup_flag === 'suspected_dup') {
    checks.push({ criterion: 'G0-8', label: '重複檢查', type: 'soft_flag', message: '疑似重複案源' })
    flags.push('G0-8 疑似重複')
  } else {
    checks.push({ criterion: 'G0-8', label: '重複檢查', type: 'pass', message: null })
  }

  // ─── G0-9: Business Plan ───
  const hasBp = !!startup.bp_url && startup.bp_url.trim() !== ''
  if (!hasBp) {
    checks.push({ criterion: 'G0-9', label: '商業計畫', type: 'soft_flag', message: '無 BP' })
    flags.push('G0-9 無 BP')
  } else {
    checks.push({ criterion: 'G0-9', label: '商業計畫', type: 'pass', message: null })
  }

  // ─── G0-10: Regulatory Path (biotech/medtech note) ───
  const isBiotech = BIOTECH_SECTORS.some(b => sector.includes(b.toLowerCase()))
  if (isBiotech) {
    checks.push({ criterion: 'G0-10', label: '法規路徑', type: 'note', message: '生技醫療案源，Gate 1 需審查法規路徑' })
    notes.push('G0-10 生技醫療，需 Gate 1 法規審查')
  } else {
    checks.push({ criterion: 'G0-10', label: '法規路徑', type: 'pass', message: null })
  }

  // ─── Decision Logic ───
  const hardFails = failReasons.length
  const softFlags = flags.length

  let result: 'pass' | 'fail' | 'borderline'
  if (hardFails > 0) {
    result = 'fail'
  } else if (softFlags >= 3) {
    result = 'borderline'
  } else {
    result = 'pass'
  }

  return {
    startup_id: startup.id,
    startup_name: startup.name_zh,
    result,
    checks,
    hard_fails: hardFails,
    soft_flags: softFlags,
    notes,
    fail_reasons: failReasons,
    flags,
  }
}

// ─── Pipeline Stage Mapping ───

export const STAGE_MAP: Record<string, string> = {
  pass: '1',       // pipeline_stage = 1
  fail: '9',       // pipeline_stage = 9 (eliminated)
  borderline: '0', // pipeline_stage = 0 (pending review)
}

/**
 * Select columns needed from startups table for Gate 0 screening.
 * Used in Supabase .select() calls.
 */
export const GATE0_SELECT_COLUMNS = [
  'id', 'name_zh', 'name_en', 'tax_id', 'sector', 'country', 'city',
  'funding_stage', 'funding_amount', 'email', 'representative',
  'product_oneliner', 'product_status', 'dedup_flag', 'source',
  'ntu_affiliation', 'capital_paid', 'bp_url', 'status', 'gcis_status',
  'track', 'current_gate', 'current_gate_result',
].join(',')
