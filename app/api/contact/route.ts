import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/notifications/email'
import { checkRateLimit, rateLimitResponse } from '@/lib/middleware/rate-limit'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/contact — Handle contact form submissions.
 * Sends email to ntutec@ntutec.com + auto-reply to submitter.
 * Persists to form_submissions (all types).
 * For type=startup: also creates a startup draft record.
 * Rate limited: 5 req/min per IP (contact category).
 */
export async function POST(req: NextRequest) {
  // Rate limiting — use forwarded IP or fallback
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown'
  const { allowed, resetAt } = checkRateLimit(ip, 'contact')
  if (!allowed) return rateLimitResponse(resetAt)

  try {
    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const { name, email, phone, company, type, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send notification to TEC team
    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'ntutec@ntutec.com',
      subject: `[網站聯絡] ${typeLabel(type)} — ${name}`,
      html: `
        <h2>網站聯絡表單</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">姓名</td><td style="padding:8px">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${escapeHtml(email)}</td></tr>
          ${phone ? `<tr><td style="padding:8px;font-weight:bold">電話</td><td style="padding:8px">${escapeHtml(phone)}</td></tr>` : ''}
          ${company ? `<tr><td style="padding:8px;font-weight:bold">公司/團隊</td><td style="padding:8px">${escapeHtml(company)}</td></tr>` : ''}
          <tr><td style="padding:8px;font-weight:bold">類型</td><td style="padding:8px">${typeLabel(type)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top">訊息</td><td style="padding:8px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
        </table>
      `,
    })

    // Auto-reply to submitter
    await sendEmail({
      to: email,
      subject: '感謝您的來信 — 台大創創中心',
      html: `
        <p>${escapeHtml(name)} 您好，</p>
        <p>感謝您的來信！我們已收到您的訊息，會在 2-3 個工作天內回覆。</p>
        <p>如有其他問題，歡迎來信 ntutec@ntutec.com。</p>
        <br />
        <p>台大創創中心 NTUTEC</p>
      `,
    })

    // Persist to form_submissions + create startup draft for type=startup
    const supabase = createAdminClient()

    const submissionData = { name, email, phone, company, type, message }

    let relatedStartupId: string | null = null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any

    if (type === 'startup' && company) {
      const { data: startup } = await db
        .from('startups')
        .insert({
          name_zh: company,
          email,
          phone: phone || null,
          representative: name,
          source: 'website_form',
          pipeline_stage: '0_待篩選',
          status: 'active',
        })
        .select('id')
        .single()
      relatedStartupId = startup?.id ?? null
    }

    await db.from('form_submissions').insert({
      form_type: type || 'other',
      submitter_name: name,
      submitter_email: email,
      submitter_phone: phone || null,
      submitter_org: company || null,
      data: submissionData,
      status: 'new',
      related_startup_id: relatedStartupId,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    startup: '新創團隊申請',
    angel: '天使俱樂部加入',
    mentor: '成為業師',
    partnership: '合作洽談',
    media: '媒體採訪',
    other: '其他',
  }
  return labels[type] || '其他'
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
