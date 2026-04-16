// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/angel/profile
 *
 * F-010: Returns authenticated angel member's full 360 profile.
 * Combines:
 *   - angel_members (base info + investment_preferences + telegram_chat_id)
 *   - angel_memberships (membership_start, membership_expiry, status,
 *       first_meeting_attended, investment_preferences_collected)
 *   - v_angel_engagement (meetings_attended_180d, engagement_level, etc.)
 */
export async function GET(_req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // 1. Base member record (try both user_id and auth_user_id for compatibility)
    const { data: member, error: memberError } = await supabase
      .from('angel_members')
      .select('id, user_id, auth_user_id, name, email, phone, organization, title, telegram_chat_id, investment_preferences, focus_sectors, preferred_stages, ticket_min_ntd, ticket_max_ntd, ticket_typical_ntd, angel_tier, joined_at, onboarding_completed, warmth, ntu_alumni, status')
      .or(`user_id.eq.${user.id},auth_user_id.eq.${user.id}`)
      .maybeSingle()

    if (memberError) {
      console.error('member fetch error:', memberError)
      return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 })
    }
    if (!member) return NextResponse.json({ error: '找不到天使會員資料' }, { status: 404 })

    // Defence-in-depth PII guard: the .or() query above should already constrain
    // to the requesting user's own row, but we re-verify ownership before
    // returning email/phone/telegram_chat_id in case of query/RLS regressions.
    if (member.user_id !== user.id && member.auth_user_id !== user.id) {
      console.error('angel profile ownership mismatch', {
        requester: user.id,
        member_id: member.id,
      })
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 2. Membership record (latest active or most recent)
    const { data: membership } = await supabase
      .from('angel_memberships')
      .select('membership_start, membership_expiry, status, first_meeting_attended, investment_preferences_collected, line_group_added, member_type, donation_amount, payment_date, welcome_email_sent_at')
      .eq('investor_id', member.id)
      .order('membership_start', { ascending: false })
      .limit(1)
      .maybeSingle()

    // 3. Engagement view
    const { data: engagement } = await supabase
      .from('v_angel_engagement')
      .select('card_responses_90d, votes_90d, meetings_attended_180d, articles_read_total, engagement_level')
      .eq('angel_member_id', member.id)
      .maybeSingle()

    return NextResponse.json({
      member: {
        // Base info
        id: member.id,
        display_name: member.name,
        email: member.email,
        phone: member.phone,
        company: member.organization,
        title: member.title,
        tier: member.angel_tier,
        ntu_alumni: member.ntu_alumni,
        joined_at: member.joined_at,
        onboarding_completed: member.onboarding_completed,
        warmth: member.warmth,

        // Investment preferences (merged from both sources)
        investment_preferences: member.investment_preferences || null,
        focus_sectors: member.focus_sectors || [],
        preferred_stages: member.preferred_stages || [],
        ticket_min_ntd: member.ticket_min_ntd,
        ticket_max_ntd: member.ticket_max_ntd,
        ticket_typical_ntd: member.ticket_typical_ntd,

        // Notification / integrations
        telegram_chat_id: member.telegram_chat_id || null,

        // Membership
        membership: membership ? {
          membership_start: membership.membership_start,
          membership_expiry: membership.membership_expiry,
          status: membership.status,
          member_type: membership.member_type,
          donation_amount: membership.donation_amount,
          first_meeting_attended: membership.first_meeting_attended,
          investment_preferences_collected: membership.investment_preferences_collected,
          line_group_added: membership.line_group_added,
          welcome_email_sent_at: membership.welcome_email_sent_at,
        } : null,

        // Engagement
        engagement: engagement ? {
          card_responses_90d: engagement.card_responses_90d || 0,
          votes_90d: engagement.votes_90d || 0,
          meetings_attended_180d: engagement.meetings_attended_180d || 0,
          articles_read_total: engagement.articles_read_total || 0,
          engagement_level: engagement.engagement_level || 'low',
        } : null,
      }
    })
  } catch (e) {
    console.error('Angel profile API error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
