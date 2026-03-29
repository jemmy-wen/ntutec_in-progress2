// @ts-nocheck
/**
 * GET /api/auth/me
 *   → Get current user profile + roles
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: '未登入' }, { status: 401 })
  }

  // Fetch roles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: roleRows } = await (supabase.from('module_roles') as any)
    .select('role, module')
    .eq('user_id', user.id)
    .eq('is_active', true)

  const roles = (roleRows || []).map((r: { role: string; module: string }) => ({
    role: r.role,
    module: r.module,
  }))

  // Fetch angel member profile if applicable
  let angelProfile = null
  if (roles.some((r: { role: string }) => r.role === 'angel_member')) {
    const { data } = await supabase
      .from('angel_members')
      .select('id, display_name, tier, status')
      .eq('user_id', user.id)
      .maybeSingle()
    angelProfile = data
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      roles,
      angelProfile,
    },
  })
}
