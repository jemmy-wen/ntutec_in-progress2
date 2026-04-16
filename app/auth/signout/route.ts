import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// POST-only to prevent CSRF via <img src>, <a href>, prefetch, etc.
// All UI callers already use <form method="POST"> — see NavbarAuthButton and my/page.tsx.
export async function POST() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    { status: 303 }
  )
}
