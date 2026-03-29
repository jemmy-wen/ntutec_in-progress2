/**
 * GET /api/engagement?cycle_id=2026-04
 *   → Admin: get member engagement metrics
 */

import { NextResponse } from 'next/server'
import { withApiHandler } from '@/lib/api/handler'

export const GET = withApiHandler({
  roles: ['admin', 'staff_admin'],
}, async (ctx) => {
  const level = ctx.searchParams.get('level')  // 'active' | 'moderate' | 'low'

  let query = ctx.supabase
    .from('v_angel_engagement')
    .select('*')

  if (level) {
    query = query.eq('engagement_level', level)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Compute summary stats
  const total = (data || []).length
  const active = (data || []).filter(d => d.engagement_level === 'active').length
  const moderate = (data || []).filter(d => d.engagement_level === 'moderate').length
  const low = (data || []).filter(d => d.engagement_level === 'low').length

  return NextResponse.json({
    members: data,
    summary: { total, active, moderate, low },
  })
})
