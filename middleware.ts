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

  // Public routes — only login/callback + vote are live; other pages not yet ready
  const publicRoutes = [
    '/login', '/callback',
    '/vote',
  ]
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
  // API routes handle their own auth via withApiHandler
  const isApiRoute = pathname.startsWith('/api/')

  // Redirect unauthenticated users to login (except homepage landing page)
  if (!user && !isPublicRoute && !isApiRoute && pathname !== '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Authenticated user on public pages (/about, /programs, etc.) → redirect to portal
  // Homepage (/) is always visible (landing page); other public pages hidden until design confirmed
  if (user && pathname !== '/' && !isApiRoute && !pathname.startsWith('/admin') && !pathname.startsWith('/angel') && !pathname.startsWith('/login') && !pathname.startsWith('/callback') && !pathname.startsWith('/vote')) {
    const url = request.nextUrl.clone()
    url.pathname = '/angel/portal/upcoming'
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
