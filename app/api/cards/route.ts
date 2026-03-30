// @ts-nocheck
/**
 * GET /api/cards?cycle_id=2026-04
 *   → List candidate startups with 6-card data for angel member browsing
 *
 * POST /api/cards
 *   → Submit/update card response (interested / thinking / not_for_me)
 */

import { NextResponse } from 'next/server'
import { withApiHandler, requireFields } from '@/lib/api/handler'
import { notifyMeetingLifecycle } from '@/lib/notifications/service'

// GET: Fetch candidate startups with card data for a meeting cycle
export const GET = withApiHandler({
  roles: ['angel_member', 'admin', 'staff_admin'],
  cycleIdForNonAdmin: true,
}, async (ctx) => {
  const cycleId = ctx.searchParams.get('cycle_id')

  // Fetch startups that are candidates for this meeting cycle (pipeline_stage >= 3)
  const { data: pitches, error } = await ctx.supabase
    .from('pip_meeting_pitches')
    .select(`
      id,
      pitch_order,
      startup:pip_startups(
        id, name_zh, name_en, sector, one_liner,
        tax_id, pipeline_stage, gate0_score, gate1_score
      )
    `)
    .eq('meeting_id', cycleId || '')
    .order('pitch_order')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If angel_member, also fetch their existing responses
  let myResponses: Record<string, string> = {}
  if (ctx.roles.includes('angel_member')) {
    const { data: memberData } = await ctx.supabase
      .from('angel_members')
      .select('id')
      .eq('user_id', ctx.auth.id)
      .maybeSingle()

    if (memberData) {
      const { data: responses } = await ctx.supabase
        .from('angel_card_responses')
        .select('startup_id, response')
        .eq('angel_member_id', memberData.id)
        .eq('meeting_cycle', cycleId || '')

      if (responses) {
        myResponses = Object.fromEntries(
          responses.map(r => [r.startup_id, r.response])
        )
      }
    }
  }

  return NextResponse.json({
    pitches: pitches || [],
    myResponses,
  })
})

// POST: Submit or update card response
export const POST = withApiHandler({
  roles: ['angel_member'],
  audit: { action: 'submit_response', entityType: 'card_response' },
}, async (ctx) => {
  const fieldError = requireFields(ctx.body, 'startup_id', 'meeting_cycle', 'response')
  if (fieldError) {
    return NextResponse.json({ error: fieldError }, { status: 400 })
  }

  const { startup_id, meeting_cycle, response, interest_reason, cards_viewed, time_spent_seconds } = ctx.body!

  // Validate response value
  if (!['interested', 'thinking', 'not_for_me'].includes(response as string)) {
    return NextResponse.json({ error: 'response 必須為 interested, thinking, 或 not_for_me' }, { status: 400 })
  }

  // Get angel member id
  const { data: member } = await ctx.supabase
    .from('angel_members')
    .select('id')
    .eq('user_id', ctx.auth.id)
    .maybeSingle()

  if (!member) {
    return NextResponse.json({ error: '找不到天使會員資料' }, { status: 404 })
  }

  // Upsert response (unique: angel_member_id + startup_id + meeting_cycle)
  const { data, error } = await ctx.supabase
    .from('angel_card_responses')
    .upsert({
      angel_member_id: member.id,
      startup_id: startup_id as string,
      meeting_cycle: meeting_cycle as string,
      response: response as string,
      interest_reason: (interest_reason as string) || null,
      cards_viewed: (cards_viewed as number) || 0,
      time_spent_seconds: (time_spent_seconds as number) || null,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'angel_member_id,startup_id,meeting_cycle',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // F-008: Notify admins of card response (fire-and-forget)
  const startupName = (startup_id as string).slice(0, 8) // Will be enriched by service
  // Fetch startup name for notification
  const { data: startupData } = await ctx.supabase
    .from('startups')
    .select('name_zh')
    .eq('id', startup_id as string)
    .maybeSingle()

  // Fetch member display name
  const { data: memberProfile } = await ctx.supabase
    .from('angel_members')
    .select('display_name')
    .eq('id', member.id)
    .maybeSingle()

  notifyMeetingLifecycle('card_response', meeting_cycle as string, {
    memberName: memberProfile?.display_name || ctx.auth.email || '會員',
    startupName: startupData?.name_zh || startupName,
    response: response as string,
  }).catch(err => console.error('[F-008] Card response notification failed:', err))

  return NextResponse.json(data, { status: 200 })
})
