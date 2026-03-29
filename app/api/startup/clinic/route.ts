// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/startup/clinic — Fetch team's clinic sessions
 *
 * Returns scheduled, completed, and cancelled mentor clinic sessions.
 * Will integrate with P014 mentor_matches after migration.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find team's startup profile
    const { data: startup } = await supabase
      .from('startup_profiles')
      .select('id')
      .contains('team_user_ids', [user.id])
      .single()

    if (!startup) {
      return NextResponse.json({ sessions: [] })
    }

    // Fetch clinic sessions
    const { data: sessions, error } = await supabase
      .from('mentor_matches')
      .select(`
        id,
        mentor_id,
        session_date,
        session_time,
        status,
        created_at
      `)
      .eq('team_startup_id', startup.id)
      .order('session_date', { ascending: false })
      .limit(20)

    if (error) {
      // Table may not exist yet — graceful fallback
      return NextResponse.json({ sessions: [] })
    }

    return NextResponse.json({ sessions: sessions || [] })
  } catch (err) {
    console.error('Startup clinic API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
