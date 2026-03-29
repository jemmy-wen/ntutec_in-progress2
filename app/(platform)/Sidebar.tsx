'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ANGEL_NAV, MENTOR_NAV, STARTUP_NAV, ADMIN_NAV, type NavItem } from '@/lib/constants/navigation'
import NotificationBell from '@/components/shared/NotificationBell'

interface SidebarProps {
  roles: string[]
  userEmail: string
}

export default function Sidebar({ roles, userEmail }: SidebarProps) {
  const pathname = usePathname()

  // Build navigation sections based on user roles
  const sections: { title: string; items: NavItem[] }[] = []

  if (roles.includes('admin') || roles.includes('staff_admin') || roles.includes('staff_accelerator')) {
    sections.push({ title: '後台管理', items: ADMIN_NAV })
  }
  if (roles.includes('angel_member')) {
    sections.push({ title: '天使俱樂部', items: ANGEL_NAV })
  }
  if (roles.includes('mentor')) {
    sections.push({ title: '業師健診', items: MENTOR_NAV })
  }
  if (roles.includes('team') || roles.includes('startup_incubated') || roles.includes('startup_fundraising')) {
    sections.push({ title: '團隊專區', items: STARTUP_NAV })
  }

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
        <Link href="/" className="font-bold text-lg">
          NTUTEC
        </Link>
        <NotificationBell />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User info */}
      <div className="border-t border-gray-100 p-4">
        <div className="text-sm text-gray-500 truncate">{userEmail}</div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {roles.map(role => (
            <span key={role} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {role}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
