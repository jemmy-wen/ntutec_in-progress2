// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/angel/badges/award
 *
 * F-017 Phase 1: Award a badge to an angel member (admin-only).
 *
 * Body: { member_id: string, badge_code: string }
 *   member_id — angel_memberships.id
 *   badge_code — e.g. 'first_vote', 'onboarding_complete'
 *
 * Badge award is idempotent (UNIQUE constraint on member_id + badge_id).
 */
export async function POST(req: NextRequest) {
  try {
    // Auth check — must be admin or staff_admin
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: roleRow } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['admin', 'staff_admin'])
      .maybeSingle()

    if (!roleRow) {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 })
    }

    // Parse body
    const body = await req.json()
    const { member_id, badge_code } = body

    if (!member_id || !badge_code) {
      return NextResponse.json({ error: 'member_id and badge_code are required' }, { status: 400 })
    }

    // Resolve badge_id from code
    const adminClient = createAdminClient()
    const { data: badge, error: badgeError } = await adminClient
      .from('badges')
      .select('id, name, icon')
      .eq('code', badge_code)
      .maybeSingle()

    if (badgeError || !badge) {
      return NextResponse.json({ error: `Badge not found: ${badge_code}` }, { status: 404 })
    }

    // Award badge (upsert — idempotent)
    const { data: awarded, error: awardError } = await adminClient
      .from('member_badges')
      .upsert({
        member_id,
        badge_id: badge.id,
      }, {
        onConflict: 'member_id,badge_id',
        ignoreDuplicates: true,
      })
      .select()
      .maybeSingle()

    if (awardError) {
      console.error('[Badges] Award error:', awardError)
      return NextResponse.json({ error: 'Failed to award badge' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      badge: {
        code: badge_code,
        name: badge.name,
        icon: badge.icon,
      },
      member_id,
      already_had: !awarded, // if upsert returned nothing, badge was already there
    })
  } catch (e) {
    console.error('[Badges] Award POST error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
