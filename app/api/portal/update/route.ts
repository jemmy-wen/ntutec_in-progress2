import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

const ALLOWED_STARTUP_FIELDS = new Set(['name', 'description', 'external_link', 'uniform_number', 'tags'])
const ALLOWED_MENTOR_FIELDS = new Set(['title', 'highlight', 'bio', 'social_url', 'photo_url'])

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { token, fields } = body as { token?: string; fields?: Record<string, unknown> }

    if (!token || !fields || typeof fields !== 'object') {
      return NextResponse.json({ error: 'Missing token or fields' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: row, error } = await supabase
      .from('portal_tokens')
      .select('*')
      .eq('token', token)
      .single()

    if (error || !row) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 })
    }
    if (row.used_at) {
      return NextResponse.json({ error: 'Token already used' }, { status: 410 })
    }
    if (new Date(row.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 410 })
    }

    // Filter to allowed fields only
    const allowed = row.entity_type === 'startup' ? ALLOWED_STARTUP_FIELDS : ALLOWED_MENTOR_FIELDS
    const sanitized: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(fields)) {
      if (allowed.has(key)) sanitized[key] = value
    }

    if (Object.keys(sanitized).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    // Update entity
    const table = row.entity_type === 'startup' ? 'historical_startups' : 'mentors'
    const { error: updateError } = await supabase
      .from(table)
      .update(sanitized)
      .eq('id', row.entity_id)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update entity' }, { status: 500 })
    }

    // Mark token as used
    await supabase
      .from('portal_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', row.id)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
