// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/admin/pipeline/[id] — Full startup detail with gate evaluations + enrichment
 *
 * Returns:
 * - startup: full pip_startups record
 * - gates: array of gate evaluation records (gate0, gate1, gate2)
 * - enrichment: parsed enrichment_data JSON
 * - pitches: meeting pitch records for this startup
 *
 * Requires: admin or staff_admin role
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin role
    const { data: roles } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)

    const userRoles = (roles as { role: string }[] | null)?.map(r => r.role) || []
    const metadataRole = user.app_metadata?.platform_role
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parallel queries
    const [startupRes, gatesRes, pitchesRes] = await Promise.all([
      supabase
        .from('pip_startups')
        .select('*')
        .eq('id', id)
        .single(),
      supabase
        .from('gates')
        .select('*')
        .eq('startup_id', id)
        .order('evaluation_date', { ascending: true }),
      supabase
        .from('pip_meeting_pitches')
        .select('*, pip_meetings(id, meeting_date, status)')
        .eq('startup_id', id)
        .order('created_at', { ascending: false }),
    ])

    if (startupRes.error || !startupRes.data) {
      console.error('Pipeline detail: startup lookup failed', {
        id,
        error: startupRes.error?.message,
      })
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const startup = startupRes.data
    const gates = gatesRes.data || []
    const pitches = pitchesRes.data || []

    // Parse enrichment_data if present
    let enrichment = null
    if (startup.enrichment_data) {
      try {
        enrichment = typeof startup.enrichment_data === 'string'
          ? JSON.parse(startup.enrichment_data)
          : startup.enrichment_data
      } catch {
        enrichment = null
      }
    }

    // Compute pipeline timeline
    const timeline: { date: string; event: string; detail: string }[] = []
    if (startup.created_at) {
      timeline.push({ date: startup.created_at, event: '進入系統', detail: '新創案件建立' })
    }
    for (const g of gates) {
      const gateLabel = g.gate_type === 'gate0' ? 'Gate 0' : g.gate_type === 'gate1' ? 'Gate 1' : g.gate_type === 'gate2' ? 'Gate 2' : g.gate_type
      const resultLabel = g.result || g.screening_result || 'pending'
      timeline.push({
        date: g.evaluation_date || g.created_at,
        event: `${gateLabel} 評估`,
        detail: `結果: ${resultLabel}`,
      })
    }
    for (const p of pitches) {
      const meetingId = p.pip_meetings?.id || p.meeting_id
      timeline.push({
        date: p.created_at,
        event: '天使例會 Pitch',
        detail: `${meetingId} | 決議: ${p.decision || '待定'}`,
      })
    }
    timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return NextResponse.json({
      startup,
      gates,
      enrichment,
      pitches,
      timeline,
    })
  } catch (err) {
    console.error('Pipeline detail error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
