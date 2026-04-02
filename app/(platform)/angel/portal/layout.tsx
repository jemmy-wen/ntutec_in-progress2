'use client'

import { usePathname } from 'next/navigation'
import { MemberGate } from '@/components/shared/MemberGate'

/** Pages open to all logged-in users (including visitors) */
const PUBLIC_PORTAL_PATHS = ['/angel/portal/upcoming', '/angel/portal/profile', '/angel/onboarding']

/**
 * Angel Portal layout — visitor sees upcoming + profile only.
 * All other sub-pages require angel_member role (paid).
 */
export default function AngelPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicPage = PUBLIC_PORTAL_PATHS.some(p => pathname.startsWith(p))

  if (isPublicPage) {
    return <>{children}</>
  }

  return <MemberGate>{children}</MemberGate>
}
