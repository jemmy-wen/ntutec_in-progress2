// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/mentor/slots — Fetch mentor's available slots + profile
 * POST /api/mentor/slots — Save mentor profile + available slots
 *
 * Slots schema will be migrated from P014 mentor_slots table.
 * Current implementation uses mentor_profiles as a combined store.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch mentor profile
    const { data: profile } = await supabase
      .from('mentor_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Fetch mentor slots
    const { data: slots } = await supabase
      .from('mentor_slots')
      .select('*')
      .eq('mentor_id', profile?.id)
      .gte('slot_date', new Date().toISOString().split('T')[0])
      .order('slot_date', { ascending: true })

    return NextResponse.json({
      profile: profile || null,
      slots: slots || [],
    })
  } catch (err) {
    console.error('Mentor slots GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, specialties, bio, slots } = body

    // Upsert mentor profile
    const { data: profile, error: profileError } = await supabase
      .from('mentor_profiles')
      .upsert({
        user_id: user.id,
        display_name: name,
        specialties: specialties || [],
        bio: bio || '',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      .select()
      .single()

    if (profileError) {
      console.error('Mentor profile upsert error:', profileError)
      return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
    }

    // Save slots if provided
    if (Array.isArray(slots) && slots.length > 0 && profile) {
      // Delete existing future slots, then insert new ones
      await supabase
        .from('mentor_slots')
        .delete()
        .eq('mentor_id', profile.id)
        .gte('slot_date', new Date().toISOString().split('T')[0])

      const slotRows = slots.map((s: { date: string; time: string }) => ({
        mentor_id: profile.id,
        slot_date: s.date,
        slot_time: s.time,
        is_available: true,
      }))

      const { error: slotError } = await supabase
        .from('mentor_slots')
        .insert(slotRows)

      if (slotError) {
        console.error('Mentor slots insert error:', slotError)
        return NextResponse.json({ error: 'Profile saved but slots failed' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, profile })
  } catch (err) {
    console.error('Mentor slots POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
