import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/mentor/matches — Fetch mentor's matched teams
 *
 * Returns the teams assigned to this mentor for the current/recent cycle.
 * Will be fully populated when P014 matching algorithm is migrated.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get mentor profile
    const { data: profile } = await supabase
      .from('mentor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ matches: [], message: 'No mentor profile found' })
    }

    // Fetch matches
    const { data: matches, error } = await supabase
      .from('mentor_matches')
      .select(`
        id,
        cycle_id,
        team_id,
        match_score,
        status,
        session_date,
        session_time,
        created_at
      `)
      .eq('mentor_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Mentor matches fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
    }

    return NextResponse.json({ matches: matches || [] })
  } catch (err) {
    console.error('Mentor matches API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
