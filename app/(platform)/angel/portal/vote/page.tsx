'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface VoteItem {
  startup_id: string
  name_zh: string
  sector: string | null
  decision: string | null
  intended_amount_range: string | null
}

const AMOUNT_OPTIONS = [
  { value: 'under_500k', label: '50萬以下' },
  { value: '500k_1m', label: '50-100萬' },
  { value: '1m_2m', label: '100-200萬' },
  { value: 'over_2m', label: '200萬以上' },
]

export default function VotePage() {
  const [votes, setVotes] = useState<VoteItem[]>([])
  const [cycleId, setCycleId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expandedInvest, setExpandedInvest] = useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{ startupId: string; decision: 'invest' | 'pass' | 'defer'; amount?: string } | null>(null)

  const load = useCallback(async () => {
    try {
      const meetingsRes = await fetch('/api/meetings')
      if (!meetingsRes.ok) { setLoading(false); return }
      const { meetings } = await meetingsRes.json()
      const active = (meetings || []).find((m: { status: string }) => m.status === 'vote_open')
      if (!active) { setLoading(false); return }
      setCycleId(active.id)

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
    } catch {
      setError(true)
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const submitVote = useCallback(async (startupId: string, decision: 'invest' | 'pass' | 'defer', amount?: string) => {
    if (!cycleId) return
    try {
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
    } catch {
      // Vote submission failed silently — user can retry
    }
  }, [cycleId])

  const handleInvestClick = (startupId: string) => {
    setExpandedInvest(startupId)
    setSelectedAmount(null)
  }

  const handleConfirmInvest = (startupId: string) => {
    if (!selectedAmount) return
    setConfirmDialog({ startupId, decision: 'invest', amount: selectedAmount })
  }

  const handlePassOrDefer = (startupId: string, decision: 'pass' | 'defer') => {
    setConfirmDialog({ startupId, decision })
  }

  const executeVote = () => {
    if (!confirmDialog) return
    submitVote(confirmDialog.startupId, confirmDialog.decision, confirmDialog.amount)
    setConfirmDialog(null)
    setExpandedInvest(null)
    setSelectedAmount(null)
  }

  if (error) {
    return <ErrorState message="載入失敗" onRetry={() => { setError(false); setLoading(true); load() }} />
  }

  if (loading) {
    return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  }

  if (!cycleId) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🗳️</div>
        <h2 className="text-xl font-bold mb-2">投票尚未開放</h2>
        <p className="text-gray-500">月會前 7 天開放投票，屆時會收到通知</p>
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
                  {item.decision === 'invest'
                    ? `願意投資（${AMOUNT_OPTIONS.find(a => a.value === item.intended_amount_range)?.label || item.intended_amount_range || '-'}）`
                    : item.decision === 'defer' ? '保留' : '不投資'}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleInvestClick(item.startup_id)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.decision === 'invest'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                }`}
              >
                願意投資
              </button>
              <button
                onClick={() => handlePassOrDefer(item.startup_id, 'defer')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.decision === 'defer'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
                }`}
              >
                保留
              </button>
              <button
                onClick={() => handlePassOrDefer(item.startup_id, 'pass')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.decision === 'pass'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                不投資
              </button>
            </div>

            {/* Amount selection dropdown */}
            {expandedInvest === item.startup_id && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="block text-sm font-medium text-green-800 mb-2">請選擇投資金額範圍</label>
                <select
                  value={selectedAmount || ''}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-green-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="">請選擇...</option>
                  {AMOUNT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleConfirmInvest(item.startup_id)}
                  disabled={!selectedAmount}
                  className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  確認投資意向
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">確認送出</h3>
            <p className="text-sm text-gray-600 mb-4">
              {confirmDialog.decision === 'invest'
                ? `確定對此新創表達「願意投資」意向（${AMOUNT_OPTIONS.find(a => a.value === confirmDialog.amount)?.label}）？`
                : confirmDialog.decision === 'defer'
                ? '確定選擇「保留」？'
                : '確定選擇「不投資」？'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={executeVote}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
