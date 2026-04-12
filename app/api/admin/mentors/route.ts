import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * GET    /api/admin/mentors           — List all mentors (including hidden)
 *   Query params: category, search, limit (default 100)
 * POST   /api/admin/mentors           — Create new mentor
 *   Body: MentorUpsert
 * PATCH  /api/admin/mentors           — Update existing mentor
 *   Body: { id, ...fields }
 * DELETE /api/admin/mentors?id=<uuid> — Delete mentor (hard delete)
 */

interface MentorUpsert {
  id?: string
  name: string
  title?: string | null
  highlight?: string | null
  category: 'vc' | 'founder' | 'exec' | 'expert'
  photo_url?: string | null
  social_url?: string | null
  bio?: string | null
  is_active?: boolean
  is_new_2026?: boolean
  sort_order?: number
  slug?: string | null
  extended_profile?: Record<string, unknown>
}

async function requireAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: roleRows } = await (supabase.from('module_roles') as any)
      .select('role')
      .eq('user_id', user.id)
      .eq('is_active', true)

    const roles: string[] = (roleRows || []).map((r: { role: string }) => r.role)
    return roles.includes('admin') || roles.includes('staff_admin') || roles.includes('staff_accelerator')
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') || undefined
  const search = searchParams.get('search') || undefined
  const limit = Math.min(parseInt(searchParams.get('limit') || '200'), 500)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createAdminClient() as any
  let query = db
    .from('mentors')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (category) query = query.eq('category', category)
  if (search) {
    query = query.or(`name.ilike.%${search}%,title.ilike.%${search}%,highlight.ilike.%${search}%`)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ mentors: data || [] })
}

export async function POST(req: NextRequest) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: MentorUpsert
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.name || !body.category) {
    return NextResponse.json({ error: 'name and category are required' }, { status: 400 })
  }

  const VALID_CATEGORIES = ['vc', 'founder', 'exec', 'expert']
  if (!VALID_CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createAdminClient() as any
  const { data, error } = await db
    .from('mentors')
    .insert({
      name: body.name,
      title: body.title ?? null,
      highlight: body.highlight ?? null,
      category: body.category,
      photo_url: body.photo_url ?? null,
      social_url: body.social_url ?? null,
      bio: body.bio ?? null,
      is_active: body.is_active ?? true,
      is_new_2026: body.is_new_2026 ?? false,
      sort_order: body.sort_order ?? 0,
      slug: body.slug ?? null,
      extended_profile: body.extended_profile ?? {},
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ mentor: data }, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: MentorUpsert & { id: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

  // Build update object — only include provided fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates: Record<string, any> = {}
  const ALLOWED = ['name', 'title', 'highlight', 'category', 'photo_url', 'social_url',
                   'bio', 'is_active', 'is_new_2026', 'sort_order', 'slug', 'extended_profile']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bodyRecord = body as unknown as Record<string, any>
  for (const key of ALLOWED) {
    if (key in bodyRecord) updates[key] = bodyRecord[key]
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }
  updates.updated_at = new Date().toISOString()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createAdminClient() as any
  const { data, error } = await db
    .from('mentors')
    .update(updates)
    .eq('id', body.id)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ mentor: data })
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createAdminClient() as any
  const { error } = await db.from('mentors').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
