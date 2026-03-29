'use client'

import { useState, useEffect } from 'react'
import { STATUS_LABELS, STATUS_COLORS, getNextTransition, canTransition, type MeetingCycleStatus } from '@/lib/utils/state-machine'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

interface Meeting {
  id: string
  meeting_date: string
  status: string
  is_archived: boolean
}

export default function MeetingsAdminPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newCycleId, setNewCycleId] = useState('')
  const [newDate, setNewDate] = useState('')
  const [transitionTarget, setTransitionTarget] = useState<{ cycleId: string; nextStatus: string; description: string } | null>(null)

  useEffect(() => {
    loadMeetings()
  }, [])

  async function loadMeetings() {
    const res = await fetch('/api/meetings')
    if (res.ok) {
      const data = await res.json()
      setMeetings(data.meetings || [])
    }
    setLoading(false)
  }

  async function handleCreate() {
    setCreating(true)
    const res = await fetch('/api/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cycle_id: newCycleId, meeting_date: newDate }),
    })
    if (res.ok) {
      setNewCycleId('')
      setNewDate('')
      loadMeetings()
    }
    setCreating(false)
  }

  async function handleTransition() {
    if (!transitionTarget) return
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
    }
    setTransitionTarget(null)
  }

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">月會管理</h1>

      {/* Create new meeting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">建立新月會</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newCycleId}
            onChange={e => setNewCycleId(e.target.value)}
            placeholder="YYYY-MM（如 2026-04）"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex-1 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex-1 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreate}
            disabled={creating || !newCycleId || !newDate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {creating ? '建立中...' : '建立'}
          </button>
        </div>
      </div>

      {/* Meeting list */}
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
