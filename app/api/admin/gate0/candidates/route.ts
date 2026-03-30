// @ts-nocheck
/**
 * GET /api/admin/gate0/candidates
 *
 * Fetch Gate 0 candidates for the review panel (F-002).
 *
 * Query params:
 *   filter: 'pending' | 'borderline' | 'all' (default: 'pending')
 *   limit: number (default: 100)
 *   offset: number (default: 0)
 *
 * Returns startups needing Gate 0 evaluation or review.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GATE0_SELECT_COLUMNS } from '@/lib/gate0/engine'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    // ─── Auth check ───
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

    // ─── Query params ───
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'pending'
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500)
    const offset = parseInt(searchParams.get('offset') || '0')

    // ─── Build query ───
    // Always select from startups (not pip_startups view) for full column access
    const selectCols = GATE0_SELECT_COLUMNS + ',founded_year,website'

    let query = supabase
      .from('startups')
      .select(selectCols, { count: 'exact' })
      .or('track.is.null,track.neq.ecosystem')  // D4=A: exclude Track E

    if (filter === 'pending') {
      // Startups in gate0 queue without a gate0 evaluation yet
      query = query
        .eq('current_gate', 'gate0')
        .eq('status', 'active')
    } else if (filter === 'borderline') {
      // Startups with gate0 borderline result — need human review
      query = query
        .eq('current_gate', 'gate0')
        .eq('current_gate_result', 'borderline')
    } else {
      // All gate0-related
      query = query
        .or('current_gate.eq.gate0,current_gate.is.null')
        .eq('status', 'active')
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // ─── Fetch gate0 records for these startups ───
    const startupIds = (data || []).map((s: { id: string }) => s.id)
    let gateRecords: Record<string, { result: string; notes: string | null; evaluation_date: string | null }> = {}

    if (startupIds.length > 0) {
      const { data: gates } = await supabase
        .from('gates')
        .select('startup_id, result, notes, evaluation_date')
        .eq('gate_type', 'gate0')
        .in('startup_id', startupIds)

      if (gates) {
        gateRecords = Object.fromEntries(
          gates.map(g => [g.startup_id, { result: g.result, notes: g.notes, evaluation_date: g.evaluation_date }])
        )
      }
    }

    // ─── Enrich startups with gate info ───
    const enriched = (data || []).map((s: Record<string, unknown>) => ({
      ...s,
      gate0: gateRecords[s.id as string] || null,
    }))

    return NextResponse.json({
      startups: enriched,
      total: count || 0,
      limit,
      offset,
      filter,
    })
  } catch (e) {
    return NextResponse.json(
      { error: `Internal error: ${(e as Error).message}` },
      { status: 500 }
    )
  }
}
