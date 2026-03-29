'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface LearningItem {
  id: string
  content_type: string
  content_id: string
  read_at: string
  completion_pct: number
}

const CONTENT_CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'digest', label: 'Digest 文章' },
  { key: 'industry_report', label: '產業趨勢' },
  { key: 'case_study', label: '案例覆盤' },
  { key: 'tutorial', label: '天使投資入門' },
]

export default function LearnPage() {
  const [progress, setProgress] = useState<LearningItem[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/learning')
      if (res.ok) {
        const data = await res.json()
        setProgress(data.progress || [])
      }
      setLoading(false)
    } catch {
      setError(true)
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = filter === 'all' ? progress : progress.filter(p => p.content_type === filter)

  const allStatsZero = CONTENT_CATEGORIES.slice(1).every(
    cat => progress.filter(p => p.content_type === cat.key).length === 0
  )

  if (error) {
    return <ErrorState message="載入失敗" onRetry={() => { setError(false); setLoading(true); load() }} />
  }

  if (loading) {
    return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">投資學習中心</h1>

      {/* Stats — hidden when all zero */}
      {!allStatsZero && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CONTENT_CATEGORIES.slice(1).map(cat => {
            const count = progress.filter(p => p.content_type === cat.key).length
            return (
              <div key={cat.key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{count}</div>
                <div className="text-sm text-gray-500">{cat.label}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {CONTENT_CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content list — placeholder for Ghost CMS integration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-4">📚</div>
        <h2 className="text-lg font-semibold mb-2">學習內容即將上線</h2>
        <p className="text-gray-500 text-sm">
          學習中心將整合 Ghost CMS，提供產業觀察、DD 知識、案例覆盤等內容。
        </p>
        {filtered.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="text-sm font-medium text-gray-700 mb-3">您的閱讀紀錄</h3>
            <div className="space-y-2">
              {filtered.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="text-sm font-medium">{item.content_id}</span>
                    <span className="text-xs text-gray-400 ml-2">{item.content_type}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(item.read_at).toLocaleDateString('zh-TW')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
