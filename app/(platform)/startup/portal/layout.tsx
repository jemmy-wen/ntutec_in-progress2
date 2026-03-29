'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/startup/portal', label: '首頁', exact: true },
  { href: '/startup/portal/clinic', label: '業師健診', exact: false },
  { href: '/startup/portal/profile', label: '團隊資料', exact: false },
  { href: '/startup/portal/events', label: '活動報名', exact: false },
  { href: '/startup/portal/resources', label: '資源中心', exact: false },
]

export default function StartupPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  function isActive(item: typeof NAV_ITEMS[number]) {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <nav className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1 min-w-max border-b border-gray-200">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive(item)
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Page content */}
      {children}
    </div>
  )
}
