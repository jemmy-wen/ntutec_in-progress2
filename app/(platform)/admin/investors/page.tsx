'use client'

import { useState, useEffect } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface MemberRow {
  membership_id: string
  investor_id: string
  display_name: string | null
  email: string | null
  organization: string | null
  title: string | null
  member_type: string
  company_name: string | null
  donation_amount: number | null
  membership_start: string | null
  membership_expiry: string | null
  membership_status: 'active' | 'expired' | 'pending' | 'renewed'
  payment_date: string | null
  payment_confirmed_by: string | null
  referrer: string | null
  member_code: string | null
  ntu_alumni: boolean
  company_tax_id: string | null
  company_paid_in_capital: number | null
}

interface Summary {
  total: number
  active: number
  expired: number
  pending: number
}

const STATUS_LABEL: Record<string, string> = {
  active: '付費有效',
  expired: '歷史會員',
  pending: '待繳費',
  renewed: '已續費',
}

const STATUS_COLOR: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  expired: 'bg-gray-100 text-gray-500',
  pending: 'bg-amber-100 text-amber-700',
  renewed: 'bg-teal-100 text-teal-700',
}

export default function InvestorsAdminPage() {
  const [members, setMembers] = useState<MemberRow[]>([])
  const [summary, setSummary] = useState<Summary>({ total: 0, active: 0, expired: 0, pending: 0 })
  const [statusFilter, setStatusFilter] = useState<string>('active')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadData() {
    setLoading(true)
    try {
      const res = await fetch('/api/members')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMembers(data.members || [])
      setSummary(data.summary || { total: 0, active: 0, expired: 0, pending: 0 })
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入會員資料失敗')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const filtered = members
    .filter(m => statusFilter === 'all' || m.membership_status === statusFilter)
    .filter(m => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        m.display_name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.organization?.toLowerCase().includes(q) ||
        m.member_code?.toLowerCase().includes(q)
      )
    })

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); loadData() }} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">天使會員管理</h1>
        <span className="text-sm text-gray-500">共 {summary.total} 筆會籍紀錄</span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard
          label="付費有效"
          value={summary.active}
          color="text-emerald-700"
          bg="bg-emerald-50"
          active={statusFilter === 'active'}
          onClick={() => setStatusFilter(statusFilter === 'active' ? 'all' : 'active')}
        />
        <SummaryCard
          label="歷史會員"
          value={summary.expired}
          color="text-gray-600"
          bg="bg-gray-50"
          active={statusFilter === 'expired'}
          onClick={() => setStatusFilter(statusFilter === 'expired' ? 'all' : 'expired')}
        />
        <SummaryCard
          label="待繳費"
          value={summary.pending}
          color="text-amber-700"
          bg="bg-amber-50"
          active={statusFilter === 'pending'}
          onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
        />
        <SummaryCard
          label="全部"
          value={summary.total}
          color="text-gray-900"
          bg="bg-white border border-gray-200"
          active={statusFilter === 'all'}
          onClick={() => setStatusFilter('all')}
        />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="搜尋姓名、Email、公司、會員編號…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">姓名</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">公司</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">類型</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">捐款</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">有效期間</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">會籍狀態</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">統編</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">實收資本額</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">會員編號</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(m => (
                <tr key={m.membership_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{m.display_name ?? '-'}</div>
                    {m.email && <div className="text-xs text-gray-400">{m.email}</div>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{m.organization ?? m.company_name ?? '-'}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {m.member_type === 'corporate' ? '法人' : '個人'}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-700">
                    {m.donation_amount ? `NT$${(m.donation_amount / 1000).toFixed(0)}k` : '-'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-500">
                    {m.membership_start && m.membership_expiry
                      ? `${m.membership_start.slice(0, 7)} → ${m.membership_expiry.slice(0, 7)}`
                      : '-'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[m.membership_status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {STATUS_LABEL[m.membership_status] ?? m.membership_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">{m.company_tax_id ?? '-'}</td>
                  <td className="px-4 py-3 text-right text-xs tabular-nums text-gray-600">
                    {m.company_paid_in_capital
                      ? `NT$${(m.company_paid_in_capital / 1_000_000).toFixed(0)}M`
                      : '-'}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{m.member_code ?? '-'}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    沒有符合條件的會員
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        資料來源：angel_memberships（付費 SOT）。活躍度不顯示於此頁。
      </p>
    </div>
  )
}

function SummaryCard({
  label, value, color, bg, active, onClick,
}: {
  label: string; value: number; color: string; bg: string
  active?: boolean; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-4 text-center transition-all ${bg} ${active ? 'ring-2 ring-teal-500 shadow-md' : 'hover:shadow-sm'}`}
    >
      <div className={`text-3xl font-extrabold tabular-nums ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </button>
  )
}
