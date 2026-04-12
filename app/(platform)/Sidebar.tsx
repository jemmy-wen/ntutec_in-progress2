'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ANGEL_NAV, ADMIN_NAV, type NavItem } from '@/lib/constants/navigation'
import NotificationBell from '@/components/shared/NotificationBell'

interface SidebarProps {
  roles: string[]
  userEmail: string
}

const ROLE_LABELS: Record<string, string> = {
  admin: '管理員', staff_admin: '行政人員', staff_accelerator: '加速器同仁',
  angel_member: '天使會員', mentor: '業師', team: '團隊',
  startup_incubated: '育成團隊', startup_fundraising: '募資團隊',
}

export default function Sidebar({ roles, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const [formsNewCount, setFormsNewCount] = useState(0)

  useEffect(() => {
    const isAdmin = roles.includes('admin') || roles.includes('staff_admin')
    if (!isAdmin) return
    fetch('/api/admin/forms?status=new&limit=1')
      .then((r) => r.json())
      .then((json) => setFormsNewCount(json.newCount || 0))
      .catch(() => {/* silent */})
  }, [roles])

  // Build navigation sections based on user roles
  const sections: { title: string; items: NavItem[] }[] = []

  if (roles.includes('admin') || roles.includes('staff_admin') || roles.includes('staff_accelerator')) {
    sections.push({ title: '後台管理', items: ADMIN_NAV })
  }
  // Angel portal — open for angel_member and admin
  if (roles.includes('angel_member') || roles.includes('admin')) {
    sections.push({ title: '天使俱樂部', items: ANGEL_NAV })
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
              const isForms = item.href === '/admin/forms'
              const badge = isForms && formsNewCount > 0 ? formsNewCount : null
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {badge !== null && (
                    <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                      {badge > 99 ? '99+' : badge}
                    </span>
                  )}
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
              {ROLE_LABELS[role] || role}
            </span>
          ))}
        </div>
        <button
          onClick={async () => {
            const { createClient } = await import('@/lib/supabase/client')
            const supabase = createClient()
            await supabase.auth.signOut()
            window.location.href = '/login'
          }}
          className="w-full mt-3 text-sm text-red-600 hover:text-red-700 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          登出
        </button>
      </div>
    </aside>
  )
}
