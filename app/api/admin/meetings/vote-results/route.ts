// @ts-nocheck
/**
 * GET /api/admin/meetings/vote-results?meeting_id=2026-04
 *
 * F-014: Admin vote result analytics.
 * Returns per-startup vote breakdown, capital commitment estimates,
 * and per-member voting patterns.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const AMOUNT_MIDPOINTS: Record<string, number> = {
  'under_500k': 300_000,   // 30萬（估中位）
  '500k_1m': 750_000,      // 75萬
  '1m_2m': 1_500_000,      // 150萬
  'over_2m': 3_000_000,    // 300萬（保守估）
}

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

    // 1. Get all votes for this meeting
    const { data: votes, error: voteErr } = await supabase
      .from('angel_votes')
      .select('id, angel_member_id, startup_id, decision, intended_amount_range, attended_meeting, reason, updated_at')
      .eq('meeting_cycle', meetingId)

    if (voteErr) return NextResponse.json({ error: voteErr.message }, { status: 500 })

    // 2. Get pitches
    const { data: pitches } = await supabase
      .from('pip_meeting_pitches')
      .select('startup_id, pitch_order, decision as pitch_decision')
      .eq('meeting_id', meetingId)
      .order('pitch_order')

    const startupIds = (pitches || []).map(p => p.startup_id)

    // 3. Get startup info
    let startupMap: Record<string, { name_zh: string; name_en: string | null; sector: string | null; gate1_score: number | null }> = {}
    if (startupIds.length > 0) {
      const { data: startups } = await supabase
        .from('startups')
        .select('id, name_zh, name_en, sector, gate1_score')
        .in('id', startupIds)
      startupMap = Object.fromEntries(
        (startups || []).map(s => [s.id, s])
      )
    }

    // 4. Get member info
    const memberIds = [...new Set((votes || []).map(v => v.angel_member_id))]
    let memberMap: Record<string, { display_name: string }> = {}
    if (memberIds.length > 0) {
      const { data: members } = await supabase
        .from('angel_members')
        .select('id, display_name')
        .in('id', memberIds)
      memberMap = Object.fromEntries(
        (members || []).map(m => [m.id, { display_name: m.display_name || '未命名' }])
      )
    }

    // 5. Total active members
    const { data: activeMembers } = await supabase
      .from('module_roles')
      .select('user_id')
      .eq('role', 'angel_member')
      .eq('is_active', true)
    const totalMembers = (activeMembers || []).length

    // 6. Per-startup vote breakdown
    const startupResults = startupIds.map(sid => {
      const startupVotes = (votes || []).filter(v => v.startup_id === sid)
      const investVotes = startupVotes.filter(v => v.decision === 'invest')
      const passVotes = startupVotes.filter(v => v.decision === 'pass')
      const deferVotes = startupVotes.filter(v => v.decision === 'defer')

      // Capital commitment estimate
      let minCapital = 0
      let maxCapital = 0
      let estimatedCapital = 0
      for (const v of investVotes) {
        const mid = AMOUNT_MIDPOINTS[v.intended_amount_range] || 500_000
        estimatedCapital += mid
        if (v.intended_amount_range === 'under_500k') { minCapital += 100_000; maxCapital += 500_000 }
        else if (v.intended_amount_range === '500k_1m') { minCapital += 500_000; maxCapital += 1_000_000 }
        else if (v.intended_amount_range === '1m_2m') { minCapital += 1_000_000; maxCapital += 2_000_000 }
        else if (v.intended_amount_range === 'over_2m') { minCapital += 2_000_000; maxCapital += 5_000_000 }
        else { minCapital += 500_000; maxCapital += 1_000_000 }
      }

      const pitchInfo = (pitches || []).find(p => p.startup_id === sid)

      return {
        startup_id: sid,
        startup: startupMap[sid] || { name_zh: '未知', name_en: null, sector: null, gate1_score: null },
        pitch_order: pitchInfo?.pitch_order || 0,
        pitch_decision: pitchInfo?.pitch_decision || null,
        votes: {
          invest: investVotes.length,
          pass: passVotes.length,
          defer: deferVotes.length,
          total: startupVotes.length,
        },
        invest_rate: startupVotes.length > 0
          ? Math.round((investVotes.length / startupVotes.length) * 100)
          : 0,
        capital_estimate: {
          min: minCapital,
          max: maxCapital,
          mid: estimatedCapital,
        },
        investors: investVotes.map(v => ({
          member_id: v.angel_member_id,
          display_name: memberMap[v.angel_member_id]?.display_name || '未命名',
          amount_range: v.intended_amount_range,
          reason: v.reason,
        })),
        // Amount distribution
        amount_distribution: Object.entries(
          investVotes.reduce<Record<string, number>>((acc, v) => {
            const key = v.intended_amount_range || 'unspecified'
            acc[key] = (acc[key] || 0) + 1
            return acc
          }, {})
        ).map(([range, count]) => ({ range, count })),
      }
    })

    // Sort by invest rate desc
    startupResults.sort((a, b) => b.invest_rate - a.invest_rate)

    // 7. Global summary
    const allInvest = (votes || []).filter(v => v.decision === 'invest').length
    const allPass = (votes || []).filter(v => v.decision === 'pass').length
    const allDefer = (votes || []).filter(v => v.decision === 'defer').length
    const totalCapitalMid = startupResults.reduce((sum, s) => sum + s.capital_estimate.mid, 0)

    return NextResponse.json({
      meeting_id: meetingId,
      summary: {
        total_pitches: startupIds.length,
        total_members: totalMembers,
        voting_members: memberIds.length,
        total_votes: (votes || []).length,
        voting_rate: totalMembers > 0 ? Math.round((memberIds.length / totalMembers) * 100) : 0,
        invest_total: allInvest,
        pass_total: allPass,
        defer_total: allDefer,
        estimated_capital_mid: totalCapitalMid,
      },
      startups: startupResults,
    })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
