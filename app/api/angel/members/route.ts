// @ts-nocheck
/**
 * GET /api/angel/members
 *   → 天使會員名錄（脫敏版，不含個人電話/email）
 *   → angel_member + admin + staff_admin 可存取
 *
 * Query params:
 *   ?search=   按 organization 或 title 模糊搜尋
 *   ?active=1  僅顯示 annual_fee_status = 'active'（預設：全部）
 */

import { NextResponse } from 'next/server'
import { withApiHandler } from '@/lib/api/handler'

export const GET = withApiHandler({
  roles: ['angel_member', 'admin', 'staff_admin'],
}, async (ctx) => {
  const { searchParams } = new URL(ctx.request.url)
  const search = searchParams.get('search')?.trim() ?? ''
  const activeOnly = searchParams.get('active') === '1'

  let query = ctx.supabase
    .from('angel_members')
    .select(
      'id, name, organization, title, angel_tier, focus_sectors, membership_year, annual_fee_status, joined_at'
    )
    .order('organization', { nullsFirst: false })
    .order('name')

  if (activeOnly) {
    query = query.eq('annual_fee_status', 'active')
  }

  if (search) {
    query = query.or(
      `organization.ilike.%${search}%,name.ilike.%${search}%,title.ilike.%${search}%`
    )
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Desensitize: strip any accidental sensitive fields, keep only safe fields
  const members = (data ?? []).map((m) => ({
    id: m.id,
    name: m.name,
    organization: m.organization,
    title: m.title,
    angel_tier: m.angel_tier,
    focus_sectors: m.focus_sectors,
    membership_year: m.membership_year,
    annual_fee_status: m.annual_fee_status,
    joined_year: m.joined_at ? new Date(m.joined_at).getFullYear() : null,
  }))

  return NextResponse.json({ members, total: members.length })
})
