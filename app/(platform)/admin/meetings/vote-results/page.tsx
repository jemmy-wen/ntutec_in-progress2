'use client'

/**
 * F-014: Vote Results Visualization (Admin)
 *
 * Dashboard showing vote breakdown per startup:
 * - Invest/Pass/Defer bar chart
 * - Capital commitment estimates
 * - Investor list with amount ranges
 * - Ranking by invest rate
 */

import { useState, useEffect, useCallback } from 'react'

interface StartupResult {
  startup_id: string
  startup: { name_zh: string; name_en: string | null; sector: string | null; gate1_score: number | null }
  pitch_order: number
  pitch_decision: string | null
  votes: { invest: number; pass: number; defer: number; total: number }
  invest_rate: number
  capital_estimate: { min: number; max: number; mid: number }
  investors: { member_id: string; display_name: string; amount_range: string | null; reason: string | null }[]
  amount_distribution: { range: string; count: number }[]
}

interface VoteData {
  meeting_id: string
  summary: {
    total_pitches: number
    total_members: number
    voting_members: number
    total_votes: number
    voting_rate: number
    invest_total: number
    pass_total: number
    defer_total: number
    estimated_capital_mid: number
  }
  startups: StartupResult[]
}

const AMOUNT_LABELS: Record<string, string> = {
  'under_500k': '50萬以下',
  '500k_1m': '50-100萬',
  '1m_2m': '100-200萬',
  'over_2m': '200萬以上',
  'unspecified': '未指定',
}

function formatNTD(amount: number): string {
  if (amount >= 10_000_000) return `${(amount / 10_000_000).toFixed(1)}千萬`
  if (amount >= 1_000_000) return `${(amount / 10_000).toFixed(0)}萬`
  if (amount >= 10_000) return `${(amount / 10_000).toFixed(0)}萬`
  return `${amount.toLocaleString()}`
}

export default function VoteResultsPage() {
  const [data, setData] = useState<VoteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedStartup, setExpandedStartup] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      const meetingsRes = await fetch('/api/meetings')
      if (!meetingsRes.ok) throw new Error('Failed to load meetings')
      const { meetings } = await meetingsRes.json()
      const active = (meetings || []).find(
        (m: { status: string }) => !['closed'].includes(m.status)
      )
      if (!active) { setLoading(false); return }

      const res = await fetch(`/api/admin/meetings/vote-results?meeting_id=${active.id}`)
      if (!res.ok) throw new Error('Failed to load vote results')
      setData(await res.json())
      setLoading(false)
    } catch (e) {
      setError((e as Error).message)
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
        <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-red-600">{error}</p>
        <button onClick={() => { setError(null); setLoading(true); loadData() }} className="mt-4 text-teal-600 hover:underline">重試</button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🗳️</div>
        <h2 className="text-xl font-bold mb-2">尚無進行中的月會</h2>
        <p className="text-gray-500">月會投票開始後，這裡會顯示投票結果視覺化</p>
      </div>
    )
  }

  const { summary, startups } = data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">投票結果視覺化</h1>
        <span className="text-sm text-gray-500">{data.meeting_id} 月會</span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="投票率" value={`${summary.voting_rate}%`} sub={`${summary.voting_members}/${summary.total_members} 會員`}
          color={summary.voting_rate >= 70 ? 'green' : summary.voting_rate >= 40 ? 'yellow' : 'red'} />
        <StatCard label="願意投資" value={summary.invest_total} sub="票" color="green" />
        <StatCard label="不投資" value={summary.pass_total} sub="票" color="gray" />
        <StatCard label="保留" value={summary.defer_total} sub="票" color="yellow" />
        <StatCard label="預估資金池" value={formatNTD(summary.estimated_capital_mid)} sub="中位數估計" color="blue" />
      </div>

      {/* Global vote distribution bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">全場投票分佈</h3>
        <div className="h-6 bg-gray-100 rounded-full overflow-hidden flex">
          {summary.invest_total > 0 && (
            <div className="h-full bg-green-500 flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${(summary.invest_total / (summary.invest_total + summary.pass_total + summary.defer_total)) * 100}%`, minWidth: summary.invest_total > 0 ? '2rem' : 0 }}>
              {summary.invest_total}
            </div>
          )}
          {summary.defer_total > 0 && (
            <div className="h-full bg-yellow-400 flex items-center justify-center text-yellow-900 text-xs font-medium"
              style={{ width: `${(summary.defer_total / (summary.invest_total + summary.pass_total + summary.defer_total)) * 100}%`, minWidth: summary.defer_total > 0 ? '2rem' : 0 }}>
              {summary.defer_total}
            </div>
          )}
          {summary.pass_total > 0 && (
            <div className="h-full bg-gray-400 flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${(summary.pass_total / (summary.invest_total + summary.pass_total + summary.defer_total)) * 100}%`, minWidth: summary.pass_total > 0 ? '2rem' : 0 }}>
              {summary.pass_total}
            </div>
          )}
        </div>
        <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> 願意投資</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded-full inline-block" /> 保留</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-400 rounded-full inline-block" /> 不投資</span>
        </div>
      </div>

      {/* Per-startup results */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">各新創投票結果</h2>
        {startups.map((s, idx) => (
          <div key={s.startup_id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setExpandedStartup(expandedStartup === s.startup_id ? null : s.startup_id)}
              className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Rank badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                  idx === 1 ? 'bg-gray-100 text-gray-600' :
                  idx === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{s.startup.name_zh}</span>
                    {s.startup.sector && (
                      <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-600 rounded-full">{s.startup.sector}</span>
                    )}
                    {s.startup.gate1_score != null && (
                      <span className="text-xs text-gray-400">G1: {s.startup.gate1_score}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    投資率 {s.invest_rate}% · 預估 {formatNTD(s.capital_estimate.mid)}
                  </div>
                </div>

                {/* Mini vote bar */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-green-600 font-semibold">{s.votes.invest}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-yellow-600">{s.votes.defer}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-500">{s.votes.pass}</span>
                  </div>
                  <VoteBar invest={s.votes.invest} defer={s.votes.defer} pass={s.votes.pass} />
                </div>
              </div>
            </button>

            {/* Expanded detail */}
            {expandedStartup === s.startup_id && (
              <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50/50 space-y-4">
                {/* Capital breakdown */}
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">資金承諾估計</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500">最低</div>
                      <div className="font-bold text-gray-900">{formatNTD(s.capital_estimate.min)}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="text-xs text-green-600">中位估計</div>
                      <div className="font-bold text-green-700">{formatNTD(s.capital_estimate.mid)}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500">最高</div>
                      <div className="font-bold text-gray-900">{formatNTD(s.capital_estimate.max)}</div>
                    </div>
                  </div>
                </div>

                {/* Amount distribution */}
                {s.amount_distribution.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">金額分佈</h4>
                    <div className="space-y-1.5">
                      {s.amount_distribution.map(d => (
                        <div key={d.range} className="flex items-center gap-2 text-sm">
                          <span className="w-24 text-gray-600">{AMOUNT_LABELS[d.range] || d.range}</span>
                          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full"
                              style={{ width: `${(d.count / s.votes.invest) * 100}%` }} />
                          </div>
                          <span className="font-medium w-8 text-right">{d.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Investor list */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">願意投資的會員（{s.investors.length} 人）</h4>
                  {s.investors.length === 0 ? (
                    <p className="text-sm text-gray-400">尚無投資意願</p>
                  ) : (
                    <div className="space-y-2">
                      {s.investors.map(inv => (
                        <div key={inv.member_id} className="flex items-center gap-2 text-sm bg-white rounded-lg p-2 border border-gray-100">
                          <span className="font-medium text-green-700">{inv.display_name}</span>
                          {inv.amount_range && (
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-xs">
                              {AMOUNT_LABELS[inv.amount_range] || inv.amount_range}
                            </span>
                          )}
                          {inv.reason && <span className="text-gray-400 text-xs ml-auto">「{inv.reason}」</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Sub-components ───

function StatCard({ label, value, sub, color }: {
  label: string; value: number | string; sub: string; color: 'green' | 'yellow' | 'red' | 'gray' | 'blue'
}) {
  const colorMap = {
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200',
    gray: 'bg-gray-50 border-gray-200',
    blue: 'bg-teal-50 border-teal-200',
  }
  const textMap = {
    green: 'text-green-700',
    yellow: 'text-yellow-700',
    red: 'text-red-700',
    gray: 'text-gray-700',
    blue: 'text-teal-700',
  }

  return (
    <div className={`rounded-xl border p-4 ${colorMap[color]}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${textMap[color]}`}>{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  )
}

function VoteBar({ invest, defer, pass }: { invest: number; defer: number; pass: number }) {
  const total = invest + defer + pass
  if (total === 0) return <div className="w-24 h-2 bg-gray-200 rounded-full" />

  return (
    <div className="w-24 h-3 bg-gray-100 rounded-full overflow-hidden flex">
      {invest > 0 && <div className="h-full bg-green-500" style={{ width: `${(invest / total) * 100}%` }} />}
      {defer > 0 && <div className="h-full bg-yellow-400" style={{ width: `${(defer / total) * 100}%` }} />}
      {pass > 0 && <div className="h-full bg-gray-400" style={{ width: `${(pass / total) * 100}%` }} />}
    </div>
  )
}
