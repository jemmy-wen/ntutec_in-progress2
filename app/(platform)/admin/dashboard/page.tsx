'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { STATUS_LABELS, STATUS_COLORS, type MeetingCycleStatus } from '@/lib/utils/state-machine'
import { ErrorState } from '@/components/shared/ErrorState'

interface DashboardStats {
  activeMeeting: { id: string; status: string; meeting_date: string } | null
  memberCount: number
  engagementSummary: { active: number; moderate: number; low: number }
}

function formatCycleId(id: string): string {
  const match = id.match(/^(\d{4})-(0[1-9]|1[0-2])$/)
  if (match) return `${match[1]} 年 ${parseInt(match[2])} 月`
  return id
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [meetingsRes, membersRes, engagementRes] = await Promise.all([
          fetch('/api/meetings'),
          fetch('/api/members'),
          fetch('/api/engagement'),
        ])

        const meetings = meetingsRes.ok ? (await meetingsRes.json()).meetings : []
        const members = membersRes.ok ? (await membersRes.json()).members : []
        const engagement = engagementRes.ok ? (await engagementRes.json()).summary : { active: 0, moderate: 0, low: 0 }

        const active = meetings.find((m: { status: string }) => m.status !== 'closed') || null

        setStats({
          activeMeeting: active,
          memberCount: members.length,
          engagementSummary: engagement,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : '載入儀表板資料失敗')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="space-y-4"><div className="h-32 bg-gray-200 rounded-xl animate-pulse" /><div className="h-64 bg-gray-200 rounded-xl animate-pulse" /></div>
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); location.reload() }} />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">管理後台</h1>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="天使會員" value={stats?.memberCount || 0} />
        <StatCard label="活躍" value={stats?.engagementSummary.active || 0} color="text-green-600" />
        <StatCard label="中度參與" value={stats?.engagementSummary.moderate || 0} color="text-yellow-600" />
        <StatCard label="低參與" value={stats?.engagementSummary.low || 0} color="text-red-600" />
      </div>

      {/* Active meeting */}
      {stats?.activeMeeting ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">進行中月會</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              STATUS_COLORS[stats.activeMeeting.status as MeetingCycleStatus] || 'bg-gray-100'
            }`}>
              {STATUS_LABELS[stats.activeMeeting.status as MeetingCycleStatus] || stats.activeMeeting.status}
            </span>
          </div>
          <p className="text-gray-600">{formatCycleId(stats.activeMeeting.id)} — {new Date(stats.activeMeeting.meeting_date).toLocaleDateString('zh-TW')}</p>
          <div className="mt-4 flex gap-3">
            <Link href="/admin/meetings" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              管理月會 →
            </Link>
            <Link href="/admin/investors" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              會員管理 →
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-500 mb-4">目前沒有進行中的月會</p>
          <Link href="/admin/meetings" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            建立新月會
          </Link>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickLink href="/admin/meetings" title="月會管理" desc="建立週期、切換狀態、管理候選" />
        <QuickLink href="/admin/investors" title="投資人管理" desc="會員列表、活躍度、偏好" />
        <QuickLink href="/admin/pipeline" title="Pipeline" desc="漏斗管理、觀察池、Gate" />
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className={`text-2xl font-bold ${color || 'text-gray-900'}`}>{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors block">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm text-gray-500">{desc}</div>
    </Link>
  )
}
