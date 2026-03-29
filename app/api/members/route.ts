// @ts-nocheck
/**
 * GET /api/members
 *   → Admin: list all angel members. Member: own profile.
 *
 * PATCH /api/members
 *   → Member: update own profile/preferences
 */

import { NextResponse } from 'next/server'
import { withApiHandler, filterFields } from '@/lib/api/handler'

const MEMBER_UPDATABLE_FIELDS = new Set([
  'display_name', 'phone', 'company', 'title', 'investment_preferences',
])

// GET: List members or get own profile
export const GET = withApiHandler({
  roles: ['angel_member', 'admin', 'staff_admin'],
}, async (ctx) => {
  if (ctx.isAdmin) {
    const { data, error } = await ctx.supabase
      .from('angel_members')
      .select('*')
      .order('display_name')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ members: data })
  }

  // Angel member: own profile only (RLS enforced)
  const { data, error } = await ctx.supabase
    .from('angel_members')
    .select('*')
    .eq('user_id', ctx.auth.id)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: '找不到天使會員資料' }, { status: 404 })
  return NextResponse.json({ member: data })
})

// PATCH: Update own profile
export const PATCH = withApiHandler({
  roles: ['angel_member'],
  audit: { action: 'update', entityType: 'member' },
}, async (ctx) => {
  if (!ctx.body) {
    return NextResponse.json({ error: '請求內容為空' }, { status: 400 })
  }

  const filtered = filterFields(ctx.body, MEMBER_UPDATABLE_FIELDS)
  if (Object.keys(filtered).length === 0) {
    return NextResponse.json({ error: '沒有可更新的欄位' }, { status: 400 })
  }

  const { data, error } = await ctx.supabase
    .from('angel_members')
    .update({ ...filtered, updated_at: new Date().toISOString() })
    .eq('user_id', ctx.auth.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
})
