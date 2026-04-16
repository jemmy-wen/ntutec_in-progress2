import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    // Auth check: require logged-in user with admin module role
    const userClient = await createClient()
    const { data: { user } } = await userClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceDb = createServiceClient()
    const { data: role } = await serviceDb
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('module', 'admin')
      .eq('is_active', true)
      .single()

    if (!role) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { entity_type, entity_id, email } = body as {
      entity_type?: string
      entity_id?: string
      email?: string
    }

    if (!entity_type || !entity_id || !email) {
      return NextResponse.json({ error: 'Missing entity_type, entity_id, or email' }, { status: 400 })
    }

    if (entity_type !== 'startup' && entity_type !== 'mentor') {
      return NextResponse.json({ error: 'entity_type must be startup or mentor' }, { status: 400 })
    }

    const token = crypto.randomBytes(32).toString('hex')

    const { error } = await serviceDb.from('portal_tokens').insert({
      token,
      entity_type,
      entity_id,
      email,
    })

    if (error) {
      return NextResponse.json({ error: 'Failed to create token' }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ntutec.com'
    const portal_url = `${baseUrl}/portal?token=${token}`

    return NextResponse.json({ success: true, portal_url })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
