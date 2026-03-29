'use client'

import { useState, useEffect } from 'react'

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

export default function PipelinePage() {
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [cycleId, setCycleId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const meetingsRes = await fetch('/api/meetings')
      if (!meetingsRes.ok) { setLoading(false); return }
      const { meetings } = await meetingsRes.json()
      const active = (meetings || []).find((m: { status: string }) => m.status !== 'closed')
      if (!active) { setLoading(false); return }
      setCycleId(active.id)

      const cardsRes = await fetch(`/api/cards?cycle_id=${active.id}`)
      if (cardsRes.ok) {
        const data = await cardsRes.json()
        setPitches(data.pitches || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">本月 Pipeline</h1>
      {cycleId && <p className="text-gray-500">{cycleId} 月會候選新創</p>}

      {pitches.length === 0 ? (
        <div className="text-center py-16 text-gray-500">目前沒有候選新創</div>
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
                Stage {pitch.startup.pipeline_stage}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
