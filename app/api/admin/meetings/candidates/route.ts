// @ts-nocheck
/**
 * GET /api/admin/meetings/candidates
 *
 * F-003: Fetch meeting candidates — startups eligible for monthly pitch.
 * Based on Circulation Pipeline v0.3 criteria:
 *   - Gate 1 result = pass/advance
 *   - Track != ecosystem (D4=A)
 *   - Not already assigned to the specified meeting
 *   - Active status
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
    const metadataRole = user.app_metadata?.platform_role
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const meetingId = searchParams.get('meeting_id') || ''

    // Get candidates: Gate 1+ passed, active, not ecosystem
    const { data: candidates, error } = await supabase
      .from('startups')
      .select('id, name_zh, name_en, sector, product_oneliner, current_gate, current_gate_result, gate1_score, pipeline_stage, funding_stage, ntu_affiliation')
      .or('current_gate_result.eq.pass,current_gate_result.eq.advance,current_gate_result.eq.推進')
      .gte('pipeline_stage', 2)
      .eq('status', 'active')
      .or('track.is.null,track.neq.ecosystem')
      .order('gate1_score', { ascending: false, nullsFirst: false })
      .limit(50)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If meeting_id provided, mark which are already assigned
    let assignedIds = new Set<string>()
    if (meetingId) {
      const { data: pitches } = await supabase
        .from('pip_meeting_pitches')
        .select('startup_id')
        .eq('meeting_id', meetingId)

      assignedIds = new Set((pitches || []).map(p => p.startup_id))
    }

    const enriched = (candidates || []).map(c => ({
      ...c,
      already_assigned: assignedIds.has(c.id),
    }))

    return NextResponse.json({
      candidates: enriched,
      total: enriched.length,
      assigned_count: enriched.filter(c => c.already_assigned).length,
    })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
