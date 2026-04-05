'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import NumberFlow from '@number-flow/react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { STATUS_LABELS, STATUS_COLORS, type MeetingCycleStatus } from '@/lib/utils/state-machine'
import { ErrorState } from '@/components/shared/ErrorState'

// ─── Types ────────────────────────────────────────────

interface OgsmMeasure {
  id: string; name: string; strategy: string; goal: string; target: string
  current_value: string; pct: number; status: string; source_hint: string
}
interface CeoDecision {
  id: string; subject: string; priority: string; deadline: string; status: string; ask: string
}
interface Project {
  code: string; name: string; description: string; status: string
  progress: number; strategy: string; next_action: string; deadline: string | null
}

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
  ogsm: OgsmMeasure[]
  ceoQueue: CeoDecision[]
  projects: Project[]
}

// ─── Stage Config ─────────────────────────────────────

const FUNNEL_STAGES = [
  { key: 'radar',       label: 'Radar',   color: 'bg-slate-400' },
  { key: 'observation', label: '觀察池',   color: 'bg-gray-400' },
  { key: 'gate0',       label: 'Gate 0',  color: 'bg-teal-500' },
  { key: 'gate1',       label: 'Gate 1',  color: 'bg-indigo-500' },
  { key: 'gate2',       label: 'Gate 2',  color: 'bg-teal-500' },
  { key: 'pitch_ready', label: 'Pitch',   color: 'bg-amber-500' },
  { key: 'invested',    label: '已投資',   color: 'bg-emerald-500' },
] as const

const STAGE_BG: Record<string, string> = {
  radar: 'bg-slate-50 text-slate-700',
  observation: 'bg-gray-50 text-gray-700',
  gate0: 'bg-teal-50 text-teal-700',
  gate1: 'bg-indigo-50 text-indigo-700',
  gate2: 'bg-teal-50 text-teal-700',
  pitch_ready: 'bg-amber-50 text-amber-700',
  invested: 'bg-emerald-50 text-emerald-700',
  passed: 'bg-red-50 text-red-700',
}

// ─── Page ─────────────────────────────────────────────

interface PipelineAlert {
  id: string
  alert_type: string
  severity: 'critical' | 'warning' | 'info'
  message: string
  created_at: string
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [alerts, setAlerts] = useState<PipelineAlert[]>([])
  const [alertCounts, setAlertCounts] = useState({ critical: 0, warning: 0, info: 0, total: 0 })

  useEffect(() => {
    fetch('/api/admin/dashboard-stats')
      .then(res => {
        if (!res.ok) throw new Error('載入失敗')
        return res.json()
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))

    // F-013: Load pipeline alerts
    fetch('/api/admin/alerts?limit=10')
      .then(res => res.ok ? res.json() : null)
      .then(d => {
        if (d) { setAlerts(d.alerts || []); setAlertCounts(d.counts || { critical: 0, warning: 0, info: 0, total: 0 }) }
      })
      .catch(() => {}) // Non-blocking
  }, [])

  const handleResolveAlert = async (id: string) => {
    await fetch('/api/admin/alerts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setAlerts(prev => prev.filter(a => a.id !== id))
    setAlertCounts(prev => ({ ...prev, total: prev.total - 1 }))
  }

  if (loading) return <DashboardSkeleton />
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); location.reload() }} />
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* ═══ Layer 1: Cockpit ═══ */}
      <Cockpit
        pendingActions={data.pendingActions}
        meeting={data.meeting}
        alerts={alerts}
        alertCounts={alertCounts}
        onResolveAlert={handleResolveAlert}
      />

      {/* ═══ Layer 2: KPI Bar ═══ */}
      <KPIBar pipeline={data.pipeline} memberCount={data.members.total} engagement={data.members.engagement} />

      {/* ═══ Layer 2: Pipeline Funnel ═══ */}
      <PipelineFunnel pipeline={data.pipeline} />

      {/* ═══ Layer 3: Operations ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeetingStatus meeting={data.meeting} />
        <RecentActivity items={data.recentActivity} />
      </div>

      {/* ═══ Layer 3: OGSM Measures ═══ */}
      {data.ogsm.length > 0 && <OgsmMeasures measures={data.ogsm} />}

      {/* ═══ Layer 3: CEO Decision Queue + Projects ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.ceoQueue.length > 0 && <CeoQueue items={data.ceoQueue} />}
        {data.projects.length > 0 && <ProjectTracker projects={data.projects} />}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickLink href="/admin/pipeline" title="Pipeline 管理" desc="漏斗看板、Gate 評估、觀察池" />
        <QuickLink href="/admin/meetings" title="天使例會管理" desc="建立週期、切換狀態、候選排程" />
        <QuickLink href="/admin/investors" title="投資人管理" desc="會員列表、活躍度、偏好分析" />
      </div>
    </div>
  )
}

// ─── Cockpit ──────────────────────────────────────────

function Cockpit({ pendingActions, meeting, alerts, alertCounts, onResolveAlert }: {
  pendingActions: DashboardData['pendingActions']
  meeting: DashboardData['meeting']
  alerts: PipelineAlert[]
  alertCounts: { critical: number; warning: number; info: number; total: number }
  onResolveAlert: (id: string) => void
}) {
  const hasPending = pendingActions.length > 0
  const [showAlerts, setShowAlerts] = useState(false)

  return (
    <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Command Center</h1>
          <p className="text-sm text-white/60">台大創創中心營運儀表板</p>
        </div>
        <div className="flex items-center gap-4">
          {/* F-013: Alert Bell */}
          {alertCounts.total > 0 && (
            <button
              onClick={() => setShowAlerts(v => !v)}
              className="relative flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-colors"
              title={`${alertCounts.total} 個警報`}
            >
              <span className="text-lg">🔔</span>
              {alertCounts.critical > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {alertCounts.critical}
                </span>
              )}
              <span className="text-sm text-white/80">{alertCounts.total}</span>
            </button>
          )}
          {meeting && meeting.countdown !== null && (
            <div className="text-right">
              <div className="text-3xl font-bold tabular-nums">
                D{meeting.countdown > 0 ? `-${meeting.countdown}` : meeting.countdown === 0 ? '-Day' : `+${Math.abs(meeting.countdown)}`}
              </div>
              <div className="text-xs text-white/60">{formatCycleId(meeting.id)} 天使例會</div>
            </div>
          )}
        </div>
      </div>

      {/* F-013: Alert panel */}
      {showAlerts && alerts.length > 0 && (
        <div className="mb-4 bg-black/30 rounded-xl overflow-hidden">
          <div className="px-4 py-2 flex items-center justify-between border-b border-white/10">
            <span className="text-sm font-semibold text-white/90">Pipeline 警報</span>
            <button onClick={() => setShowAlerts(false)} className="text-white/50 hover:text-white text-sm">✕</button>
          </div>
          <div className="divide-y divide-white/10 max-h-56 overflow-y-auto">
            {alerts.map(alert => (
              <div key={alert.id} className="px-4 py-3 flex items-start gap-3">
                <span className="text-sm mt-0.5">
                  {alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '🟡' : 'ℹ️'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90">{alert.message}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{alert.alert_type} · {new Date(alert.created_at).toLocaleDateString('zh-TW')}</p>
                </div>
                <button
                  onClick={() => onResolveAlert(alert.id)}
                  className="text-[11px] text-white/40 hover:text-white/80 shrink-0 ml-2"
                  title="標記已處理"
                >
                  ✓ 處理
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
    { label: '總案源', value: pipeline.total, accent: '#94a3b8' },
    { label: 'Gate 0+', value: gate0Plus, accent: '#2dd4bf' },
    { label: 'Gate 1', value: stageCounts.gate1, accent: '#818cf8' },
    { label: 'Pitch Ready', value: stageCounts.pitch_ready, accent: '#fbbf24' },
    { label: '已投資', value: stageCounts.invested, accent: '#34d399' },
    { label: '天使會員', value: memberCount, accent: '#2dd4bf' },
  ]

  return (
    <motion.div
      className="grid grid-cols-3 lg:grid-cols-6 gap-3"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {kpis.map(kpi => (
        <motion.div
          key={kpi.label}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          className="bg-white rounded-xl shadow-sm p-4 text-center relative overflow-hidden"
          style={{ borderTop: `3px solid ${kpi.accent}` }}
        >
          <NumberFlow
            value={kpi.value}
            className="text-2xl font-extrabold text-gray-900 tabular-nums"
            transformTiming={{ duration: 700, easing: 'ease-out' }}
          />
          <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Pipeline Funnel ──────────────────────────────────

const FUNNEL_CHART_COLORS: Record<string, string> = {
  radar: '#94a3b8', observation: '#9ca3af', gate0: '#2dd4bf',
  gate1: '#818cf8', gate2: '#2dd4bf', pitch_ready: '#fbbf24', invested: '#34d399',
}

function PipelineFunnel({ pipeline }: { pipeline: DashboardData['pipeline'] }) {
  const { stageCounts, conversionRates } = pipeline

  const chartData = FUNNEL_STAGES.map(s => ({
    name: s.label,
    key: s.key,
    value: stageCounts[s.key] || 0,
    fill: FUNNEL_CHART_COLORS[s.key] || '#94a3b8',
  }))

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Funnel</h2>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 40, left: 48, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
            formatter={(value) => [value ?? 0, '案件數']}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: 'right', fontSize: 11, fill: '#374151', fontWeight: 600 }}>
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Conversion rates */}
      <div className="flex gap-6 mt-2 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span>Radar → G0 <strong className="text-teal-700">{conversionRates.radarToGate0}%</strong></span>
        <span>G0 → G1 <strong className="text-teal-700">{conversionRates.gate0ToGate1}%</strong></span>
        <span>G1 → Pitch <strong className="text-teal-700">{conversionRates.gate1ToPitch}%</strong></span>
      </div>
    </motion.div>
  )
}

// ─── Meeting Status ───────────────────────────────────

function MeetingStatus({ meeting }: { meeting: DashboardData['meeting'] }) {
  if (!meeting) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">天使例會狀態</h2>
        <p className="text-gray-400 text-sm">目前沒有進行中的天使例會</p>
        <Link href="/admin/meetings" className="inline-block mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium">
          建立新天使例會 →
        </Link>
      </div>
    )
  }

  const stages = ['setup', 'cards_ready', 'vote_open', 'meeting', 'followup', 'closed']
  const currentIdx = stages.indexOf(meeting.status)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">天使例會進度 — {formatCycleId(meeting.id)}</h2>
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

      <Link href="/admin/meetings" className="inline-block mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium">
        管理天使例會 →
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

// ─── OGSM Measures ───────────────────────────────────

const STATUS_ICON: Record<string, string> = {
  on_track: '🟢', at_risk: '🟡', blocked: '🔴', done: '✅', pending: '⏳',
}

function OgsmMeasures({ measures }: { measures: OgsmMeasure[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">OGSM Measures（M1–M8）</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {measures.map(m => (
          <div key={m.id} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-teal-700">{m.id}</span>
              <span className="text-xs">{STATUS_ICON[m.status] || '⏳'}</span>
            </div>
            <div className="text-sm font-medium text-gray-900 mb-2 line-clamp-1">{m.name}</div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  m.pct >= 70 ? 'bg-emerald-500' : m.pct >= 40 ? 'bg-amber-400' : 'bg-red-400'
                }`}
                style={{ width: `${m.pct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>{m.current_value}</span>
              <span>目標: {m.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── CEO Decision Queue ──────────────────────────────

const PRIORITY_STYLE: Record<string, string> = {
  critical: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-50 text-yellow-800',
  low: 'bg-gray-100 text-gray-600',
}

function CeoQueue({ items }: { items: CeoDecision[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-semibold text-red-800">CEO 待決策</h2>
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
      </div>
      <div className="space-y-2">
        {items.map(d => (
          <div key={d.id} className="border-l-3 border-red-400 pl-3 py-2" style={{ borderLeftWidth: '3px' }}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-red-700">{d.id}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${PRIORITY_STYLE[d.priority] || ''}`}>
                {d.priority}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-900 line-clamp-1">{d.subject}</div>
            {d.deadline && (
              <div className="text-[10px] text-red-600 mt-0.5 font-medium">
                截止: {new Date(d.deadline).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Project Tracker ─────────────────────────────────

const PROJECT_STATUS_STYLE: Record<string, string> = {
  active: 'border-l-emerald-500',
  paused: 'border-l-amber-400',
  frozen: 'border-l-gray-300',
  completed: 'border-l-teal-400',
}

function ProjectTracker({ projects }: { projects: Project[] }) {
  const active = projects.filter(p => p.status === 'active')
  const other = projects.filter(p => p.status !== 'active')

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">專案進度（{projects.length} 個）</h2>
      <div className="space-y-1.5 max-h-80 overflow-y-auto">
        {[...active, ...other].map(p => (
          <div key={p.code} className={`flex items-center gap-3 border-l-3 ${PROJECT_STATUS_STYLE[p.status] || 'border-l-gray-200'} pl-3 py-1.5`}
            style={{ borderLeftWidth: '3px' }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-400">{p.code}</span>
                <span className="text-sm font-medium text-gray-900 truncate">{p.name}</span>
              </div>
              {p.next_action && <div className="text-[10px] text-gray-400 truncate mt-0.5">{p.next_action}</div>}
            </div>
            <div className="w-16 shrink-0">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${
                  p.progress >= 80 ? 'bg-emerald-500' : p.progress >= 40 ? 'bg-amber-400' : 'bg-gray-300'
                }`} style={{ width: `${p.progress}%` }} />
              </div>
              <div className="text-[10px] text-gray-400 text-right mt-0.5">{p.progress}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-teal-300 transition-colors block">
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
