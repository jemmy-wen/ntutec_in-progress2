// @ts-nocheck
/**
 * GET /api/meetings
 *   → List meeting cycles (admin: all, member: active + recent)
 *
 * POST /api/meetings
 *   → Admin: create new meeting cycle
 */

import { NextResponse } from 'next/server'
import { withApiHandler, requireFields, isValidCycleId } from '@/lib/api/handler'
import { sendBulkNotifications } from '@/lib/notifications/in-app'

// GET: List meeting cycles
export const GET = withApiHandler({
  roles: ['angel_member', 'admin', 'staff_admin'],
}, async (ctx) => {
  let query = ctx.supabase
    .from('pip_meetings')
    .select('*')
    .order('meeting_date', { ascending: false })

  // Non-admin: only active and recent meetings
  if (!ctx.isAdmin) {
    query = query.limit(5)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ meetings: data })
})

// POST: Create meeting cycle
export const POST = withApiHandler({
  roles: ['admin', 'staff_admin'],
  audit: { action: 'create', entityType: 'meeting_cycle' },
}, async (ctx) => {
  const fieldError = requireFields(ctx.body, 'cycle_id', 'meeting_date')
  if (fieldError) {
    return NextResponse.json({ error: fieldError }, { status: 400 })
  }

  const { cycle_id, meeting_date } = ctx.body!

  if (!isValidCycleId(cycle_id as string)) {
    return NextResponse.json({ error: '週期 ID 格式無效（應為 YYYY-MM）' }, { status: 400 })
  }

  const { data, error } = await ctx.supabase
    .from('pip_meetings')
    .insert({
      id: cycle_id as string,
      meeting_date: meeting_date as string,
      status: 'setup',
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: '此天使例會週期已存在' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
})

// PATCH: Transition meeting cycle status
export const PATCH = withApiHandler({
  roles: ['admin', 'staff_admin'],
  audit: { action: 'transition', entityType: 'meeting_cycle' },
}, async (ctx) => {
  const fieldError = requireFields(ctx.body, 'cycle_id', 'next_status')
  if (fieldError) {
    return NextResponse.json({ error: fieldError }, { status: 400 })
  }

  const { cycle_id, next_status } = ctx.body!

  // Update status
  const { data, error } = await ctx.supabase
    .from('pip_meetings')
    .update({
      status: next_status as string,
      updated_at: new Date().toISOString(),
    })
    .eq('id', cycle_id as string)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send notifications on key transitions
  if (next_status === 'cards_ready' || next_status === 'vote_open') {
    // Get all active angel members
    const { data: members } = await ctx.supabase
      .from('angel_members')
      .select('user_id')
      .eq('status', 'active')
      .not('user_id', 'is', null)

    if (members && members.length > 0) {
      const userIds = members.map(m => m.user_id).filter(Boolean) as string[]
      const notifTitle = next_status === 'cards_ready'
        ? `${cycle_id} 天使例會候選新創已上架`
        : `${cycle_id} 天使例會投票已開放`
      const notifLink = next_status === 'cards_ready'
        ? '/angel/portal/cards'
        : '/angel/portal/vote'

      sendBulkNotifications(userIds, {
        title: notifTitle,
        type: 'action',
        link: notifLink,
      }).catch(err => console.error('Notification error:', err))
    }
  }

  return NextResponse.json(data)
})
