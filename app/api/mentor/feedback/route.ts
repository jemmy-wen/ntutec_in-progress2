// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/mentor/feedback — Fetch mentor's submitted feedback
 * POST /api/mentor/feedback — Submit feedback for a clinic session
 *
 * Feedback data includes: session quality, team assessment, recommendations.
 * Will be fully implemented when P014 feedback module is migrated.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('mentor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ feedback: [] })
    }

    const { data: feedback, error } = await supabase
      .from('mentor_feedback')
      .select('*')
      .eq('mentor_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Mentor feedback fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 })
    }

    return NextResponse.json({ feedback: feedback || [] })
  } catch (err) {
    console.error('Mentor feedback GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('mentor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Mentor profile not found' }, { status: 404 })
    }

    const body = await req.json()
    const {
      match_id,
      session_quality,       // 1-5
      team_preparedness,     // 1-5
      team_coachability,     // 1-5
      key_issues,            // text
      recommendations,       // text
      follow_up_needed,      // boolean
      notes,                 // text
    } = body

    if (!match_id) {
      return NextResponse.json({ error: 'match_id is required' }, { status: 400 })
    }

    const { data: feedback, error } = await supabase
      .from('mentor_feedback')
      .upsert({
        mentor_id: profile.id,
        match_id,
        session_quality: session_quality || null,
        team_preparedness: team_preparedness || null,
        team_coachability: team_coachability || null,
        key_issues: key_issues || '',
        recommendations: recommendations || '',
        follow_up_needed: follow_up_needed || false,
        notes: notes || '',
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'mentor_id,match_id' })
      .select()
      .single()

    if (error) {
      console.error('Mentor feedback upsert error:', error)
      return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
    }

    return NextResponse.json({ success: true, feedback })
  } catch (err) {
    console.error('Mentor feedback POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
