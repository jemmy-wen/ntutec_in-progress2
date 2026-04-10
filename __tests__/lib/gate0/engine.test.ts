import { describe, it, expect } from 'vitest'
import { screenGate0, STAGE_MAP, type StartupForGate0 } from '@/lib/gate0/engine'

// ─── Fixture ───

function makeStartup(overrides: Partial<StartupForGate0> = {}): StartupForGate0 {
  return {
    id: 'test-001',
    name_zh: '測試新創',
    name_en: 'Test Startup',
    tax_id: '12345678',
    sector: '軟體',
    country: 'Taiwan',
    city: '台北',
    funding_stage: 'Pre-Seed',
    funding_amount: 10_000_000,
    email: 'founder@example.com',
    representative: '王小明',
    product_oneliner: '這是一個 AI 產品',
    product_status: 'MVP',
    dedup_flag: null,
    source: 'FINDIT',
    ntu_affiliation: null,
    capital_paid: 1_000_000,
    bp_url: 'https://example.com/bp.pdf',
    status: 'active',
    gcis_status: 'active',
    track: null,
    current_gate: 'G0',
    current_gate_result: null,
    ...overrides,
  }
}

// ─── G0-1: Forbidden Sectors ───

describe('G0-1: Forbidden Sectors', () => {
  it('passes for normal sector', () => {
    const result = screenGate0(makeStartup({ sector: '軟體' }))
    expect(result.checks.find(c => c.criterion === 'G0-1')?.type).toBe('pass')
  })

  it('hard_fail for 博弈', () => {
    const result = screenGate0(makeStartup({ sector: '博弈' }))
    expect(result.checks.find(c => c.criterion === 'G0-1')?.type).toBe('hard_fail')
    expect(result.fail_reasons.some(r => r.includes('G0-1'))).toBe(true)
  })

  it('hard_fail for gambling (English)', () => {
    const result = screenGate0(makeStartup({ sector: 'gambling platform' }))
    expect(result.checks.find(c => c.criterion === 'G0-1')?.type).toBe('hard_fail')
  })

  it('hard_fail for 成人 sector', () => {
    const result = screenGate0(makeStartup({ sector: '成人娛樂' }))
    expect(result.checks.find(c => c.criterion === 'G0-1')?.type).toBe('hard_fail')
  })

  it('hard_fail for crypto speculation', () => {
    const result = screenGate0(makeStartup({ sector: 'crypto speculation' }))
    expect(result.checks.find(c => c.criterion === 'G0-1')?.type).toBe('hard_fail')
  })

  it('passes when sector is null', () => {
    const result = screenGate0(makeStartup({ sector: null }))
    expect(result.checks.find(c => c.criterion === 'G0-1')?.type).toBe('pass')
  })
})

// ─── G0-2: Funding Stage ───

describe('G0-2: Funding Stage', () => {
  it('passes for Pre-Seed', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Pre-Seed' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('pass')
  })

  it('passes for Seed', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Seed' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('pass')
  })

  it('passes for Angel', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Angel' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('pass')
  })

  it('hard_fail for Series B', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'B' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('hard_fail')
  })

  it('hard_fail for IPO', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'IPO' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('hard_fail')
  })

  it('hard_fail for Pre-IPO', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Pre-IPO' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('hard_fail')
  })

  it('soft_flag for Series A', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Series A' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('soft_flag')
    expect(result.flags.some(f => f.includes('G0-2'))).toBe(true)
  })

  it('soft_flag for A-round', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'A-round' }))
    expect(result.checks.find(c => c.criterion === 'G0-2')?.type).toBe('soft_flag')
  })
})

// ─── G0-3: Geography / NTU Link ───

describe('G0-3: Geography / NTU Link', () => {
  it('passes for Taiwan', () => {
    const result = screenGate0(makeStartup({ country: 'Taiwan' }))
    expect(result.checks.find(c => c.criterion === 'G0-3')?.type).toBe('pass')
  })

  it('passes for 台灣', () => {
    const result = screenGate0(makeStartup({ country: '台灣' }))
    expect(result.checks.find(c => c.criterion === 'G0-3')?.type).toBe('pass')
  })

  it('passes for TW', () => {
    const result = screenGate0(makeStartup({ country: 'TW' }))
    expect(result.checks.find(c => c.criterion === 'G0-3')?.type).toBe('pass')
  })

  it('passes when country empty (defaults to Taiwan)', () => {
    const result = screenGate0(makeStartup({ country: '' }))
    expect(result.checks.find(c => c.criterion === 'G0-3')?.type).toBe('pass')
  })

  it('soft_flag for non-Taiwan without NTU affiliation', () => {
    const result = screenGate0(makeStartup({ country: 'USA', ntu_affiliation: null }))
    expect(result.checks.find(c => c.criterion === 'G0-3')?.type).toBe('soft_flag')
  })

  it('passes for non-Taiwan with NTU affiliation', () => {
    const result = screenGate0(makeStartup({ country: 'USA', ntu_affiliation: '台大電機系' }))
    expect(result.checks.find(c => c.criterion === 'G0-3')?.type).toBe('pass')
  })
})

// ─── G0-4: Fundraising Caps ───

describe('G0-4: Fundraising Caps', () => {
  it('passes when amount is within Pre-Seed cap (50M)', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Pre-Seed', funding_amount: 30_000_000 }))
    expect(result.checks.find(c => c.criterion === 'G0-4')?.type).toBe('pass')
  })

  it('soft_flag when Pre-Seed amount exceeds 50M', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Pre-Seed', funding_amount: 60_000_000 }))
    expect(result.checks.find(c => c.criterion === 'G0-4')?.type).toBe('soft_flag')
    expect(result.flags.some(f => f.includes('G0-4'))).toBe(true)
  })

  it('soft_flag when Seed amount exceeds 100M', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Seed', funding_amount: 120_000_000 }))
    expect(result.checks.find(c => c.criterion === 'G0-4')?.type).toBe('soft_flag')
  })

  it('passes when no cap defined for stage', () => {
    const result = screenGate0(makeStartup({ funding_stage: 'Unknown', funding_amount: 999_000_000 }))
    expect(result.checks.find(c => c.criterion === 'G0-4')?.type).toBe('pass')
  })
})

// ─── G0-5: Tax ID ───

describe('G0-5: Tax ID', () => {
  it('passes when tax_id present', () => {
    const result = screenGate0(makeStartup({ tax_id: '12345678' }))
    expect(result.checks.find(c => c.criterion === 'G0-5')?.type).toBe('pass')
  })

  it('soft_flag when tax_id is null', () => {
    const result = screenGate0(makeStartup({ tax_id: null }))
    expect(result.checks.find(c => c.criterion === 'G0-5')?.type).toBe('soft_flag')
  })

  it('soft_flag when tax_id is empty string', () => {
    const result = screenGate0(makeStartup({ tax_id: '   ' }))
    expect(result.checks.find(c => c.criterion === 'G0-5')?.type).toBe('soft_flag')
  })
})

// ─── G0-6: Product Description ───

describe('G0-6: Product Description', () => {
  it('passes when product_oneliner present', () => {
    const result = screenGate0(makeStartup({ product_oneliner: 'AI 工具', product_status: null }))
    expect(result.checks.find(c => c.criterion === 'G0-6')?.type).toBe('pass')
  })

  it('passes when product_status present', () => {
    const result = screenGate0(makeStartup({ product_oneliner: null, product_status: 'MVP' }))
    expect(result.checks.find(c => c.criterion === 'G0-6')?.type).toBe('pass')
  })

  it('soft_flag when both product fields missing', () => {
    const result = screenGate0(makeStartup({ product_oneliner: null, product_status: null }))
    expect(result.checks.find(c => c.criterion === 'G0-6')?.type).toBe('soft_flag')
  })
})

// ─── G0-7: Contact Info ───

describe('G0-7: Contact Info', () => {
  it('passes when email present', () => {
    const result = screenGate0(makeStartup({ email: 'a@b.com', representative: null }))
    expect(result.checks.find(c => c.criterion === 'G0-7')?.type).toBe('pass')
  })

  it('soft_flag when email missing but representative present', () => {
    const result = screenGate0(makeStartup({ email: null, representative: '王小明' }))
    expect(result.checks.find(c => c.criterion === 'G0-7')?.type).toBe('soft_flag')
    expect(result.flags.some(f => f.includes('G0-7'))).toBe(true)
  })

  it('hard_fail when both email and representative missing', () => {
    const result = screenGate0(makeStartup({ email: null, representative: null }))
    expect(result.checks.find(c => c.criterion === 'G0-7')?.type).toBe('hard_fail')
    expect(result.fail_reasons.some(r => r.includes('G0-7'))).toBe(true)
  })
})

// ─── G0-8: Dedup ───

describe('G0-8: Dedup Check', () => {
  it('passes when no dedup flag', () => {
    const result = screenGate0(makeStartup({ dedup_flag: null }))
    expect(result.checks.find(c => c.criterion === 'G0-8')?.type).toBe('pass')
  })

  it('soft_flag when suspected_dup', () => {
    const result = screenGate0(makeStartup({ dedup_flag: 'suspected_dup' }))
    expect(result.checks.find(c => c.criterion === 'G0-8')?.type).toBe('soft_flag')
  })
})

// ─── G0-9: Business Plan ───

describe('G0-9: Business Plan', () => {
  it('passes when bp_url present', () => {
    const result = screenGate0(makeStartup({ bp_url: 'https://example.com/bp.pdf' }))
    expect(result.checks.find(c => c.criterion === 'G0-9')?.type).toBe('pass')
  })

  it('soft_flag when bp_url missing', () => {
    const result = screenGate0(makeStartup({ bp_url: null }))
    expect(result.checks.find(c => c.criterion === 'G0-9')?.type).toBe('soft_flag')
  })
})

// ─── G0-10: Biotech Note ───

describe('G0-10: Biotech / Regulatory Note', () => {
  it('pass for non-biotech sector', () => {
    const result = screenGate0(makeStartup({ sector: '軟體' }))
    expect(result.checks.find(c => c.criterion === 'G0-10')?.type).toBe('pass')
  })

  it('note type for 生技醫療 sector', () => {
    const result = screenGate0(makeStartup({ sector: '生技醫療' }))
    expect(result.checks.find(c => c.criterion === 'G0-10')?.type).toBe('note')
    expect(result.notes.some(n => n.includes('G0-10'))).toBe(true)
  })

  it('note type for biotech (English)', () => {
    const result = screenGate0(makeStartup({ sector: 'biotech' }))
    expect(result.checks.find(c => c.criterion === 'G0-10')?.type).toBe('note')
  })

  it('note type for medtech', () => {
    const result = screenGate0(makeStartup({ sector: 'medtech devices' }))
    expect(result.checks.find(c => c.criterion === 'G0-10')?.type).toBe('note')
  })
})

// ─── Decision Logic ───

describe('Decision Logic', () => {
  it('result is pass for clean startup', () => {
    const result = screenGate0(makeStartup())
    expect(result.result).toBe('pass')
    expect(result.hard_fails).toBe(0)
    expect(result.soft_flags).toBe(0)
  })

  it('result is fail when any hard_fail present', () => {
    const result = screenGate0(makeStartup({ sector: '博弈' }))
    expect(result.result).toBe('fail')
    expect(result.hard_fails).toBeGreaterThan(0)
  })

  it('result is borderline when 3+ soft_flags (no hard_fail)', () => {
    // 3 soft flags: no tax_id, no bp_url, no product description
    const result = screenGate0(makeStartup({
      tax_id: null,
      bp_url: null,
      product_oneliner: null,
      product_status: null,
    }))
    expect(result.result).toBe('borderline')
    expect(result.soft_flags).toBeGreaterThanOrEqual(3)
  })

  it('result is pass when exactly 2 soft_flags', () => {
    const result = screenGate0(makeStartup({ tax_id: null, bp_url: null }))
    expect(result.result).toBe('pass')
    expect(result.soft_flags).toBe(2)
  })

  it('returns correct startup_id and name', () => {
    const result = screenGate0(makeStartup({ id: 'abc-123', name_zh: '台灣新創' }))
    expect(result.startup_id).toBe('abc-123')
    expect(result.startup_name).toBe('台灣新創')
  })

  it('always returns 10 checks', () => {
    const result = screenGate0(makeStartup())
    expect(result.checks).toHaveLength(10)
  })
})

// ─── STAGE_MAP ───

describe('STAGE_MAP', () => {
  it('maps pass → 1', () => {
    expect(STAGE_MAP['pass']).toBe('1')
  })
  it('maps fail → 9', () => {
    expect(STAGE_MAP['fail']).toBe('9')
  })
  it('maps borderline → 0', () => {
    expect(STAGE_MAP['borderline']).toBe('0')
  })
})
