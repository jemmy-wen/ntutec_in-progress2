'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

// ── Types ────────────────────────────────────────────────────────────────────

interface InvestmentPreferences {
  sectors?: string[]
  ticket_range?: string
  stage_preference?: string
}

interface MembershipInfo {
  membership_start: string | null
  membership_expiry: string | null
  status: string | null
  member_type: string | null
  donation_amount: number | null
  first_meeting_attended: boolean
  investment_preferences_collected: boolean
  line_group_added: boolean
  welcome_email_sent_at: string | null
}

interface EngagementInfo {
  card_responses_90d: number
  votes_90d: number
  meetings_attended_180d: number
  articles_read_total: number
  engagement_level: 'high' | 'medium' | 'low'
}

interface MemberProfile {
  id: string
  display_name: string
  email: string | null
  phone: string | null
  company: string | null
  title: string | null
  tier: string | null
  ntu_alumni: boolean | null
  joined_at: string | null
  onboarding_completed: boolean | null
  warmth: string | null

  investment_preferences: InvestmentPreferences | null
  focus_sectors: string[]
  preferred_stages: string[]
  ticket_min_ntd: number | null
  ticket_max_ntd: number | null
  ticket_typical_ntd: number | null

  telegram_chat_id: string | null

  membership: MembershipInfo | null
  engagement: EngagementInfo | null
}

// ── Constants ────────────────────────────────────────────────────────────────

const SECTOR_OPTIONS = [
  { value: 'AI/ML', label: 'AI/ML 人工智慧' },
  { value: 'FinTech', label: 'FinTech 金融科技' },
  { value: 'HealthTech', label: 'HealthTech 醫療科技' },
  { value: 'EdTech', label: 'EdTech 教育科技' },
  { value: 'CleanTech', label: 'CleanTech 綠能科技' },
  { value: 'IoT', label: 'IoT 物聯網' },
  { value: 'SaaS', label: 'SaaS 軟體即服務' },
  { value: 'BioTech', label: 'BioTech 生技醫藥' },
  { value: 'AgriTech', label: 'AgriTech 農業科技' },
  { value: 'Semiconductor', label: 'Semiconductor 半導體' },
  { value: 'E-commerce', label: 'E-commerce 電子商務' },
  { value: 'DeepTech', label: 'DeepTech 深科技' },
  { value: 'SpaceTech', label: 'SpaceTech 太空科技' },
  { value: 'FoodTech', label: 'FoodTech 食品科技' },
]

const STATUS_LABEL: Record<string, { label: string; className: string }> = {
  active: { label: '有效', className: 'bg-green-100 text-green-700' },
  expired: { label: '已到期', className: 'bg-red-100 text-red-700' },
  pending: { label: '待確認', className: 'bg-yellow-100 text-yellow-700' },
  suspended: { label: '暫停', className: 'bg-gray-100 text-gray-600' },
}

const ENGAGEMENT_LABEL: Record<string, { label: string; className: string }> = {
  high: { label: '高度活躍', className: 'bg-teal-100 text-teal-700' },
  medium: { label: '中度活躍', className: 'bg-blue-100 text-blue-700' },
  low: { label: '低度活躍', className: 'bg-gray-100 text-gray-500' },
}

// ── Helper ───────────────────────────────────────────────────────────────────

function formatDate(d: string | null): string {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatNTD(v: number | null): string {
  if (v == null) return '-'
  return `NT$${v.toLocaleString()}`
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [profile, setProfile] = useState<MemberProfile | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Partial<MemberProfile>>({})
  const [error, setError] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/angel/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.member)
        setForm(data.member)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }, [])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: form.display_name,
          phone: form.phone,
          company: form.company,
          title: form.title,
          investment_preferences: form.investment_preferences,
        }),
      })
      if (res.ok) {
        await load()
        setEditing(false)
        setToast({ type: 'success', message: '已儲存' })
      } else {
        setToast({ type: 'error', message: '儲存失敗，請稍後再試' })
      }
    } catch {
      setToast({ type: 'error', message: '儲存失敗，請檢查網路連線' })
    }
    setSaving(false)
  }

  if (error) {
    return <ErrorState message="載入失敗" onRetry={() => { setError(false); load() }} />
  }

  if (!profile) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    )
  }

  const prefs = form.investment_preferences || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">個人偏好設定</h1>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="text-teal-600 text-sm font-medium hover:text-teal-700">
            編輯
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setEditing(false); setForm(profile) }} className="text-gray-500 text-sm">取消</button>
            <button onClick={handleSave} disabled={saving} className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50">
              {saving ? '儲存中...' : '儲存'}
            </button>
          </div>
        )}
      </div>

      {/* ── 基本資料 ───────────────────────────────────────────────── */}
      <Card title="基本資料">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="field-name" label="姓名" value={form.display_name || ''} editing={editing}
            onChange={v => setForm(prev => ({ ...prev, display_name: v }))} />
          <Field id="field-email" label="Email" value={profile.email || ''} editing={false} />
          <Field id="field-phone" label="電話" value={form.phone || ''} editing={editing}
            onChange={v => setForm(prev => ({ ...prev, phone: v }))} />
          <Field id="field-company" label="公司" value={form.company || ''} editing={editing}
            onChange={v => setForm(prev => ({ ...prev, company: v }))} />
          <Field id="field-title" label="職稱" value={form.title || ''} editing={editing}
            onChange={v => setForm(prev => ({ ...prev, title: v }))} />
          <Field id="field-tier" label="會員等級" value={profile.tier || '-'} editing={false} />
          {profile.joined_at && (
            <Field id="field-joined" label="加入日期" value={formatDate(profile.joined_at)} editing={false} />
          )}
          {profile.ntu_alumni != null && (
            <Field id="field-alumni" label="台大校友" value={profile.ntu_alumni ? '是' : '否'} editing={false} />
          )}
        </div>
      </Card>

      {/* ── 會籍狀態 ───────────────────────────────────────────────── */}
      {profile.membership && (
        <Card title="會籍狀態">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status badge */}
            <div>
              <p className="text-sm text-gray-600 mb-1">會籍狀態</p>
              {(() => {
                const s = profile.membership!.status || 'unknown'
                const cfg = STATUS_LABEL[s] || { label: s, className: 'bg-gray-100 text-gray-600' }
                return (
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                    {cfg.label}
                  </span>
                )
              })()}
            </div>
            <Field id="field-mtype" label="會員類型" value={profile.membership.member_type || '-'} editing={false} />
            <Field id="field-mstart" label="會籍開始" value={formatDate(profile.membership.membership_start)} editing={false} />
            <Field id="field-mexpiry" label="會籍到期" value={formatDate(profile.membership.membership_expiry)} editing={false} />
            {profile.membership.donation_amount != null && (
              <Field id="field-donation" label="年費金額" value={formatNTD(profile.membership.donation_amount)} editing={false} />
            )}
          </div>

          {/* Onboarding checklist */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">入會完成度</p>
            <div className="flex flex-wrap gap-3">
              <CheckBadge done={profile.membership.first_meeting_attended} label="出席首場月會" />
              <CheckBadge done={profile.membership.investment_preferences_collected} label="投資偏好已填寫" />
              <CheckBadge done={profile.membership.line_group_added} label="已加入 LINE 群" />
              <CheckBadge done={!!profile.membership.welcome_email_sent_at} label="歡迎信已發送" />
            </div>
          </div>
        </Card>
      )}

      {/* ── 參與紀錄 ───────────────────────────────────────────────── */}
      {profile.engagement && (
        <Card title="參與紀錄">
          <div className="flex items-center gap-3 mb-4">
            {(() => {
              const lvl = profile.engagement!.engagement_level || 'low'
              const cfg = ENGAGEMENT_LABEL[lvl] || { label: lvl, className: 'bg-gray-100 text-gray-500' }
              return (
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                  {cfg.label}
                </span>
              )
            })()}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBox label="月會出席（近 180 天）" value={String(profile.engagement.meetings_attended_180d)} />
            <StatBox label="投票次數（近 90 天）" value={String(profile.engagement.votes_90d)} />
            <StatBox label="案件評分（近 90 天）" value={String(profile.engagement.card_responses_90d)} />
            <StatBox label="閱讀文章（累計）" value={String(profile.engagement.articles_read_total)} />
          </div>
        </Card>
      )}

      {/* ── 投資偏好 ───────────────────────────────────────────────── */}
      <Card title="投資偏好">
        <div className="space-y-4">
          {/* Preference collected status */}
          {profile.membership && (
            <div className="flex items-center gap-2 text-sm">
              {profile.membership.investment_preferences_collected ? (
                <span className="text-green-600">偏好資料已收集</span>
              ) : (
                <span className="text-amber-600">偏好資料尚未填寫，請完成填寫以獲得更精準的案件推薦</span>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-2">感興趣產業</label>
            {editing ? (
              <div className="flex flex-wrap gap-2">
                {SECTOR_OPTIONS.map(s => {
                  const selected = (prefs.sectors || []).includes(s.value)
                  return (
                    <button
                      key={s.value}
                      onClick={() => {
                        const current = prefs.sectors || []
                        const next = selected ? current.filter(x => x !== s.value) : [...current, s.value]
                        setForm(prev => ({
                          ...prev,
                          investment_preferences: { ...prefs, sectors: next },
                        }))
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selected ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(prefs.sectors || profile.focus_sectors || []).length > 0
                  ? ((prefs.sectors || profile.focus_sectors || []) as string[]).map(sv => {
                      const opt = SECTOR_OPTIONS.find(o => o.value === sv)
                      return (
                        <span key={sv} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                          {opt ? opt.label : sv}
                        </span>
                      )
                    })
                  : <span className="text-gray-400 text-sm">尚未設定</span>
                }
              </div>
            )}
          </div>

          <Field id="field-ticket" label="投資票面偏好" value={prefs.ticket_range || (
            profile.ticket_typical_ntd
              ? `NT$${profile.ticket_typical_ntd.toLocaleString()}`
              : profile.ticket_min_ntd && profile.ticket_max_ntd
                ? `NT$${profile.ticket_min_ntd.toLocaleString()} – NT$${profile.ticket_max_ntd.toLocaleString()}`
                : ''
          )} editing={editing}
            onChange={v => setForm(prev => ({
              ...prev,
              investment_preferences: { ...prefs, ticket_range: v },
            }))}
            placeholder="如：50-200 萬"
          />
          <Field id="field-stage" label="偏好階段" value={prefs.stage_preference || (profile.preferred_stages || []).join(', ')} editing={editing}
            onChange={v => setForm(prev => ({
              ...prev,
              investment_preferences: { ...prefs, stage_preference: v },
            }))}
            placeholder="如：Pre-Seed, Seed, Series A"
          />
        </div>
      </Card>

      {/* ── 通知設定 ───────────────────────────────────────────────── */}
      <Card title="通知設定">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Telegram 通知</p>
              <p className="text-xs text-gray-400 mt-0.5">月會提醒、案件推播、系統通知</p>
            </div>
            {profile.telegram_chat_id ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full inline-block" />
                已綁定
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
                未綁定
              </span>
            )}
          </div>
          {!profile.telegram_chat_id && (
            <p className="text-xs text-gray-500 border border-dashed border-gray-200 rounded-lg p-3">
              尚未綁定 Telegram。請聯絡管理員或透過 Rigi Bot 完成綁定，以接收即時通知。
            </p>
          )}
        </div>
      </Card>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
      {children}
    </div>
  )
}

function Field({ id, label, value, editing, onChange, placeholder }: {
  id: string
  label: string
  value: string
  editing: boolean
  onChange?: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-600 mb-1">{label}</label>
      {editing && onChange ? (
        <input
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      ) : (
        <div className="text-sm font-medium">{value || <span className="text-gray-400">-</span>}</div>
      )}
    </div>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</p>
    </div>
  )
}

function CheckBadge({ done, label }: { done: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
      done ? 'bg-teal-50 text-teal-700' : 'bg-gray-100 text-gray-500'
    }`}>
      <span>{done ? '✓' : '○'}</span>
      <span>{label}</span>
    </div>
  )
}
