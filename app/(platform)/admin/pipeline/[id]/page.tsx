'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ErrorState } from '@/components/shared/ErrorState'

// ─── Types ────────────────────────────────────────────

interface GateRecord {
  id: string
  gate_type: string
  result: string | null
  screening_result: string | null
  evaluation_date: string | null
  evaluator: string | null
  notes: string | null
  // Gate 0 fields
  flags: string[] | null
  fail_reasons: string[] | null
  // Gate 1 dimension scores (sosv_*)
  sosv_market: number | null
  sosv_solution: number | null
  sosv_timing: number | null   // maps to d3_team
  sosv_team: number | null     // maps to d4_traction
  sosv_traction: number | null // maps to d5_fit
  gate1_confidence: string | null
  gate1_action: string | null
}

interface EnrichmentSource {
  source: string
  signal: string
  patent_count?: number
  case_count?: number
  tender_count?: number
  penalty_count?: number
  grant_count?: number
}

interface Enrichment {
  enrichment_version: string
  enriched_at: string
  sources: Record<string, EnrichmentSource>
  summary: {
    total_sources: number
    auto_resolved: number
    manual_needed: number
    risk_signals: string[]
    positive_signals: string[]
  }
}

interface TimelineEntry {
  date: string
  event: string
  detail: string
}

interface StartupDetail {
  id: string
  name_zh: string
  name_en: string | null
  tax_id: string | null
  sector: string | null
  one_liner: string | null
  pipeline_stage: number
  current_gate: string | null
  current_gate_result: string | null
  gate0_score: number | null
  gate1_score: number | null
  tier: string | null
  status: string
  observation_pool: boolean
  observation_reason: string | null
  created_at: string
  updated_at: string
  enrichment_data: string | null
  enriched_at: string | null
  funding_stage: string | null
  funding_amount: number | null
  capital_paid: number | null
  team_size: number | null
  product_status: string | null
  founded_year: number | null
  representative: string | null
  ntu_affiliation: string | null
  country: string | null
  city: string | null
  email: string | null
  track: string | null
  bp_storage_path: string | null
  bp_uploaded_at: string | null
}

interface DetailData {
  startup: StartupDetail
  gates: GateRecord[]
  enrichment: Enrichment | null
  pitches: Array<{
    id: string
    meeting_id: string
    pitch_order: number
    decision: string | null
    followup_status: string
    notes: string | null
    pip_meetings?: { id: string; meeting_date: string; status: string }
  }>
  timeline: TimelineEntry[]
}

type TabKey = 'overview' | 'gate0' | 'gate1' | 'gate2' | 'enrichment' | 'timeline'

// ─── Page ─────────────────────────────────────────────

export default function StartupDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [data, setData] = useState<DetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<TabKey>('overview')

  useEffect(() => {
    fetch(`/api/admin/pipeline/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(res.status === 404 ? '找不到此新創' : '載入失敗')
        return res.json()
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <DetailSkeleton />
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); location.reload() }} />
  if (!data) return null

  const { startup, gates, enrichment, timeline } = data
  const gate0 = gates.find(g => g.gate_type === 'gate0')
  const gate1 = gates.find(g => g.gate_type === 'gate1')
  const gate2 = gates.find(g => g.gate_type === 'gate2')

  const TABS: { key: TabKey; label: string; available: boolean }[] = [
    { key: 'overview', label: '概覽', available: true },
    { key: 'gate0', label: 'Gate 0', available: !!gate0 },
    { key: 'gate1', label: 'Gate 1', available: !!gate1 },
    { key: 'gate2', label: 'Gate 2', available: !!gate2 },
    { key: 'enrichment', label: '盡調資料', available: !!enrichment },
    { key: 'timeline', label: '時間軸', available: timeline.length > 0 },
  ]

  // Gate progress
  const gateSteps = [
    { key: 'gate0', label: 'G0', done: !!gate0 },
    { key: 'gate1', label: 'G1', done: !!gate1 },
    { key: 'gate2', label: 'G2', done: !!gate2 },
    { key: 'pitch', label: 'Pitch', done: data.pitches.length > 0 },
    { key: 'decision', label: 'Decision', done: startup.status === 'invested' || data.pitches.some(p => p.decision === 'invest') },
  ]

  const tierColors: Record<string, string> = {
    S: 'bg-red-100 text-red-700 border-red-200',
    A: 'bg-orange-100 text-orange-700 border-orange-200',
    B: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    C: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  const resultColors: Record<string, string> = {
    pass: 'bg-green-100 text-green-700',
    advance: 'bg-green-100 text-green-700',
    watch: 'bg-amber-100 text-amber-700',
    defer: 'bg-gray-100 text-gray-600',
    fail: 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <button
          onClick={() => router.push('/admin/pipeline')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-3 inline-flex items-center gap-1"
        >
          <span>&larr;</span> 回到 Pipeline
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{startup.name_zh}</h1>
              {startup.tier && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${tierColors[startup.tier] || 'bg-gray-100'}`}>
                  Tier {startup.tier}
                </span>
              )}
              {startup.current_gate_result && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${resultColors[startup.current_gate_result] || 'bg-gray-100'}`}>
                  {startup.current_gate_result}
                </span>
              )}
            </div>
            {startup.name_en && (
              <div className="text-sm text-gray-500 mt-0.5">{startup.name_en}</div>
            )}
            {startup.one_liner && (
              <div className="text-sm text-gray-600 mt-1">{startup.one_liner}</div>
            )}
          </div>
          <div className="text-right text-xs text-gray-400">
            <div>ID: {startup.id.slice(0, 8)}...</div>
            <div>更新: {new Date(startup.updated_at).toLocaleDateString('zh-TW')}</div>
          </div>
        </div>
      </div>

      {/* Gate Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2">
          {gateSteps.map((step, i) => (
            <div key={step.key} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 ${
                step.done ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step.done ? '\u2713' : step.label}
              </div>
              {i < gateSteps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${step.done ? 'bg-teal-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {gateSteps.map(step => (
            <div key={step.key} className="flex-1 text-center text-[10px] text-gray-500">
              {step.label}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => t.available && setTab(t.key)}
              disabled={!t.available}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-teal-500 text-teal-700'
                  : t.available
                    ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    : 'border-transparent text-gray-300 cursor-not-allowed'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {tab === 'overview' && <OverviewTab startup={startup} enrichment={enrichment} gates={gates} pitches={data.pitches} />}
        {tab === 'gate0' && gate0 && <Gate0Tab gate={gate0} />}
        {tab === 'gate1' && gate1 && <Gate1Tab gate={gate1} />}
        {tab === 'gate2' && gate2 && <Gate2Tab gate={gate2} />}
        {tab === 'enrichment' && enrichment && <EnrichmentTab enrichment={enrichment} />}
        {tab === 'timeline' && <TimelineTab timeline={timeline} />}
      </div>
    </div>
  )
}

// ─── Overview Tab ────────────────────────────────────

function OverviewTab({ startup, enrichment, gates, pitches }: {
  startup: StartupDetail
  enrichment: Enrichment | null
  gates: GateRecord[]
  pitches: DetailData['pitches']
}) {
  const fields = [
    { label: '統編', value: startup.tax_id },
    { label: '產業', value: startup.sector },
    { label: '國家/城市', value: [startup.country, startup.city].filter(Boolean).join(' / ') || null },
    { label: '募資階段', value: startup.funding_stage },
    { label: '資本額', value: startup.capital_paid ? `NT$ ${(startup.capital_paid / 10000).toLocaleString()} 萬` : null },
    { label: '成立年份', value: startup.founded_year?.toString() },
    { label: '團隊規模', value: startup.team_size ? `${startup.team_size} 人` : null },
    { label: '產品階段', value: startup.product_status },
    { label: '負責人', value: startup.representative },
    { label: '臺大關聯', value: startup.ntu_affiliation },
    { label: 'Track', value: startup.track },
    { label: 'Email', value: startup.email },
  ]

  return (
    <div className="space-y-6">
      {/* Basic Info Grid */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">基本資料</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fields.filter(f => f.value).map(f => (
            <div key={f.label} className="text-sm">
              <span className="text-gray-400">{f.label}</span>
              <div className="font-medium text-gray-800">{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BP Document */}
      {startup.bp_storage_path && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">商業計畫書</h3>
          <BpDownloadButton startupId={startup.id} uploadedAt={startup.bp_uploaded_at} />
        </div>
      )}

      {/* Gate Summary Cards */}
      {gates.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Gate 評估摘要</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {gates.map(g => {
              const result = g.result || g.screening_result || 'pending'
              const isGate1 = g.gate_type === 'gate1'
              const total = isGate1
                ? (g.sosv_market || 0) + (g.sosv_solution || 0) + (g.sosv_timing || 0) + (g.sosv_team || 0) + (g.sosv_traction || 0)
                : null
              return (
                <div key={g.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">
                      {g.gate_type === 'gate0' ? 'Gate 0' : g.gate_type === 'gate1' ? 'Gate 1' : 'Gate 2'}
                    </span>
                    <ResultBadge result={result} />
                  </div>
                  {isGate1 && total !== null && (
                    <div className="text-2xl font-bold text-gray-900 mb-1">{total}<span className="text-sm font-normal text-gray-400">/50</span></div>
                  )}
                  <div className="text-xs text-gray-400">
                    {g.evaluation_date ? new Date(g.evaluation_date).toLocaleDateString('zh-TW') : '日期未知'}
                    {g.evaluator && ` | ${g.evaluator}`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Enrichment Summary */}
      {enrichment && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">盡調摘要</h3>
          <div className="flex flex-wrap gap-2">
            {enrichment.summary.positive_signals.map((sig, i) => (
              <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">{sig}</span>
            ))}
            {enrichment.summary.risk_signals.map((sig, i) => (
              <span key={i} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">{sig}</span>
            ))}
          </div>
        </div>
      )}

      {/* Pitch History */}
      {pitches.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">月會記錄</h3>
          <div className="space-y-2">
            {pitches.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm border border-gray-100 rounded-lg px-3 py-2">
                <span className="font-medium">{p.pip_meetings?.id || p.meeting_id}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">順序 #{p.pitch_order}</span>
                  {p.decision && <ResultBadge result={p.decision} />}
                  <span className="text-xs text-gray-400">{p.followup_status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Gate 0 Tab ──────────────────────────────────────

function Gate0Tab({ gate }: { gate: GateRecord }) {
  const result = gate.result || gate.screening_result || 'pending'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">Gate 0 預篩結果</h3>
        <ResultBadge result={result} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">評估日期</span>
          <div className="font-medium">{gate.evaluation_date || '—'}</div>
        </div>
        <div>
          <span className="text-gray-400">評估者</span>
          <div className="font-medium">{gate.evaluator || '—'}</div>
        </div>
      </div>

      {/* Fail Reasons */}
      {gate.fail_reasons && gate.fail_reasons.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-700 mb-2">淘汰原因</h4>
          <div className="space-y-1">
            {gate.fail_reasons.map((r, i) => (
              <div key={i} className="text-sm bg-red-50 text-red-700 px-3 py-1.5 rounded-lg">{r}</div>
            ))}
          </div>
        </div>
      )}

      {/* Flags */}
      {gate.flags && gate.flags.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-amber-700 mb-2">警示標記 ({gate.flags.length})</h4>
          <div className="space-y-1">
            {gate.flags.map((f, i) => (
              <div key={i} className="text-sm bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">{f}</div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {gate.notes && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">備註</h4>
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{gate.notes}</div>
        </div>
      )}
    </div>
  )
}

// ─── Gate 1 Tab ──────────────────────────────────────

function Gate1Tab({ gate }: { gate: GateRecord }) {
  const result = gate.result || gate.screening_result || 'pending'
  const dimensions = [
    { key: 'market',    label: '市場 Market',       score: gate.sosv_market || 0 },
    { key: 'solution',  label: '產品 Solution',     score: gate.sosv_solution || 0 },
    { key: 'team',      label: '團隊 Team',         score: gate.sosv_team || 0 },
    { key: 'traction',  label: '市場實績 Traction',  score: gate.sosv_traction || 0 },
    { key: 'fit',       label: '適配 Fit',           score: gate.sosv_timing || 0 },
  ]
  const total = dimensions.reduce((sum, d) => sum + d.score, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">Gate 1 評分</h3>
        <ResultBadge result={result} />
        {gate.gate1_confidence && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            信心度: {gate.gate1_confidence}
          </span>
        )}
      </div>

      {/* Total Score */}
      <div className="text-center py-4">
        <div className="text-5xl font-extrabold text-gray-900">{total}</div>
        <div className="text-sm text-gray-400 mt-1">/ 50 分</div>
        <div className="text-sm mt-2">
          {total >= 40 ? (
            <span className="text-green-600 font-semibold">Advance (推進)</span>
          ) : total >= 30 ? (
            <span className="text-amber-600 font-semibold">Watch (觀察)</span>
          ) : total >= 20 ? (
            <span className="text-gray-600 font-semibold">Defer (延後)</span>
          ) : (
            <span className="text-red-600 font-semibold">Fail (淘汰)</span>
          )}
        </div>
      </div>

      {/* Dimension Bars */}
      <div className="space-y-3">
        {dimensions.map(d => (
          <div key={d.key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{d.label}</span>
              <span className="text-sm font-bold text-gray-900">{d.score}/10</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  d.score >= 8 ? 'bg-teal-500' :
                  d.score >= 6 ? 'bg-teal-500' :
                  d.score >= 4 ? 'bg-amber-500' :
                  'bg-red-400'
                }`}
                style={{ width: `${d.score * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      {gate.notes && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">評分備註</h4>
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{gate.notes}</div>
        </div>
      )}
    </div>
  )
}

// ─── Gate 2 Tab ──────────────────────────────────────

function Gate2Tab({ gate }: { gate: GateRecord }) {
  const result = gate.result || gate.screening_result || 'pending'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">Gate 2 面審</h3>
        <ResultBadge result={result} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">評估日期</span>
          <div className="font-medium">{gate.evaluation_date || '—'}</div>
        </div>
        <div>
          <span className="text-gray-400">評估者</span>
          <div className="font-medium">{gate.evaluator || '—'}</div>
        </div>
      </div>

      {gate.notes && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">面審記錄</h4>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
            {gate.notes}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Enrichment Tab ──────────────────────────────────

function EnrichmentTab({ enrichment }: { enrichment: Enrichment }) {
  const SOURCE_LABELS: Record<string, string> = {
    tipo: 'TIPO 專利',
    judicial: '司法紀錄',
    pcc: '政府標案',
    mol: '勞動裁罰',
    grb: '政府補助',
  }

  const SIGNAL_COLORS: Record<string, string> = {
    found: 'bg-teal-100 text-teal-700',
    clean: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    risk: 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">盡調資料 (Enrichment v{enrichment.enrichment_version})</h3>
        <span className="text-xs text-gray-400">
          {new Date(enrichment.enriched_at).toLocaleDateString('zh-TW')}
        </span>
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(enrichment.sources).map(([key, src]) => {
          const count = src.patent_count ?? src.case_count ?? src.tender_count ?? src.penalty_count ?? src.grant_count ?? 0
          return (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{SOURCE_LABELS[key] || key}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SIGNAL_COLORS[src.signal] || 'bg-gray-100'}`}>
                  {src.signal}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-xs text-gray-400 mt-1">來源: {src.source}</div>
            </div>
          )
        })}
      </div>

      {/* Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrichment.summary.positive_signals.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-2">正面訊號</h4>
            <div className="space-y-1">
              {enrichment.summary.positive_signals.map((sig, i) => (
                <div key={i} className="text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">{sig}</div>
              ))}
            </div>
          </div>
        )}
        {enrichment.summary.risk_signals.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-700 mb-2">風險訊號</h4>
            <div className="space-y-1">
              {enrichment.summary.risk_signals.map((sig, i) => (
                <div key={i} className="text-sm bg-red-50 text-red-700 px-3 py-1.5 rounded-lg">{sig}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 text-xs text-gray-400 pt-2 border-t border-gray-100">
        <span>總資料源: {enrichment.summary.total_sources}</span>
        <span>自動解析: {enrichment.summary.auto_resolved}</span>
        <span>需人工: {enrichment.summary.manual_needed}</span>
      </div>
    </div>
  )
}

// ─── Timeline Tab ────────────────────────────────────

function TimelineTab({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">案件時間軸</h3>
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200" />
        <div className="space-y-4">
          {timeline.map((entry, i) => (
            <div key={i} className="flex items-start gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-teal-100 border-2 border-teal-400 flex items-center justify-center text-xs font-bold text-teal-700 shrink-0 z-10">
                {i + 1}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{entry.event}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(entry.date).toLocaleDateString('zh-TW')}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-0.5">{entry.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Shared Components ───────────────────────────────

function ResultBadge({ result }: { result: string }) {
  const colors: Record<string, string> = {
    pass: 'bg-green-100 text-green-700',
    advance: 'bg-green-100 text-green-700',
    watch: 'bg-amber-100 text-amber-700',
    defer: 'bg-gray-100 text-gray-600',
    fail: 'bg-red-100 text-red-700',
    invest: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-teal-100 text-teal-600',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[result] || 'bg-gray-100 text-gray-600'}`}>
      {result}
    </span>
  )
}

function BpDownloadButton({ startupId, uploadedAt }: { startupId: string; uploadedAt: string | null }) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/pipeline/${startupId}/bp`)
      if (!res.ok) {
        const err = await res.json()
        alert(err.error || '下載失敗')
        return
      }
      const { url } = await res.json()
      window.open(url, '_blank')
    } catch {
      alert('下載失敗')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 disabled:opacity-50 transition-colors"
      >
        <span>{loading ? '⏳' : '📄'}</span>
        {loading ? '產生連結中...' : '下載 BP'}
      </button>
      {uploadedAt && (
        <span className="text-xs text-gray-400">
          上傳於 {new Date(uploadedAt).toLocaleDateString('zh-TW')}
        </span>
      )}
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-64" />
      <div className="h-16 bg-gray-200 rounded-xl animate-pulse" />
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-96" />
      <div className="h-80 bg-gray-200 rounded-xl animate-pulse" />
    </div>
  )
}
