import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getDefaultRoute } from '@/lib/utils/roles'
import Link from 'next/link'

/**
 * Root page — entry point for all visitors.
 * - Unauthenticated → show public homepage (three audience entries)
 * - Authenticated → redirect to role-based landing page
 *
 * Note: The (public) route group provides full public pages (about, programs, etc.)
 * with their own layout (header/footer). This root page is a standalone entry.
 */
export default async function RootPage() {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch { /* not authenticated */ }

  if (user) {
    // Authenticated user — redirect to role-based landing page
    try {
      const supabase = await createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: roleRows } = await (supabase.from('module_roles') as any)
        .select('role')
        .eq('user_id', user.id)
        .eq('is_active', true)
      const roles = (roleRows || []).map((r: { role: string }) => r.role) as string[]
      redirect(getDefaultRoute(roles))
    } catch (err) {
      // If redirect throws (it does in Next.js), rethrow
      throw err
    }
  }

  // Unauthenticated — minimal landing with links to public pages
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center text-white">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold mb-4">NTU TEC</h1>
        <p className="text-xl text-blue-200 mb-2">台大創意創業中心</p>
        <p className="text-blue-300 mb-10">
          創業教育 · 育成輔導 · 天使投資
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/about" className="px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            了解更多
          </Link>
          <Link href="/login" className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
            登入平台
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-300">
          <Link href="/programs" className="hover:text-white transition-colors">輔導計畫</Link>
          <Link href="/angel" className="hover:text-white transition-colors">天使俱樂部</Link>
          <Link href="/mentors" className="hover:text-white transition-colors">業師陣容</Link>
          <Link href="/startups" className="hover:text-white transition-colors">新創團隊</Link>
          <Link href="/events" className="hover:text-white transition-colors">活動</Link>
          <Link href="/contact" className="hover:text-white transition-colors">聯絡我們</Link>
        </div>
      </div>
    </main>
  )
}
