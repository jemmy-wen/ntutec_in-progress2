'use client'

import { useState, useEffect, useCallback } from 'react'
import { STATUS_LABELS, STATUS_COLORS, getNextTransition, canTransition, type MeetingCycleStatus } from '@/lib/utils/state-machine'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { ErrorState } from '@/components/shared/ErrorState'

/**
 * F-003: Meeting Management System
 *
 * Features:
 * - Meeting lifecycle timeline (setup → cards_ready → vote_open → meeting → followup → closed)
 * - Pitch assignment: select candidates, set order, manage
 * - D-day checklist for meeting preparation
 * - Meeting history
 */

interface Meeting {
  id: string
  meeting_date: string
  status: string
  is_archived: boolean
}

interface Pitch {
  id: string
  meeting_id: string
  startup_id: string
  pitch_order: number
  decision: string | null
  followup_status: string
  notes: string | null
  startup: {
    id: string
    name_zh: string
    name_en: string | null
    sector: string | null
    product_oneliner: string | null
    current_gate: string | null
    current_gate_result: string | null
    gate1_score: number | null
  } | null
}

interface Candidate {
  id: string
  name_zh: string
  name_en: string | null
  sector: string | null
  product_oneliner: string | null
  current_gate: string | null
  current_gate_result: string | null
  gate1_score: number | null
  pipeline_stage: number | string | null
  funding_stage: string | null
  ntu_affiliation: string | null
  already_assigned: boolean
}

const CYCLE_ID_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/
const STAGES: MeetingCycleStatus[] = ['setup', 'cards_ready', 'vote_open', 'meeting', 'followup', 'closed']
const STAGE_ICONS: Record<MeetingCycleStatus, string> = {
  setup: '⚙️', cards_ready: '🃏', vote_open: '🗳️', meeting: '🎤', followup: '📋', closed: '✅',
}

export default function MeetingsAdminPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [newCycleId, setNewCycleId] = useState('')
  const [newDate, setNewDate] = useState('')
  const [transitionTarget, setTransitionTarget] = useState<{ cycleId: string; nextStatus: string; description: string } | null>(null)

  // Pitch management
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [showCandidates, setShowCandidates] = useState(false)
  const [loadingPitches, setLoadingPitches] = useState(false)
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set())

  const isCycleIdValid = CYCLE_ID_PATTERN.test(newCycleId)
  const activeMeeting = meetings.find(m => m.status !== 'closed' && !m.is_archived)

  useEffect(() => { loadMeetings() }, [])

  // Load pitches when active meeting changes
  useEffect(() => {
    if (activeMeeting) {
      loadPitches(activeMeeting.id)
    }
  }, [activeMeeting?.id])

  async function loadMeetings() {
    try {
      const res = await fetch('/api/meetings')
      if (res.ok) {
        const data = await res.json()
        setMeetings(data.meetings || [])
      } else {
        setError('載入天使例會列表失敗')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入天使例會列表失敗')
    } finally {
      setLoading(false)
    }
  }

  async function loadPitches(meetingId: string) {
    setLoadingPitches(true)
    try {
      const res = await fetch(`/api/admin/meetings/pitches?meeting_id=${meetingId}`)
      if (res.ok) {
        const data = await res.json()
        setPitches(data.pitches || [])
      }
    } catch (err) {
      console.error('Failed to load pitches:', err)
    } finally {
      setLoadingPitches(false)
    }
  }

  async function loadCandidates() {
    if (!activeMeeting) return
    try {
      const res = await fetch(`/api/admin/meetings/candidates?meeting_id=${activeMeeting.id}`)
      if (res.ok) {
        const data = await res.json()
        setCandidates(data.candidates || [])
      }
    } catch (err) {
      console.error('Failed to load candidates:', err)
    }
  }

  async function handleCreate() {
    setCreating(true)
    setFormError(null)
    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycle_id: newCycleId, meeting_date: newDate }),
      })
      if (res.ok) {
        setNewCycleId('')
        setNewDate('')
        loadMeetings()
      } else {
        const data = await res.json().catch(() => ({}))
        setFormError(data.error || `建立失敗（${res.status}）`)
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '建立天使例會時發生錯誤')
    } finally {
      setCreating(false)
    }
  }

  async function handleTransition() {
    if (!transitionTarget) return
    setFormError(null)
    try {
      const res = await fetch('/api/meetings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cycle_id: transitionTarget.cycleId,
          next_status: transitionTarget.nextStatus,
        }),
      })
      if (res.ok) {
        loadMeetings()
      } else {
        const data = await res.json().catch(() => ({}))
        setFormError(data.error || `狀態切換失敗（${res.status}）`)
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '狀態切換時發生錯誤')
    } finally {
      setTransitionTarget(null)
    }
  }

  async function handleAddPitches() {
    if (!activeMeeting || selectedCandidates.size === 0) return
    try {
      const res = await fetch('/api/admin/meetings/pitches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meeting_id: activeMeeting.id,
          startup_ids: Array.from(selectedCandidates),
        }),
      })
      if (res.ok) {
        setSelectedCandidates(new Set())
        setShowCandidates(false)
        loadPitches(activeMeeting.id)
      } else {
        const data = await res.json().catch(() => ({}))
        setFormError(data.error || '新增失敗')
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '新增 Pitch 時發生錯誤')
    }
  }

  async function handleRemovePitch(pitchId: string) {
    if (!activeMeeting) return
    try {
      const res = await fetch('/api/admin/meetings/pitches', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch_id: pitchId }),
      })
      if (res.ok) {
        loadPitches(activeMeeting.id)
      }
    } catch (err) {
      console.error('Remove pitch failed:', err)
    }
  }

  async function handleDecision(pitchId: string, decision: string) {
    try {
      await fetch('/api/admin/meetings/pitches', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch_id: pitchId, decision }),
      })
      if (activeMeeting) loadPitches(activeMeeting.id)
    } catch (err) {
      console.error('Decision update failed:', err)
    }
  }

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); loadMeetings() }} />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">天使例會管理</h1>

      {/* Active meeting hero */}
      {activeMeeting && <ActiveMeetingHero meeting={activeMeeting} onTransition={(nextStatus, description) =>
        setTransitionTarget({ cycleId: activeMeeting.id, nextStatus, description })
      } />}

      {/* Pitch management section */}
      {activeMeeting && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Pitch 案源</h2>
              <p className="text-xs text-gray-400 mt-0.5">{pitches.length} 組 Pitch · {activeMeeting.id}</p>
            </div>
            <button
              onClick={() => { setShowCandidates(true); loadCandidates() }}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              + 新增 Pitch 案源
            </button>
          </div>

          {loadingPitches ? (
            <div className="p-8 text-center text-gray-400">載入中...</div>
          ) : pitches.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">尚未指定 Pitch 案源</div>
              <button
                onClick={() => { setShowCandidates(true); loadCandidates() }}
                className="text-teal-600 text-sm hover:underline"
              >
                從候選名單中選擇 →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {pitches.map((pitch, idx) => (
                <div key={pitch.id} className="px-6 py-4 flex items-center gap-4">
                  {/* Order number */}
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold shrink-0">
                    {idx + 1}
                  </div>

                  {/* Startup info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">
                      {pitch.startup?.name_zh || '未知'}
                      {pitch.startup?.name_en && (
                        <span className="text-gray-400 text-xs ml-2">{pitch.startup.name_en}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 truncate mt-0.5">
                      {pitch.startup?.sector || '—'} · {pitch.startup?.product_oneliner || '—'}
                    </div>
                  </div>

                  {/* Gate score */}
                  {pitch.startup?.gate1_score && (
                    <div className="text-xs text-gray-500">
                      G1: {pitch.startup.gate1_score}
                    </div>
                  )}

                  {/* Decision buttons (visible in meeting/followup phase) */}
                  {['meeting', 'followup'].includes(activeMeeting.status) && (
                    <div className="flex gap-1.5">
                      {['invest', 'pass', 'defer'].map(d => (
                        <button
                          key={d}
                          onClick={() => handleDecision(pitch.id, d)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            pitch.decision === d
                              ? d === 'invest' ? 'bg-green-600 text-white'
                                : d === 'pass' ? 'bg-red-600 text-white'
                                : 'bg-yellow-500 text-white'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {d === 'invest' ? '投資' : d === 'pass' ? '放棄' : '觀察'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Decision badge (if set) */}
                  {pitch.decision && !['meeting', 'followup'].includes(activeMeeting.status) && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      pitch.decision === 'invest' ? 'bg-green-100 text-green-700'
                        : pitch.decision === 'pass' ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {pitch.decision === 'invest' ? '投資' : pitch.decision === 'pass' ? '放棄' : '觀察'}
                    </span>
                  )}

                  {/* Remove button (only in setup/cards_ready) */}
                  {['setup', 'cards_ready'].includes(activeMeeting.status) && (
                    <button
                      onClick={() => handleRemovePitch(pitch.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                      title="移除"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* D-day checklist */}
          {pitches.length > 0 && (
            <MeetingChecklist meeting={activeMeeting} pitchCount={pitches.length} />
          )}
        </div>
      )}

      {/* Candidate selection modal */}
      {showCandidates && (
        <CandidateSelector
          candidates={candidates}
          selected={selectedCandidates}
          onToggle={(id) => {
            const next = new Set(selectedCandidates)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            setSelectedCandidates(next)
          }}
          onConfirm={handleAddPitches}
          onClose={() => { setShowCandidates(false); setSelectedCandidates(new Set()) }}
        />
      )}

      {/* Create new meeting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">建立新天使例會</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="cycle-id" className="block text-xs font-medium text-gray-500 mb-1">週期 ID</label>
            <input
              id="cycle-id"
              type="text"
              value={newCycleId}
              onChange={e => { setNewCycleId(e.target.value); setFormError(null) }}
              placeholder="YYYY-MM"
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500 ${
                newCycleId && !isCycleIdValid ? 'border-red-400' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="meeting-date" className="block text-xs font-medium text-gray-500 mb-1">天使例會日期</label>
            <input
              id="meeting-date"
              type="date"
              value={newDate}
              onChange={e => { setNewDate(e.target.value); setFormError(null) }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreate}
              disabled={creating || !isCycleIdValid || !newDate}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
            >
              {creating ? '建立中...' : '建立'}
            </button>
          </div>
        </div>
        {formError && (
          <p className="text-sm text-red-600 mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</p>
        )}
      </div>

      {/* Meeting history */}
      {meetings.filter(m => m !== activeMeeting).length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">歷史天使例會</h2>
          <div className="space-y-2">
            {meetings.filter(m => m !== activeMeeting).map(meeting => {
              const status = meeting.status as MeetingCycleStatus
              return (
                <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{meeting.id}</span>
                    <span className="text-xs text-gray-500">{new Date(meeting.meeting_date).toLocaleDateString('zh-TW')}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[status] || 'bg-gray-100'}`}>
                    {STATUS_LABELS[status] || status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {meetings.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">尚無天使例會，請使用上方表單建立第一場天使例會。</p>
        </div>
      )}

      <ConfirmDialog
        open={!!transitionTarget}
        title="確認狀態切換"
        message={transitionTarget ? `即將切換至「${STATUS_LABELS[transitionTarget.nextStatus as MeetingCycleStatus] || transitionTarget.nextStatus}」\n\n${transitionTarget.description}` : ''}
        confirmLabel="確認切換"
        onConfirm={handleTransition}
        onCancel={() => setTransitionTarget(null)}
      />
    </div>
  )
}

// ─── Active Meeting Hero ─────────────────────────────

function ActiveMeetingHero({ meeting, onTransition }: {
  meeting: Meeting
  onTransition: (nextStatus: string, description: string) => void
}) {
  const status = meeting.status as MeetingCycleStatus
  const currentIdx = STAGES.indexOf(status)
  const nextTransition = getNextTransition(status)
  const canAdvance = canTransition(status)

  const now = new Date()
  const meetingDate = new Date(meeting.meeting_date)
  const daysUntil = Math.ceil((meetingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Countdown header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-teal-200 font-medium mb-1">進行中天使例會</div>
            <h2 className="text-xl font-bold">{formatCycleLabel(meeting.id)}</h2>
            <p className="text-sm text-teal-100 mt-1">
              {meetingDate.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-extrabold tabular-nums leading-none">
              {daysUntil > 0 ? `D-${daysUntil}` : daysUntil === 0 ? 'TODAY' : `D+${Math.abs(daysUntil)}`}
            </div>
            <div className="text-xs text-teal-200 mt-1">
              {daysUntil > 0 ? '距離天使例會' : daysUntil === 0 ? '天使例會當天' : '天使例會已過'}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          {STAGES.map((stage, i) => {
            const isPast = i < currentIdx
            const isCurrent = i === currentIdx
            return (
              <div key={stage} className="flex items-center flex-1">
                <div className="flex flex-col items-center relative">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                    isPast ? 'bg-teal-100 text-teal-600' :
                    isCurrent ? 'bg-teal-600 text-white ring-4 ring-teal-100' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {isPast ? '✓' : STAGE_ICONS[stage]}
                  </div>
                  <span className={`text-[10px] mt-1.5 whitespace-nowrap ${
                    isCurrent ? 'text-teal-700 font-bold' :
                    isPast ? 'text-teal-600' : 'text-gray-400'
                  }`}>
                    {STATUS_LABELS[stage]}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${i < currentIdx ? 'bg-teal-400' : 'bg-gray-200'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Action bar */}
      {canAdvance && nextTransition && (
        <div className="px-6 pb-5">
          <button
            onClick={() => onTransition(nextTransition.next, nextTransition.description)}
            className="w-full bg-teal-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            推進至 → {STATUS_LABELS[nextTransition.next]}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">{nextTransition.description}</p>
        </div>
      )}
    </div>
  )
}

// ─── Meeting Checklist ─────────────────────────────

function MeetingChecklist({ meeting, pitchCount }: { meeting: Meeting; pitchCount: number }) {
  const meetingDate = new Date(meeting.meeting_date)
  const now = new Date()
  const daysUntil = Math.ceil((meetingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  const items = [
    { label: 'Pitch 案源已確定', done: pitchCount >= 1, deadline: 'D-14' },
    { label: '通知新創準備 DECK', done: ['cards_ready', 'vote_open', 'meeting', 'followup', 'closed'].includes(meeting.status), deadline: 'D-14' },
    { label: '投資摘要已完成', done: false, deadline: 'D-7' },
    { label: '會員通知已發送', done: ['cards_ready', 'vote_open', 'meeting', 'followup', 'closed'].includes(meeting.status), deadline: 'D-7' },
    { label: '卡片已上架（cards_ready）', done: ['cards_ready', 'vote_open', 'meeting', 'followup', 'closed'].includes(meeting.status), deadline: 'D-5' },
    { label: '投票已開放（vote_open）', done: ['vote_open', 'meeting', 'followup', 'closed'].includes(meeting.status), deadline: 'D-1' },
  ]

  return (
    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        D-Day Checklist {daysUntil > 0 ? `(D-${daysUntil})` : ''}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-center gap-2 text-sm">
            <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
              item.done ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
            }`}>
              {item.done ? '✓' : '·'}
            </span>
            <span className={item.done ? 'text-gray-500 line-through' : 'text-gray-700'}>
              {item.label}
            </span>
            <span className="text-[10px] text-gray-400 ml-auto">{item.deadline}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// ─── Candidate Selector Modal ─────────────────────────────

function CandidateSelector({
  candidates,
  selected,
  onToggle,
  onConfirm,
  onClose,
}: {
  candidates: Candidate[]
  selected: Set<string>
  onToggle: (id: string) => void
  onConfirm: () => void
  onClose: () => void
}) {
  const available = candidates.filter(c => !c.already_assigned)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">選擇 Pitch 案源</h2>
            <p className="text-xs text-gray-500">Gate 1 通過的候選案源 · 已選 {selected.size} 家</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Candidate list */}
        <div className="flex-1 overflow-y-auto">
          {available.length === 0 ? (
            <div className="p-8 text-center text-gray-400">無可用候選案源</div>
          ) : (
            available.map(c => (
              <div
                key={c.id}
                onClick={() => onToggle(c.id)}
                className={`px-6 py-3 border-b border-gray-50 cursor-pointer transition-colors flex items-center gap-3 ${
                  selected.has(c.id) ? 'bg-teal-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selected.has(c.id) ? 'bg-teal-600 border-teal-600 text-white' : 'border-gray-300'
                }`}>
                  {selected.has(c.id) && <span className="text-xs">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900">{c.name_zh}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {c.sector || '—'} · {c.product_oneliner || '—'}
                  </div>
                </div>
                {c.gate1_score && (
                  <div className="text-xs text-gray-400">G1: {c.gate1_score}</div>
                )}
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  c.current_gate_result === 'pass' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {c.current_gate_result}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            disabled={selected.size === 0}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
          >
            確認新增 ({selected.size})
          </button>
        </div>
      </div>
    </div>
  )
}

function formatCycleLabel(id: string): string {
  const match = id.match(/^(\d{4})-(0[1-9]|1[0-2])$/)
  if (match) return `${match[1]} 年 ${parseInt(match[2])} 月台大天使會天使例會`
  return id
}
