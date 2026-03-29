'use client'

import { useState, useEffect, useCallback } from 'react'

interface VoteItem {
  startup_id: string
  name_zh: string
  sector: string | null
  decision: string | null
  intended_amount_range: string | null
}

export default function VotePage() {
  const [votes, setVotes] = useState<VoteItem[]>([])
  const [cycleId, setCycleId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const meetingsRes = await fetch('/api/meetings')
      if (!meetingsRes.ok) { setLoading(false); return }
      const { meetings } = await meetingsRes.json()
      const active = (meetings || []).find((m: { status: string }) => m.status === 'vote_open')
      if (!active) { setLoading(false); return }
      setCycleId(active.id)

      // Load existing votes + card responses as basis
      const cardsRes = await fetch(`/api/cards?cycle_id=${active.id}`)
      const votesRes = await fetch(`/api/votes?cycle_id=${active.id}`)
      if (cardsRes.ok && votesRes.ok) {
        const cardsData = await cardsRes.json()
        const votesData = await votesRes.json()

        const existingVotes = new Map(
          (votesData.votes || []).map((v: { startup: { id: string }; decision: string; intended_amount_range: string }) => [
            v.startup?.id, { decision: v.decision, intended_amount_range: v.intended_amount_range }
          ])
        )

        const items: VoteItem[] = (cardsData.pitches || []).map((p: { startup: { id: string; name_zh: string; sector: string | null } }) => {
          const existing = existingVotes.get(p.startup.id) as { decision: string; intended_amount_range: string } | undefined
          return {
            startup_id: p.startup.id,
            name_zh: p.startup.name_zh,
            sector: p.startup.sector,
            decision: existing?.decision || null,
            intended_amount_range: existing?.intended_amount_range || null,
          }
        })
        setVotes(items)
      }
      setLoading(false)
    }
    load()
  }, [])

  const submitVote = useCallback(async (startupId: string, decision: 'invest' | 'pass' | 'defer', amount?: string) => {
    if (!cycleId) return
    const res = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startup_id: startupId,
        meeting_cycle: cycleId,
        decision,
        intended_amount_range: amount || null,
        attended_meeting: true,
      }),
    })
    if (res.ok) {
      setVotes(prev => prev.map(v =>
        v.startup_id === startupId ? { ...v, decision, intended_amount_range: amount || null } : v
      ))
    }
  }, [cycleId])

  if (loading) {
    return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  }

  if (!cycleId) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🗳️</div>
        <h2 className="text-xl font-bold mb-2">投票尚未開放</h2>
        <p className="text-gray-500">月會前 7 天開放投票，届時會收到通知</p>
      </div>
    )
  }

  const totalVoted = votes.filter(v => v.decision).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">投資意向確認</h1>
        <span className="text-sm text-gray-500">
          {totalVoted}/{votes.length} 已投票
        </span>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        記名投票，投票結果僅 Admin 可見。您的選擇不會影響其他會員。
      </div>

      <div className="space-y-4">
        {votes.map((item) => (
          <div key={item.startup_id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{item.name_zh}</h3>
                {item.sector && <span className="text-sm text-gray-500">{item.sector}</span>}
              </div>
              {item.decision && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.decision === 'invest' ? 'bg-green-100 text-green-700' :
                  item.decision === 'defer' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.decision === 'invest' ? '願意投資' : item.decision === 'defer' ? '保留' : '不投資'}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => submitVote(item.startup_id, 'invest')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.decision === 'invest'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                }`}
              >
                願意投資
              </button>
              <button
                onClick={() => submitVote(item.startup_id, 'defer')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.decision === 'defer'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
                }`}
              >
                保留
              </button>
              <button
                onClick={() => submitVote(item.startup_id, 'pass')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.decision === 'pass'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                不投資
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
