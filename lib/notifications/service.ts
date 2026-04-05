// @ts-nocheck
/**
 * F-008: Unified Notification Service
 *
 * Orchestrates multi-channel notifications per D2 decision:
 *   ✅ In-app (站內通知) — always
 *   ✅ Email (nodemailer) — for important events
 *   🔮 LINE — interface pre-built, not connected (等待串接)
 *   ❌ Telegram — excluded by D2
 *
 * Usage:
 *   await notify({ ... })
 *   await notifyMeetingLifecycle('cards_ready', meetingId)
 */

import { createInAppNotification, sendBulkNotifications, type NotificationType } from './in-app'
import { sendEmail } from './email'
import { createAdminClient } from '@/lib/supabase/admin'

// ─── Types ───

export type NotifyChannel = 'in_app' | 'email' | 'line'

export interface NotifyParams {
  userId: string
  title: string
  body?: string
  type?: NotificationType
  link?: string
  channels?: NotifyChannel[]
  /** Email-specific fields */
  email?: {
    to: string
    subject?: string
    html?: string
  }
}

export interface BulkNotifyParams {
  userIds: string[]
  title: string
  body?: string
  type?: NotificationType
  link?: string
  channels?: NotifyChannel[]
  /** If true, also send email to all users with email addresses */
  includeEmail?: boolean
  emailSubject?: string
  emailHtml?: string
}

// ─── Meeting Lifecycle Event Definitions ───

export type MeetingLifecycleEvent =
  | 'pitch_added'        // New startup added to meeting
  | 'cards_ready'        // Cards published for member browsing
  | 'vote_open'          // Voting/response window opened
  | 'meeting_reminder'   // D-1 meeting reminder
  | 'meeting_complete'   // Meeting concluded
  | 'followup_started'   // Post-meeting followup initiated
  | 'card_response'      // Member submitted a card response (admin notification)

const LIFECYCLE_TEMPLATES: Record<MeetingLifecycleEvent, {
  title: string
  body: string
  type: NotificationType
  link: string
  channels: NotifyChannel[]
  audience: 'admin' | 'members' | 'all'
}> = {
  pitch_added: {
    title: '新創已加入月會 Pitch 名單',
    body: '新的候選新創已加入本月月會 Pitch 名單，請至管理後台確認。',
    type: 'info',
    link: '/admin/meetings',
    channels: ['in_app'],
    audience: 'admin',
  },
  cards_ready: {
    title: '📋 候選新創卡片已上架',
    body: '本月月會候選新創資料已準備就緒，請前往瀏覽並回覆您的興趣偏好。',
    type: 'action',
    link: '/angel/portal/cards',
    channels: ['in_app', 'email'],
    audience: 'members',
  },
  vote_open: {
    title: '🗳️ 投票通道已開啟',
    body: '本月月會投票已開放，請在截止前完成您的回覆。',
    type: 'action',
    link: '/angel/portal/cards',
    channels: ['in_app', 'email'],
    audience: 'members',
  },
  meeting_reminder: {
    title: '⏰ 月會提醒：明天開會',
    body: '天使俱樂部月會將於明天舉行，請確認出席。',
    type: 'warning',
    link: '/angel/portal',
    channels: ['in_app', 'email'],
    audience: 'all',
  },
  meeting_complete: {
    title: '✅ 月會已結束',
    body: '本月天使俱樂部月會已結束，感謝您的參與。後續追蹤資訊將另行通知。',
    type: 'success',
    link: '/angel/portal',
    channels: ['in_app', 'email'],
    audience: 'members',
  },
  followup_started: {
    title: '📬 月會投票結果 & 後續追蹤',
    body: '本月月會已結束，投票結果與後續追蹤說明請見信件附件。',
    type: 'info',
    link: '/angel/portal',
    channels: ['in_app', 'email'],
    audience: 'members',
  },
  card_response: {
    title: '天使會員回覆了興趣卡片',
    body: '',  // Will be dynamically set
    type: 'info',
    link: '/admin/meetings/responses',
    channels: ['in_app'],
    audience: 'admin',
  },
}

// ─── Core: Single User Notification ───

export async function notify(params: NotifyParams): Promise<void> {
  const channels = params.channels || ['in_app']

  // Channel 1: In-app (always available)
  if (channels.includes('in_app')) {
    await createInAppNotification({
      userId: params.userId,
      title: params.title,
      body: params.body,
      type: params.type || 'info',
      link: params.link,
    })
  }

  // Channel 2: Email (if configured)
  if (channels.includes('email') && params.email) {
    await sendEmail({
      to: params.email.to,
      subject: params.email.subject || params.title,
      html: params.email.html || wrapEmailHtml(params.title, params.body || '', params.link),
    })
  }

  // Channel 3: LINE (pre-built interface, not connected)
  if (channels.includes('line')) {
    // LINE interface placeholder per D2 decision
    // When LINE Messaging API is integrated, send via:
    // await sendLineMessage({ userId: params.userId, message: params.title })
    console.log('[LINE] Placeholder — not connected:', params.title)
  }
}

// ─── Core: Bulk Notification ───

export async function notifyBulk(params: BulkNotifyParams): Promise<{ sent: number }> {
  const channels = params.channels || ['in_app']
  let sent = 0

  // Channel 1: In-app bulk
  if (channels.includes('in_app')) {
    await sendBulkNotifications(params.userIds, {
      title: params.title,
      body: params.body,
      type: params.type || 'info',
      link: params.link,
    })
    sent += params.userIds.length
  }

  // Channel 2: Email bulk (if requested)
  if (channels.includes('email') && params.includeEmail) {
    const admin = createAdminClient()
    // Fetch email addresses for all target users
    const { data: users } = await admin.auth.admin.listUsers()
    const emailMap = new Map(
      (users?.users || []).map(u => [u.id, u.email])
    )

    for (const userId of params.userIds) {
      const email = emailMap.get(userId)
      if (email) {
        await sendEmail({
          to: email,
          subject: params.emailSubject || params.title,
          html: params.emailHtml || wrapEmailHtml(params.title, params.body || '', params.link),
        })
      }
    }
  }

  return { sent }
}

// ─── Meeting Lifecycle Notifications ───

interface MeetingPitchRow {
  startup_name: string
  vote_average: number | null
  vote_recommendation: string | null
  voter_count: number | null
  order_index?: number | null
}

/**
 * Send notifications for a meeting lifecycle event.
 * Automatically determines audience, channels, and content.
 * For followup_started: auto-fetches pitch results from DB and builds recap email.
 */
export async function notifyMeetingLifecycle(
  event: MeetingLifecycleEvent,
  meetingId: string,
  extra?: {
    /** Override body text */
    body?: string
    /** Additional context for card_response event */
    memberName?: string
    startupName?: string
    response?: string
    /** Meeting date string for recap email subject (e.g. "2026/04/02") */
    meetingDate?: string
  }
): Promise<{ sent: number }> {
  const template = LIFECYCLE_TEMPLATES[event]
  if (!template) return { sent: 0 }

  const admin = createAdminClient()
  let targetUserIds: string[] = []

  if (template.audience === 'admin' || template.audience === 'all') {
    // Get admin user IDs
    const { data: adminRoles } = await admin
      .from('module_roles')
      .select('user_id')
      .in('role', ['admin', 'staff_admin'])
      .eq('is_active', true)
    const adminIds = [...new Set((adminRoles || []).map(r => r.user_id))]
    targetUserIds.push(...adminIds)
  }

  if (template.audience === 'members' || template.audience === 'all') {
    // Get angel member user IDs
    const { data: memberRoles } = await admin
      .from('module_roles')
      .select('user_id')
      .eq('role', 'angel_member')
      .eq('is_active', true)
    const memberIds = (memberRoles || []).map(r => r.user_id)
    targetUserIds.push(...memberIds)
  }

  // Deduplicate
  targetUserIds = [...new Set(targetUserIds)]
  if (targetUserIds.length === 0) return { sent: 0 }

  // Build notification content
  let body = extra?.body || template.body
  let emailHtml: string | undefined

  if (event === 'card_response' && extra) {
    body = `${extra.memberName || '會員'} 對「${extra.startupName || '新創'}」回覆了「${
      extra.response === 'interested' ? '有興趣' :
      extra.response === 'thinking' ? '再想想' : '不適合我'
    }」`
  }

  // F-009: For followup_started, build recap email with vote results
  if (event === 'followup_started' && template.channels.includes('email')) {
    const { data: pitches } = await admin
      .from('pip_meeting_pitches')
      .select('startup_name, vote_average, vote_recommendation, voter_count, order_index')
      .eq('meeting_id', meetingId)
      .order('order_index', { ascending: true })

    if (pitches && pitches.length > 0) {
      emailHtml = buildRecapEmailHtml(pitches as MeetingPitchRow[], extra?.meetingDate)
    }
  }

  return notifyBulk({
    userIds: targetUserIds,
    title: template.title,
    body,
    type: template.type,
    link: template.link,
    channels: template.channels,
    includeEmail: template.channels.includes('email'),
    emailSubject: template.title.replace(/[📋🗳️⏰✅📬]/g, '').trim(),
    emailHtml,
  })
}

// ─── LINE Interface (Pre-built, D2 Decision) ───

/**
 * LINE notification interface — pre-built per D2 decision.
 * Currently a no-op. When LINE Messaging API is integrated:
 * 1. Set LINE_CHANNEL_ACCESS_TOKEN env var
 * 2. Map user_id → LINE user ID in angel_members table
 * 3. Implement pushMessage via LINE Messaging API
 */
export async function sendLineNotification(params: {
  lineUserId: string
  message: string
  altText?: string
}): Promise<boolean> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!token) {
    console.log('[LINE] Not configured — skipping notification')
    return false
  }

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: params.lineUserId,
        messages: [{
          type: 'text',
          text: params.message,
        }],
      }),
    })
    return response.ok
  } catch (err) {
    console.error('[LINE] Send failed:', err)
    return false
  }
}

// ─── Email Template Helpers ───

/** F-009: Build post-meeting recap email with vote results table */
function buildRecapEmailHtml(pitches: MeetingPitchRow[], meetingDate?: string): string {
  const REC_STYLE: Record<string, string> = {
    'PASS':       'background:#dcfce7;color:#166534;',
    'BORDERLINE': 'background:#fef9c3;color:#854d0e;',
    'NO_PASS':    'background:#fee2e2;color:#991b1b;',
  }
  const REC_LABEL: Record<string, string> = {
    'PASS':       '通過',
    'BORDERLINE': '待議',
    'NO_PASS':    '未通過',
  }

  const rows = pitches.map((p, i) => {
    const rec = p.vote_recommendation || ''
    const style = REC_STYLE[rec] || 'background:#f1f5f9;color:#334155;'
    const label = REC_LABEL[rec] || rec || '—'
    const avg = p.vote_average != null ? p.vote_average.toFixed(2) : '—'
    const count = p.voter_count != null ? `${p.voter_count} 票` : '—'
    return `
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:10px 12px;font-size:14px;color:#1e293b;">${i + 1}. ${p.startup_name}</td>
      <td style="padding:10px 12px;font-size:14px;text-align:center;color:#475569;">${avg}</td>
      <td style="padding:10px 12px;font-size:14px;text-align:center;color:#475569;">${count}</td>
      <td style="padding:10px 12px;font-size:13px;text-align:center;">
        <span style="padding:3px 10px;border-radius:20px;font-weight:600;${style}">${label}</span>
      </td>
    </tr>`
  }).join('')

  const dateStr = meetingDate ? ` (${meetingDate})` : ''

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:620px;margin:0 auto;padding:20px;">
  <div style="background:#f8fafc;border-radius:12px;padding:28px;border:1px solid #e2e8f0;">
    <h2 style="margin:0 0 6px;color:#1e293b;font-size:20px;">📬 月會投票結果${dateStr}</h2>
    <p style="margin:0 0 20px;color:#64748b;font-size:14px;">感謝您參與本月天使俱樂部月會，以下為各案件投票統計結果。</p>

    <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
      <thead>
        <tr style="background:#f1f5f9;">
          <th style="padding:10px 12px;font-size:13px;color:#475569;text-align:left;font-weight:600;">新創名稱</th>
          <th style="padding:10px 12px;font-size:13px;color:#475569;text-align:center;font-weight:600;">平均分</th>
          <th style="padding:10px 12px;font-size:13px;color:#475569;text-align:center;font-weight:600;">投票人數</th>
          <th style="padding:10px 12px;font-size:13px;color:#475569;text-align:center;font-weight:600;">結果</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <div style="margin-top:20px;padding:16px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe;">
      <p style="margin:0;font-size:13px;color:#1d4ed8;">
        <strong>後續追蹤：</strong>通過案件將由本中心安排深度訪談；如您對特定新創有進一步興趣，歡迎回覆此信聯繫我們。
      </p>
    </div>

    <div style="margin-top:20px;text-align:center;">
      <a href="https://ntutec-platform.vercel.app/angel/portal" style="display:inline-block;padding:10px 24px;background:#0d9488;color:white;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">查看投資組合</a>
    </div>
  </div>
  <p style="margin-top:16px;font-size:12px;color:#94a3b8;text-align:center;">
    台大創創中心 Angel Club — 此為系統自動通知
  </p>
</body>
</html>`.trim()
}

function wrapEmailHtml(title: string, body: string, link?: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
    <h2 style="margin: 0 0 12px; color: #1e293b; font-size: 18px;">${title}</h2>
    <p style="margin: 0 0 16px; color: #475569; font-size: 14px; line-height: 1.6;">${body}</p>
    ${link ? `<a href="https://ntutec-platform.vercel.app${link}" style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-size: 14px;">前往查看</a>` : ''}
  </div>
  <p style="margin-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
    台大創創中心 Angel Club — 此為系統自動通知
  </p>
</body>
</html>
  `.trim()
}
