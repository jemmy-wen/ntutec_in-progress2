'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface Pitch {
  id: string
  pitch_order: number
  startup: {
    id: string
    name_zh: string
    sector: string | null
    one_liner: string | null
    pipeline_stage: number
  }
}

const STAGE_LABELS: Record<number, string> = {
  1: '初篩通過',
  2: '深度評估',
  3: '面審候選',
  4: '已面審',
  5: '決議中',
}

function formatMeetingMonth(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' })
}

export default function PipelinePage() {
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [cycleLabel, setCycleLabel] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    try {
      const meetingsRes = await fetch('/api/meetings')
      if (!meetingsRes.ok) { setLoading(false); return }
      const { meetings } = await meetingsRes.json()
      const active = (meetings || []).find((m: { status: string }) => m.status !== 'closed')
      if (!active) { setLoading(false); return }
      setCycleLabel(formatMeetingMonth(active.meeting_date))

      const cardsRes = await fetch(`/api/cards?cycle_id=${active.id}`)
      if (cardsRes.ok) {
        const data = await cardsRes.json()
        setPitches(data.pitches || [])
      }
      setLoading(false)
    } catch {
      setError(true)
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  if (error) {
    return <ErrorState message="載入失敗" onRetry={() => { setError(false); setLoading(true); load() }} />
  }

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">本月 Pipeline</h1>
      {cycleLabel && <p className="text-gray-500">{cycleLabel}月會候選新創</p>}

      {pitches.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-xl font-bold mb-2">目前沒有候選新創</h2>
          <p className="text-gray-500">新的候選新創進入 Pipeline 後會在此顯示</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {pitches.map((pitch, i) => (
            <div key={pitch.id} className="p-4 flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium">{pitch.startup.name_zh}</div>
                <div className="text-sm text-gray-500">
                  {pitch.startup.sector && <span>{pitch.startup.sector}</span>}
                  {pitch.startup.one_liner && <span className="ml-2">— {pitch.startup.one_liner}</span>}
                </div>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {STAGE_LABELS[pitch.startup.pipeline_stage] || `Stage ${pitch.startup.pipeline_stage}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
