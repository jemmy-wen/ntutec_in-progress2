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

    // Fetch pipeline startups (pip_startups is a view with name_zh, pipeline_stage as int)
    const { data: startups, error } = await supabase
      .from('pip_startups')
      .select('id, name_zh, name_en, sector, pipeline_stage, current_gate, tier, track, status, updated_at, notes, tax_id, gate0_score, gate1_score, observation_pool, observation_reason')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Pipeline fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch pipeline' }, { status: 500 })
    }

    // Map pipeline_stage (int) + current_gate to frontend stage names
    const GATE_MAP: Record<string, string> = {
      gate0: 'gate0',
      gate1: 'gate1',
      gate2: 'gate2',
      screening: 'gate2',
      pitch: 'pitch_ready',
      monthly_pitch: 'pitch_ready',
      invested: 'invested',
      pass: 'passed',
    }

    function mapStage(s: { pipeline_stage: number | null; current_gate: string | null; status: string | null }): string {
      if (s.status === 'invested') return 'invested'
      if (s.status === 'pass' || s.status === 'fail') return 'passed'
      if (s.current_gate && GATE_MAP[s.current_gate]) return GATE_MAP[s.current_gate]
      return 'observation'
    }

    // Map to frontend format
    const mapped = (startups || []).map(s => ({
      id: s.id,
      name: s.name_zh || '',
      name_en: s.name_en || '',
      sector: s.sector || '',
      stage: mapStage(s),
      tier: s.tier || 'C',
      updated_at: s.updated_at,
      note: s.notes,
      tax_id: s.tax_id || null,
      gate0_score: s.gate0_score != null ? Number(s.gate0_score) : null,
      gate1_score: s.gate1_score != null ? Number(s.gate1_score) : null,
      observation_pool: s.observation_pool || false,
      observation_reason: s.observation_reason || null,
    }))

    return NextResponse.json({ startups: mapped })
  } catch (err) {
    console.error('Pipeline API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
