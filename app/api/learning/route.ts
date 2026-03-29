/**
 * GET /api/learning
 *   → Angel member: get own learning progress
 *
 * POST /api/learning
 *   → Record learning progress (content read)
 */

import { NextResponse } from 'next/server'
import { withApiHandler, requireFields } from '@/lib/api/handler'

// GET: Fetch learning progress
export const GET = withApiHandler({
  roles: ['angel_member', 'admin', 'staff_admin'],
}, async (ctx) => {
  if (ctx.isAdmin) {
    // Admin: get aggregate stats
    const { data, error } = await ctx.supabase
      .from('v_angel_engagement')
      .select('*')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ engagement: data })
  }

  // Angel member: own progress
  const { data: member } = await ctx.supabase
    .from('angel_members')
    .select('id')
    .eq('user_id', ctx.auth.id)
    .maybeSingle()

  if (!member) {
    return NextResponse.json({ error: '找不到天使會員資料' }, { status: 404 })
  }

  const { data, error } = await ctx.supabase
    .from('angel_learning_progress')
    .select('*')
    .eq('angel_member_id', member.id)
    .order('read_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ progress: data })
})

// POST: Record learning progress
export const POST = withApiHandler({
  roles: ['angel_member'],
  audit: { action: 'create', entityType: 'learning_progress' },
}, async (ctx) => {
  const fieldError = requireFields(ctx.body, 'content_type', 'content_id')
  if (fieldError) {
    return NextResponse.json({ error: fieldError }, { status: 400 })
  }

  const { content_type, content_id, completion_pct } = ctx.body!

  const validTypes = ['digest', 'industry_report', 'case_study', 'tutorial']
  if (!validTypes.includes(content_type as string)) {
    return NextResponse.json({ error: `content_type 必須為 ${validTypes.join(', ')}` }, { status: 400 })
  }

  const { data: member } = await ctx.supabase
    .from('angel_members')
    .select('id')
    .eq('user_id', ctx.auth.id)
    .maybeSingle()

  if (!member) {
    return NextResponse.json({ error: '找不到天使會員資料' }, { status: 404 })
  }

  const { data, error } = await ctx.supabase
    .from('angel_learning_progress')
    .upsert({
      angel_member_id: member.id,
      content_type: content_type as string,
      content_id: content_id as string,
      completion_pct: (completion_pct as number) ?? 100,
    }, {
      onConflict: 'angel_member_id,content_type,content_id',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
})
