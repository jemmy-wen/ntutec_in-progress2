// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/admin/dashboard-stats — Aggregated dashboard data
 *
 * Returns: pipeline counts, pending actions, meeting info, member engagement
 * Requires: admin or staff_admin role
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: roles } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)

    const userRoles = (roles || []).map((r: { role: string }) => r.role)
    const metadataRole = user.app_metadata?.platform_role
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // --- Parallel queries ---
    const [
      pipelineRes,
      meetingsRes,
      membersRes,
      engagementRes,
    ] = await Promise.all([
      supabase.from('pip_startups').select('id, name_zh, sector, pipeline_stage, current_gate, tier, status, updated_at, bp_requested_at, bp_received_at, observation_pool'),
      supabase.from('pip_meetings').select('*').order('id', { ascending: false }).limit(5),
      supabase.from('angel_members').select('id, status').eq('status', 'active'),
      supabase.from('v_angel_engagement').select('engagement_level'),
    ])

    const startups = pipelineRes.data || []
    const meetings = meetingsRes.data || []
    const members = membersRes.data || []
    const engagementRows = engagementRes.data || []

    // --- Pipeline stage counts ---
    function getStage(s: { pipeline_stage: number | null; current_gate: string | null; status: string | null; observation_pool: boolean | null }): string {
      if (s.status === 'invested') return 'invested'
      if (s.status === 'pass' || s.status === 'fail') return 'passed'
      if (s.observation_pool) return 'observation'
      if (s.current_gate === 'gate0') return 'gate0'
      if (s.current_gate === 'gate1') return 'gate1'
      if (s.current_gate === 'gate2') return 'gate2'
      if (s.current_gate === 'pitch') return 'pitch_ready'
      return 'radar'
    }

    const stageCounts: Record<string, number> = {
      radar: 0, observation: 0, gate0: 0, gate1: 0, gate2: 0, pitch_ready: 0, invested: 0, passed: 0,
    }
    for (const s of startups) {
      const stage = getStage(s)
      stageCounts[stage] = (stageCounts[stage] || 0) + 1
    }

    // --- Pending actions ---
    const pendingActions: { type: string; label: string; count: number; href: string }[] = []

    // Gate 0 pending evaluation
    const gate0Pending = startups.filter(s => s.current_gate === 'gate0' && s.status !== 'pass' && s.status !== 'fail' && s.status !== 'invested')
    if (gate0Pending.length > 0) {
      pendingActions.push({
        type: 'gate0',
        label: 'Gate 0 待評估',
        count: gate0Pending.length,
        href: '/admin/pipeline',
      })
    }

    // BP requested but not received (>7 days)
    const now = new Date()
    const bpOverdue = startups.filter(s => {
      if (!s.bp_requested_at || s.bp_received_at) return false
      const requested = new Date(s.bp_requested_at)
      return (now.getTime() - requested.getTime()) > 7 * 24 * 60 * 60 * 1000
    })
    if (bpOverdue.length > 0) {
      pendingActions.push({
        type: 'bp_overdue',
        label: 'BP 逾期未回覆',
        count: bpOverdue.length,
        href: '/admin/pipeline',
      })
    }

    // --- Active meeting + countdown ---
    const activeMeeting = meetings.find(m => m.status !== 'closed' && !m.is_archived)
    let meetingCountdown: number | null = null
    if (activeMeeting?.meeting_date) {
      const meetingDate = new Date(activeMeeting.meeting_date)
      meetingCountdown = Math.ceil((meetingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    }

    // Meeting needing attention
    if (activeMeeting && activeMeeting.status === 'setup') {
      pendingActions.push({
        type: 'meeting_setup',
        label: '月會待啟動',
        count: 1,
        href: '/admin/meetings',
      })
    }

    // --- Engagement summary ---
    const engagementSummary = { active: 0, moderate: 0, low: 0 }
    for (const row of engagementRows) {
      if (row.engagement_level === 'active') engagementSummary.active++
      else if (row.engagement_level === 'moderate') engagementSummary.moderate++
      else engagementSummary.low++
    }

    // --- Recent pipeline activity (last 10 updated) ---
    const recentActivity = startups
      .filter(s => s.updated_at)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 8)
      .map(s => ({
        id: s.id,
        name: s.name_zh || '',
        sector: s.sector || '',
        stage: getStage(s),
        tier: s.tier || 'C',
        updated_at: s.updated_at,
      }))

    // --- Funnel conversion rates ---
    const total = startups.length
    const funnelGate0Plus = stageCounts.gate0 + stageCounts.gate1 + stageCounts.gate2 + stageCounts.pitch_ready + stageCounts.invested
    const funnelGate1Plus = stageCounts.gate1 + stageCounts.gate2 + stageCounts.pitch_ready + stageCounts.invested
    const funnelPitchPlus = stageCounts.pitch_ready + stageCounts.invested

    const conversionRates = {
      radarToGate0: total > 0 ? ((funnelGate0Plus / total) * 100).toFixed(1) : '0',
      gate0ToGate1: funnelGate0Plus > 0 ? ((funnelGate1Plus / funnelGate0Plus) * 100).toFixed(1) : '0',
      gate1ToPitch: funnelGate1Plus > 0 ? ((funnelPitchPlus / funnelGate1Plus) * 100).toFixed(1) : '0',
    }

    return NextResponse.json({
      pipeline: {
        stageCounts,
        total,
        conversionRates,
      },
      pendingActions,
      meeting: activeMeeting ? {
        id: activeMeeting.id,
        status: activeMeeting.status,
        meeting_date: activeMeeting.meeting_date,
        countdown: meetingCountdown,
      } : null,
      members: {
        total: members.length,
        engagement: engagementSummary,
      },
      recentActivity,
    })
  } catch (err) {
    console.error('Dashboard stats error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
