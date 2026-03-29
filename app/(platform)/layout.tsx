import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getDefaultRoute, ROLE_ROUTE_MAP, hasAnyRole } from '@/lib/utils/roles'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch roles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: roleRows } = await (supabase.from('module_roles') as any)
    .select('role')
    .eq('user_id', user.id)
    .eq('is_active', true)
  const roles = (roleRows || []).map((r: { role: string }) => r.role)

  // Route guard: check if user has access to current path
  const headerList = await headers()
  const pathname = headerList.get('x-pathname') || ''
  for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTE_MAP)) {
    if (pathname.startsWith(routePrefix)) {
      if (!hasAnyRole(roles, allowedRoles)) {
        redirect(getDefaultRoute(roles))
      }
      break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <Sidebar roles={roles} userEmail={user.email || ''} />

      {/* Mobile nav */}
      <MobileNav roles={roles} />

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
