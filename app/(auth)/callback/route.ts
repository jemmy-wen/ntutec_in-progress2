import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getDefaultRoute } from '@/lib/utils/roles'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectParam = searchParams.get('redirect') || ''

  if (code) {
    const cookiesToSetOnResponse: { name: string; value: string; options: Record<string, unknown> }[] = []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach((cookie) => {
              cookiesToSetOnResponse.push(cookie)
            })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Auto-assign angel_member role if user has no roles
      const admin = createAdminClient()
      const { data: existingRoles } = await admin
        .from('module_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('is_active', true)

      const roles = (existingRoles || []).map((r: { role: string }) => r.role)

      let isNewUser = false
      if (roles.length === 0) {
        // New user — auto-assign angel_member
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (admin.from('module_roles') as any).insert({
          user_id: data.user.id,
          module: 'angel_club',
          role: 'angel_member',
          is_active: true,
        })
        roles.push('angel_member')
        isNewUser = true
      }

      // Smart redirect:
      // - New users → onboarding wizard first
      // - Explicit redirect param → use it
      // - Otherwise → role-based default
      const isExplicitRedirect = redirectParam && redirectParam !== '/' && redirectParam.startsWith('/')
      const targetPath = isNewUser
        ? '/angel/onboarding'
        : isExplicitRedirect ? redirectParam : getDefaultRoute(roles)

      const response = NextResponse.redirect(new URL(targetPath, origin))
      cookiesToSetOnResponse.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options as Record<string, string>)
      })
      return response
    }
  }

  return NextResponse.redirect(new URL('/login', origin))
}
