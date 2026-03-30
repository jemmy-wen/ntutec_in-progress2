// @ts-nocheck
/**
 * POST /api/admin/meetings/notify
 *
 * F-008: Admin-triggered meeting lifecycle notifications.
 * Allows admin to send bulk notifications for meeting events.
 *
 * Body: { meeting_id: string, event: MeetingLifecycleEvent, custom_body?: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { notifyMeetingLifecycle, type MeetingLifecycleEvent } from '@/lib/notifications/service'

const VALID_EVENTS: MeetingLifecycleEvent[] = [
  'cards_ready',
  'vote_open',
  'meeting_reminder',
  'meeting_complete',
  'followup_started',
]

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: roles } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)
    const userRoles = (roles || []).map((r: { role: string }) => r.role)
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r))
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const { meeting_id, event, custom_body } = body

    if (!meeting_id || !event) {
      return NextResponse.json({ error: 'meeting_id and event required' }, { status: 400 })
    }

    if (!VALID_EVENTS.includes(event)) {
      return NextResponse.json({
        error: `Invalid event. Valid events: ${VALID_EVENTS.join(', ')}`,
      }, { status: 400 })
    }

    // Verify meeting exists
    const { data: meeting } = await supabase
      .from('pip_meetings')
      .select('id, status, meeting_date')
      .eq('id', meeting_id)
      .single()

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
    }

    // Send notifications
    const result = await notifyMeetingLifecycle(event, meeting_id, {
      body: custom_body,
    })

    // Audit log
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'send_meeting_notification',
      entity_type: 'meeting',
      entity_id: meeting_id,
      changes: { event, sent: result.sent, custom_body: !!custom_body },
    })

    return NextResponse.json({
      success: true,
      event,
      sent: result.sent,
    })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
