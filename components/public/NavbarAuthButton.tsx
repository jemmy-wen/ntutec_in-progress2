'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { AnimatePresence, motion } from 'motion/react'
import { LogOut, User as UserIcon, LayoutDashboard, Star } from 'lucide-react'

interface NavbarAuthButtonProps {
  onNavigate?: () => void
}

export default function NavbarAuthButton({ onNavigate }: NavbarAuthButtonProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState<string[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchRoles(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchRoles(session.user.id)
      } else {
        setRoles([])
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchRoles(userId: string) {
    try {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from('module_roles') as any)
        .select('role')
        .eq('user_id', userId)
        .eq('is_active', true)
      setRoles((data || []).map((r: { role: string }) => r.role))
    } catch {
      // Non-critical — user still logged in, just no roles fetched
    } finally {
      setLoading(false)
    }
  }

  // Close on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  if (loading) {
    // Skeleton placeholder — same size as the button to prevent layout shift
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
  }

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-teal-600 text-teal-600 text-sm font-medium hover:bg-teal-600 hover:text-white transition-colors"
      >
        登入
      </Link>
    )
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    '使用者'

  const initial = displayName.charAt(0).toUpperCase()
  const isAdmin = roles.includes('admin') || roles.includes('staff_admin') || roles.includes('staff_accelerator')
  const isAngel = roles.includes('angel_member') || roles.includes('visitor')

  return (
    <div className="relative hidden lg:block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen((v) => !v)}
        aria-label="帳號選單"
        aria-expanded={dropdownOpen}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        {user.user_metadata?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.user_metadata.avatar_url}
            alt={displayName}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/30"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
            {initial}
          </div>
        )}
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-white shadow-lg z-50 overflow-hidden"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link
                href="/my"
                onClick={() => { setDropdownOpen(false); onNavigate?.() }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <UserIcon className="h-4 w-4" />
                我的頁面
              </Link>

              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => { setDropdownOpen(false); onNavigate?.() }}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  管理後台
                </Link>
              )}

              {isAngel && (
                <Link
                  href="/angel/portal/upcoming"
                  onClick={() => { setDropdownOpen(false); onNavigate?.() }}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  <Star className="h-4 w-4" />
                  天使專區
                </Link>
              )}
            </div>

            {/* Sign out */}
            <div className="border-t border-gray-100 py-1">
              <form action="/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  登出
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Mobile version — simpler, no dropdown, just links inline */
export function MobileNavbarAuthButton({ onNavigate }: NavbarAuthButtonProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className="btn-pill-outline text-center"
      >
        登入
      </Link>
    )
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    '使用者'

  return (
    <>
      <Link
        href="/my"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 py-2 text-sm text-teal-600 font-medium"
      >
        <span className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
          {displayName.charAt(0).toUpperCase()}
        </span>
        {displayName} 的頁面
      </Link>
      <form action="/auth/signout" method="POST">
        <button
          type="submit"
          className="w-full text-center text-sm text-gray-400 hover:text-red-500 transition-colors py-2"
        >
          登出帳號
        </button>
      </form>
    </>
  )
}
