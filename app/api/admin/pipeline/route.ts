// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/admin/pipeline — Fetch startup pipeline for admin view
 *
 * Returns startups from pip_startups with pipeline stage info.
 * Requires admin or staff_admin role.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin role
    const { data: roles } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)

    const userRoles = (roles as { role: string }[] | null)?.map(r => r.role) || []
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r))

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch pipeline startups
    const { data: startups, error } = await supabase
      .from('pip_startups')
      .select('id, name, sector, pipeline_stage, tier, updated_at, notes')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Pipeline fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch pipeline' }, { status: 500 })
    }

    // Map to frontend format
    const mapped = (startups || []).map(s => ({
      id: s.id,
      name: s.name,
      sector: s.sector || '',
      stage: s.pipeline_stage || 'observation',
      tier: s.tier || 'C',
      updated_at: s.updated_at,
      note: s.notes,
    }))

    return NextResponse.json({ startups: mapped })
  } catch (err) {
    console.error('Pipeline API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
