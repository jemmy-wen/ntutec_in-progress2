/**
 * GET /api/notifications/inbox?limit=20
 *   → Fetch user's notifications (most recent first)
 *
 * PATCH /api/notifications/inbox
 *   → Mark notifications as read (by IDs or all)
 */

import { NextResponse } from 'next/server'
import { withApiHandler } from '@/lib/api/handler'

// GET: Fetch notifications
export const GET = withApiHandler({
  roles: [],  // Any authenticated user
}, async (ctx) => {
  const limit = parseInt(ctx.searchParams.get('limit') || '20')

  const { data, error } = await ctx.supabase
    .from('in_app_notifications')
    .select('*')
    .eq('user_id', ctx.auth.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const notifications = data || []
  const unreadCount = notifications.filter(n => !n.is_read).length

  return NextResponse.json({ notifications, unreadCount })
})

// PATCH: Mark as read
export const PATCH = withApiHandler({
  roles: [],
}, async (ctx) => {
  if (!ctx.body) {
    return NextResponse.json({ error: '請求內容為空' }, { status: 400 })
  }

  const { ids, all } = ctx.body

  if (all) {
    const { error } = await ctx.supabase
      .from('in_app_notifications')
      .update({ is_read: true })
      .eq('user_id', ctx.auth.id)
      .eq('is_read', false)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else if (Array.isArray(ids) && ids.length > 0) {
    const { error } = await ctx.supabase
      .from('in_app_notifications')
      .update({ is_read: true })
      .eq('user_id', ctx.auth.id)
      .in('id', ids as string[])

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
})
