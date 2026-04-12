'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Admin Forms — Unified form submissions dashboard.
 * Shows all submissions from contact, apply, angel_apply, pitch, consulting.
 * Supports filter by type/status, status updates, and full data expansion.
 */

type FormType = 'contact' | 'apply' | 'angel_apply' | 'angel_individual' | 'angel_corporate' | 'pitch' | 'consulting'
type SubmissionStatus = 'new' | 'read' | 'replied' | 'archived'

interface FormSubmission {
  id: string
  type: string
  name: string
  email: string
  status: SubmissionStatus
  created_at: string
  updated_at: string | null
  data: Record<string, unknown>
  assigned_to: string | null
}

// ─── Config ──────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  contact:              '一般聯絡',
  apply:                '加速器申請',
  angel_apply:          '天使會員申請',
  angel_individual:     '天使個人申請',
  angel_corporate:      '天使企業申請',
  pitch:                '新創投遞',
  consulting:           '企業諮詢',
  startup:              '新創申請',
  angel:                '天使俱樂部',
  mentor:               '業師申請',
  partnership:          '合作洽談',
  media:                '媒體採訪',
  other:                '其他',
  startup_application:  '新創申請（Google Form）',
}

const STATUS_CONFIG: Record<SubmissionStatus, { label: string; color: string }> = {
  new:      { label: '未讀',   color: 'bg-red-100 text-red-700 border border-red-200' },
  read:     { label: '已讀',   color: 'bg-yellow-100 text-yellow-700 border border-yellow-200' },
  replied:  { label: '已回覆', color: 'bg-green-100 text-green-700 border border-green-200' },
  archived: { label: '已封存', color: 'bg-gray-100 text-gray-600 border border-gray-200' },
}

const STATUS_ORDER: SubmissionStatus[] = ['new', 'read', 'replied', 'archived']

const FILTER_TYPES: { value: string; label: string }[] = [
  { value: '', label: '全部類型' },
  { value: 'contact', label: '一般聯絡' },
  { value: 'startup_application', label: '新創申請（Google Form）' },
  { value: 'apply', label: '加速器申請' },
  { value: 'angel_individual', label: '天使個人申請' },
  { value: 'angel_corporate', label: '天使企業申請' },
  { value: 'angel_apply', label: '天使會員申請（舊）' },
  { value: 'pitch', label: '新創投遞' },
  { value: 'consulting', label: '企業諮詢' },
]

const FILTER_STATUSES: { value: string; label: string }[] = [
  { value: '', label: '全部狀態' },
  { value: 'new', label: '未讀' },
  { value: 'read', label: '已讀' },
  { value: 'replied', label: '已回覆' },
  { value: 'archived', label: '已封存' },
]

// ─── Type Badge ──────────────────────────────────────────

const TYPE_BADGE_COLORS: Record<string, string> = {
  startup_application:  'bg-blue-50 text-blue-700',
  apply:                'bg-blue-50 text-blue-700',
  contact:              'bg-gray-100 text-gray-600',
  angel_individual:     'bg-amber-50 text-amber-700',
  angel_apply:          'bg-amber-50 text-amber-700',
  angel_corporate:      'bg-purple-50 text-purple-700',
  pitch:                'bg-blue-50 text-blue-700',
  consulting:           'bg-indigo-50 text-indigo-700',
}

function TypeBadge({ type }: { type: string }) {
  const colorClass = TYPE_BADGE_COLORS[type] ?? 'bg-teal-50 text-teal-700'
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}>
      {TYPE_LABELS[type] || type}
    </span>
  )
}

// ─── Component ───────────────────────────────────────────

export default function AdminFormsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [newCount, setNewCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (filterType) params.set('type', filterType)
      if (filterStatus) params.set('status', filterStatus)
      params.set('limit', '100')

      const res = await fetch(`/api/admin/forms?${params.toString()}`)
      if (!res.ok) throw new Error(`Failed to load (${res.status})`)
      const json = await res.json()
      setSubmissions(json.data || [])
      setNewCount(json.newCount || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗')
    } finally {
      setLoading(false)
    }
  }, [filterType, filterStatus])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  async function updateStatus(id: string, status: SubmissionStatus) {
    setUpdatingId(id)
    try {
      const res = await fetch('/api/admin/forms', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error('Update failed')
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      )
      // Update newCount
      setNewCount((prev) => {
        const wasNew = submissions.find((s) => s.id === id)?.status === 'new'
        const becomesNew = status === 'new'
        if (wasNew && !becomesNew) return Math.max(0, prev - 1)
        if (!wasNew && becomesNew) return prev + 1
        return prev
      })
    } catch {
      alert('狀態更新失敗，請重試')
    } finally {
      setUpdatingId(null)
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString('zh-TW', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">表單提交</h1>
          <p className="mt-1 text-sm text-gray-500">
            來自官網各頁面的聯絡、申請與諮詢紀錄
          </p>
        </div>
        {newCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 border border-red-200">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            {newCount} 筆未讀
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {FILTER_TYPES.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {FILTER_STATUSES.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        <button
          onClick={fetchSubmissions}
          disabled={loading}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          {loading ? '載入中...' : '重新整理'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      {loading && submissions.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          載入中...
        </div>
      ) : submissions.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          沒有符合條件的提交紀錄
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">日期</th>
                <th className="px-4 py-3">類型</th>
                <th className="px-4 py-3">姓名</th>
                <th className="px-4 py-3 hidden md:table-cell">Email</th>
                <th className="px-4 py-3">狀態</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {submissions.map((submission) => (
                <>
                  <tr
                    key={submission.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      submission.status === 'new' ? 'font-medium' : ''
                    }`}
                    onClick={() =>
                      setExpandedId(expandedId === submission.id ? null : submission.id)
                    }
                  >
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(submission.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <TypeBadge type={submission.type} />
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {submission.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      <a
                        href={`mailto:${submission.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-teal-600 hover:underline"
                      >
                        {submission.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          STATUS_CONFIG[submission.status]?.color ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {STATUS_CONFIG[submission.status]?.label ?? submission.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1 flex-wrap">
                        {STATUS_ORDER.filter((s) => s !== submission.status).map((nextStatus) => (
                          <button
                            key={nextStatus}
                            disabled={updatingId === submission.id}
                            onClick={() => updateStatus(submission.id, nextStatus)}
                            className="rounded px-2 py-1 text-xs border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors whitespace-nowrap"
                          >
                            {STATUS_CONFIG[nextStatus].label}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded row — full data */}
                  {expandedId === submission.id && (
                    <tr key={`${submission.id}-expanded`} className="bg-gray-50">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="rounded-lg bg-white border border-gray-100 p-4">
                          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            提交內容
                          </div>
                          {Object.keys(submission.data).length === 0 ? (
                            <p className="text-sm text-gray-400">（無額外資料）</p>
                          ) : (
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                              {Object.entries(submission.data).map(([key, val]) => (
                                <div key={key} className="flex gap-2 min-w-0">
                                  <dt className="shrink-0 text-xs font-medium text-gray-500 w-24 truncate">
                                    {key}
                                  </dt>
                                  <dd className="text-sm text-gray-800 break-words min-w-0">
                                    {val === null || val === undefined
                                      ? '—'
                                      : typeof val === 'object'
                                      ? JSON.stringify(val)
                                      : String(val)}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          )}
                          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 flex gap-4 flex-wrap">
                            <span>ID: {submission.id}</span>
                            {submission.assigned_to && (
                              <span>負責人: {submission.assigned_to}</span>
                            )}
                            {submission.updated_at && (
                              <span>更新: {formatDate(submission.updated_at)}</span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>

          <div className="border-t border-gray-100 px-4 py-3 text-xs text-gray-400">
            共 {submissions.length} 筆記錄
            {(filterType || filterStatus) && '（篩選中）'}
          </div>
        </div>
      )}
    </div>
  )
}
