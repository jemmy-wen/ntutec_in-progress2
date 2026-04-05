// @ts-nocheck
/**
 * GET  /api/admin/gates/[id]/report
 *   — Fetch Gate 2 DD Report for a startup
 *   — [id] = startup UUID
 *   Returns: { report: GateReportRecord | null }
 *
 * POST /api/admin/gates/[id]/report
 *   — Trigger gate2_report.py generation (stub — returns 501 until Python worker integrated)
 *   Returns: { message: string }
 *
 * Data source: gates table, gate_type = 'gate2_report'
 *   notes       → markdown preview (up to 4,000 chars)
 *   report_path → Supabase Storage path (full report)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ─── Auth helper ─────────────────────────────────────────────────

async function requireAdmin(supabase: ReturnType<typeof createClient> extends Promise<infer T> ? T : never) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, isAdmin: false }

  const { data: roles } = await supabase
    .from('module_roles')
    .select('role')
    .eq('user_id', user.id)

  const userRoles = (roles || []).map((r: { role: string }) => r.role)
  const metadataRole = user.app_metadata?.platform_role
  const isAdmin = userRoles.some((r: string) => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'
  return { user, isAdmin }
}

// ─── GET ─────────────────────────────────────────────────────────

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { user, isAdmin } = await requireAdmin(supabase)

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Fetch the gate2_report record for this startup
    const { data: reports, error } = await supabase
      .from('gates')
      .select('id, startup_id, evaluation_date, evaluator, notes, report_path, created_at')
      .eq('startup_id', id)
      .eq('gate_type', 'gate2_report')
      .order('evaluation_date', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Gate2 report fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 })
    }

    const report = reports && reports.length > 0 ? reports[0] : null

    // Also fetch gate1 scores for the radar chart (from gate1 record)
    const { data: gate1Records } = await supabase
      .from('gates')
      .select('sosv_market, sosv_solution, d3_team, d4_traction, d5_fit, sosv_total, gate1_confidence, gate1_action, result')
      .eq('startup_id', id)
      .eq('gate_type', 'gate1')
      .order('evaluation_date', { ascending: false })
      .limit(1)

    const gate1 = gate1Records && gate1Records.length > 0 ? gate1Records[0] : null

    return NextResponse.json({
      report,
      gate1_scores: gate1,
      has_report: report !== null,
    })
  } catch (e) {
    return NextResponse.json(
      { error: `Internal error: ${(e as Error).message}` },
      { status: 500 }
    )
  }
}

// ─── POST (trigger generation stub) ─────────────────────────────

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { user, isAdmin } = await requireAdmin(supabase)

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Verify startup exists
    const { data: startup, error: startupErr } = await supabase
      .from('startups')
      .select('id, name_zh')
      .eq('id', id)
      .single()

    if (startupErr || !startup) {
      return NextResponse.json({ error: `Startup not found: ${id}` }, { status: 404 })
    }

    // TODO: Integrate with Python worker / Supabase Edge Function to run gate2_report.py
    // For now, return a stub response with instructions for manual execution
    return NextResponse.json(
      {
        message: 'Gate 2 report generation queued (manual execution required)',
        startup_id: id,
        startup_name: startup.name_zh,
        instructions: `Run: python3 pipeline/gate2_report.py --id ${id} --save-supabase`,
        status: 'pending',
      },
      { status: 501 }  // Not Implemented — full automation pending
    )
  } catch (e) {
    return NextResponse.json(
      { error: `Internal error: ${(e as Error).message}` },
      { status: 500 }
    )
  }
}
