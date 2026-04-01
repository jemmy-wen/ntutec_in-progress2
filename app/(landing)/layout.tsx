import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTUTEC ANGELS — 臺大天使會',
  description: '台大創業生態系的投資入口。精選案源、決策支持、投資人社群。',
}

/**
 * Landing page layout — standalone, no PublicHeader/Footer.
 * Only used for the homepage landing page.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
