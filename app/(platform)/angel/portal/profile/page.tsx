'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

interface MemberProfile {
  id: string
  display_name: string
  email: string | null
  phone: string | null
  company: string | null
  title: string | null
  tier: string | null
  investment_preferences: {
    sectors?: string[]
    ticket_range?: string
    stage_preference?: string
  } | null
}

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

export default function ProfilePage() {
  const [profile, setProfile] = useState<MemberProfile | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Partial<MemberProfile>>({})
  const [error, setError] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/members')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.member)
        setForm(data.member)
      }
    } catch {
      setError(true)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // Auto-dismiss toast
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
        const data = await res.json()
        setProfile(data)
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
    return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  }

  const prefs = form.investment_preferences || {}

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Basic info */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">基本資料</h2>
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
          </div>
        </div>

        {/* Investment preferences */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">投資偏好</h2>
          <div className="space-y-4">
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
                  {(prefs.sectors || []).length > 0
                    ? (prefs.sectors || []).map(sv => {
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

            <Field id="field-ticket" label="投資票面偏好" value={prefs.ticket_range || ''} editing={editing}
              onChange={v => setForm(prev => ({
                ...prev,
                investment_preferences: { ...prefs, ticket_range: v },
              }))}
              placeholder="如：50-200 萬"
            />
            <Field id="field-stage" label="偏好階段" value={prefs.stage_preference || ''} editing={editing}
              onChange={v => setForm(prev => ({
                ...prev,
                investment_preferences: { ...prefs, stage_preference: v },
              }))}
              placeholder="如：Pre-Seed, Seed, Series A"
            />
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
          toast.type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}>
          {toast.message}
        </div>
      )}
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
