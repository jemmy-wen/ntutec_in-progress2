'use client'

/**
 * NavbarAuthButton — dynamic wrapper
 *
 * Lazy-loads the auth button (which pulls in @supabase/supabase-js, ~152 KB)
 * so it doesn't bloat every public page's initial JS bundle.
 *
 * The inner component renders a skeleton placeholder while loading to prevent
 * layout shift. ssr: false is safe here because the real UI only differs once
 * client-side session is resolved — server HTML already renders the skeleton.
 */

import dynamic from 'next/dynamic'

const DesktopInner = dynamic(
  () => import('./NavbarAuthButtonInner').then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="hidden lg:block w-8 h-8 rounded-full bg-gray-200 animate-pulse"
      />
    ),
  }
)

const MobileInner = dynamic(
  () =>
    import('./NavbarAuthButtonInner').then((m) => m.MobileNavbarAuthButtonInner),
  {
    ssr: false,
    loading: () => null,
  }
)

interface NavbarAuthButtonProps {
  onNavigate?: () => void
  transparent?: boolean
}

export default function NavbarAuthButton(props: NavbarAuthButtonProps) {
  return <DesktopInner {...props} />
}

export function MobileNavbarAuthButton(props: NavbarAuthButtonProps) {
  return <MobileInner {...props} />
}
