// @ts-nocheck
/**
 * GET /api/votes?cycle_id=2026-04
 *   → Angel member: get own votes. Admin: get vote summary.
 *
 * POST /api/votes
 *   → Submit/update vote (invest / pass / defer)
 */

import { NextResponse } from 'next/server'
import { withApiHandler, requireFields } from '@/lib/api/handler'

// GET: Fetch votes for a meeting cycle
export const GET = withApiHandler({
  roles: ['angel_member', 'admin', 'staff_admin'],
}, async (ctx) => {
  const cycleId = ctx.searchParams.get('cycle_id')
  if (!cycleId) {
    return NextResponse.json({ error: 'cycle_id is required' }, { status: 400 })
  }

  if (ctx.isAdmin) {
    // Admin: read from vote summary view
    const { data, error } = await ctx.supabase
      .from('v_vote_summary')
      .select('*')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ votes: data })
  }

  // Angel member: own votes only (RLS enforced)
  const { data: member } = await ctx.supabase
    .from('angel_members')
    .select('id')
    .eq('user_id', ctx.auth.id)
    .maybeSingle()

  if (!member) {
    return NextResponse.json({ error: '找不到天使會員資料' }, { status: 404 })
  }

  const { data, error } = await ctx.supabase
    .from('angel_votes')
    .select('*, startup:pip_startups(id, name_zh, sector)')
    .eq('angel_member_id', member.id)
    .eq('meeting_cycle', cycleId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ votes: data })
})

// POST: Submit or update vote
export const POST = withApiHandler({
  roles: ['angel_member'],
  rateLimit: 'voting',
  audit: { action: 'submit_vote', entityType: 'vote' },
}, async (ctx) => {
  const fieldError = requireFields(ctx.body, 'startup_id', 'meeting_cycle', 'decision')
  if (fieldError) {
    return NextResponse.json({ error: fieldError }, { status: 400 })
  }

  const { startup_id, meeting_cycle, decision, intended_amount_range, attended_meeting, reason } = ctx.body!

  if (!['invest', 'pass', 'defer'].includes(decision as string)) {
    return NextResponse.json({ error: 'decision 必須為 invest, pass, 或 defer' }, { status: 400 })
  }

  const { data: member } = await ctx.supabase
    .from('angel_members')
    .select('id')
    .eq('user_id', ctx.auth.id)
    .maybeSingle()

  if (!member) {
    return NextResponse.json({ error: '找不到天使會員資料' }, { status: 404 })
  }

  const { data, error } = await ctx.supabase
    .from('angel_votes')
    .upsert({
      angel_member_id: member.id,
      startup_id: startup_id as string,
      meeting_cycle: meeting_cycle as string,
      decision: decision as string,
      intended_amount_range: (intended_amount_range as string) || null,
      attended_meeting: (attended_meeting as boolean) ?? false,
      reason: (reason as string) || null,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'angel_member_id,startup_id,meeting_cycle',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 200 })
})
