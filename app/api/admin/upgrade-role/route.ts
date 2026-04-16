/**
 * POST /api/admin/upgrade-role
 *
 * Admin-only: upgrade a user's role (e.g., visitor → angel_member)
 *
 * Body: { user_id: string, new_role: string }
 */

import { NextResponse } from 'next/server'
import { withApiHandler, requireFields, isValidUUID } from '@/lib/api/handler'

const ALLOWED_ROLES = ['visitor', 'angel_member', 'mentor', 'team'] as const

export const POST = withApiHandler(
  {
    roles: ['admin', 'staff_admin'],
    // Privilege-escalation endpoint: 5 req/min per IP
    rateLimit: 'privileged-admin',
    audit: { action: 'role_change', entityType: 'user' },
  },
  async (ctx) => {
    const missing = requireFields(ctx.body, 'user_id', 'new_role')
    if (missing) {
      return NextResponse.json({ error: missing }, { status: 400 })
    }

    const userId = ctx.body!.user_id as string
    const newRole = ctx.body!.new_role as string

    if (!isValidUUID(userId)) {
      return NextResponse.json({ error: '無效的 user_id' }, { status: 400 })
    }

    if (!ALLOWED_ROLES.includes(newRole as typeof ALLOWED_ROLES[number])) {
      return NextResponse.json(
        { error: `不允許的角色。可用: ${ALLOWED_ROLES.join(', ')}` },
        { status: 400 }
      )
    }

    // Check target user exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingRoles, error: fetchError } = await (ctx.supabase.from('module_roles') as any)
      .select('id, role, module')
      .eq('user_id', userId)
      .eq('module', 'angel_club')
      .eq('is_active', true)

    if (fetchError) {
      return NextResponse.json({ error: '查詢角色失敗' }, { status: 500 })
    }

    const rows = existingRoles as { id: string; role: string; module: string }[] | null
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: '找不到該用戶的角色記錄' }, { status: 404 })
    }

    const currentRole = rows[0].role
    if (currentRole === newRole) {
      return NextResponse.json({ error: `用戶已是 ${newRole}` }, { status: 400 })
    }

    // Update role
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateError } = await (ctx.supabase.from('module_roles') as any)
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', rows[0].id)

    if (updateError) {
      return NextResponse.json({ error: '更新角色失敗' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user_id: userId,
      previous_role: currentRole,
      new_role: newRole,
    })
  }
)
