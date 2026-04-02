'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface MemberGateProps {
  children: React.ReactNode
  /** Fallback shown to visitors (non-paid members). Defaults to upgrade CTA. */
  fallback?: React.ReactNode
}

/**
 * Client-side gate: shows children only if user has angel_member or admin role.
 * Visitors see a CTA to upgrade their membership.
 */
export function MemberGate({ children, fallback }: MemberGateProps) {
  const [status, setStatus] = useState<'loading' | 'member' | 'visitor'>('loading')

  useEffect(() => {
    async function check() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setStatus('visitor')
          return
        }

        const { data: roles } = await supabase
          .from('module_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('is_active', true)

        const roleList = (roles || []).map((r: { role: string }) => r.role)
        const isPaid = roleList.includes('admin') || roleList.includes('staff_admin') || roleList.includes('angel_member')
        setStatus(isPaid ? 'member' : 'visitor')
      } catch {
        setStatus('visitor')
      }
    }
    check()
  }, [])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
      </div>
    )
  }

  if (status === 'member') {
    return <>{children}</>
  }

  // Visitor fallback
  if (fallback) return <>{fallback}</>

  return <UpgradeCTA />
}

function UpgradeCTA() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-6">🔒</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">此頁面僅限天使會員</h2>
        <p className="text-slate-500 mb-8">
          成為臺大天使會 NTUTEC ANGELS 正式會員，即可查看投資摘要、參與投票、瀏覽深度分析等完整功能。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:howard.chiang@ntutec.com?subject=申請加入臺大天使會"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            聯繫申請會員
          </a>
          <Link
            href="/angel/portal/upcoming"
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
