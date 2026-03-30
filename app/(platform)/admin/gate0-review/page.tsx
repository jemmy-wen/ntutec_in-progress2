'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

/**
 * F-001 + F-002: Gate 0 Auto-Score & Batch Review Panel
 *
 * Features:
 * - One-click auto-score all pending startups
 * - Batch review panel for borderline/pending cases
 * - Keyboard shortcuts: P=Pass, F=Fail, W=Watch, S=Skip
 * - Progress bar for batch processing
 */

interface Gate0Startup {
  id: string
  name_zh: string
  name_en: string | null
  tax_id: string | null
  sector: string | null
  country: string | null
  funding_stage: string | null
  email: string | null
  representative: string | null
  product_oneliner: string | null
  founded_year: number | null
  website: string | null
  capital_paid: number | null
  track: string | null
  current_gate_result: string | null
  gate0: {
    result: string
    notes: string | null
    evaluation_date: string | null
  } | null
}

interface AutoScoreResult {
  success: boolean
  dry_run: boolean
  total: number
  results: {
    pass: number
    fail: number
    borderline: number
    skipped: number
  }
  details: Array<{
    startup_id: string
    startup_name: string
    result: string
    hard_fails: number
    soft_flags: number
    flags: string[]
    fail_reasons: string[]
    notes: string[]
    checks: Array<{
      criterion: string
      label: string
      type: string
      message: string | null
    }>
  }>
  errors: string[]
}

type FilterType = 'pending' | 'borderline' | 'all'

export default function Gate0ReviewPage() {
  const router = useRouter()
  const [startups, setStartups] = useState<Gate0Startup[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('pending')

  // Auto-score state
  const [scoring, setScoring] = useState(false)
  const [scoreResult, setScoreResult] = useState<AutoScoreResult | null>(null)

  // Review state
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [reviewNotes, setReviewNotes] = useState('')
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(0)

  // Expanded detail view
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const fetchCandidates = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/gate0/candidates?filter=${filter}&limit=100`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setStartups(data.startups)
      setTotal(data.total)
      setSelectedIdx(0)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchCandidates()
  }, [fetchCandidates])

  // ─── Keyboard shortcuts ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in notes
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return

      const selected = startups[selectedIdx]
      if (!selected) return

      switch (e.key.toLowerCase()) {
        case 'p':
          handleReview(selected.id, 'pass')
          break
        case 'f':
          handleReview(selected.id, 'fail')
          break
        case 'w':
          handleReview(selected.id, 'watch')
          break
        case 's':
        case 'arrowdown':
          e.preventDefault()
          setSelectedIdx(prev => Math.min(prev + 1, startups.length - 1))
          break
        case 'arrowup':
          e.preventDefault()
          setSelectedIdx(prev => Math.max(prev - 1, 0))
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [startups, selectedIdx])

  // ─── Auto-score handler ───
  const handleAutoScore = async (dryRun: boolean) => {
    setScoring(true)
    setScoreResult(null)
    try {
      const res = await fetch('/api/admin/gate0/auto-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'batch', dry_run: dryRun }),
      })
      const data: AutoScoreResult = await res.json()
      setScoreResult(data)
      if (!dryRun) {
        await fetchCandidates() // Refresh list
      }
    } catch (err) {
      console.error('Auto-score error:', err)
    } finally {
      setScoring(false)
    }
  }

  // ─── Manual review handler ───
  const handleReview = async (startupId: string, decision: 'pass' | 'fail' | 'watch') => {
    setProcessing(true)
    try {
      const res = await fetch('/api/admin/gate0/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startup_id: startupId,
          decision,
          notes: reviewNotes || undefined,
        }),
      })
      if (res.ok) {
        setProcessed(prev => prev + 1)
        setReviewNotes('')
        // Remove from list and advance
        setStartups(prev => prev.filter(s => s.id !== startupId))
        setTotal(prev => prev - 1)
        // Don't advance selectedIdx since array shrinks
      }
    } catch (err) {
      console.error('Review error:', err)
    } finally {
      setProcessing(false)
    }
  }

  const selected = startups[selectedIdx]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gate 0 評估中心</h1>
          <p className="text-sm text-gray-500 mt-1">
            {total} 家待處理 · 已處理 {processed} 家本次
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleAutoScore(true)}
            disabled={scoring}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {scoring ? '處理中...' : '🧪 預覽自動評分'}
          </button>
          <button
            onClick={() => handleAutoScore(false)}
            disabled={scoring}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {scoring ? '處理中...' : '⚡ 一鍵自動評分'}
          </button>
        </div>
      </div>

      {/* Auto-score result banner */}
      {scoreResult && (
        <div className={`mb-6 rounded-lg p-4 ${scoreResult.dry_run ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">
                {scoreResult.dry_run ? '🧪 預覽結果' : '✅ 自動評分完成'}
              </span>
              <span className="ml-3 text-sm text-gray-600">
                共 {scoreResult.total} 家：
                ✅ Pass {scoreResult.results.pass}
                · ❌ Fail {scoreResult.results.fail}
                · 🔍 Borderline {scoreResult.results.borderline}
                · ⏭️ 已跳過 {scoreResult.results.skipped}
              </span>
            </div>
            <button onClick={() => setScoreResult(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          {scoreResult.errors.length > 0 && (
            <div className="mt-2 text-sm text-red-600">
              {scoreResult.errors.length} 筆錯誤：{scoreResult.errors[0]}
            </div>
          )}
        </div>
      )}

      {/* Filter tabs */}
      <div className="mb-4 flex gap-2">
        {(['pending', 'borderline', 'all'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f === 'pending' ? '待評估' : f === 'borderline' ? '需人工審核' : '全部'}
          </button>
        ))}
      </div>

      {/* Main content: split view */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left: startup list */}
        <div className="col-span-2 rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="border-b border-gray-100 px-4 py-3 bg-gray-50">
            <span className="text-sm font-medium text-gray-700">案源列表</span>
            <span className="ml-2 text-xs text-gray-400">↑↓ 導航 · P/F/W 操作 · S 跳過</span>
          </div>
          <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400">載入中...</div>
            ) : startups.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                {filter === 'pending' ? '🎉 全部評估完畢！' : '無案源'}
              </div>
            ) : (
              startups.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`cursor-pointer border-b border-gray-50 px-4 py-3 transition-colors ${
                    idx === selectedIdx ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 text-sm">{s.name_zh}</span>
                    {s.gate0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        s.gate0.result === 'pass' ? 'bg-green-100 text-green-700' :
                        s.gate0.result === 'fail' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {s.gate0.result}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-gray-500 truncate">
                    {s.sector || '未分類'} · {s.funding_stage || '—'}
                    {s.tax_id ? ' · 有統編' : ''}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: detail + actions */}
        <div className="col-span-3">
          {selected ? (
            <div className="rounded-lg border border-gray-200 bg-white">
              {/* Startup detail */}
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">{selected.name_zh}</h2>
                {selected.name_en && (
                  <p className="text-sm text-gray-500 mt-0.5">{selected.name_en}</p>
                )}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <InfoRow label="產業" value={selected.sector} />
                  <InfoRow label="融資階段" value={selected.funding_stage} />
                  <InfoRow label="統編" value={selected.tax_id} />
                  <InfoRow label="資本額" value={selected.capital_paid ? `NT$ ${(selected.capital_paid / 10000).toLocaleString()} 萬` : null} />
                  <InfoRow label="成立年" value={selected.founded_year?.toString()} />
                  <InfoRow label="國家" value={selected.country || '台灣'} />
                  <InfoRow label="Email" value={selected.email} />
                  <InfoRow label="聯絡人" value={selected.representative} />
                  <InfoRow label="網站" value={selected.website} link />
                </div>
                {selected.product_oneliner && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                    💡 {selected.product_oneliner}
                  </div>
                )}

                {/* Gate 0 auto-score details if available */}
                {selected.gate0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-800">
                      自動評分結果：{selected.gate0.result}
                      {selected.gate0.evaluation_date && (
                        <span className="ml-2 text-blue-600 font-normal">({selected.gate0.evaluation_date})</span>
                      )}
                    </div>
                    {selected.gate0.notes && (
                      <div className="mt-2 text-xs text-blue-700 whitespace-pre-line">
                        {selected.gate0.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Review actions */}
              <div className="p-6">
                <textarea
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  placeholder="備註（選填）"
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReview(selected.id, 'pass')}
                    disabled={processing}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    ✅ Pass (P)
                  </button>
                  <button
                    onClick={() => handleReview(selected.id, 'fail')}
                    disabled={processing}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    ❌ Fail (F)
                  </button>
                  <button
                    onClick={() => handleReview(selected.id, 'watch')}
                    disabled={processing}
                    className="flex-1 rounded-lg bg-yellow-500 px-4 py-3 text-sm font-medium text-white hover:bg-yellow-600 disabled:opacity-50 transition-colors"
                  >
                    👁 Watch (W)
                  </button>
                  <button
                    onClick={() => setSelectedIdx(prev => Math.min(prev + 1, startups.length - 1))}
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    ⏭ Skip (S)
                  </button>
                </div>

                {/* Progress */}
                {processed > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>本次進度</span>
                      <span>{processed} / {processed + startups.length}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${(processed / (processed + startups.length)) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center text-gray-400">
              選擇左側案源開始審核
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, link }: { label: string; value: string | null | undefined; link?: boolean }) {
  return (
    <div>
      <span className="text-gray-500">{label}：</span>
      {value ? (
        link ? (
          <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {value}
          </a>
        ) : (
          <span className="text-gray-900">{value}</span>
        )
      ) : (
        <span className="text-gray-300">—</span>
      )}
    </div>
  )
}
