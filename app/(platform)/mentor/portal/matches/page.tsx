'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface Match {
  id: string
  team_name: string
  topic?: string
  status: string
  scheduled_at?: string
}

export default function MentorMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMatches = useCallback(async () => {
    setError(null)
    try {
      const res = await fetch('/api/mentor/matches')
      if (res.ok) {
        const data = await res.json()
        setMatches(Array.isArray(data) ? data : data.matches || [])
      } else if (res.status === 401) {
        setMatches([])
      } else {
        throw new Error(`載入配對資料失敗（${res.status}）`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '載入配對資料時發生未知錯誤'
      setError(message)
      console.error('Failed to load matches:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadMatches() }, [loadMatches])

  if (loading) {
    return <div className="animate-pulse space-y-4"><div className="h-32 bg-gray-200 rounded-xl" /></div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">配對結果</h1>

      {error ? (
        <ErrorState message={error} onRetry={loadMatches} />
      ) : matches.length > 0 ? (
        <div className="space-y-3">
          {matches.map(match => (
            <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{match.team_name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {match.status}
                </span>
              </div>
              {match.topic && (
                <p className="text-sm text-gray-600 mb-1">主題：{match.topic}</p>
              )}
              {match.scheduled_at && (
                <p className="text-sm text-gray-500">
                  預定時間：{new Date(match.scheduled_at).toLocaleString('zh-TW')}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h2 className="text-lg font-semibold mb-2">尚無配對結果</h2>
          <p className="text-gray-500 text-sm">
            配對完成後，您可在此查看配對的團隊資訊與健診安排。
            <br />請先完成時段提交，等待系統進行配對。
          </p>
        </div>
      )}
    </div>
  )
}
