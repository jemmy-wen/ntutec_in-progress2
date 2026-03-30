// @ts-nocheck
/**
 * POST /api/admin/gate0/review
 *
 * Manual Gate 0 review — admin passes/fails/watches a single startup.
 * Used by the F-002 batch review panel.
 *
 * Body:
 *   {
 *     startup_id: string,
 *     decision: 'pass' | 'fail' | 'watch',
 *     notes?: string
 *   }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface ReviewBody {
  startup_id: string
  decision: 'pass' | 'fail' | 'watch'
  notes?: string
}

export async function POST(req: NextRequest) {
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

    // ─── Parse body ───
    const body: ReviewBody = await req.json()
    const { startup_id, decision, notes } = body

    if (!startup_id || !decision) {
      return NextResponse.json({ error: 'startup_id and decision required' }, { status: 400 })
    }
    if (!['pass', 'fail', 'watch'].includes(decision)) {
      return NextResponse.json({ error: 'Invalid decision. Use: pass, fail, watch' }, { status: 400 })
    }

    // ─── Verify startup exists ───
    const { data: startup, error: startupErr } = await supabase
      .from('startups')
      .select('id, name_zh')
      .eq('id', startup_id)
      .single()

    if (startupErr || !startup) {
      return NextResponse.json({ error: `Startup not found: ${startup_id}` }, { status: 404 })
    }

    const today = new Date().toISOString().split('T')[0]

    // ─── Map decision to gate result and pipeline stage ───
    const gateResult = decision === 'watch' ? 'borderline' : decision
    const pipelineStage = decision === 'pass' ? 1
      : decision === 'fail' ? 9
      : 0  // watch = borderline = stays at 0

    // ─── Check for existing gate0 record ───
    const { data: existingGate } = await supabase
      .from('gates')
      .select('id')
      .eq('startup_id', startup_id)
      .eq('gate_type', 'gate0')
      .single()

    if (existingGate) {
      // Update existing
      const { error } = await supabase
        .from('gates')
        .update({
          result: gateResult,
          evaluation_date: today,
          evaluator: 'howard_manual',
          notes: notes || null,
        })
        .eq('id', existingGate.id)

      if (error) {
        return NextResponse.json({ error: `Gate update failed: ${error.message}` }, { status: 500 })
      }
    } else {
      // Insert new
      const { error } = await supabase
        .from('gates')
        .insert({
          startup_id,
          gate_type: 'gate0',
          result: gateResult,
          evaluation_date: today,
          evaluator: 'howard_manual',
          notes: notes || null,
        })

      if (error) {
        return NextResponse.json({ error: `Gate insert failed: ${error.message}` }, { status: 500 })
      }
    }

    // ─── Update startup ───
    const { error: updateErr } = await supabase
      .from('startups')
      .update({
        current_gate: decision === 'pass' ? 'gate1' : 'gate0',
        current_gate_result: gateResult,
        current_gate_date: today,
        pipeline_stage: pipelineStage,
      })
      .eq('id', startup_id)

    if (updateErr) {
      return NextResponse.json({ error: `Startup update failed: ${updateErr.message}` }, { status: 500 })
    }

    // ─── Audit log ───
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'gate0_manual_review',
      entity_type: 'startup',
      entity_id: startup_id,
      changes: {
        decision,
        result: gateResult,
        pipeline_stage: pipelineStage,
      },
      metadata: {
        evaluator: 'howard_manual',
        notes,
      },
    })

    return NextResponse.json({
      success: true,
      startup_id,
      startup_name: (startup as { name_zh: string }).name_zh,
      decision,
      gate_result: gateResult,
      pipeline_stage: pipelineStage,
    })
  } catch (e) {
    return NextResponse.json(
      { error: `Internal error: ${(e as Error).message}` },
      { status: 500 }
    )
  }
}
