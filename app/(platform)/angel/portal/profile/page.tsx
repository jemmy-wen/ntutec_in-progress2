'use client'

import { useState, useEffect } from 'react'

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
  'AI/ML', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech',
  'IoT', 'SaaS', 'BioTech', 'AgriTech', 'Semiconductor',
  'E-commerce', 'DeepTech', 'SpaceTech', 'FoodTech',
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<MemberProfile | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Partial<MemberProfile>>({})

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/members')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.member)
        setForm(data.member)
      }
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
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
    }
    setSaving(false)
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
          <button onClick={() => setEditing(true)} className="text-blue-600 text-sm font-medium hover:text-blue-700">
            編輯
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setEditing(false); setForm(profile) }} className="text-gray-500 text-sm">取消</button>
            <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
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
            <Field label="姓名" value={form.display_name || ''} editing={editing}
              onChange={v => setForm(prev => ({ ...prev, display_name: v }))} />
            <Field label="Email" value={profile.email || ''} editing={false} />
            <Field label="電話" value={form.phone || ''} editing={editing}
              onChange={v => setForm(prev => ({ ...prev, phone: v }))} />
            <Field label="公司" value={form.company || ''} editing={editing}
              onChange={v => setForm(prev => ({ ...prev, company: v }))} />
            <Field label="職稱" value={form.title || ''} editing={editing}
              onChange={v => setForm(prev => ({ ...prev, title: v }))} />
            <Field label="會員等級" value={profile.tier || '-'} editing={false} />
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
                    const selected = (prefs.sectors || []).includes(s)
                    return (
                      <button
                        key={s}
                        onClick={() => {
                          const current = prefs.sectors || []
                          const next = selected ? current.filter(x => x !== s) : [...current, s]
                          setForm(prev => ({
                            ...prev,
                            investment_preferences: { ...prefs, sectors: next },
                          }))
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(prefs.sectors || []).length > 0
                    ? (prefs.sectors || []).map(s => (
                        <span key={s} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{s}</span>
                      ))
                    : <span className="text-gray-400 text-sm">尚未設定</span>
                  }
                </div>
              )}
            </div>

            <Field label="投資票面偏好" value={prefs.ticket_range || ''} editing={editing}
              onChange={v => setForm(prev => ({
                ...prev,
                investment_preferences: { ...prefs, ticket_range: v },
              }))}
              placeholder="如：50-200 萬"
            />
            <Field label="偏好階段" value={prefs.stage_preference || ''} editing={editing}
              onChange={v => setForm(prev => ({
                ...prev,
                investment_preferences: { ...prefs, stage_preference: v },
              }))}
              placeholder="如：Pre-Seed, Seed, Series A"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, editing, onChange, placeholder }: {
  label: string
  value: string
  editing: boolean
  onChange?: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      {editing && onChange ? (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      ) : (
        <div className="text-sm font-medium">{value || <span className="text-gray-400">-</span>}</div>
      )}
    </div>
  )
}
