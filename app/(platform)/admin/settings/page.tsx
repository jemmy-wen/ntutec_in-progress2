'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Admin Settings page — platform-level configuration.
 * Covers: notification settings, role management, meeting defaults, integrations.
 *
 * API: GET/PATCH /api/admin/settings
 * Persisted in sys_platform_settings (key-value store).
 */

interface PlatformSettings {
  // Notification settings
  emailNotifications: boolean
  notifyOnCardReady: boolean
  notifyOnVoteOpen: boolean
  notifyOnMeetingDay: boolean
  notifyOnNewMember: boolean

  // Meeting defaults
  defaultCardBrowseDays: number
  defaultVoteDays: number
  defaultFollowupDays: number

  // Integration
  ghostApiUrl: string
  ghostContentKey: string
  supabaseUrl: string
}

const DEFAULT_SETTINGS: PlatformSettings = {
  emailNotifications: true,
  notifyOnCardReady: true,
  notifyOnVoteOpen: true,
  notifyOnMeetingDay: true,
  notifyOnNewMember: false,
  defaultCardBrowseDays: 21,
  defaultVoteDays: 7,
  defaultFollowupDays: 30,
  ghostApiUrl: '',
  ghostContentKey: '',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
}

/** Convert API key-value map to typed PlatformSettings */
function parseSettings(raw: Record<string, string>): PlatformSettings {
  return {
    emailNotifications: raw.emailNotifications !== 'false',
    notifyOnCardReady: raw.notifyOnCardReady !== 'false',
    notifyOnVoteOpen: raw.notifyOnVoteOpen !== 'false',
    notifyOnMeetingDay: raw.notifyOnMeetingDay !== 'false',
    notifyOnNewMember: raw.notifyOnNewMember === 'true',
    defaultCardBrowseDays: parseInt(raw.defaultCardBrowseDays) || 21,
    defaultVoteDays: parseInt(raw.defaultVoteDays) || 7,
    defaultFollowupDays: parseInt(raw.defaultFollowupDays) || 30,
    ghostApiUrl: raw.ghostApiUrl || '',
    ghostContentKey: raw.ghostContentKey || '',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  }
}

/** Convert typed PlatformSettings to API key-value map (excludes read-only fields) */
function serializeSettings(s: PlatformSettings): Record<string, string> {
  return {
    emailNotifications: String(s.emailNotifications),
    notifyOnCardReady: String(s.notifyOnCardReady),
    notifyOnVoteOpen: String(s.notifyOnVoteOpen),
    notifyOnMeetingDay: String(s.notifyOnMeetingDay),
    notifyOnNewMember: String(s.notifyOnNewMember),
    defaultCardBrowseDays: String(s.defaultCardBrowseDays),
    defaultVoteDays: String(s.defaultVoteDays),
    defaultFollowupDays: String(s.defaultFollowupDays),
    ghostApiUrl: s.ghostApiUrl,
    ghostContentKey: s.ghostContentKey,
  }
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [activeTab, setActiveTab] = useState<'notifications' | 'meeting' | 'integrations' | 'roles'>('notifications')
  const initialSettings = useRef(DEFAULT_SETTINGS)

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/settings')
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `HTTP ${res.status}`)
      }
      const { settings: raw } = await res.json()
      const parsed = parseSettings(raw)
      setSettings(parsed)
      initialSettings.current = parsed
    } catch (err) {
      console.error('Failed to load settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to load settings')
      // Keep defaults on error so the page is still usable
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  function update<K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) {
    setSettings(prev => {
      const next = { ...prev, [key]: value }
      setIsDirty(JSON.stringify(next) !== JSON.stringify(initialSettings.current))
      return next
    })
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: serializeSettings(settings) }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `HTTP ${res.status}`)
      }
      setSaved(true)
      setIsDirty(false)
      initialSettings.current = { ...settings }
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { key: 'notifications' as const, label: '通知設定' },
    { key: 'meeting' as const, label: '月會預設' },
    { key: 'integrations' as const, label: '外部整合' },
    { key: 'roles' as const, label: '角色權限' },
  ]

  return (
    <div className="space-y-6">
      {/* Error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchSettings} className="text-red-600 underline hover:text-red-800 text-xs ml-4">
            重試
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">系統設定</h1>
        <button
          onClick={handleSave}
          disabled={saving || loading || !isDirty}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {saving ? '儲存中...' : saved ? '已儲存' : '儲存設定'}
        </button>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-48 bg-gray-100 rounded" />
                </div>
                <div className="h-6 w-11 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">通知設定</h2>
                <ToggleField
                  label="啟用 Email 通知"
                  description="全域 Email 通知開關"
                  checked={settings.emailNotifications}
                  onChange={v => update('emailNotifications', v)}
                />
                <ToggleField
                  label="卡片上架通知"
                  description="候選新創卡片上架時通知所有天使會員"
                  checked={settings.notifyOnCardReady}
                  onChange={v => update('notifyOnCardReady', v)}
                />
                <ToggleField
                  label="投票開放通知"
                  description="正式投票開放時通知所有天使會員"
                  checked={settings.notifyOnVoteOpen}
                  onChange={v => update('notifyOnVoteOpen', v)}
                />
                <ToggleField
                  label="月會當天提醒"
                  description="月會前一天與當天早上發送提醒"
                  checked={settings.notifyOnMeetingDay}
                  onChange={v => update('notifyOnMeetingDay', v)}
                />
                <ToggleField
                  label="新會員加入通知"
                  description="有新天使會員加入時通知管理員"
                  checked={settings.notifyOnNewMember}
                  onChange={v => update('notifyOnNewMember', v)}
                />
              </div>
            )}

            {activeTab === 'meeting' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">月會週期預設</h2>
            <NumberField
              label="卡片瀏覽天數"
              description="cards_ready 階段持續天數（D-N 到 D-7）"
              value={settings.defaultCardBrowseDays}
              onChange={v => update('defaultCardBrowseDays', v)}
              min={7}
              max={60}
              suffix="天"
            />
            <NumberField
              label="投票天數"
              description="vote_open 階段持續天數（D-7 到 D-0）"
              value={settings.defaultVoteDays}
              onChange={v => update('defaultVoteDays', v)}
              min={3}
              max={14}
              suffix="天"
            />
            <NumberField
              label="投後追蹤天數"
              description="followup 階段持續天數（D+1 到 D+N）"
              value={settings.defaultFollowupDays}
              onChange={v => update('defaultFollowupDays', v)}
              min={14}
              max={90}
              suffix="天"
            />
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">外部整合</h2>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-green-700">Supabase 已連線</span>
              </div>
              <p className="text-xs text-green-600">{settings.supabaseUrl || '未設定'}</p>
            </div>

            <TextField
              label="Ghost API URL"
              description="Ghost Headless CMS API endpoint（學習中心 + Digest）"
              value={settings.ghostApiUrl}
              onChange={v => update('ghostApiUrl', v)}
              placeholder="https://your-ghost.ghost.io"
            />
            <TextField
              label="Ghost Content API Key"
              description="Ghost Content API 金鑰"
              value={settings.ghostContentKey}
              onChange={v => update('ghostContentKey', v)}
              placeholder="abc123..."
              isSecret
            />

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-3">未來整合</h3>
              <div className="space-y-2">
                <IntegrationPlaceholder name="Telegram Bot" status="planned" />
                <IntegrationPlaceholder name="Google Calendar" status="planned" />
                <IntegrationPlaceholder name="Notion Sync" status="planned" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">角色權限</h2>
            <p className="text-sm text-gray-500">
              平台共 9 個角色，權限由 Supabase RLS 控管。此頁面為角色說明與查閱用。
            </p>

            <div className="space-y-3">
              {PLATFORM_ROLES.map(role => (
                <div key={role.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{role.label}</div>
                    <div className="text-xs text-gray-500">{role.description}</div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded font-mono">
                    {role.id}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
              角色指派在 Supabase module_roles 表進行。如需變更使用者角色，請至 Supabase Dashboard 或使用 Admin API。
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Sub-components ───

function ToggleField({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span className={`block w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${
          checked ? 'translate-x-[22px]' : 'translate-x-[2px]'
        }`} />
      </button>
    </div>
  )
}

function NumberField({ label, description, value, onChange, min, max, suffix }: {
  label: string; description: string; value: number; onChange: (v: number) => void
  min: number; max: number; suffix: string
}) {
  return (
    <div>
      <div className="font-medium text-sm mb-1">{label}</div>
      <div className="text-xs text-gray-500 mb-2">{description}</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={e => {
            const n = parseInt(e.target.value)
            if (!isNaN(n) && n >= min && n <= max) onChange(n)
          }}
          min={min}
          max={max}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <span className="text-sm text-gray-500">{suffix}</span>
      </div>
    </div>
  )
}

function TextField({ label, description, value, onChange, placeholder, isSecret }: {
  label: string; description: string; value: string; onChange: (v: string) => void
  placeholder: string; isSecret?: boolean
}) {
  return (
    <div>
      <div className="font-medium text-sm mb-1">{label}</div>
      <div className="text-xs text-gray-500 mb-2">{description}</div>
      <input
        type={isSecret ? 'password' : 'text'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      />
    </div>
  )
}

function IntegrationPlaceholder({ name, status }: { name: string; status: 'active' | 'planned' }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-sm">{name}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
      }`}>
        {status === 'active' ? '已啟用' : '規劃中'}
      </span>
    </div>
  )
}

const PLATFORM_ROLES = [
  { id: 'admin', label: '系統管理員', description: '最高權限，可管理所有模組與設定' },
  { id: 'staff_admin', label: '行政管理員', description: '中心行政人員，管理月會、Pipeline、會員' },
  { id: 'staff_accelerator', label: '加速器管理', description: '加速器專員，管理輔導與活動' },
  { id: 'angel_member', label: '天使會員', description: '天使俱樂部會員，可瀏覽新創、投票、參與月會' },
  { id: 'mentor', label: '業師', description: '業師健診系統，管理時段與回饋' },
  { id: 'team', label: '團隊', description: '團隊端使用者，申請業師健診與輔導' },
  { id: 'startup_incubated', label: '育成新創', description: '育成中心進駐團隊' },
  { id: 'startup_fundraising', label: '募資新創', description: '正在進行募資的新創團隊' },
  { id: 'vc_partner', label: 'VC 合作夥伴', description: '合作創投，參與共同投資或案源共享' },
]
