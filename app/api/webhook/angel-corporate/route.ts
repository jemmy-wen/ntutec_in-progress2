import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/notifications/email'
import { getAngelCorporateConfirmation } from '@/lib/email-templates'

/**
 * POST /api/webhook/angel-corporate
 *
 * Receives corporate angel membership applications via Apps Script trigger.
 * Writes to form_submissions table with form_type='angel_corporate'.
 * Sends auto-reply to 第一位代表人 email.
 *
 * Security: x-webhook-secret header must match GOOGLE_FORM_WEBHOOK_SECRET env var.
 *
 * Apps Script body shape:
 * {
 *   timestamp: string,
 *   responses: { [questionTitle: string]: string | string[] }
 * }
 *
 * Google Form fields (33 questions):
 *   企業名稱, 統一編號, 公司網址
 *   背景與加入目的, 對創創期待（排序4項）, 想說的話, 天使俱樂部意願
 *   總投資規模, 單一投資金額, 偏好投資領域, 投資部門KPI
 *   第一位代表人: 姓名/部門職稱/email/電話/Line ID
 *   第二位代表人: 姓名/部門職稱/email/電話/Line ID
 *   第三位代表人: 姓名/部門職稱/email/電話/Line ID
 *   獲知來源, 介紹人, 加入期待, 疑問
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
    const companyName     = str('企業名稱') ?? ''
    const taxId           = str('統一編號')?.replace(/\.0$/, '') ?? null
    const website         = str('公司網址')
    const background      = str('背景與加入目的')
    const expectations    = str('對創創期待')
    const message         = str('想說的話')
    const clubIntent      = str('天使俱樂部意願')
    const totalInvest     = str('總投資規模')
    const singleInvest    = str('單一投資金額')
    const preferSectors   = str('偏好投資領域')
    const investKpi       = str('投資部門KPI')

    // Representatives
    const rep1Name        = str('第一位代表人姓名') ?? str('代表人一姓名')
    const rep1Title       = str('第一位代表人部門職稱') ?? str('代表人一部門職稱')
    const rep1Email       = str('第一位代表人email') ?? str('第一位代表人Email') ?? str('代表人一Email')
    const rep1Phone       = str('第一位代表人電話') ?? str('代表人一電話')
    const rep1Line        = str('第一位代表人Line ID') ?? str('代表人一Line ID')

    const rep2Name        = str('第二位代表人姓名') ?? str('代表人二姓名')
    const rep2Title       = str('第二位代表人部門職稱') ?? str('代表人二部門職稱')
    const rep2Email       = str('第二位代表人email') ?? str('第二位代表人Email') ?? str('代表人二Email')
    const rep2Phone       = str('第二位代表人電話') ?? str('代表人二電話')
    const rep2Line        = str('第二位代表人Line ID') ?? str('代表人二Line ID')

    const rep3Name        = str('第三位代表人姓名') ?? str('代表人三姓名')
    const rep3Title       = str('第三位代表人部門職稱') ?? str('代表人三部門職稱')
    const rep3Email       = str('第三位代表人email') ?? str('第三位代表人Email') ?? str('代表人三Email')
    const rep3Phone       = str('第三位代表人電話') ?? str('代表人三電話')
    const rep3Line        = str('第三位代表人Line ID') ?? str('代表人三Line ID')

    const howHeard        = str('獲知來源')
    const referrer        = str('介紹人')
    const joinExpectation = str('加入期待')
    const questions       = str('疑問')
    const agreedTerms     = str('已閱讀條款')
    const addedLine       = str('已加LINE')
    const agreedReview    = str('同意審查')

    const db = createAdminClient() as any // eslint-disable-line @typescript-eslint/no-explicit-any

    // ── Insert form_submission ─────────────────────────────────────
    const { error: formErr } = await db.from('form_submissions').insert({
      form_type:       'angel_corporate',
      type:            'angel_corporate',
      submitted_at:    body.timestamp ? new Date(body.timestamp).toISOString() : undefined,
      submitter_name:  companyName || null,
      submitter_email: rep1Email || null,
      submitter_phone: rep1Phone || null,
      submitter_org:   companyName || null,
      name:            companyName || null,
      email:           rep1Email || null,
      data: {
        企業名稱:           companyName,
        統一編號:           taxId,
        公司網址:           website,
        背景與加入目的:     background,
        對創創期待:         expectations,
        想說的話:           message,
        天使俱樂部意願:     clubIntent,
        總投資規模:         totalInvest,
        單一投資金額:       singleInvest,
        偏好投資領域:       preferSectors,
        投資部門KPI:        investKpi,
        第一位代表人: {
          姓名: rep1Name,
          部門職稱: rep1Title,
          email: rep1Email,
          電話: rep1Phone,
          Line_ID: rep1Line,
        },
        第二位代表人: rep2Name ? {
          姓名: rep2Name,
          部門職稱: rep2Title,
          email: rep2Email,
          電話: rep2Phone,
          Line_ID: rep2Line,
        } : null,
        第三位代表人: rep3Name ? {
          姓名: rep3Name,
          部門職稱: rep3Title,
          email: rep3Email,
          電話: rep3Phone,
          Line_ID: rep3Line,
        } : null,
        獲知來源:           howHeard,
        介紹人:             referrer,
        加入期待:           joinExpectation,
        疑問:               questions,
        已閱讀條款:         agreedTerms,
        已加LINE:           addedLine,
        同意審查:           agreedReview,
        // Preserve full raw responses for completeness
        _raw: r,
      },
      status: 'new',
    })

    if (formErr) {
      console.error('[angel-corporate] form_submission insert error:', formErr)
      return NextResponse.json({ error: 'Failed to save submission', detail: formErr.message }, { status: 500 })
    }

    // ── Auto-reply to 第一位代表人 ────────────────────────────────
    if (rep1Email) {
      const { subject, html } = getAngelCorporateConfirmation(companyName || rep1Name || '貴公司')
      const sent = await sendEmail({ to: rep1Email, subject, html })
      if (!sent) {
        console.warn('[angel-corporate] auto-reply failed for:', rep1Email)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[angel-corporate] unhandled error:', msg)
    return NextResponse.json({ error: 'Internal error', detail: msg }, { status: 500 })
  }
}
