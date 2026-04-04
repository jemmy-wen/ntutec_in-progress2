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
      ogsmRes,
      ceoQueueRes,
      projectsRes,
    ] = await Promise.all([
      supabase.from('pip_startups').select('id, name_zh, sector, pipeline_stage, current_gate, current_gate_result, tier, status, updated_at, observation_pool'),
      supabase.from('pip_meetings').select('*').order('id', { ascending: false }).limit(5),
      supabase.from('angel_members').select('id, status'),
      supabase.from('v_angel_engagement').select('engagement_level'),
      supabase.from('sys_ogsm_measures').select('*').order('id'),
      supabase.from('sys_ceo_decisions').select('*').eq('status', 'pending').order('deadline'),
      supabase.from('sys_projects').select('*').in('status', ['active', 'paused', 'frozen', 'completed']).order('code'),
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
      if (s.current_gate === 'gate2' || s.current_gate === 'screening') return 'gate2'
      if (s.current_gate === 'pitch' || s.current_gate === 'monthly_pitch') return 'pitch_ready'
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

    // Gate 1 advance → ready for pitch scheduling
    // Note: pip_startups.status = startups.status (stays 'active' after gate1 eval)
    // Must use current_gate_result (= 'pass'/'fail') written by gate1_auto.py
    const gate1Advance = startups.filter(s => s.current_gate === 'gate1' && s.current_gate_result === 'pass')
    if (gate1Advance.length > 0) {
      pendingActions.push({
        type: 'gate1_advance',
        label: 'Gate 1 通過待排天使例會',
        count: gate1Advance.length,
        href: '/admin/pipeline',
      })
    }

    // Observation pool reactivation candidates (>6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const reactivationCandidates = startups.filter(s => {
      if (!s.observation_pool) return false
      const entered = s.updated_at ? new Date(s.updated_at) : null
      return entered && entered < sixMonthsAgo
    })
    if (reactivationCandidates.length > 0) {
      pendingActions.push({
        type: 'observation_reactivate',
        label: '觀察池可重啟',
        count: reactivationCandidates.length,
        href: '/admin/pipeline',
      })
    }

    // --- Active meeting + countdown ---
    const now = new Date()
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
        label: '天使例會待啟動',
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

    // --- Funnel conversion rates (stage-based, for dashboard display) ---
    // Note: These are pipeline_stage-based rates for the funnel visualization.
    // OGSM M1 uses a different definition: pitch_count / gate0_pass (computed by dashboard_sync.py)
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
        active: members.filter((m: { status: string }) => m.status === 'active').length,
        engagement: engagementSummary,
      },
      recentActivity,
      ogsm: ogsmRes.data || [],
      ceoQueue: ceoQueueRes.data || [],
      projects: projectsRes.data || [],
    })
  } catch (err) {
    console.error('Dashboard stats error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
