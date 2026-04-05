// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/angel/badges
 *
 * F-017 Phase 1: Returns all badges + which ones the current angel member has earned.
 *
 * Response:
 *   {
 *     all_badges: Badge[],
 *     earned_badge_codes: string[],
 *   }
 *
 * Each Badge:
 *   { id, code, name, description, icon, category, earned: boolean, earned_at?: string }
 */
export async function GET(_req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Resolve angel_memberships.id for current user
    // angel_members is a VIEW backed by investors; memberships are in angel_memberships
    const { data: membership, error: membershipError } = await supabase
      .from('angel_memberships')
      .select('id, investor_id')
      .order('membership_start', { ascending: false })
      .limit(1)
      .maybeSingle()

    // Fetch all badges
    const { data: allBadges, error: badgesError } = await supabase
      .from('badges')
      .select('id, code, name, description, icon, category')
      .order('created_at', { ascending: true })

    if (badgesError) {
      console.error('[Badges] Failed to fetch badges:', badgesError)
      return NextResponse.json({ error: 'Failed to fetch badges' }, { status: 500 })
    }

    let earnedCodes: string[] = []
    let memberBadgesMap: Record<string, string> = {} // badge_code → earned_at

    if (membership && !membershipError) {
      const { data: memberBadges } = await supabase
        .from('member_badges')
        .select('badge_id, earned_at, badges(code)')
        .eq('member_id', membership.id)

      if (memberBadges) {
        for (const mb of memberBadges) {
          const code = (mb.badges as any)?.code
          if (code) {
            earnedCodes.push(code)
            memberBadgesMap[code] = mb.earned_at
          }
        }
      }
    }

    const badges = (allBadges || []).map(b => ({
      id: b.id,
      code: b.code,
      name: b.name,
      description: b.description,
      icon: b.icon,
      category: b.category,
      earned: earnedCodes.includes(b.code),
      earned_at: memberBadgesMap[b.code] || null,
    }))

    return NextResponse.json({
      badges,
      earned_count: earnedCodes.length,
      total_count: badges.length,
    })
  } catch (e) {
    console.error('[Badges] GET error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
