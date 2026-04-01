'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ANGEL_NAV, ADMIN_NAV, type NavItem } from '@/lib/constants/navigation'
import NotificationBell from '@/components/shared/NotificationBell'

interface MobileNavProps {
  roles: string[]
}

export default function MobileNav({ roles }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const sections: { title: string; items: NavItem[] }[] = []
  if (roles.includes('admin') || roles.includes('staff_admin') || roles.includes('staff_accelerator')) {
    sections.push({ title: '後台管理', items: ADMIN_NAV })
  }
  // Angel portal — open for angel_member and admin
  if (roles.includes('angel_member') || roles.includes('admin')) {
    sections.push({ title: '天使俱樂部', items: ANGEL_NAV })
  }

  return (
    <>
      {/* Top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          aria-label="開啟選單"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold">NTUTEC</span>
        <NotificationBell />
      </div>

      {/* Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
              <span className="font-bold text-lg">NTUTEC</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg"
                aria-label="關閉選單"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <nav className="py-4 px-3">
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
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                          isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </nav>
            <div className="border-t border-gray-100 p-4">
              <button
                onClick={async () => {
                  const { createClient } = await import('@/lib/supabase/client')
                  const supabase = createClient()
                  await supabase.auth.signOut()
                  window.location.href = '/login'
                }}
                className="w-full text-sm text-red-600 hover:text-red-700 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
