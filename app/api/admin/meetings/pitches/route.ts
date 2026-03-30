// @ts-nocheck
/**
 * /api/admin/meetings/pitches
 *
 * F-003: Manage pitch assignments for monthly meetings.
 *
 * GET  — List pitches for a meeting cycle
 * POST — Add startup(s) to a meeting as pitch
 * DELETE — Remove a pitch from a meeting
 * PATCH — Update pitch order or notes
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ─── Auth helper ───
async function checkAdmin(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: roles } = await supabase
    .from('module_roles')
    .select('role')
    .eq('user_id', user.id)
  const userRoles = (roles || []).map((r: { role: string }) => r.role)
  const metadataRole = user.app_metadata?.platform_role
  const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'
  return isAdmin ? user : null
}

// ─── GET: List pitches for a meeting ───
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const user = await checkAdmin(supabase)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const meetingId = searchParams.get('meeting_id')

    if (!meetingId) {
      return NextResponse.json({ error: 'meeting_id required' }, { status: 400 })
    }

    // Get pitches with startup info
    const { data: pitches, error } = await supabase
      .from('pip_meeting_pitches')
      .select('id, meeting_id, startup_id, pitch_order, decision, followup_status, notes, created_at')
      .eq('meeting_id', meetingId)
      .order('pitch_order', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Enrich with startup data
    if (pitches && pitches.length > 0) {
      const startupIds = pitches.map(p => p.startup_id)
      const { data: startups } = await supabase
        .from('startups')
        .select('id, name_zh, name_en, sector, product_oneliner, current_gate, current_gate_result, gate1_score')
        .in('id', startupIds)

      const startupMap = Object.fromEntries((startups || []).map(s => [s.id, s]))
      const enriched = pitches.map(p => ({
        ...p,
        startup: startupMap[p.startup_id] || null,
      }))

      return NextResponse.json({ pitches: enriched })
    }

    return NextResponse.json({ pitches: [] })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

// ─── POST: Add pitch(es) to a meeting ───
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const user = await checkAdmin(supabase)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { meeting_id, startup_ids } = body

    if (!meeting_id || !startup_ids || !Array.isArray(startup_ids) || startup_ids.length === 0) {
      return NextResponse.json({ error: 'meeting_id and startup_ids[] required' }, { status: 400 })
    }

    // Verify meeting exists
    const { data: meeting, error: meetingErr } = await supabase
      .from('pip_meetings')
      .select('id, status')
      .eq('id', meeting_id)
      .single()

    if (meetingErr || !meeting) {
      return NextResponse.json({ error: `Meeting ${meeting_id} not found` }, { status: 404 })
    }

    // Get existing pitch count for ordering
    const { data: existing } = await supabase
      .from('pip_meeting_pitches')
      .select('startup_id, pitch_order')
      .eq('meeting_id', meeting_id)

    const existingIds = new Set((existing || []).map(p => p.startup_id))
    const maxOrder = Math.max(0, ...(existing || []).map(p => p.pitch_order || 0))

    // Filter out duplicates
    const newIds = startup_ids.filter(id => !existingIds.has(id))
    if (newIds.length === 0) {
      return NextResponse.json({ error: 'All startups already assigned to this meeting' }, { status: 409 })
    }

    // Insert new pitches
    const pitchRows = newIds.map((id, idx) => ({
      meeting_id,
      startup_id: id,
      pitch_order: maxOrder + idx + 1,
    }))

    const { data: inserted, error: insertErr } = await supabase
      .from('pip_meeting_pitches')
      .insert(pitchRows)
      .select()

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 })
    }

    // Update startup pipeline stage to monthly_pitch
    for (const id of newIds) {
      await supabase
        .from('startups')
        .update({
          current_gate: 'monthly_pitch',
          pipeline_stage: '3_月會Pitch',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
    }

    // Audit log
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'add_meeting_pitches',
      entity_type: 'meeting',
      entity_id: meeting_id,
      changes: { added_startup_ids: newIds, pitch_count: newIds.length },
      metadata: { meeting_id },
    })

    return NextResponse.json({
      success: true,
      added: newIds.length,
      pitches: inserted,
    }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

// ─── DELETE: Remove a pitch ───
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()
    const user = await checkAdmin(supabase)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { pitch_id } = body

    if (!pitch_id) {
      return NextResponse.json({ error: 'pitch_id required' }, { status: 400 })
    }

    const { data: pitch, error: fetchErr } = await supabase
      .from('pip_meeting_pitches')
      .select('id, meeting_id, startup_id')
      .eq('id', pitch_id)
      .single()

    if (fetchErr || !pitch) {
      return NextResponse.json({ error: 'Pitch not found' }, { status: 404 })
    }

    const { error: deleteErr } = await supabase
      .from('pip_meeting_pitches')
      .delete()
      .eq('id', pitch_id)

    if (deleteErr) {
      return NextResponse.json({ error: deleteErr.message }, { status: 500 })
    }

    // Audit
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'remove_meeting_pitch',
      entity_type: 'meeting',
      entity_id: pitch.meeting_id,
      changes: { removed_startup_id: pitch.startup_id },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

// ─── PATCH: Update pitch order or notes ───
export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient()
    const user = await checkAdmin(supabase)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { pitch_id, pitch_order, notes, decision } = body

    if (!pitch_id) {
      return NextResponse.json({ error: 'pitch_id required' }, { status: 400 })
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (pitch_order !== undefined) updates.pitch_order = pitch_order
    if (notes !== undefined) updates.notes = notes
    if (decision !== undefined) updates.decision = decision

    const { data, error } = await supabase
      .from('pip_meeting_pitches')
      .update(updates)
      .eq('id', pitch_id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, pitch: data })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
