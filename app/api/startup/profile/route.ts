// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/startup/profile — Fetch startup team profile
 * PATCH /api/startup/profile — Update startup team profile
 *
 * Reads from pip_startups matched via user's team role.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find startup linked to this user
    const { data: teamRole } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['team', 'startup_incubated', 'startup_fundraising'])
      .single()

    if (!teamRole) {
      return NextResponse.json({ profile: null })
    }

    // Get startup profile via startup_team_members junction (or direct user_id)
    const { data: startup } = await supabase
      .from('startup_profiles')
      .select('*')
      .contains('team_user_ids', [user.id])
      .single()

    return NextResponse.json({
      profile: startup ? {
        ...startup,
        status: teamRole.role === 'startup_incubated' ? 'incubated' : 'fundraising',
        mentor_sessions_remaining: startup.mentor_sessions_remaining || 0,
      } : null,
    })
  } catch (err) {
    console.error('Startup profile GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Whitelist allowed fields
    const allowed = [
      'name', 'one_liner', 'sector', 'stage', 'founded_year',
      'team_size', 'website', 'description', 'traction',
      'fundraising_target', 'fundraising_use',
    ]
    const updates: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in body) updates[key] = body[key]
    }
    updates.updated_at = new Date().toISOString()

    const { data: startup, error } = await supabase
      .from('startup_profiles')
      .update(updates)
      .contains('team_user_ids', [user.id])
      .select()
      .single()

    if (error) {
      console.error('Startup profile update error:', error)
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile: startup })
  } catch (err) {
    console.error('Startup profile PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
