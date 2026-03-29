'use client'

import { useState, useEffect, useCallback } from 'react'
import StartupCardBrowser from '@/components/angel/StartupCardBrowser'

interface Pitch {
  id: string
  pitch_order: number
  startup: {
    id: string
    name_zh: string
    name_en: string | null
    sector: string | null
    one_liner: string | null
    pipeline_stage: number
    gate0_score: number | null
    gate1_score: number | null
  }
}

export default function CardsPage() {
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [myResponses, setMyResponses] = useState<Record<string, string>>({})
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Get active meeting cycle
      const meetingsRes = await fetch('/api/meetings')
      if (!meetingsRes.ok) { setLoading(false); return }
      const meetingsData = await meetingsRes.json()
      const active = (meetingsData.meetings || []).find(
        (m: { status: string }) => m.status === 'cards_ready' || m.status === 'vote_open'
      )
      if (!active) { setLoading(false); return }
      setActiveCycleId(active.id)

      // Load cards
      const cardsRes = await fetch(`/api/cards?cycle_id=${active.id}`)
      if (cardsRes.ok) {
        const cardsData = await cardsRes.json()
        setPitches(cardsData.pitches || [])
        setMyResponses(cardsData.myResponses || {})
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleResponse = useCallback(async (
    startupId: string,
    response: 'interested' | 'thinking' | 'not_for_me',
    reason?: string
  ) => {
    if (!activeCycleId) return

    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startup_id: startupId,
        meeting_cycle: activeCycleId,
        response,
        interest_reason: reason,
        cards_viewed: 6,
      }),
    })

    if (res.ok) {
      setMyResponses(prev => ({ ...prev, [startupId]: response }))
    }
  }, [activeCycleId])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (!activeCycleId) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-xl font-bold mb-2">目前沒有開放瀏覽的新創</h2>
        <p className="text-gray-500">候選新創上架後會收到通知</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">候選新創瀏覽</h1>
        <span className="text-sm text-gray-500">
          {activeCycleId} 月會 | {Object.keys(myResponses).length}/{pitches.length} 已回應
        </span>
      </div>

      {pitches.map((pitch) => (
        <StartupCardBrowser
          key={pitch.id}
          startup={pitch.startup}
          currentResponse={myResponses[pitch.startup.id] || null}
          onRespond={(response, reason) => handleResponse(pitch.startup.id, response, reason)}
        />
      ))}
    </div>
  )
}
