import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/webhook/google-form
 *
 * Receives Google Form submissions via Apps Script trigger.
 * Writes to form_submissions + creates startup draft.
 * Startup gets pipeline_stage = '0_待篩選', source = 'google_form'.
 *
 * Security: x-webhook-secret header must match GOOGLE_FORM_WEBHOOK_SECRET env var.
 *
 * Apps Script body shape:
 * {
 *   timestamp: string,
 *   responses: { [questionTitle: string]: string }
 * }
 */
export async function POST(req: NextRequest) {
  // Verify secret
  const secret = req.headers.get('x-webhook-secret')
  if (!secret || secret !== process.env.GOOGLE_FORM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { timestamp?: string; responses?: Record<string, string> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const r = body.responses ?? {}

  // ── Field mapping ─────────────────────────────────────────────
  const companyName   = r['1. 公司名稱']?.trim() ?? ''
  const taxId         = r['2. 統一編號']?.trim() ?? null
  const website       = r['3. 官方網站']?.trim() ?? null
  const contactFull   = r['4. 聯絡人姓名與職稱']?.trim() ?? ''   // e.g. "張維哲/CEO"
  const contactName   = contactFull.split('/')[0]?.trim() ?? contactFull
  const contactEmail  = r['5. 聯絡 Email']?.trim() ?? r['電子郵件地址']?.trim() ?? null
  const lineId        = r['6. 聯絡人 Line ID']?.trim() ?? null
  const sector        = r['7. 主要行業別']?.trim() ?? null
  const fundingStage  = r['8. 本輪募資輪次']?.trim() ?? null
  const location      = r['9. 主要營運據點']?.trim() ?? null
  const oneliner      = r['15. 一句話描述公司']?.trim() ?? null
  const productStatus = r['18. 產品現況']?.trim() ?? null
  const teamSize      = parseInt(r['21. 核心全職成員人數'] ?? '') || null
  const ceoLinkedin   = r['22. CEO 個人頁連結']?.trim() ?? null
  const bpUrl         = r['27. 募資簡報（Pitch Deck）連結']?.trim() ?? null
  const referrer      = r['30. 推薦人姓名（若有）']?.trim() ?? null
  const monthlyRev    = parseInt(r['26. 目前平均月營收（若有）'] ?? '') || null

  const db = createAdminClient() as any // eslint-disable-line @typescript-eslint/no-explicit-any

  // ── Insert startup draft ──────────────────────────────────────
  const startupPayload: Record<string, unknown> = {
    name_zh:        companyName || null,
    tax_id:         taxId,
    website:        website,
    email:          contactEmail,
    line_id:        lineId,
    representative: contactName || null,
    sector:         sector,
    funding_stage:  fundingStage,
    city:           location,
    country:        location === '台灣' ? 'TW' : null,
    product_oneliner: oneliner,
    product_status: productStatus,
    team_size:      teamSize,
    ceo_linkedin:   ceoLinkedin,
    bp_url:         bpUrl,
    referrer:       referrer,
    source:         'google_form',
    pipeline_stage: '0_待篩選',
    status:         'active',
    extra: {
      taiwan_link:        r['10. 台灣連結說明（非台灣者填寫）'] ?? null,
      funding_target:     r['11. 目標募資金額（NTD）'] ?? null,
      valuation_pre_text: r['12. Pre-money Valuation（NTD）'] ?? null,
      funding_raised:     r['13. 本輪已完成募資金額'] ?? null,
      has_other_investors: r['14. 是否已有其他投資方？'] ?? null,
      problem_solution:   r['16. 核心問題與解法'] ?? null,
      target_customers:   r['17. 目標客群'] ?? null,
      differentiation:    r['19. 核心差異化與護城河'] ?? null,
      ceo_background:     r['20. CEO／創辦人背景'] ?? null,
      team_completeness:  r['23. 團隊完整性說明'] ?? null,
      has_paying_customers: r['24. 是否已有付費客戶？'] ?? null,
      paying_customers_detail: r['24-1. 若有，請簡述數量及代表客戶'] ?? null,
      key_milestone:      r['25. 近期最重要里程碑'] ?? null,
      monthly_revenue:    monthlyRev,
      other_docs:         r['28. 其他補充文件或連結'] ?? null,
      how_did_you_hear:   r['29. 如何得知 NTUTEC 天使俱樂部？'] ?? null,
    },
  }

  // If tax_id exists, update existing startup; otherwise insert new
  let startupId: string | null = null
  if (taxId) {
    const { data: existing } = await db
      .from('startups')
      .select('id')
      .eq('tax_id', taxId)
      .single()
    if (existing?.id) {
      await db.from('startups').update(startupPayload).eq('id', existing.id)
      startupId = existing.id
    }
  }
  if (!startupId) {
    const { data: startup, error: startupErr } = await db
      .from('startups')
      .insert(startupPayload)
      .select('id')
      .single()
    if (startupErr) {
      console.error('startup insert error:', startupErr)
      return NextResponse.json({ error: 'Failed to create startup', detail: startupErr.message }, { status: 500 })
    }
    startupId = startup.id
  }

  // ── Insert form_submission ────────────────────────────────────
  const { error: formErr } = await db.from('form_submissions').insert({
    form_type:        'startup_application',
    submitted_at:     body.timestamp ? new Date(body.timestamp).toISOString() : undefined,
    submitter_name:   contactName || null,
    submitter_email:  contactEmail,
    submitter_org:    companyName || null,
    data:             r,
    status:           'new',
    related_startup_id: startupId,
  })

  if (formErr) {
    console.error('form_submission insert error:', formErr)
    // Startup already created — don't fail the whole request
  }

  // ── Link form_submission_id back to startup ───────────────────
  if (!formErr) {
    const { data: submission } = await db
      .from('form_submissions')
      .select('id')
      .eq('related_startup_id', startupId)
      .single()
    if (submission?.id) {
      await db
        .from('startups')
        .update({ form_submission_id: submission.id })
        .eq('id', startupId)
    }
  }

  return NextResponse.json({ success: true, startup_id: startupId })
}
