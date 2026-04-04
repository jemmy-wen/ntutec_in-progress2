// @ts-nocheck
/**
 * GET /api/admin/alerts
 *   → List unresolved pipeline alerts (F-013)
 *   Query: ?limit=10&severity=critical|warning|info
 *
 * PATCH /api/admin/alerts
 *   → Mark alert(s) as resolved
 *   Body: { id: string } | { ids: string[] }
 *
 * Requires: admin or staff_admin role
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SEVERITY_ORDER: Record<string, number> = { critical: 0, warning: 1, info: 2 }

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: roles } = await supabase.from('module_roles').select('role').eq('user_id', user.id)
    const userRoles = (roles || []).map((r: { role: string }) => r.role)
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || user.app_metadata?.platform_role === 'admin'
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)
    const severity = searchParams.get('severity')

    let query = supabase
      .from('pipeline_alerts')
      .select('*')
      .eq('is_resolved', false)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (severity) {
      query = query.eq('severity', severity)
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Sort by severity in memory (critical > warning > info)
    const sorted = (data || []).sort((a, b) =>
      (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9)
    )

    const counts = {
      critical: sorted.filter(a => a.severity === 'critical').length,
      warning: sorted.filter(a => a.severity === 'warning').length,
      info: sorted.filter(a => a.severity === 'info').length,
      total: sorted.length,
    }

    return NextResponse.json({ alerts: sorted, counts })
  } catch (e) {
    return NextResponse.json({ error: `Internal error: ${(e as Error).message}` }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: roles } = await supabase.from('module_roles').select('role').eq('user_id', user.id)
    const userRoles = (roles || []).map((r: { role: string }) => r.role)
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || user.app_metadata?.platform_role === 'admin'
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const ids: string[] = body.ids ?? (body.id ? [body.id] : [])
    if (ids.length === 0) return NextResponse.json({ error: 'id or ids required' }, { status: 400 })

    const now = new Date().toISOString()
    const { error } = await supabase
      .from('pipeline_alerts')
      .update({ is_resolved: true, resolved_at: now, resolved_by: user.email || user.id })
      .in('id', ids)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, resolved: ids.length })
  } catch (e) {
    return NextResponse.json({ error: `Internal error: ${(e as Error).message}` }, { status: 500 })
  }
}
