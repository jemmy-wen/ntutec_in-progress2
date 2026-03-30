// @ts-nocheck
/**
 * GET /api/admin/meetings/responses?meeting_id=2026-04
 *
 * F-004: Card response analytics for admin.
 * Returns per-startup response summary + per-member completion status.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url)
    const meetingId = searchParams.get('meeting_id')

    if (!meetingId) {
      return NextResponse.json({ error: 'meeting_id required' }, { status: 400 })
    }

    // 1. Get all responses for this meeting
    const { data: responses, error: respErr } = await supabase
      .from('angel_card_responses')
      .select('id, angel_member_id, startup_id, response, interest_reason, time_spent_seconds, updated_at')
      .eq('meeting_cycle', meetingId)

    if (respErr) {
      return NextResponse.json({ error: respErr.message }, { status: 500 })
    }

    // 2. Get pitches for this meeting (to know the startup list)
    const { data: pitches } = await supabase
      .from('pip_meeting_pitches')
      .select('startup_id, pitch_order')
      .eq('meeting_id', meetingId)
      .order('pitch_order')

    const startupIds = (pitches || []).map(p => p.startup_id)

    // 3. Get startup names
    let startupMap: Record<string, { name_zh: string; name_en: string | null; sector: string | null }> = {}
    if (startupIds.length > 0) {
      const { data: startups } = await supabase
        .from('startups')
        .select('id, name_zh, name_en, sector')
        .in('id', startupIds)
      startupMap = Object.fromEntries(
        (startups || []).map(s => [s.id, { name_zh: s.name_zh, name_en: s.name_en, sector: s.sector }])
      )
    }

    // 4. Get angel member info
    const memberIds = [...new Set((responses || []).map(r => r.angel_member_id))]
    let memberMap: Record<string, { display_name: string; user_id: string }> = {}
    if (memberIds.length > 0) {
      const { data: members } = await supabase
        .from('angel_members')
        .select('id, display_name, user_id')
        .in('id', memberIds)
      memberMap = Object.fromEntries(
        (members || []).map(m => [m.id, { display_name: m.display_name || '未命名', user_id: m.user_id }])
      )
    }

    // 5. Get total active angel members (for completion rate)
    const { data: activeMembers } = await supabase
      .from('module_roles')
      .select('user_id')
      .eq('role', 'angel_member')
      .eq('is_active', true)
    const totalMembers = (activeMembers || []).length

    // 6. Build per-startup summary
    const startupSummary = startupIds.map(sid => {
      const startupResponses = (responses || []).filter(r => r.startup_id === sid)
      const interested = startupResponses.filter(r => r.response === 'interested')
      const thinking = startupResponses.filter(r => r.response === 'thinking')
      const notForMe = startupResponses.filter(r => r.response === 'not_for_me')

      return {
        startup_id: sid,
        startup: startupMap[sid] || { name_zh: '未知', name_en: null, sector: null },
        interested_count: interested.length,
        thinking_count: thinking.length,
        not_for_me_count: notForMe.length,
        total_responses: startupResponses.length,
        interest_rate: startupResponses.length > 0
          ? Math.round((interested.length / startupResponses.length) * 100)
          : 0,
        interested_members: interested.map(r => ({
          member_id: r.angel_member_id,
          display_name: memberMap[r.angel_member_id]?.display_name || '未命名',
          reason: r.interest_reason,
        })),
      }
    })

    // 7. Build per-member completion
    const respondedMemberIds = new Set((responses || []).map(r => r.angel_member_id))
    const memberCompletion = memberIds.map(mid => {
      const memberResponses = (responses || []).filter(r => r.angel_member_id === mid)
      return {
        member_id: mid,
        display_name: memberMap[mid]?.display_name || '未命名',
        responded: memberResponses.length,
        total: startupIds.length,
        completion_rate: startupIds.length > 0
          ? Math.round((memberResponses.length / startupIds.length) * 100)
          : 0,
        responses: memberResponses.map(r => ({
          startup_id: r.startup_id,
          startup_name: startupMap[r.startup_id]?.name_zh || '未知',
          response: r.response,
          reason: r.interest_reason,
        })),
      }
    })

    return NextResponse.json({
      meeting_id: meetingId,
      summary: {
        total_pitches: startupIds.length,
        total_members: totalMembers,
        responding_members: respondedMemberIds.size,
        total_responses: (responses || []).length,
        completion_rate: totalMembers > 0
          ? Math.round((respondedMemberIds.size / totalMembers) * 100)
          : 0,
      },
      startups: startupSummary,
      members: memberCompletion.sort((a, b) => b.completion_rate - a.completion_rate),
    })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
