'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface Member {
  id: string
  name: string
  organization: string | null
  title: string | null
  angel_tier: string | null
  focus_sectors: string[] | null
  membership_year: number | null
  annual_fee_status: string | null
  joined_year: number | null
}

const TIER_COLORS: Record<string, string> = {
  S: 'bg-amber-50 text-amber-700 border-amber-200',
  A: 'bg-teal-50 text-teal-700 border-teal-200',
  B: 'bg-blue-50 text-blue-700 border-blue-200',
}

const STATUS_LABELS: Record<string, string> = {
  active: '有效會員',
  expired: '已到期',
  pending: '待確認',
  grace: '寬限期',
}

function MemberCard({ member }: { member: Member }) {
  const tierColor = member.angel_tier ? (TIER_COLORS[member.angel_tier] ?? 'bg-gray-50 text-gray-600 border-gray-200') : null
  const sectors = (member.focus_sectors ?? []).slice(0, 3)
  const joinedYear = member.joined_year ?? member.membership_year

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">{member.name}</div>
          {member.title && (
            <div className="text-sm text-gray-500 truncate">{member.title}</div>
          )}
        </div>
        {member.angel_tier && tierColor && (
          <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded border ${tierColor}`}>
            Tier {member.angel_tier}
          </span>
        )}
      </div>

      {/* Organization */}
      <div className="text-sm text-gray-700 font-medium truncate">
        {member.organization ?? <span className="text-gray-400 font-normal">–</span>}
      </div>

      {/* Focus sectors */}
      {sectors.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {sectors.map((s) => (
            <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
          {(member.focus_sectors?.length ?? 0) > 3 && (
            <span className="text-xs text-gray-400">+{(member.focus_sectors?.length ?? 0) - 3}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 mt-auto border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {joinedYear ? `加入 ${joinedYear}` : '–'}
        </span>
        {member.annual_fee_status && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            member.annual_fee_status === 'active'
              ? 'bg-green-50 text-green-700'
              : 'bg-gray-100 text-gray-500'
          }`}>
            {STATUS_LABELS[member.annual_fee_status] ?? member.annual_fee_status}
          </span>
        )}
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="space-y-1.5 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/5" />
          <div className="h-3 bg-gray-100 rounded w-2/5" />
        </div>
        <div className="h-5 w-12 bg-gray-100 rounded" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-4/5" />
      <div className="flex gap-1.5">
        <div className="h-5 w-14 bg-gray-100 rounded-full" />
        <div className="h-5 w-16 bg-gray-100 rounded-full" />
      </div>
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="h-3 w-16 bg-gray-100 rounded" />
        <div className="h-4 w-14 bg-gray-100 rounded-full" />
      </div>
    </div>
  )
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [activeOnly, setActiveOnly] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const params = new URLSearchParams()
      if (activeOnly) params.set('active', '1')
      const res = await fetch(`/api/angel/members?${params}`)
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setMembers(data.members ?? [])
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [activeOnly])

  useEffect(() => { load() }, [load])

  // Client-side search filter
  const filtered = useMemo(() => {
    if (!search.trim()) return members
    const q = search.trim().toLowerCase()
    return members.filter((m) =>
      (m.name ?? '').toLowerCase().includes(q) ||
      (m.organization ?? '').toLowerCase().includes(q) ||
      (m.title ?? '').toLowerCase().includes(q)
    )
  }, [members, search])

  if (error) {
    return <ErrorState message="載入失敗" onRetry={load} />
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">會員名錄</h1>
        <p className="text-sm text-gray-500 mt-1">台大天使俱樂部成員列表</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋姓名、公司、職稱..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={(e) => setActiveOnly(e.target.checked)}
            className="w-4 h-4 text-teal-600 border-gray-300 rounded accent-teal-600"
          />
          僅顯示有效會員
        </label>
      </div>

      {/* Stats bar */}
      {!loading && (
        <p className="text-sm text-gray-400">
          共 {filtered.length} 位
          {activeOnly && <span className="ml-1 text-green-600 font-medium">（有效）</span>}
          {search && <span className="ml-1">，符合「{search}」</span>}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">
            {search || activeOnly ? '🔍' : '👥'}
          </div>
          <h2 className="text-xl font-bold mb-2">
            {search || activeOnly ? '找不到符合的會員' : '尚無會員資料'}
          </h2>
          <p className="text-gray-500 text-sm">
            {search ? `試試其他關鍵字，或` : ''}
            {activeOnly ? (
              <button
                onClick={() => setActiveOnly(false)}
                className="text-teal-600 hover:underline ml-1"
              >
                取消「僅顯示有效會員」篩選
              </button>
            ) : null}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => <MemberCard key={m.id} member={m} />)}
        </div>
      )}
    </div>
  )
}
