import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

const STARTUP_FIELDS = 'id, name, description, external_link, uniform_number, tags'
const MENTOR_FIELDS = 'id, name, title, highlight, bio, social_url, photo_url'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    if (!token) {
      return NextResponse.json({ valid: false, reason: 'missing_token' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: row, error } = await supabase
      .from('portal_tokens')
      .select('*')
      .eq('token', token)
      .single()

    if (error || !row) {
      return NextResponse.json({ valid: false, reason: 'not_found' }, { status: 404 })
    }

    if (row.used_at) {
      return NextResponse.json({ valid: false, reason: 'used' }, { status: 410 })
    }

    if (new Date(row.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, reason: 'expired' }, { status: 410 })
    }

    const table = row.entity_type === 'startup' ? 'historical_startups' : 'mentors'
    const fields = row.entity_type === 'startup' ? STARTUP_FIELDS : MENTOR_FIELDS

    const { data: entity, error: entityError } = await supabase
      .from(table)
      .select(fields)
      .eq('id', row.entity_id)
      .single()

    if (entityError || !entity) {
      return NextResponse.json({ valid: false, reason: 'entity_not_found' }, { status: 404 })
    }

    return NextResponse.json({
      valid: true,
      entity_type: row.entity_type,
      entity_id: row.entity_id,
      data: entity,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
