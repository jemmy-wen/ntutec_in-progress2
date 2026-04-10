import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
    '/programs', '/corporate-partners', '/competition', '/co-events',
    '/accelerator', '/consulting', '/garage', '/angel', '/angel-apply',
    '/apply', '/faq', '/portfolio', '/events', '/news', '/blog',
    '/contact', '/startups',
    '/login', '/callback',
  ]
  const isPublicRoute =
    pathname === '/' ||
    publicPaths.some((route) => pathname === route || pathname.startsWith(route + '/')) ||
    pathname.startsWith('/vote/')
  // API routes handle their own auth via withApiHandler
  const isApiRoute = pathname.startsWith('/api/')

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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
