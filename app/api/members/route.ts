// @ts-nocheck
/**
 * GET /api/members
 *   → Admin: list all angel members from angel_memberships (SOT).
 *     Member: own profile.
 *
 * PATCH /api/members
 *   → Member: update own profile/preferences
 */

import { NextResponse } from 'next/server'
import { withApiHandler, filterFields } from '@/lib/api/handler'
import { createAdminClient } from '@/lib/supabase/admin'

const MEMBER_UPDATABLE_FIELDS = new Set([
  'display_name', 'phone', 'company', 'title', 'investment_preferences',
  'onboarding_completed',
])

// GET: List members or get own profile
export const GET = withApiHandler({
  roles: ['angel_member', 'admin', 'staff_admin'],
}, async (ctx) => {
  if (ctx.isAdmin) {
    // Admin: use service role client to bypass RLS
    // angel_memberships is SOT — JOIN investors for personal info
    // Group by membership status (active/expired/pending), NOT engagement level
    const statusFilter = ctx.searchParams.get('status') // optional filter
    const adminSb = createAdminClient()

    let query = adminSb
      .from('angel_memberships')
      .select(`
        id,
        investor_id,
        member_type,
        company_name,
        donation_amount,
        membership_start,
        membership_expiry,
        status,
        payment_date,
        payment_confirmed_by,
        referrer,
        notes,
        created_at,
        investors (
          id,
          name,
          email,
          organization,
          title,
          phone,
          telegram_chat_id,
          annual_fee_status,
          membership_id,
          ntu_alumni,
          status,
          company_tax_id,
          company_paid_in_capital
        )
      `)
      .order('status')
      .order('membership_expiry', { ascending: false })

    if (statusFilter) {
      query = query.eq('status', statusFilter)
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Flatten for UI consumption
    const members = (data || []).map(m => ({
      membership_id: m.id,
      investor_id: m.investor_id,
      member_type: m.member_type,
      company_name: m.company_name,
      donation_amount: m.donation_amount,
      membership_start: m.membership_start,
      membership_expiry: m.membership_expiry,
      membership_status: m.status,
      payment_date: m.payment_date,
      payment_confirmed_by: m.payment_confirmed_by,
      referrer: m.referrer,
      notes: m.notes,
      // From investors
      display_name: m.investors?.name ?? null,
      email: m.investors?.email ?? null,
      organization: m.investors?.organization ?? null,
      title: m.investors?.title ?? null,
      phone: m.investors?.phone ?? null,
      telegram_chat_id: m.investors?.telegram_chat_id ?? null,
      annual_fee_status: m.investors?.annual_fee_status ?? null,
      member_code: m.investors?.membership_id ?? null,
      ntu_alumni: m.investors?.ntu_alumni ?? false,
      company_tax_id: m.investors?.company_tax_id ?? null,
      company_paid_in_capital: m.investors?.company_paid_in_capital ?? null,
    }))

    // Summary counts
    const summary = {
      total: members.length,
      active: members.filter(m => m.membership_status === 'active').length,
      expired: members.filter(m => m.membership_status === 'expired').length,
      pending: members.filter(m => m.membership_status === 'pending').length,
    }

    return NextResponse.json({ members, summary })
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
