// @ts-nocheck
/**
 * POST /api/admin/gate0/auto-score
 *
 * Gate 0 auto-screening API endpoint.
 * Evaluates startups through G0-1~G0-10 checklist and writes results.
 *
 * Decisions applied:
 *   D1=B: TypeScript engine (Python backup)
 *   D4=A: Track E excluded
 *   D5=B: Idempotent — skips startups with existing gate0 record
 *
 * Body:
 *   { mode: 'single', startup_id: string }       — screen one startup
 *   { mode: 'batch' }                             — screen all pending (gate0 queue)
 *   { mode: 'pending' }                           — screen all with no gate record
 *   { dry_run?: boolean }                         — preview without DB writes
 *
 * Requires: admin role
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  screenGate0,
  GATE0_SELECT_COLUMNS,
  type StartupForGate0,
  type Gate0Result,
} from '@/lib/gate0/engine'

interface RequestBody {
  mode: 'single' | 'batch' | 'pending'
  startup_id?: string
  dry_run?: boolean
}

interface Gate0Response {
  success: boolean
  dry_run: boolean
  total: number
  results: {
    pass: number
    fail: number
    borderline: number
    skipped: number
  }
  details: Gate0Result[]
  errors: string[]
}

const BATCH_LIMIT = 200

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // ─── Auth check ───
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: roles } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)

    const userRoles = (roles || []).map((r: { role: string }) => r.role)
    const metadataRole = user.app_metadata?.platform_role
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // ─── Parse body ───
    const body: RequestBody = await req.json()
    const { mode, startup_id, dry_run = false } = body

    if (!mode || !['single', 'batch', 'pending'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid mode. Use: single, batch, or pending' }, { status: 400 })
    }
    if (mode === 'single' && !startup_id) {
      return NextResponse.json({ error: 'startup_id required for single mode' }, { status: 400 })
    }

    // ─── Fetch candidates ───
    let startups: StartupForGate0[] = []

    if (mode === 'single') {
      const { data, error } = await supabase
        .from('startups')
        .select(GATE0_SELECT_COLUMNS)
        .eq('id', startup_id!)
        .single()

      if (error || !data) {
        return NextResponse.json({ error: `Startup not found: ${startup_id}` }, { status: 404 })
      }
      startups = [data as StartupForGate0]
    } else if (mode === 'batch') {
      // Gate 0 queue: current_gate = 'gate0', active, exclude Track E (D4=A)
      const { data, error } = await supabase
        .from('startups')
        .select(GATE0_SELECT_COLUMNS)
        .eq('current_gate', 'gate0')
        .eq('status', 'active')
        .or('track.is.null,track.neq.ecosystem')
        .order('created_at', { ascending: false })
        .limit(BATCH_LIMIT)

      if (error) {
        return NextResponse.json({ error: `Query error: ${error.message}` }, { status: 500 })
      }
      startups = (data || []) as StartupForGate0[]
    } else if (mode === 'pending') {
      // No gate record at all, active, exclude Track E (D4=A)
      const { data, error } = await supabase
        .from('startups')
        .select(GATE0_SELECT_COLUMNS)
        .is('current_gate', null)
        .eq('status', 'active')
        .or('track.is.null,track.neq.ecosystem')
        .order('created_at', { ascending: false })
        .limit(BATCH_LIMIT)

      if (error) {
        return NextResponse.json({ error: `Query error: ${error.message}` }, { status: 500 })
      }
      startups = (data || []) as StartupForGate0[]
    }

    // ─── Idempotency check (D5=B): skip startups with existing gate0 record ───
    let skippedCount = 0
    if (startups.length > 0 && mode !== 'single') {
      const startupIds = startups.map(s => s.id)
      const { data: existingGates } = await supabase
        .from('gates')
        .select('startup_id')
        .eq('gate_type', 'gate0')
        .in('startup_id', startupIds)

      const alreadyEvaluated = new Set((existingGates || []).map((g: { startup_id: string }) => g.startup_id))
      const before = startups.length
      startups = startups.filter(s => !alreadyEvaluated.has(s.id))
      skippedCount = before - startups.length
    }

    // ─── Screen all candidates ───
    const details: Gate0Result[] = startups.map(s => screenGate0(s))
    const errors: string[] = []

    const counts = {
      pass: details.filter(d => d.result === 'pass').length,
      fail: details.filter(d => d.result === 'fail').length,
      borderline: details.filter(d => d.result === 'borderline').length,
      skipped: skippedCount,
    }

    // ─── Write results (unless dry_run) ───
    if (!dry_run && details.length > 0) {
      const today = new Date().toISOString().split('T')[0]

      for (const result of details) {
        try {
          // 1. Insert gate record
          const { error: gateError } = await supabase
            .from('gates')
            .insert({
              startup_id: result.startup_id,
              gate_type: 'gate0',
              result: result.result,
              evaluation_date: today,
              evaluator: 'platform_auto',
              notes: [
                ...result.flags,
                ...result.fail_reasons,
                ...result.notes,
              ].join('\n') || null,
            })

          if (gateError) {
            errors.push(`Gate insert failed for ${result.startup_name}: ${gateError.message}`)
            continue
          }

          // 2. Update startup record
          const pipelineStage = result.result === 'pass' ? 1
            : result.result === 'fail' ? 9
            : 0  // borderline stays at 0

          const { error: startupError } = await supabase
            .from('startups')
            .update({
              current_gate: 'gate0',
              current_gate_result: result.result,
              current_gate_date: today,
              pipeline_stage: pipelineStage,
            })
            .eq('id', result.startup_id)

          if (startupError) {
            errors.push(`Startup update failed for ${result.startup_name}: ${startupError.message}`)
          }

          // 3. Audit log
          await supabase.from('audit_logs').insert({
            user_id: user.id,
            action: 'gate0_auto_score',
            entity_type: 'startup',
            entity_id: result.startup_id,
            changes: {
              result: result.result,
              hard_fails: result.hard_fails,
              soft_flags: result.soft_flags,
              flags: result.flags,
              fail_reasons: result.fail_reasons,
            },
            metadata: {
              evaluator: 'platform_auto',
              mode,
              dry_run: false,
            },
          })
        } catch (e) {
          errors.push(`Unexpected error for ${result.startup_name}: ${(e as Error).message}`)
        }
      }
    }

    // ─── Response ───
    const response: Gate0Response = {
      success: errors.length === 0,
      dry_run,
      total: details.length,
      results: counts,
      details: details.slice(0, 50), // Cap detail output for large batches
      errors,
    }

    return NextResponse.json(response)
  } catch (e) {
    return NextResponse.json(
      { error: `Internal error: ${(e as Error).message}` },
      { status: 500 }
    )
  }
}
