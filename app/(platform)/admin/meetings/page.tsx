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

  useEffect(() => {
    loadMeetings()
  }, [])

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

  if (error) {
    return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); loadMeetings() }} />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">月會管理</h1>

      {/* Create new meeting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">建立新月會</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="cycle-id" className="block text-sm font-medium text-gray-700 mb-1">月會週期 ID</label>
            <input
              id="cycle-id"
              type="text"
              value={newCycleId}
              onChange={e => { setNewCycleId(e.target.value); setFormError(null) }}
              placeholder="YYYY-MM（如 2026-04）"
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                newCycleId && !isCycleIdValid ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {newCycleId && !isCycleIdValid && (
              <p className="text-xs text-red-500 mt-1">格式須為 YYYY-MM（如 2026-04）</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="meeting-date" className="block text-sm font-medium text-gray-700 mb-1">月會日期</label>
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

      {/* Meeting list */}
      {meetings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">尚無月會，請使用上方表單建立第一場月會。</p>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((meeting) => {
            const status = meeting.status as MeetingCycleStatus
            const nextTransition = getNextTransition(status)
            const canAdvance = canTransition(status)

            return (
              <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{meeting.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(meeting.meeting_date).toLocaleDateString('zh-TW')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      STATUS_COLORS[status] || 'bg-gray-100'
                    }`}>
                      {STATUS_LABELS[status] || status}
                    </span>
                    {canAdvance && nextTransition && (
                      <button
                        onClick={() => setTransitionTarget({
                          cycleId: meeting.id,
                          nextStatus: nextTransition.next,
                          description: nextTransition.description,
                        })}
                        className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        → {STATUS_LABELS[nextTransition.next]}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Transition confirmation */}
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
