'use client'

/**
 * F-016: Angel Member Portfolio Page
 * Displays investment holdings, status, and performance summary.
 * Data: GET /api/angel/portfolio → v_my_portfolio view
 */

import { useState, useEffect } from 'react'

interface Investment {
  id: string
  startup_id: string
  startup_name: string
  startup_name_en?: string
  sector: string
  pipeline_stage: string | null
  amount_twd: number | null
  investment_date: string | null
  round: string | null
  equity_pct: number | null
  status: 'active' | 'exited' | 'written_off' | 'pending'
  exit_date: string | null
  exit_amount_twd: number | null
  return_pct: number | null
  notes?: string
}

interface PortfolioSummary {
  total_investments: number
  active_count: number
  exited_count: number
  total_deployed_twd: number
  total_exit_twd: number
}

const STATUS_CONFIG = {
  active:      { label: '持有中',  color: 'bg-teal-100 text-teal-700' },
  exited:      { label: '已退出',  color: 'bg-green-100 text-green-700' },
  written_off: { label: '已減損',  color: 'bg-red-100 text-red-700' },
  pending:     { label: '待交割',  color: 'bg-yellow-100 text-yellow-700' },
}

const ROUND_LABEL: Record<string, string> = {
  'pre-seed': 'Pre-Seed', 'seed': 'Seed', 'series-a': 'Series A',
  'series-b': 'Series B', 'series-c': 'Series C', 'strategic': 'Strategic', 'other': '其他',
}

function formatTwd(amount: number | null): string {
  if (amount == null) return '—'
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} 百萬`
  if (amount >= 10_000) return `${(amount / 10_000).toFixed(0)} 萬`
  return `${amount.toLocaleString()}`
}

export default function PortfolioPage() {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null)
  const [portfolio, setPortfolio] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetch('/api/angel/portfolio')
      .then(r => r.json())
      .then(d => {
        setSummary(d.summary)
        setPortfolio(d.portfolio || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = filterStatus === 'all'
    ? portfolio
    : portfolio.filter(i => i.status === filterStatus)

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">投後追蹤</h1>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="all">全部</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <SummaryCard label="投資案件" value={String(summary.total_investments)} sub="共計" />
          <SummaryCard label="持有中" value={String(summary.active_count)} sub="件" />
          <SummaryCard label="已投入" value={formatTwd(summary.total_deployed_twd)} sub="NTD" />
          <SummaryCard
            label="已退出報酬"
            value={summary.total_exit_twd > 0 ? formatTwd(summary.total_exit_twd) : '—'}
            sub="NTD"
            highlight={summary.total_exit_twd > summary.total_deployed_twd}
          />
        </div>
      )}

      {/* Portfolio List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-4">📈</div>
          <h2 className="text-lg font-semibold mb-2">
            {portfolio.length === 0 ? '尚無投資紀錄' : '無符合篩選條件的紀錄'}
          </h2>
          <p className="text-gray-500 text-sm">
            {portfolio.length === 0
              ? '投資達成後，您的投資組合將顯示於此，包含里程碑、融資進度與報酬追蹤。'
              : '請調整篩選條件。'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(inv => (
            <InvestmentRow key={inv.id} investment={inv} />
          ))}
        </div>
      )}
    </div>
  )
}

function SummaryCard({ label, value, sub, highlight = false }: {
  label: string; value: string; sub: string; highlight?: boolean
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-xl font-bold ${highlight ? 'text-green-600' : 'text-gray-900'}`}>{value}</div>
      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  )
}

function InvestmentRow({ investment: inv }: { investment: Investment }) {
  const sc = STATUS_CONFIG[inv.status] || STATUS_CONFIG.active

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-teal-300 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 truncate">{inv.startup_name}</span>
            {inv.startup_name_en && (
              <span className="text-xs text-gray-400 hidden sm:inline">{inv.startup_name_en}</span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc.color}`}>
              {sc.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {inv.sector && <span>📍 {inv.sector}</span>}
            {inv.round && <span>🔢 {ROUND_LABEL[inv.round] || inv.round}</span>}
            {inv.investment_date && (
              <span>📅 {new Date(inv.investment_date).toLocaleDateString('zh-TW')}</span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          {inv.amount_twd != null && (
            <div className="text-sm font-bold text-gray-800">
              NT$ {formatTwd(inv.amount_twd)}
            </div>
          )}
          {inv.equity_pct != null && (
            <div className="text-xs text-gray-400">{inv.equity_pct}%</div>
          )}
          {inv.status === 'exited' && inv.return_pct != null && (
            <div className={`text-xs font-bold mt-1 ${inv.return_pct >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {inv.return_pct >= 0 ? '+' : ''}{inv.return_pct}%
            </div>
          )}
        </div>
      </div>
      {inv.notes && (
        <div className="mt-2 text-xs text-gray-400 border-t border-gray-100 pt-2">{inv.notes}</div>
      )}
    </div>
  )
}
