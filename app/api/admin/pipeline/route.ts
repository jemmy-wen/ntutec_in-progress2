// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/admin/pipeline — Fetch startup pipeline for admin view
 *
 * Returns startups from pip_startups with pipeline stage info.
 * Requires admin or staff_admin role.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin role (module_roles table OR app_metadata)
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

    // Fetch active pipeline startups from startups table
    const { data: startups, error } = await supabase
      .from('startups')
      .select('id, name_zh, name_en, sector, pipeline_stage, current_gate, final_tier, track, status, updated_at, notes, tax_id, observation_pool, observation_reason')
      .eq('status', 'active')
      .not('pipeline_stage', 'is', null)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Pipeline fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch pipeline' }, { status: 500 })
    }

    // Fetch latest Gate 1 scores for all startups in one query
    const startupIds = (startups || []).map(s => s.id)
    let scoreMap: Record<string, number | null> = {}
    if (startupIds.length > 0) {
      const { data: gateScores } = await supabase
        .from('gates')
        .select('startup_id, sosv_total, gate_type')
        .in('startup_id', startupIds)
        .eq('gate_type', 'gate1')
        .order('created_at', { ascending: false })
      if (gateScores) {
        const seen = new Set<string>()
        for (const g of gateScores) {
          if (!seen.has(g.startup_id)) {
            scoreMap[g.startup_id] = g.sosv_total != null ? Number(g.sosv_total) : null
            seen.add(g.startup_id)
          }
        }
      }
    }

    // Map pipeline_stage text + current_gate to frontend stage names
    function mapStage(s: { pipeline_stage: string | null; current_gate: string | null }): string {
      const cg = s.current_gate?.toLowerCase() || ''
      if (cg === 'invested') return 'invested'
      if (cg === 'rejected') return 'passed'
      if (cg === 'gate0') return 'gate0'
      if (cg === 'gate1') return 'gate1'
      if (cg === 'gate2' || cg === 'screening') return 'gate2'
      if (cg === 'monthly_pitch') return 'pitch_ready'
      // Fallback to pipeline_stage text
      const ps = s.pipeline_stage || ''
      if (ps.startsWith('9_')) return 'passed'
      if (ps.startsWith('5_') || ps.includes('投資')) return 'invested'
      if (ps.startsWith('3') || ps.startsWith('4_')) return 'pitch_ready'
      if (ps.startsWith('2')) return 'gate2'
      if (ps.startsWith('1_')) return 'gate1'
      if (ps.startsWith('0_')) return 'gate0'
      return 'observation'
    }

    // Map to frontend format
    const mapped = (startups || []).map(s => ({
      id: s.id,
      name: s.name_zh || '',
      name_en: s.name_en || '',
      sector: s.sector || '',
      stage: mapStage(s),
      tier: s.final_tier || 'C',
      updated_at: s.updated_at,
      note: s.notes,
      tax_id: s.tax_id || null,
      gate0_score: null as number | null,   // Gate 0 flags-based, not a numeric score
      gate1_score: scoreMap[s.id] ?? null,
      observation_pool: s.observation_pool || false,
      observation_reason: s.observation_reason || null,
    }))

    return NextResponse.json({ startups: mapped })
  } catch (err) {
    console.error('Pipeline API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
