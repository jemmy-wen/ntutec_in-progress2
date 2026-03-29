'use client'

import { useState, useEffect } from 'react'
import { STATUS_LABELS, STATUS_COLORS, getNextTransition, canTransition, type MeetingCycleStatus } from '@/lib/utils/state-machine'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { ErrorState } from '@/components/shared/ErrorState'

interface Meeting {
  id: string
  meeting_date: string
  status: string
  is_archived: boolean
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

  const isCycleIdValid = CYCLE_ID_PATTERN.test(newCycleId)

  useEffect(() => { loadMeetings() }, [])

  async function loadMeetings() {
    try {
      const res = await fetch('/api/meetings')
      if (res.ok) {
        const data = await res.json()
        setMeetings(data.meetings || [])
      } else {
        setError('載入月會列表失敗')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入月會列表失敗')
    } finally {
      setLoading(false)
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
      setFormError(err instanceof Error ? err.message : '建立月會時發生錯誤')
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

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); loadMeetings() }} />

  const activeMeeting = meetings.find(m => m.status !== 'closed' && !m.is_archived)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">月會管理</h1>

      {/* Active meeting hero */}
      {activeMeeting && <ActiveMeetingHero meeting={activeMeeting} onTransition={(nextStatus, description) =>
        setTransitionTarget({ cycleId: activeMeeting.id, nextStatus, description })
      } />}

      {/* Create new meeting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">建立新月會</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="cycle-id" className="block text-xs font-medium text-gray-500 mb-1">週期 ID</label>
            <input
              id="cycle-id"
              type="text"
              value={newCycleId}
              onChange={e => { setNewCycleId(e.target.value); setFormError(null) }}
              placeholder="YYYY-MM"
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                newCycleId && !isCycleIdValid ? 'border-red-400' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="meeting-date" className="block text-xs font-medium text-gray-500 mb-1">月會日期</label>
            <input
              id="meeting-date"
              type="date"
              value={newDate}
              onChange={e => { setNewDate(e.target.value); setFormError(null) }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreate}
              disabled={creating || !isCycleIdValid || !newDate}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
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
          <h2 className="text-sm font-semibold text-gray-700 mb-3">歷史月會</h2>
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
          <p className="text-gray-500">尚無月會，請使用上方表單建立第一場月會。</p>
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
            <div className="text-xs text-teal-200 font-medium mb-1">進行中月會</div>
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
              {daysUntil > 0 ? '距離月會' : daysUntil === 0 ? '月會當天' : '月會已過'}
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
            const isFuture = i > currentIdx

            return (
              <div key={stage} className="flex items-center flex-1">
                {/* Node */}
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
                    isPast ? 'text-teal-600' :
                    'text-gray-400'
                  }`}>
                    {STATUS_LABELS[stage]}
                  </span>
                </div>
                {/* Connector */}
                {i < STAGES.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${
                    i < currentIdx ? 'bg-teal-400' : 'bg-gray-200'
                  }`} />
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
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            推進至 → {STATUS_LABELS[nextTransition.next]}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">{nextTransition.description}</p>
        </div>
      )}
    </div>
  )
}

function formatCycleLabel(id: string): string {
  const match = id.match(/^(\d{4})-(0[1-9]|1[0-2])$/)
  if (match) return `${match[1]} 年 ${parseInt(match[2])} 月天使投資月會`
  return id
}
