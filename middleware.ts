import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env vars are missing (e.g. preview deployment), skip auth check
  if (!supabaseUrl || !supabaseKey) {
    supabaseResponse.headers.set('x-pathname', request.nextUrl.pathname)
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Public routes — all (public) group pages are accessible without auth
  const publicPaths = [
    '/about', '/team', '/mentors', '/advisory-board', '/corporate',
    '/programs', '/corporate-partners', '/co-events',
    '/accelerator', '/consulting', '/garage', '/angel', '/angel-apply', '/pitch',
    '/apply', '/faq', '/events', '/news', '/blog',
    '/contact', '/startups',
    '/tec-deals', '/podcast', '/alumni', '/careers',
    '/demo-day',
    '/privacy', '/terms',
    '/login', '/callback',
    '/auth/signout',
  ]
  // SEO assets — always public, no auth check
  const seoAssets = ['/robots.txt', '/sitemap.xml', '/favicon.ico']
  const isPublicRoute =
    pathname === '/' ||
    seoAssets.includes(pathname) ||
    publicPaths.some((route) => pathname === route || pathname.startsWith(route + '/')) ||
    pathname.startsWith('/vote/') ||
    pathname === '/en' ||
    pathname.startsWith('/en/') ||
    pathname === '/portal' ||
    pathname.startsWith('/portal/')
  // API routes handle their own auth via withApiHandler
  const isApiRoute = pathname.startsWith('/api/')

  // Defence-in-depth: enforce admin/staff_admin role at the edge for /api/admin/*
  // Individual endpoints still run their own requireAdmin() check — this is a
  // second gate so that a future endpoint that forgets to call requireAdmin()
  // is not silently exposed.
  if (pathname.startsWith('/api/admin/')) {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { data: roleRows } = await (supabase.from('module_roles') as any)
      .select('role')
      .eq('user_id', user.id)
    const roles: string[] = (roleRows ?? []).map((r: any) => r.role)
    if (!roles.includes('admin') && !roles.includes('staff_admin')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  // Redirect unauthenticated users to login (except public pages)
  if (!user && !isPublicRoute && !isApiRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Set pathname header for server-side role guards
  supabaseResponse.headers.set('x-pathname', pathname)

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html|ico|txt|xml|json)$).*)',
  ],
}
