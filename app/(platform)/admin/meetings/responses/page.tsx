'use client'

/**
 * F-004 Admin View: Card Response Analytics
 *
 * Shows per-startup interest heatmap and per-member completion status.
 * Admin can see who's interested in what, completion rates, and reasons.
 */

import { useState, useEffect, useCallback } from 'react'

interface StartupSummary {
  startup_id: string
  startup: { name_zh: string; name_en: string | null; sector: string | null }
  interested_count: number
  thinking_count: number
  not_for_me_count: number
  total_responses: number
  interest_rate: number
  interested_members: { member_id: string; display_name: string; reason: string | null }[]
}

interface MemberCompletion {
  member_id: string
  display_name: string
  responded: number
  total: number
  completion_rate: number
  responses: { startup_id: string; startup_name: string; response: string; reason: string | null }[]
}

interface ResponseData {
  meeting_id: string
  summary: {
    total_pitches: number
    total_members: number
    responding_members: number
    total_responses: number
    completion_rate: number
  }
  startups: StartupSummary[]
  members: MemberCompletion[]
}

type NotifyEvent = 'cards_ready' | 'vote_open' | 'meeting_reminder' | 'meeting_complete' | 'followup_started'

const EVENT_LABELS: Record<NotifyEvent, { label: string; icon: string; desc: string }> = {
  cards_ready: { label: '卡片上架通知', icon: '📋', desc: '通知全體會員新創卡片已可瀏覽' },
  vote_open: { label: '投票開啟通知', icon: '🗳️', desc: '通知全體會員投票/回覆已開放' },
  meeting_reminder: { label: '月會提醒', icon: '⏰', desc: '通知所有人明天開會（含 email）' },
  meeting_complete: { label: '月會結束通知', icon: '✅', desc: '通知會員月會已結束' },
  followup_started: { label: '會後追蹤啟動', icon: '📬', desc: '通知會員後續追蹤流程開始' },
}

export default function ResponsesPage() {
  const [data, setData] = useState<ResponseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'startups' | 'members' | 'notify'>('startups')
  const [expandedStartup, setExpandedStartup] = useState<string | null>(null)
  const [expandedMember, setExpandedMember] = useState<string | null>(null)
  const [notifyStatus, setNotifyStatus] = useState<Record<string, string>>({})

  const loadData = useCallback(async () => {
    try {
      // Get active meeting
      const meetingsRes = await fetch('/api/meetings')
      if (!meetingsRes.ok) throw new Error('Failed to load meetings')
      const meetingsData = await meetingsRes.json()
      const active = (meetingsData.meetings || []).find(
        (m: { status: string }) => !['closed'].includes(m.status)
      )
      if (!active) {
        setLoading(false)
        return
      }

      const res = await fetch(`/api/admin/meetings/responses?meeting_id=${active.id}`)
      if (!res.ok) throw new Error('Failed to load responses')
      const responseData = await res.json()
      setData(responseData)
      setLoading(false)
    } catch (e) {
      setError((e as Error).message)
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  async function handleNotify(event: NotifyEvent) {
    if (!data) return
    setNotifyStatus(prev => ({ ...prev, [event]: 'sending' }))
    try {
      const res = await fetch('/api/admin/meetings/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meeting_id: data.meeting_id, event }),
      })
      const result = await res.json()
      if (res.ok) {
        setNotifyStatus(prev => ({ ...prev, [event]: `✅ 已發送 ${result.sent} 則` }))
      } else {
        setNotifyStatus(prev => ({ ...prev, [event]: `❌ ${result.error}` }))
      }
    } catch {
      setNotifyStatus(prev => ({ ...prev, [event]: '❌ 發送失敗' }))
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-red-600">{error}</p>
        <button onClick={() => { setError(null); setLoading(true); loadData() }} className="mt-4 text-teal-600 hover:underline">重試</button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-xl font-bold mb-2">尚無進行中的月會</h2>
        <p className="text-gray-500">建立月會並加入 Pitch 新創後，這裡會顯示會員回覆分析</p>
      </div>
    )
  }

  const { summary, startups, members } = data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">會員回覆分析</h1>
        <span className="text-sm text-gray-500">{data.meeting_id} 月會</span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Pitch 新創" value={summary.total_pitches} icon="🚀" />
        <SummaryCard label="活躍會員" value={summary.total_members} icon="👥" />
        <SummaryCard label="已回覆會員" value={summary.responding_members} icon="✅" />
        <SummaryCard
          label="完成率"
          value={`${summary.completion_rate}%`}
          icon="📊"
          color={summary.completion_rate >= 70 ? 'text-green-600' : summary.completion_rate >= 40 ? 'text-yellow-600' : 'text-red-600'}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          {[
            { key: 'startups' as const, label: '新創興趣分析', icon: '🎯' },
            { key: 'members' as const, label: '會員回覆進度', icon: '👤' },
            { key: 'notify' as const, label: '發送通知', icon: '📢' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-teal-500 text-teal-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'startups' && (
        <div className="space-y-3">
          {startups.length === 0 ? (
            <p className="text-gray-500 text-center py-8">尚無 Pitch 新創</p>
          ) : (
            startups.map(s => (
              <div key={s.startup_id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedStartup(expandedStartup === s.startup_id ? null : s.startup_id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold">{s.startup.name_zh}</span>
                      {s.startup.sector && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-teal-50 text-teal-600 rounded-full">{s.startup.sector}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-600 font-medium">👍 {s.interested_count}</span>
                      <span className="text-yellow-600">🤔 {s.thinking_count}</span>
                      <span className="text-gray-400">👎 {s.not_for_me_count}</span>
                      <InterestBar interested={s.interested_count} thinking={s.thinking_count} notForMe={s.not_for_me_count} />
                    </div>
                  </div>
                </button>

                {expandedStartup === s.startup_id && (
                  <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">有興趣的會員（{s.interested_count} 人）</h4>
                      {s.interested_members.length === 0 ? (
                        <p className="text-sm text-gray-400">尚無人表示興趣</p>
                      ) : (
                        <div className="space-y-2">
                          {s.interested_members.map(m => (
                            <div key={m.member_id} className="flex items-start gap-2 text-sm">
                              <span className="font-medium text-green-700">{m.display_name}</span>
                              {m.reason && <span className="text-gray-500">— {m.reason}</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'members' && (
        <div className="space-y-3">
          {members.length === 0 ? (
            <p className="text-gray-500 text-center py-8">尚無會員回覆</p>
          ) : (
            members.map(m => (
              <div key={m.member_id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedMember(expandedMember === m.member_id ? null : m.member_id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{m.display_name}</span>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">{m.responded}/{m.total}</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            m.completion_rate === 100 ? 'bg-green-500' :
                            m.completion_rate >= 50 ? 'bg-yellow-500' : 'bg-red-400'
                          }`}
                          style={{ width: `${m.completion_rate}%` }}
                        />
                      </div>
                      <span className={`font-medium ${
                        m.completion_rate === 100 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {m.completion_rate}%
                      </span>
                    </div>
                  </div>
                </button>

                {expandedMember === m.member_id && (
                  <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="mt-3 space-y-1.5">
                      {m.responses.map(r => (
                        <div key={r.startup_id} className="flex items-center gap-2 text-sm">
                          <span className={`w-5 text-center ${
                            r.response === 'interested' ? '' :
                            r.response === 'thinking' ? '' : ''
                          }`}>
                            {r.response === 'interested' ? '👍' : r.response === 'thinking' ? '🤔' : '👎'}
                          </span>
                          <span>{r.startup_name}</span>
                          {r.reason && <span className="text-gray-400 text-xs">— {r.reason}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'notify' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            選擇要發送的月會通知類型。通知會依據事件類型自動發送至對應的對象（管理員/會員/全部）。
          </p>
          {(Object.entries(EVENT_LABELS) as [NotifyEvent, typeof EVENT_LABELS[NotifyEvent]][]).map(([event, info]) => (
            <div key={event} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{info.icon} {info.label}</div>
                <div className="text-sm text-gray-500 mt-0.5">{info.desc}</div>
              </div>
              <div className="flex items-center gap-3">
                {notifyStatus[event] && (
                  <span className="text-sm text-gray-600">{notifyStatus[event]}</span>
                )}
                <button
                  onClick={() => handleNotify(event)}
                  disabled={notifyStatus[event] === 'sending'}
                  className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
                >
                  {notifyStatus[event] === 'sending' ? '發送中...' : '發送'}
                </button>
              </div>
            </div>
          ))}

          {/* LINE placeholder section */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💬</span>
              <span className="font-medium text-gray-700">LINE 通知（規劃中）</span>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">D2: 等待串接</span>
            </div>
            <p className="text-sm text-gray-500">
              LINE 通知介面已預先建置，待 LINE Messaging API 串接後啟用。
              需要設定：LINE_CHANNEL_ACCESS_TOKEN 環境變數 + 會員 LINE User ID 綁定。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Sub-components ───

function SummaryCard({ label, value, icon, color }: {
  label: string; value: number | string; icon: string; color?: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className={`text-2xl font-bold ${color || 'text-gray-900'}`}>{value}</div>
    </div>
  )
}

function InterestBar({ interested, thinking, notForMe }: {
  interested: number; thinking: number; notForMe: number
}) {
  const total = interested + thinking + notForMe
  if (total === 0) return <div className="w-20 h-2 bg-gray-200 rounded-full" />

  return (
    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden flex">
      {interested > 0 && (
        <div className="h-full bg-green-500" style={{ width: `${(interested / total) * 100}%` }} />
      )}
      {thinking > 0 && (
        <div className="h-full bg-yellow-400" style={{ width: `${(thinking / total) * 100}%` }} />
      )}
      {notForMe > 0 && (
        <div className="h-full bg-gray-400" style={{ width: `${(notForMe / total) * 100}%` }} />
      )}
    </div>
  )
}
