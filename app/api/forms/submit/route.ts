import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/notifications/email'
import { getAutoReplyTemplate, REPLY_TO, type FormType } from '@/lib/email-templates'
import { checkRateLimit, rateLimitResponse } from '@/lib/middleware/rate-limit'

/**
 * POST /api/forms/submit — Unified form submission handler.
 *
 * All website forms (contact, apply, angel_apply, pitch, consulting) POST here.
 * Writes to form_submissions table, sends auto-reply confirmation email.
 * Rate limited: 5 req/min per IP (contact category).
 *
 * Body: { type, data, email, name }
 */

const VALID_TYPES: FormType[] = ['contact', 'apply', 'angel_apply', 'angel_individual', 'angel_corporate', 'pitch', 'consulting']

const TYPE_LABELS: Record<FormType, string> = {
  contact:          '一般聯絡',
  apply:            '加速器申請',
  angel_apply:      '天使會員申請',
  angel_individual: '天使個人申請',
  angel_corporate:  '天使企業申請',
  pitch:            '新創投遞',
  consulting:       '企業諮詢',
}

export async function POST(req: NextRequest) {
  // Rate limiting — 5 req/min per IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const { allowed, resetAt } = checkRateLimit(ip, 'contact')
  if (!allowed) return rateLimitResponse(resetAt)

  // Parse body
  let body: { type?: string; data?: Record<string, unknown>; email?: string; name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Validate
  const { type, data = {}, email, name } = body

  if (!type || !VALID_TYPES.includes(type as FormType)) {
    return NextResponse.json(
      { error: `Invalid type. Must be one of: ${VALID_TYPES.join(', ')}` },
      { status: 400 }
    )
  }
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }
  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const formType = type as FormType

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createAdminClient() as any

    // Spam check: same email + type submitted in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { data: recent } = await db
      .from('form_submissions')
      .select('id')
      .eq('email', email)
      .eq('type', formType)
      .gte('created_at', fiveMinutesAgo)
      .limit(1)

    if (recent && recent.length > 0) {
      return NextResponse.json(
        { error: '您已在近期提交過相同表單，請稍後再試。' },
        { status: 429 }
      )
    }

    // Insert into form_submissions
    const { data: inserted, error: insertError } = await db
      .from('form_submissions')
      .insert({
        type: formType,
        form_type: formType,
        data: { ...data, name, email },
        status: 'new',
        email,
        name,
        submitter_name: name,
        submitter_email: email,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('[forms/submit] insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    // Send auto-reply to submitter (non-blocking — don't fail the request if email fails)
    const template = getAutoReplyTemplate({ name, type: formType })
    sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    }).catch((err) => console.error('[forms/submit] auto-reply error:', err))

    // Notify internal team
    sendEmail({
      to: process.env.CONTACT_EMAIL || 'ntutec@ntu.edu.tw',
      subject: `[網站表單] ${TYPE_LABELS[formType]} — ${name}`,
      html: buildInternalNotification({ formType, name, email, data }),
    }).catch((err) => console.error('[forms/submit] internal notify error:', err))

    return NextResponse.json({ success: true, id: inserted?.id })
  } catch (err) {
    console.error('[forms/submit] unhandled error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function buildInternalNotification(params: {
  formType: FormType
  name: string
  email: string
  data: Record<string, unknown>
}): string {
  const { formType, name, email, data } = params
  const rows = Object.entries(data)
    .filter(([k]) => k !== 'name' && k !== 'email')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 8px;font-weight:600;white-space:nowrap;color:#374151">${escapeHtml(k)}</td><td style="padding:6px 8px;color:#4b5563">${escapeHtml(String(v ?? ''))}</td></tr>`
    )
    .join('')

  return `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#0d9488">新表單提交：${TYPE_LABELS[formType]}</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
        <tr><td style="padding:6px 8px;font-weight:600;color:#374151">類型</td><td style="padding:6px 8px;color:#4b5563">${TYPE_LABELS[formType]}</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;color:#374151">姓名</td><td style="padding:6px 8px;color:#4b5563">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;color:#374151">Email</td><td style="padding:6px 8px;color:#4b5563">${escapeHtml(email)}</td></tr>
        ${rows}
      </table>
      <p style="color:#6b7280;font-size:13px">
        管理後台：<a href="https://tec.ntu.edu.tw/admin/forms" style="color:#0d9488">admin/forms</a>
      </p>
    </div>
  `
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
