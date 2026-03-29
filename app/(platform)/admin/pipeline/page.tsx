'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

/**
 * Admin Pipeline — Kanban-style view for startup pipeline management.
 * Covers: Gate 0 → Gate 1 → Gate 2 → Pitch → Invested → Passed
 *
 * API: GET /api/admin/pipeline (→ future Sprint)
 * For now, uses a placeholder data structure; will connect to pip_startups table.
 */

type PipelineStage = 'observation' | 'gate0' | 'gate1' | 'gate2' | 'pitch_ready' | 'invested' | 'passed'

interface PipelineStartup {
  id: string
  name: string
  name_en?: string
  sector: string
  stage: PipelineStage
  tier: string
  updated_at: string
  note?: string
  tax_id?: string | null
  gate0_score?: number | null
  gate1_score?: number | null
  observation_pool?: boolean
  observation_reason?: string | null
}

const STAGE_CONFIG: Record<PipelineStage, { label: string; color: string; bgColor: string }> = {
  observation:  { label: '觀察池',    color: 'text-gray-700',   bgColor: 'bg-gray-50' },
  gate0:        { label: 'Gate 0',   color: 'text-blue-700',   bgColor: 'bg-blue-50' },
  gate1:        { label: 'Gate 1',   color: 'text-indigo-700', bgColor: 'bg-indigo-50' },
  gate2:        { label: 'Gate 2',   color: 'text-purple-700', bgColor: 'bg-purple-50' },
  pitch_ready:  { label: 'Pitch',    color: 'text-orange-700', bgColor: 'bg-orange-50' },
  invested:     { label: '已投資',    color: 'text-green-700',  bgColor: 'bg-green-50' },
  passed:       { label: 'Pass',     color: 'text-red-700',    bgColor: 'bg-red-50' },
}

const STAGES: PipelineStage[] = ['observation', 'gate0', 'gate1', 'gate2', 'pitch_ready', 'invested', 'passed']

export default function AdminPipelinePage() {
  const [startups, setStartups] = useState<PipelineStartup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban')
  const [filterStage, setFilterStage] = useState<PipelineStage | 'all'>('all')

  const loadPipeline = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/pipeline')
      if (res.ok) {
        const data = await res.json()
        setStartups(data.startups || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入 Pipeline 資料失敗')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadPipeline() }, [loadPipeline])

  const filtered = filterStage === 'all'
    ? startups
    : startups.filter(s => s.stage === filterStage)

  const groupedByStage = STAGES.reduce((acc, stage) => {
    acc[stage] = filtered.filter(s => s.stage === stage)
    return acc
  }, {} as Record<PipelineStage, PipelineStartup[]>)

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-48" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse flex-1" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); loadPipeline() }} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pipeline 管理</h1>
        <div className="flex items-center gap-3">
          {/* Stage filter */}
          <select
            value={filterStage}
            onChange={e => setFilterStage(e.target.value as PipelineStage | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">全部階段</option>
            {STAGES.map(s => (
              <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              看板
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              列表
            </button>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
        {STAGES.map(stage => {
          const count = groupedByStage[stage]?.length || 0
          const cfg = STAGE_CONFIG[stage]
          return (
            <button
              key={stage}
              onClick={() => setFilterStage(filterStage === stage ? 'all' : stage)}
              className={`rounded-lg p-3 text-center transition-all ${
                filterStage === stage ? 'ring-2 ring-blue-500' : ''
              } ${cfg.bgColor}`}
            >
              <div className={`text-xl font-bold ${cfg.color}`}>{count}</div>
              <div className="text-xs text-gray-600">{cfg.label}</div>
            </button>
          )
        })}
      </div>

      {/* Content */}
      {startups.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-lg font-semibold mb-2">Pipeline 即將啟用</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            新創 Pipeline 資料將從 Supabase pip_startups 表載入。
            <br />完成資料庫遷移後，此頁將顯示完整的漏斗管理看板。
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-left">
            <FeatureItem icon="🔍" text="觀察池自動匯入" />
            <FeatureItem icon="📊" text="Gate 0-2 篩選流程" />
            <FeatureItem icon="📋" text="月會 Pitch 排程" />
          </div>
        </div>
      ) : viewMode === 'kanban' ? (
        <KanbanView grouped={groupedByStage} />
      ) : (
        <TableView startups={filtered} />
      )}
    </div>
  )
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function KanbanView({ grouped }: { grouped: Record<PipelineStage, PipelineStartup[]> }) {
  const activeStages = STAGES.filter(s => s !== 'passed')

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {activeStages.map(stage => {
        const cfg = STAGE_CONFIG[stage]
        const items = grouped[stage] || []
        return (
          <div key={stage} className="flex-shrink-0 w-64">
            <div className={`rounded-t-xl px-4 py-2 ${cfg.bgColor}`}>
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-sm ${cfg.color}`}>{cfg.label}</span>
                <span className={`text-xs font-medium ${cfg.color}`}>{items.length}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-200 min-h-[200px] p-2 space-y-2">
              {items.map(startup => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
              {items.length === 0 && (
                <div className="text-center text-xs text-gray-400 py-8">
                  無案件
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StartupCard({ startup }: { startup: PipelineStartup }) {
  const [showDetail, setShowDetail] = useState(false)

  const tierColors: Record<string, string> = {
    S: 'bg-red-100 text-red-700',
    A: 'bg-orange-100 text-orange-700',
    B: 'bg-yellow-100 text-yellow-700',
    C: 'bg-gray-100 text-gray-600',
  }

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="font-medium text-sm truncate flex-1">{startup.name}</div>
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ml-2 ${tierColors[startup.tier] || 'bg-gray-100'}`}>
          {startup.tier}
        </span>
      </div>
      <div className="text-xs text-gray-500 mb-1">{startup.sector}</div>
      {startup.note && (
        <div className="text-xs text-gray-400 truncate">{startup.note}</div>
      )}
      <div className="text-xs text-gray-300 mt-2">
        {new Date(startup.updated_at).toLocaleDateString('zh-TW')}
      </div>

      {/* Hover detail popover */}
      {showDetail && (
        <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white rounded-lg border border-gray-200 shadow-lg p-3 space-y-1.5 text-xs min-w-[220px]"
          onMouseEnter={() => setShowDetail(true)}
          onMouseLeave={() => setShowDetail(false)}
        >
          {startup.name_en && (
            <div className="text-gray-500">{startup.name_en}</div>
          )}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {startup.tax_id && (
              <DetailRow label="統編" value={startup.tax_id} />
            )}
            {startup.gate0_score != null && (
              <DetailRow label="Gate 0" value={`${startup.gate0_score} 分`} />
            )}
            {startup.gate1_score != null && (
              <DetailRow label="Gate 1" value={`${startup.gate1_score} 分`} />
            )}
          </div>
          {startup.observation_pool && startup.observation_reason && (
            <div className="pt-1.5 border-t border-gray-100">
              <span className="text-amber-600 font-medium">觀察池：</span>
              <span className="text-gray-500">{startup.observation_reason}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-700 font-medium">{value}</span>
    </>
  )
}

function TableView({ startups }: { startups: PipelineStartup[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-700">新創名稱</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">產業</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">階段</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Tier</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">更新日期</th>
          </tr>
        </thead>
        <tbody>
          {startups.map(s => (
            <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-3 font-medium">{s.name}</td>
              <td className="px-4 py-3 text-gray-600">{s.sector}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${STAGE_CONFIG[s.stage].bgColor} ${STAGE_CONFIG[s.stage].color}`}>
                  {STAGE_CONFIG[s.stage].label}
                </span>
              </td>
              <td className="px-4 py-3">{s.tier}</td>
              <td className="px-4 py-3 text-gray-500">{new Date(s.updated_at).toLocaleDateString('zh-TW')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
