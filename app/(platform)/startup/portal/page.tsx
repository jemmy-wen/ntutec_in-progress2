'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

/**
 * Startup Portal Home — Dashboard for incubated/fundraising startups.
 * Shows: current programs, mentor clinic status, upcoming events, application status.
 */

interface StartupProfile {
  id: string
  name: string
  status: string
  program: string | null
  mentor_sessions_remaining: number
}

export default function StartupHome() {
  const [profile, setProfile] = useState<StartupProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/startup/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.profile)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadProfile() }, [loadProfile])

  if (loading) {
    return <div className="animate-pulse space-y-4"><div className="h-32 bg-gray-200 rounded-xl" /></div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">團隊首頁</h1>

      {profile ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-semibold">{profile.name}</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {profile.status === 'incubated' ? '育成中' : '募資中'}
            </span>
          </div>
          {profile.program && (
            <p className="text-sm text-gray-600 mb-4">目前計畫：{profile.program}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>剩餘健診場次：</span>
            <span className="font-bold text-gray-900">{profile.mentor_sessions_remaining}</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <p className="text-gray-500 mb-4">尚未建立團隊資料</p>
          <Link
            href="/startup/portal/profile"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            建立團隊資料
          </Link>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/startup/portal/clinic" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors">
          <div className="font-semibold mb-1">業師健診</div>
          <div className="text-sm text-gray-500">預約健診、查看配對結果</div>
        </Link>
        <Link href="/startup/portal/profile" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors">
          <div className="font-semibold mb-1">團隊資料</div>
          <div className="text-sm text-gray-500">編輯團隊介紹與募資資訊</div>
        </Link>
        <Link href="/startup/portal/events" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-green-300 transition-colors">
          <div className="font-semibold mb-1">活動報名</div>
          <div className="text-sm text-gray-500">查看與報名創創活動</div>
        </Link>
        <Link href="/startup/portal/resources" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-purple-300 transition-colors">
          <div className="font-semibold mb-1">資源中心</div>
          <div className="text-sm text-gray-500">輔導資源與範本下載</div>
        </Link>
      </div>
    </div>
  )
}
