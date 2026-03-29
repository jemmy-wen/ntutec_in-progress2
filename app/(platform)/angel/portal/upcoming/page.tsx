'use client'

import { useState, useEffect } from 'react'
import { STATUS_LABELS, STATUS_COLORS, type MeetingCycleStatus } from '@/lib/utils/state-machine'

interface Meeting {
  id: string
  meeting_date: string
  status: string
}

interface CardStats {
  total: number
  responded: number
}

export default function UpcomingPage() {
  const [meeting, setMeeting] = useState<Meeting | null>(null)
  const [stats, setStats] = useState<CardStats>({ total: 0, responded: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/meetings')
      if (res.ok) {
        const data = await res.json()
        const active = (data.meetings || []).find(
          (m: Meeting) => m.status !== 'closed'
        )
        if (active) {
          setMeeting(active)
          // Load card stats
          const cardsRes = await fetch(`/api/cards?cycle_id=${active.id}`)
          if (cardsRes.ok) {
            const cardsData = await cardsRes.json()
            const total = (cardsData.pitches || []).length
            const responded = Object.keys(cardsData.myResponses || {}).length
            setStats({ total, responded })
          }
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return <div className="animate-pulse space-y-4"><div className="h-32 bg-gray-200 rounded-xl" /><div className="h-24 bg-gray-200 rounded-xl" /></div>
  }

  if (!meeting) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📅</div>
        <h2 className="text-xl font-bold mb-2">目前沒有進行中的月會</h2>
        <p className="text-gray-500">下次月會安排後會收到通知</p>
      </div>
    )
  }

  const status = meeting.status as MeetingCycleStatus
  const statusLabel = STATUS_LABELS[status] || status
  const statusColor = STATUS_COLORS[status] || 'bg-gray-100 text-gray-700'
  const meetingDate = new Date(meeting.meeting_date).toLocaleDateString('zh-TW', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const daysUntil = Math.ceil((new Date(meeting.meeting_date).getTime() - Date.now()) / 86400000)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">下次月會</h1>

      {/* Meeting info card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{meeting.id} 月會</h2>
            <p className="text-gray-500">{meetingDate}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {daysUntil > 0 && (
          <div className="text-sm text-gray-600">
            距離月會還有 <span className="font-bold text-blue-600">{daysUntil}</span> 天
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-4 bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${stats.total > 0 ? (stats.responded / stats.total) * 100 : 0}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          已瀏覽 {stats.responded}/{stats.total} 家候選新創
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(status === 'cards_ready' || status === 'vote_open') && (
          <a
            href="/angel/portal/cards"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors"
          >
            <div className="text-lg font-semibold mb-1">瀏覽新創</div>
            <div className="text-sm text-gray-500">查看候選新創的 6 張資訊卡片</div>
          </a>
        )}
        {status === 'vote_open' && (
          <a
            href="/angel/portal/vote"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-purple-300 transition-colors"
          >
            <div className="text-lg font-semibold mb-1">投資意向</div>
            <div className="text-sm text-gray-500">確認投票（截止前必須完成）</div>
          </a>
        )}
        <a
          href="/angel/portal/learn"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-green-300 transition-colors"
        >
          <div className="text-lg font-semibold mb-1">學習中心</div>
          <div className="text-sm text-gray-500">產業觀察、投資知識、案例覆盤</div>
        </a>
        <a
          href="/angel/portal/digest"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-amber-300 transition-colors"
        >
          <div className="text-lg font-semibold mb-1">Angel Digest</div>
          <div className="text-sm text-gray-500">月度投資情報電子報</div>
        </a>
      </div>
    </div>
  )
}
