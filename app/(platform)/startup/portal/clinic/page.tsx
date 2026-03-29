'use client'

import { useState, useEffect } from 'react'

/**
 * Startup Clinic Page — Book mentor clinic sessions, view match results.
 * Integrates with P014 Mentor Matching system after migration.
 */

interface ClinicSession {
  id: string
  mentor_name: string
  specialties: string[]
  session_date: string
  session_time: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

export default function StartupClinicPage() {
  const [sessions, setSessions] = useState<ClinicSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/startup/clinic')
        if (res.ok) {
          const data = await res.json()
          setSessions(data.sessions || [])
        }
      } catch { /* ignore */ }
      setLoading(false)
    }
    load()
  }, [])

  const statusConfig = {
    scheduled: { label: '已排定', color: 'bg-blue-100 text-blue-700' },
    completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
    cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-500' },
  }

  if (loading) {
    return <div className="animate-pulse space-y-4"><div className="h-32 bg-gray-200 rounded-xl" /><div className="h-48 bg-gray-200 rounded-xl" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">業師健診</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          申請健診
        </button>
      </div>

      {sessions.length > 0 ? (
        <div className="space-y-3">
          {sessions.map(session => (
            <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{session.mentor_name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[session.status].color}`}>
                  {statusConfig[session.status].label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {session.specialties.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{s}</span>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(session.session_date).toLocaleDateString('zh-TW')} {session.session_time}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-3">🩺</div>
          <h2 className="text-lg font-semibold mb-2">業師健診系統即將啟用</h2>
          <p className="text-gray-500 text-sm">
            健診預約功能將從 P014 Mentor Matching 系統遷入。
            <br />您可在此申請健診、查看配對結果與健診紀錄。
          </p>
        </div>
      )}
    </div>
  )
}
