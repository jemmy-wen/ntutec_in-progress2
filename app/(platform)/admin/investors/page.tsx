'use client'

import { useState, useEffect } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface MemberRow {
  id: string
  display_name: string
  email: string | null
  company: string | null
  tier: string | null
  status: string
  card_response_rate?: number
  vote_participation_rate?: number
  articles_read?: number
  engagement_level?: string
}

interface EngagementSummary {
  total: number
  active: number
  moderate: number
  low: number
}

const TIER_LABELS: Record<string, string> = {
  founding: '創始會員',
  regular: '一般會員',
  observer: '觀察員',
}

export default function InvestorsAdminPage() {
  const [members, setMembers] = useState<MemberRow[]>([])
  const [engagementMap, setEngagementMap] = useState<Map<string, MemberRow>>(new Map())
  const [summary, setSummary] = useState<EngagementSummary>({ total: 0, active: 0, moderate: 0, low: 0 })
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadData() {
    try {
      const [membersRes, engagementRes] = await Promise.all([
        fetch('/api/members'),
        fetch('/api/engagement'),
      ])

      if (membersRes.ok) {
        const data = await membersRes.json()
        setMembers(data.members || [])
      }
      if (engagementRes.ok) {
        const data = await engagementRes.json()
        const map = new Map<string, MemberRow>()
        for (const m of (data.members || [])) {
          map.set(m.id, m)
        }
        setEngagementMap(map)
        setSummary(data.summary || { total: 0, active: 0, moderate: 0, low: 0 })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入投資人資料失敗')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const enriched = members.map(m => ({
    ...m,
    ...(engagementMap.get(m.id) || {}),
  }))

  const filtered = filter === 'all'
    ? enriched
    : enriched.filter(m => m.engagement_level === filter)

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); loadData() }} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">投資人管理</h1>
        <span className="text-sm text-gray-500">{members.length} 位天使會員（{members.filter(m => m.status === 'active').length} 位活躍）</span>
      </div>

      {/* Engagement Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ring Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center">
          <EngagementRing active={summary.active} moderate={summary.moderate} low={summary.low} />
          <div className="text-xs text-gray-500 mt-3">活躍會員參與度分佈</div>
        </div>

        {/* Stat cards */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <EngagementStat label="總會員" value={members.length} color="text-gray-900" bgColor="bg-gray-50" />
          <EngagementStat label="活躍會員" value={summary.total} color="text-teal-700" bgColor="bg-teal-50" />
          <EngagementStat label="高參與" value={summary.active} color="text-emerald-700" bgColor="bg-emerald-50" onClick={() => setFilter(filter === 'active' ? 'all' : 'active')} active={filter === 'active'} />
          <EngagementStat label="中參與" value={summary.moderate} color="text-amber-700" bgColor="bg-amber-50" onClick={() => setFilter(filter === 'moderate' ? 'all' : 'moderate')} active={filter === 'moderate'} />
          <EngagementStat label="低參與" value={summary.low} color="text-red-700" bgColor="bg-red-50" onClick={() => setFilter(filter === 'low' ? 'all' : 'low')} active={filter === 'low'} />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: '全部', count: members.length },
          { key: 'active', label: '高參與', count: summary.active },
          { key: 'moderate', label: '中參與', count: summary.moderate },
          { key: 'low', label: '低參與', count: summary.low },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.key ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label} <span className="ml-1 opacity-70">({f.count})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">姓名</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">公司</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">等級</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">狀態</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">卡片回應率</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">投票參與率</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">文章閱讀</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">參與度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{m.display_name}</td>
                  <td className="px-4 py-3 text-gray-500">{m.company || '-'}</td>
                  <td className="px-4 py-3">
                    {m.tier && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        m.tier === 'founding' ? 'bg-teal-100 text-teal-700' :
                        m.tier === 'regular' ? 'bg-teal-100 text-teal-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {TIER_LABELS[m.tier] || m.tier}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      m.status === 'active' ? 'bg-green-100 text-green-700' :
                      m.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {m.status === 'active' ? '活躍' : m.status === 'pending' ? '待審核' : '停用'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {m.card_response_rate != null ? <MiniBar value={m.card_response_rate} /> : '-'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {m.vote_participation_rate != null ? <MiniBar value={m.vote_participation_rate} /> : '-'}
                  </td>
                  <td className="px-4 py-3 text-center">{m.articles_read ?? '-'}</td>
                  <td className="px-4 py-3 text-center">
                    {m.engagement_level && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        m.engagement_level === 'active' ? 'bg-green-100 text-green-700' :
                        m.engagement_level === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {m.engagement_level === 'active' ? '活躍' : m.engagement_level === 'moderate' ? '中度' : '低'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    沒有符合條件的會員
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Engagement Ring Chart (SVG) ──────────────────────

function EngagementRing({ active, moderate, low }: { active: number; moderate: number; low: number }) {
  const total = active + moderate + low
  if (total === 0) {
    return (
      <div className="w-32 h-32 flex items-center justify-center">
        <span className="text-sm text-gray-400">無資料</span>
      </div>
    )
  }

  const r = 52
  const circumference = 2 * Math.PI * r
  const activeArc = (active / total) * circumference
  const moderateArc = (moderate / total) * circumference
  const lowArc = (low / total) * circumference

  const activeOffset = 0
  const moderateOffset = activeArc
  const lowOffset = activeArc + moderateArc

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        {/* Active — green */}
        <circle
          cx="60" cy="60" r={r}
          fill="none" stroke="#10b981" strokeWidth="12"
          strokeDasharray={`${activeArc} ${circumference - activeArc}`}
          strokeDashoffset={-activeOffset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
        {/* Moderate — amber */}
        <circle
          cx="60" cy="60" r={r}
          fill="none" stroke="#f59e0b" strokeWidth="12"
          strokeDasharray={`${moderateArc} ${circumference - moderateArc}`}
          strokeDashoffset={-moderateOffset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
        {/* Low — red */}
        <circle
          cx="60" cy="60" r={r}
          fill="none" stroke="#ef4444" strokeWidth="12"
          strokeDasharray={`${lowArc} ${circumference - lowArc}`}
          strokeDashoffset={-lowOffset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-gray-900">{total}</span>
        <span className="text-[10px] text-gray-500">會員</span>
      </div>
    </div>
  )
}

// ─── Engagement Stat Card ─────────────────────────────

function EngagementStat({ label, value, color, bgColor, onClick, active }: {
  label: string; value: number; color: string; bgColor: string
  onClick?: () => void; active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-4 text-center transition-all ${bgColor} ${
        active ? 'ring-2 ring-teal-500' : ''
      } ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      <div className={`text-2xl font-extrabold tabular-nums ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </button>
  )
}

// ─── Mini Progress Bar ────────────────────────────────

function MiniBar({ value }: { value: number }) {
  const color = value >= 70 ? 'bg-emerald-400' : value >= 40 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="text-xs tabular-nums">{value}%</span>
    </div>
  )
}
