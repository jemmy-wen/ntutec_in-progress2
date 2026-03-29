'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import CycleProgressBar, { MENTOR_STAGES } from '@/components/shared/CycleProgressBar'

interface Cycle {
  id: string
  status: string
}

const PHASE_ACTIONS: Record<string, { label: string; href: string; description: string }> = {
  mentor_submit: { label: '提交時段', href: '/mentor/portal/slots', description: '設定您的可用時段與個人資料' },
  supply_review: { label: '查看時段', href: '/mentor/portal/slots', description: '您的時段已提交，等待管理方確認' },
  mentor_review: { label: '篩選團隊', href: '/mentor/portal/matches', description: '查看申請團隊並做出篩選' },
  feedback: { label: '填寫回饋', href: '/mentor/portal/feedback', description: '為健診場次填寫回饋' },
}

export default function MentorHome() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [loading, setLoading] = useState(true)

  const loadCycles = useCallback(async () => {
    try {
      const res = await fetch('/api/mentor/cycles')
      if (res.ok) {
        const data = await res.json()
        setCycles(Array.isArray(data) ? data : data.cycles || [])
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadCycles() }, [loadCycles])

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-32 bg-gray-200 rounded-xl" /></div>

  const activeCycle = cycles.find(c => c.status !== 'setup') || cycles[0]
  const action = activeCycle ? PHASE_ACTIONS[activeCycle.status] : null

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">業師首頁</h1>

      {activeCycle && (
        <CycleProgressBar stages={MENTOR_STAGES} currentStatus={activeCycle.status} />
      )}

      {activeCycle ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-semibold">{activeCycle.id}</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {activeCycle.status}
            </span>
          </div>

          {action ? (
            <div>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <Link
                href={action.href}
                className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                {action.label} →
              </Link>
            </div>
          ) : (
            <p className="text-gray-500">目前階段無需操作，請耐心等候。</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-500">目前沒有進行中的週期</p>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/mentor/portal/slots" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors">
          <div className="font-semibold mb-1">我的時段</div>
          <div className="text-sm text-gray-500">管理可用時段與個人資料</div>
        </Link>
        <Link href="/mentor/portal/matches" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors">
          <div className="font-semibold mb-1">配對結果</div>
          <div className="text-sm text-gray-500">查看配對的團隊資訊</div>
        </Link>
        <Link href="/mentor/portal/feedback" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-green-300 transition-colors">
          <div className="font-semibold mb-1">回饋填寫</div>
          <div className="text-sm text-gray-500">為健診場次填寫回饋</div>
        </Link>
        <Link href="/mentor/portal/history" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 transition-colors">
          <div className="font-semibold mb-1">歷史紀錄</div>
          <div className="text-sm text-gray-500">過往健診與回饋</div>
        </Link>
      </div>
    </div>
  )
}
