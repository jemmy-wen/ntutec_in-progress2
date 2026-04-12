import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/webhook/angel-individual
 *
 * Receives individual angel membership applications via Apps Script trigger.
 * Writes to form_submissions table with form_type='angel_individual'.
 *
 * Security: x-webhook-secret header must match GOOGLE_FORM_WEBHOOK_SECRET env var.
 *
 * Apps Script body shape:
 * {
 *   timestamp: string,
 *   responses: { [questionTitle: string]: string | string[] }
 * }
 *
 * Google Form fields (24 questions):
 *   姓名, 聯繫電話, Line ID, Linkedin檔案連結, 所屬公司名稱, 職稱
 *   身份別, 台大身份, 科系及屆數
 *   背景與加入目的, 期待排序, 想說的話, 天使俱樂部意願
 *   投資經驗案數, 投資創業經驗描述, 可支配投資金額
 *   偏好投資領域, 獲知來源, 介紹人, 加入期待
 *   已閱讀條款, 已加LINE, 同意審查
 */
export async function POST(req: NextRequest) {
  // Verify secret
  const secret = req.headers.get('x-webhook-secret')
  if (!secret || secret !== process.env.GOOGLE_FORM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { timestamp?: string; responses?: Record<string, unknown> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  try {
    // Normalize: convert array values (checkbox) to comma-joined strings
    const raw = body.responses ?? {}
    const r: Record<string, string> = {}
    for (const [k, v] of Object.entries(raw)) {
      r[k] = Array.isArray(v) ? (v as unknown[]).join(', ') : String(v ?? '')
    }

    const str = (key: string): string | null => {
      const v = r[key]?.trim()
      return v || null
    }

    // ── Field mapping ──────────────────────────────────────────────
    const name            = str('姓名') ?? str('姓名（必填）') ?? ''
    const phone           = str('聯繫電話')
    const lineId          = str('Line ID')
    const linkedin        = str('Linkedin檔案連結') ?? str('LinkedIn 檔案連結')
    const company         = str('所屬公司名稱')
    const jobTitle        = str('職稱')
    const identity        = str('身份別')
    const ntuIdentity     = str('台大身份')
    const ntuDept         = str('科系及屆數')
    const background      = str('背景與加入目的')
    const expectations    = str('期待排序')
    const message         = str('想說的話')
    const clubIntent      = str('天使俱樂部意願')
    const investCount     = str('投資經驗案數')
    const investDesc      = str('投資創業經驗描述')
    const investBudget    = str('可支配投資金額')
    const preferSectors   = str('偏好投資領域')
    const howHeard        = str('獲知來源')
    const referrer        = str('介紹人')
    const joinExpectation = str('加入期待')
    const agreedTerms     = str('已閱讀條款')
    const addedLine       = str('已加LINE')
    const agreedReview    = str('同意審查')

    const db = createAdminClient() as any // eslint-disable-line @typescript-eslint/no-explicit-any

    // ── Insert form_submission ─────────────────────────────────────
    const { error: formErr } = await db.from('form_submissions').insert({
      form_type:       'angel_individual',
      type:            'angel_individual',
      submitted_at:    body.timestamp ? new Date(body.timestamp).toISOString() : undefined,
      submitter_name:  name || null,
      submitter_email: null, // Individual form does not collect email
      submitter_phone: phone || null,
      submitter_org:   company || null,
      name:            name || null,
      email:           null,
      data: {
        姓名:           name,
        聯繫電話:       phone,
        Line_ID:        lineId,
        LinkedIn:       linkedin,
        所屬公司名稱:   company,
        職稱:           jobTitle,
        身份別:         identity,
        台大身份:       ntuIdentity,
        科系及屆數:     ntuDept,
        背景與加入目的: background,
        期待排序:       expectations,
        想說的話:       message,
        天使俱樂部意願: clubIntent,
        投資經驗案數:   investCount,
        投資創業經驗描述: investDesc,
        可支配投資金額: investBudget,
        偏好投資領域:   preferSectors,
        獲知來源:       howHeard,
        介紹人:         referrer,
        加入期待:       joinExpectation,
        已閱讀條款:     agreedTerms,
        已加LINE:       addedLine,
        同意審查:       agreedReview,
        // Preserve full raw responses for completeness
        _raw: r,
      },
      status: 'new',
    })

    if (formErr) {
      console.error('[angel-individual] form_submission insert error:', formErr)
      return NextResponse.json({ error: 'Failed to save submission', detail: formErr.message }, { status: 500 })
    }

    // No auto-reply: individual angel form does not collect email

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[angel-individual] unhandled error:', msg)
    return NextResponse.json({ error: 'Internal error', detail: msg }, { status: 500 })
  }
}
