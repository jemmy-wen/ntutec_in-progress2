import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/**
 * Angel Portal layout — controls which sub-pages are accessible.
 * During Phase 3 soft-launch, only a subset of pages are open.
 * Other pages redirect to /angel/portal/upcoming.
 */

// Pages open for angel members during soft-launch
const OPEN_PAGES = [
  '/angel/portal/upcoming',
  '/angel/portal/profile',
  '/angel/onboarding',
]

export default async function AngelPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = await headers()
  const pathname = headerList.get('x-pathname') || ''

  // If accessing a page that's not yet open, redirect to upcoming
  if (pathname.startsWith('/angel/portal/')) {
    const isOpen = OPEN_PAGES.some(p => pathname === p || pathname.startsWith(p + '/'))
    if (!isOpen) {
      redirect('/angel/portal/upcoming')
    }
  }

  return <>{children}</>
}
