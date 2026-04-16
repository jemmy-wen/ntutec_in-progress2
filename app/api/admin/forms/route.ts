import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * GET  /api/admin/forms  — List form submissions (admin only).
 *   Query params: type, status, limit (default 50), offset (default 0)
 * PATCH /api/admin/forms — Update status of a submission.
 *   Body: { id, status }
 */

async function requireAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: roleRows } = await (supabase.from('module_roles') as any)
      .select('role')
      .eq('user_id', user.id)
      .eq('is_active', true)

    const roles: string[] = (roleRows || []).map((r: { role: string }) => r.role)
    return roles.includes('admin') || roles.includes('staff_admin')
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || undefined
  const status = searchParams.get('status') || undefined
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)
  const offset = parseInt(searchParams.get('offset') || '0')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createAdminClient() as any

  let query = db
    .from('form_submissions')
    .select('id, type, form_type, name, submitter_name, email, submitter_email, status, created_at, updated_at, data, assigned_to', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (type) query = query.eq('type', type)
  if (status) query = query.eq('status', status)

  const { data, error, count: totalCount } = await query

  if (error) {
    console.error('[admin/forms] fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }

  // Normalize: prefer `name`/`email` columns, fall back to `submitter_name`/`submitter_email`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalized = (data || []).map((row: any) => ({
    ...row,
    name: row.name || row.submitter_name || '—',
    email: row.email || row.submitter_email || '—',
    type: row.type || row.form_type || 'contact',
  }))

  // Count of 'new' submissions (for badge)
  const { count: newCount } = await db
    .from('form_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'new')

  return NextResponse.json({ data: normalized, newCount: newCount ?? 0, totalCount: totalCount ?? normalized.length })
}

export async function PATCH(req: NextRequest) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { id?: string; status?: string; assigned_to?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { id, status, assigned_to } = body
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

  const validStatuses = ['new', 'read', 'replied', 'archived']
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const updates: Record<string, string> = {}
  if (status) updates.status = status
  if (assigned_to !== undefined) updates.assigned_to = assigned_to

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createAdminClient() as any
  const { error } = await db
    .from('form_submissions')
    .update(updates)
    .eq('id', id)

  if (error) {
    console.error('[admin/forms] update error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
