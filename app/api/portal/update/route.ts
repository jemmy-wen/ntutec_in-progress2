import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

const ALLOWED_STARTUP_FIELDS = new Set(['name', 'description', 'external_link', 'uniform_number', 'tags'])
const ALLOWED_MENTOR_FIELDS = new Set(['title', 'highlight', 'bio', 'social_url', 'photo_url'])

const MAX_FIELD_LENGTHS: Record<string, number> = {
  name: 200, description: 2000, external_link: 500, uniform_number: 8,
  title: 200, highlight: 200, bio: 3000, social_url: 500, photo_url: 500,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { token, fields } = body as { token?: string; fields?: Record<string, unknown> }

    if (!token || !fields || typeof fields !== 'object') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Atomic: claim token (SET used_at) only if still valid — prevents race condition
    const { data: row, error } = await supabase
      .from('portal_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token)
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .select('*')
      .single()

    if (error || !row) {
      return NextResponse.json({ error: 'Invalid or expired link' }, { status: 410 })
    }

    if (!['startup', 'mentor'].includes(row.entity_type)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Filter to allowed fields + enforce length limits
    const allowed = row.entity_type === 'startup' ? ALLOWED_STARTUP_FIELDS : ALLOWED_MENTOR_FIELDS
    const sanitized: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(fields)) {
      if (!allowed.has(key)) continue
      if (key === 'tags') {
        if (Array.isArray(value) && value.length <= 5 && value.every(v => typeof v === 'string' && v.length <= 20)) {
          sanitized[key] = value
        }
        continue
      }
      if (typeof value === 'string') {
        const max = MAX_FIELD_LENGTHS[key] ?? 500
        sanitized[key] = value.slice(0, max)
      }
    }

    if (Object.keys(sanitized).length === 0) {
      return NextResponse.json({ error: 'No valid fields' }, { status: 400 })
    }

    // Update entity
    const table = row.entity_type === 'startup' ? 'historical_startups' : 'mentors'
    const { error: updateError } = await supabase
      .from(table)
      .update(sanitized)
      .eq('id', row.entity_id)

    if (updateError) {
      // Rollback: un-mark token so user can retry
      await supabase.from('portal_tokens').update({ used_at: null }).eq('id', row.id)
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
