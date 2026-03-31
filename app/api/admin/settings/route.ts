// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/admin/settings — Fetch platform settings
 * PATCH /api/admin/settings — Update platform settings
 *
 * Uses sys_platform_settings table (key-value store).
 * Requires admin or staff_admin role.
 */

// Default settings — used as fallback when keys are missing from DB
const DEFAULT_SETTINGS: Record<string, string> = {
  emailNotifications: 'true',
  notifyOnCardReady: 'true',
  notifyOnVoteOpen: 'true',
  notifyOnMeetingDay: 'true',
  notifyOnNewMember: 'false',
  defaultCardBrowseDays: '21',
  defaultVoteDays: '7',
  defaultFollowupDays: '30',
  ghostApiUrl: '',
  ghostContentKey: '',
}

async function checkAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, isAdmin: false }

  const { data: roles } = await supabase
    .from('module_roles')
    .select('role')
    .eq('user_id', user.id)

  const userRoles = (roles || []).map((r: { role: string }) => r.role)
  const metadataRole = user.app_metadata?.platform_role
  const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'

  return { user, isAdmin }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { user, isAdmin } = await checkAdmin(supabase)

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Fetch all settings from sys_platform_settings
    const { data: rows, error } = await supabase
      .from('sys_platform_settings')
      .select('key, value')

    if (error) {
      // Table might not exist yet — return defaults gracefully
      console.warn('Settings fetch warning:', error.message)
      return NextResponse.json({ settings: DEFAULT_SETTINGS })
    }

    // Merge DB values over defaults
    const settings = { ...DEFAULT_SETTINGS }
    for (const row of rows || []) {
      settings[row.key] = row.value
    }

    return NextResponse.json({ settings })
  } catch (err) {
    console.error('Settings GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { user, isAdmin } = await checkAdmin(supabase)

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const { settings } = body as { settings: Record<string, string> }

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'settings object required' }, { status: 400 })
    }

    // Validate keys — only allow known setting keys
    const allowedKeys = Object.keys(DEFAULT_SETTINGS)
    const entries = Object.entries(settings).filter(([key]) => allowedKeys.includes(key))

    if (entries.length === 0) {
      return NextResponse.json({ error: 'No valid settings provided' }, { status: 400 })
    }

    // Upsert each setting (key-value pairs)
    const upsertRows = entries.map(([key, value]) => ({
      key,
      value: String(value),
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase
      .from('sys_platform_settings')
      .upsert(upsertRows, { onConflict: 'key' })

    if (error) {
      console.error('Settings PATCH error:', error)
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }

    return NextResponse.json({ success: true, updated: entries.length })
  } catch (err) {
    console.error('Settings PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
