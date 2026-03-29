import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * Public layout — shared header/footer for unauthenticated pages.
 * Routes: /, /about, /programs, /startups, /angel, /mentors, /events, /contact
 */

export const metadata: Metadata = {
  title: {
    template: '%s | 台大創創中心 NTU TEC',
    default: '台大創創中心 | NTU Technology & Entrepreneurship Center',
  },
  description: '台灣大學創意創業中心以創業教育、育成輔導、天使投資三軌並行，打造台灣最具影響力的大學創業生態系。',
  openGraph: {
    siteName: 'NTU TEC 台大創創中心',
    locale: 'zh_TW',
    type: 'website',
  },
}

const NAV_LINKS = [
  { label: '關於我們', href: '/about' },
  { label: '輔導計畫', href: '/programs' },
  { label: '新創團隊', href: '/startups' },
  { label: '天使俱樂部', href: '/angel' },
  { label: '業師陣容', href: '/mentors' },
  { label: '活動', href: '/events' },
  { label: '聯絡', href: '/contact' },
]

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">NTU TEC</span>
              <span className="text-sm text-gray-500 hidden sm:inline">台大創創中心</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                登入
              </Link>
              <Link
                href="/contact"
                className="hidden sm:inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                聯絡我們
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">NTU TEC</h3>
              <p className="text-sm">
                台灣大學創意創業中心
                <br />National Taiwan University
                <br />Technology and Entrepreneurship Center
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">服務</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/programs" className="hover:text-white transition-colors">輔導計畫</Link></li>
                <li><Link href="/angel" className="hover:text-white transition-colors">天使俱樂部</Link></li>
                <li><Link href="/mentors" className="hover:text-white transition-colors">業師健診</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">活動</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">資訊</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">關於我們</Link></li>
                <li><Link href="/startups" className="hover:text-white transition-colors">新創團隊</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">聯絡我們</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">聯絡</h4>
              <ul className="space-y-2 text-sm">
                <li>台北市大安區羅斯福路四段一號</li>
                <li>台大水源校區卓越研究大樓</li>
                <li>tec@ntu.edu.tw</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} NTU Technology and Entrepreneurship Center. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
