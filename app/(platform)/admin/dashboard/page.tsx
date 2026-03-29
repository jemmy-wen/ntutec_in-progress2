'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { STATUS_LABELS, STATUS_COLORS, type MeetingCycleStatus } from '@/lib/utils/state-machine'
import { ErrorState } from '@/components/shared/ErrorState'

// ─── Types ────────────────────────────────────────────

interface DashboardData {
  pipeline: {
    stageCounts: Record<string, number>
    total: number
    conversionRates: { radarToGate0: string; gate0ToGate1: string; gate1ToPitch: string }
  }
  pendingActions: { type: string; label: string; count: number; href: string }[]
  meeting: { id: string; status: string; meeting_date: string; countdown: number | null } | null
  members: { total: number; active: number; engagement: { active: number; moderate: number; low: number } }
  recentActivity: { id: string; name: string; sector: string; stage: string; tier: string; updated_at: string }[]
}

// ─── Stage Config ─────────────────────────────────────

const FUNNEL_STAGES = [
  { key: 'radar',       label: 'Radar',   color: 'bg-slate-400' },
  { key: 'observation', label: '觀察池',   color: 'bg-gray-400' },
  { key: 'gate0',       label: 'Gate 0',  color: 'bg-blue-500' },
  { key: 'gate1',       label: 'Gate 1',  color: 'bg-indigo-500' },
  { key: 'gate2',       label: 'Gate 2',  color: 'bg-purple-500' },
  { key: 'pitch_ready', label: 'Pitch',   color: 'bg-amber-500' },
  { key: 'invested',    label: '已投資',   color: 'bg-emerald-500' },
] as const

const STAGE_BG: Record<string, string> = {
  radar: 'bg-slate-50 text-slate-700',
  observation: 'bg-gray-50 text-gray-700',
  gate0: 'bg-blue-50 text-blue-700',
  gate1: 'bg-indigo-50 text-indigo-700',
  gate2: 'bg-purple-50 text-purple-700',
  pitch_ready: 'bg-amber-50 text-amber-700',
  invested: 'bg-emerald-50 text-emerald-700',
  passed: 'bg-red-50 text-red-700',
}

// ─── Page ─────────────────────────────────────────────

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/dashboard-stats')
      .then(res => {
        if (!res.ok) throw new Error('載入失敗')
        return res.json()
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <DashboardSkeleton />
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); location.reload() }} />
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* ═══ Layer 1: Cockpit ═══ */}
      <Cockpit pendingActions={data.pendingActions} meeting={data.meeting} />

      {/* ═══ Layer 2: KPI Bar ═══ */}
      <KPIBar pipeline={data.pipeline} memberCount={data.members.total} engagement={data.members.engagement} />

      {/* ═══ Layer 2: Pipeline Funnel ═══ */}
      <PipelineFunnel pipeline={data.pipeline} />

      {/* ═══ Layer 3: Operations ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeetingStatus meeting={data.meeting} />
        <RecentActivity items={data.recentActivity} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickLink href="/admin/pipeline" title="Pipeline 管理" desc="漏斗看板、Gate 評估、觀察池" />
        <QuickLink href="/admin/meetings" title="月會管理" desc="建立週期、切換狀態、候選排程" />
        <QuickLink href="/admin/investors" title="投資人管理" desc="會員列表、活躍度、偏好分析" />
      </div>
    </div>
  )
}

// ─── Cockpit ──────────────────────────────────────────

function Cockpit({ pendingActions, meeting }: {
  pendingActions: DashboardData['pendingActions']
  meeting: DashboardData['meeting']
}) {
  const hasPending = pendingActions.length > 0

  return (
    <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Command Center</h1>
          <p className="text-sm text-white/60">台大創創中心營運儀表板</p>
        </div>
        {meeting && meeting.countdown !== null && (
          <div className="text-right">
            <div className="text-3xl font-bold tabular-nums">
              D{meeting.countdown > 0 ? `-${meeting.countdown}` : meeting.countdown === 0 ? '-Day' : `+${Math.abs(meeting.countdown)}`}
            </div>
            <div className="text-xs text-white/60">{formatCycleId(meeting.id)} 月會</div>
          </div>
        )}
      </div>

      {hasPending ? (
        <div className="flex flex-wrap gap-3">
          {pendingActions.map(action => (
            <Link
              key={action.type}
              href={action.href}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl px-4 py-3 transition-colors"
            >
              <span className="text-2xl font-bold tabular-nums">{action.count}</span>
              <div>
                <div className="text-sm font-medium">{action.label}</div>
                <div className="text-xs text-white/50">前往處理 →</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white/10 rounded-xl px-4 py-3 text-sm text-white/70">
          目前沒有待處理事項
        </div>
      )}
    </div>
  )
}

// ─── KPI Bar ──────────────────────────────────────────

function KPIBar({ pipeline, memberCount, engagement }: {
  pipeline: DashboardData['pipeline']
  memberCount: number
  engagement: { active: number; moderate: number; low: number }
}) {
  const { stageCounts } = pipeline
  const gate0Plus = stageCounts.gate0 + stageCounts.gate1 + stageCounts.gate2 + stageCounts.pitch_ready + stageCounts.invested

  const kpis = [
    { label: '總案源', value: pipeline.total, color: 'border-slate-300' },
    { label: 'Gate 0+', value: gate0Plus, color: 'border-blue-400' },
    { label: 'Gate 1', value: stageCounts.gate1, color: 'border-indigo-400' },
    { label: 'Pitch Ready', value: stageCounts.pitch_ready, color: 'border-amber-400' },
    { label: '已投資', value: stageCounts.invested, color: 'border-emerald-400' },
    { label: '天使會員', value: memberCount, color: 'border-teal-400' },
  ]

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map(kpi => (
        <div key={kpi.label} className={`bg-white rounded-xl border-t-3 ${kpi.color} shadow-sm p-4 text-center`} style={{ borderTopWidth: '3px' }}>
          <div className="text-2xl font-extrabold text-gray-900 tabular-nums">{kpi.value}</div>
          <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Pipeline Funnel ──────────────────────────────────

function PipelineFunnel({ pipeline }: { pipeline: DashboardData['pipeline'] }) {
  const { stageCounts, conversionRates, total } = pipeline
  const maxCount = Math.max(...FUNNEL_STAGES.map(s => stageCounts[s.key] || 0), 1)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Funnel</h2>

      {/* Funnel bars */}
      <div className="space-y-2">
        {FUNNEL_STAGES.map(stage => {
          const count = stageCounts[stage.key] || 0
          const pct = total > 0 ? (count / maxCount) * 100 : 0
          return (
            <div key={stage.key} className="flex items-center gap-3">
              <div className="w-16 text-right text-xs font-medium text-gray-500">{stage.label}</div>
              <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden relative">
                <div
                  className={`h-full ${stage.color} rounded-lg transition-all duration-700 ease-out`}
                  style={{ width: `${Math.max(pct, count > 0 ? 2 : 0)}%` }}
                />
                {count > 0 && (
                  <span className={`absolute inset-y-0 flex items-center text-xs font-bold ${pct > 15 ? 'text-white left-3' : 'text-gray-700 left-[calc(var(--w)+8px)]'}`}
                    style={{ '--w': `${pct}%` } as React.CSSProperties}
                  >
                    {count}
                  </span>
                )}
              </div>
              <div className="w-10 text-right text-xs text-gray-400 tabular-nums">{count}</div>
            </div>
          )
        })}
      </div>

      {/* Conversion rates */}
      <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span>Radar → G0 <strong className="text-teal-700">{conversionRates.radarToGate0}%</strong></span>
        <span>G0 → G1 <strong className="text-teal-700">{conversionRates.gate0ToGate1}%</strong></span>
        <span>G1 → Pitch <strong className="text-teal-700">{conversionRates.gate1ToPitch}%</strong></span>
      </div>
    </div>
  )
}

// ─── Meeting Status ───────────────────────────────────

function MeetingStatus({ meeting }: { meeting: DashboardData['meeting'] }) {
  if (!meeting) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">月會狀態</h2>
        <p className="text-gray-400 text-sm">目前沒有進行中的月會</p>
        <Link href="/admin/meetings" className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
          建立新月會 →
        </Link>
      </div>
    )
  }

  const stages = ['setup', 'cards_ready', 'vote_open', 'meeting', 'followup', 'closed']
  const currentIdx = stages.indexOf(meeting.status)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">月會進度 — {formatCycleId(meeting.id)}</h2>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[meeting.status as MeetingCycleStatus] || 'bg-gray-100'}`}>
          {STATUS_LABELS[meeting.status as MeetingCycleStatus] || meeting.status}
        </span>
      </div>

      {/* Stage progress bar */}
      <div className="flex items-center gap-1">
        {stages.map((stage, i) => (
          <div key={stage} className="flex-1 flex items-center">
            <div className={`h-2 flex-1 rounded-full ${
              i < currentIdx ? 'bg-teal-500' :
              i === currentIdx ? 'bg-teal-500 animate-pulse' :
              'bg-gray-200'
            }`} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        {stages.map((stage, i) => (
          <span key={stage} className={`text-[10px] ${i <= currentIdx ? 'text-teal-700 font-medium' : 'text-gray-400'}`}>
            {STATUS_LABELS[stage as MeetingCycleStatus] || stage}
          </span>
        ))}
      </div>

      <Link href="/admin/meetings" className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        管理月會 →
      </Link>
    </div>
  )
}

// ─── Recent Activity ──────────────────────────────────

function RecentActivity({ items }: { items: DashboardData['recentActivity'] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">近期案件動態</h2>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">尚無資料</p>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded font-medium ${STAGE_BG[item.stage] || 'bg-gray-100'}`}>
                  {FUNNEL_STAGES.find(s => s.key === item.stage)?.label || item.stage}
                </span>
                <span className="text-sm font-medium text-gray-900 truncate">{item.name}</span>
              </div>
              <span className="text-xs text-gray-400 shrink-0 ml-2">
                {new Date(item.updated_at).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors block">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm text-gray-500">{desc}</div>
    </Link>
  )
}

function formatCycleId(id: string): string {
  const match = id.match(/^(\d{4})-(0[1-9]|1[0-2])$/)
  if (match) return `${match[1]}/${parseInt(match[2])}`
  return id
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-40 bg-gray-200 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />)}
      </div>
      <div className="h-60 bg-gray-200 rounded-xl animate-pulse" />
    </div>
  )
}
