import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/mentor/cycles — Fetch mentor clinic cycles
 * Returns cycles relevant to the logged-in mentor.
 *
 * Reserved for future P014 migration.
 * Currently returns from pip_meetings with a mentor filter view.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For now, return all non-archived meetings as cycles
    // P014 migration will add mentor_clinic_cycles table
    const { data: cycles, error } = await supabase
      .from('pip_meetings')
      .select('id, meeting_date, status, is_archived, created_at')
      .eq('is_archived', false)
      .order('meeting_date', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Mentor cycles fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch cycles' }, { status: 500 })
    }

    return NextResponse.json({ cycles: cycles || [] })
  } catch (err) {
    console.error('Mentor cycles API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
