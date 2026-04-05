// @ts-nocheck
/**
 * POST /api/notifications/send
 *
 * F-008: Unified Notification Send — Admin-only endpoint
 *
 * Body: {
 *   userId?:   string          // single target user ID
 *   userIds?:  string[]        // bulk target user IDs (mutually exclusive with userId)
 *   title:     string
 *   body?:     string
 *   type?:     'info' | 'action' | 'warning' | 'success'
 *   link?:     string          // relative path (e.g. '/angel/portal')
 *   channels?: ('in_app' | 'email' | 'telegram')[]   // defaults to ['in_app']
 *   // Email overrides (single-user only)
 *   emailTo?:      string
 *   emailSubject?: string
 *   emailHtml?:    string
 *   // Telegram overrides (single-user only)
 *   telegramChatId?: string
 * }
 *
 * Response: { ok: true, sent: number }
 */

import { NextResponse } from 'next/server'
import { withApiHandler } from '@/lib/api/handler'
import { notify, notifyBulk, type NotifyChannel, type NotifyParams } from '@/lib/notifications/service'

export const POST = withApiHandler({
  roles: ['admin', 'staff_admin'],
}, async (ctx) => {
  const body = ctx.body
  if (!body) {
    return NextResponse.json({ error: '請求內容為空' }, { status: 400 })
  }

  const { userId, userIds, title, body: msgBody, type, link, channels, emailTo, emailSubject, emailHtml, telegramChatId } = body as {
    userId?: string
    userIds?: string[]
    title?: string
    body?: string
    type?: string
    link?: string
    channels?: NotifyChannel[]
    emailTo?: string
    emailSubject?: string
    emailHtml?: string
    telegramChatId?: string
  }

  if (!title) {
    return NextResponse.json({ error: '缺少 title 欄位' }, { status: 400 })
  }

  const resolvedChannels: NotifyChannel[] = channels || ['in_app']

  // ─── Single user ───
  if (userId && !userIds) {
    const params: NotifyParams = {
      userId,
      title,
      body: msgBody,
      type: type as any,
      link,
      channels: resolvedChannels,
      telegramChatId,
    }
    if (resolvedChannels.includes('email') && emailTo) {
      params.email = {
        to: emailTo,
        subject: emailSubject,
        html: emailHtml,
      }
    }
    await notify(params)
    return NextResponse.json({ ok: true, sent: 1 })
  }

  // ─── Bulk users ───
  const targetIds = userIds || []
  if (targetIds.length === 0) {
    return NextResponse.json({ error: '需提供 userId 或 userIds' }, { status: 400 })
  }

  const result = await notifyBulk({
    userIds: targetIds,
    title,
    body: msgBody,
    type: type as any,
    link,
    channels: resolvedChannels,
    includeEmail: resolvedChannels.includes('email'),
    emailSubject,
    emailHtml,
    includeTelegram: resolvedChannels.includes('telegram'),
  })

  return NextResponse.json({ ok: true, sent: result.sent })
})
