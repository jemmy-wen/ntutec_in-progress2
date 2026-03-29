'use client'

import { useState, useEffect } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

/**
 * Startup Profile Page — Edit team info, product description, fundraising status.
 * Data feeds into: Angel Club cards, mentor matching, admin pipeline.
 */

const SECTOR_OPTIONS = [
  'AI / ML', 'SaaS', 'FinTech', '醫療健康', '教育科技',
  '永續 / ESG', '零售電商', '物聯網', '區塊鏈', '生技製藥',
  '太空科技', '農業科技', '半導體', '遊戲娛樂', '其他',
]

const STAGE_OPTIONS = [
  { value: 'pre_seed', label: '種子前期' },
  { value: 'seed', label: '種子輪' },
  { value: 'series_a', label: 'A 輪' },
  { value: 'series_b', label: 'B 輪以上' },
  { value: 'not_raising', label: '暫不募資' },
]

const CURRENT_YEAR = new Date().getFullYear()

interface ToastState {
  show: boolean
  type: 'success' | 'error'
  message: string
}

export default function StartupProfilePage() {
  const [form, setForm] = useState({
    name: '',
    one_liner: '',
    sector: '',
    stage: 'pre_seed',
    founded_year: '',
    team_size: '',
    website: '',
    description: '',
    traction: '',
    fundraising_target: '',
    fundraising_use: '',
  })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<ToastState>({ show: false, type: 'success', message: '' })

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ show: true, type, message })
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000)
  }

  async function loadProfile() {
    setLoadError(false)
    setLoading(true)
    try {
      const res = await fetch('/api/startup/profile')
      if (res.ok) {
        const data = await res.json()
        if (data.profile) {
          setForm(prev => ({ ...prev, ...data.profile }))
        }
      } else {
        setLoadError(true)
      }
    } catch {
      setLoadError(true)
    }
    setLoading(false)
  }

  useEffect(() => { loadProfile() }, [])

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    // Clear validation error for this field when user edits
    if (validationErrors[key]) {
      setValidationErrors(prev => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {}

    if (!form.name.trim()) {
      errors.name = '團隊名稱為必填欄位'
    }

    if (form.founded_year) {
      const year = parseInt(form.founded_year, 10)
      if (isNaN(year) || year < 1990 || year > CURRENT_YEAR) {
        errors.founded_year = `成立年份須介於 1990 ~ ${CURRENT_YEAR}`
      }
    }

    if (form.website && !form.website.startsWith('https://')) {
      errors.website = '網站須以 https:// 開頭'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSave() {
    if (!validate()) return

    setSaving(true)
    try {
      const res = await fetch('/api/startup/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        showToast('success', '團隊資料已儲存')
      } else {
        showToast('error', '儲存失敗，請稍後再試')
      }
    } catch {
      showToast('error', '網路錯誤，請檢查連線後再試')
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="animate-pulse space-y-4"><div className="h-96 bg-gray-200 rounded-xl" /></div>
  }

  if (loadError) {
    return <ErrorState message="無法載入團隊資料，請稍後再試" onRetry={loadProfile} />
  }

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
          toast.type === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">團隊資料</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? '儲存中...' : '儲存'}
        </button>
      </div>

      {/* Basic info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold">基本資訊</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="field-name" className="block text-sm text-gray-600 mb-1">
              團隊名稱 <span className="text-red-500">*</span>
            </label>
            <input
              id="field-name"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                validationErrors.name ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {validationErrors.name && (
              <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="field-one-liner" className="block text-sm text-gray-600 mb-1">一句話介紹</label>
            <input
              id="field-one-liner"
              value={form.one_liner}
              onChange={e => update('one_liner', e.target.value)}
              placeholder="用一句話描述你的產品或服務"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="field-sector" className="block text-sm text-gray-600 mb-1">產業領域</label>
            <select
              id="field-sector"
              value={form.sector}
              onChange={e => update('sector', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">選擇產業</option>
              {SECTOR_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="field-founded-year" className="block text-sm text-gray-600 mb-1">成立年份</label>
            <input
              id="field-founded-year"
              type="number"
              min={1990}
              max={CURRENT_YEAR}
              value={form.founded_year}
              onChange={e => update('founded_year', e.target.value)}
              placeholder="2024"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                validationErrors.founded_year ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {validationErrors.founded_year && (
              <p className="text-xs text-red-500 mt-1">{validationErrors.founded_year}</p>
            )}
          </div>
          <div>
            <label htmlFor="field-team-size" className="block text-sm text-gray-600 mb-1">團隊人數</label>
            <input
              id="field-team-size"
              type="number"
              value={form.team_size}
              onChange={e => update('team_size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="field-website" className="block text-sm text-gray-600 mb-1">網站</label>
          <input
            id="field-website"
            value={form.website}
            onChange={e => update('website', e.target.value)}
            placeholder="https://"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              validationErrors.website ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {validationErrors.website && (
            <p className="text-xs text-red-500 mt-1">{validationErrors.website}</p>
          )}
        </div>
      </div>

      {/* Product & Traction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold">產品與市場實績</h2>

        <div>
          <label htmlFor="field-description" className="block text-sm text-gray-600 mb-1">產品描述</label>
          <textarea
            id="field-description"
            value={form.description}
            onChange={e => update('description', e.target.value)}
            rows={4}
            placeholder="詳細描述您的產品、服務與目標市場..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label htmlFor="field-traction" className="block text-sm text-gray-600 mb-1">市場實績（Traction）</label>
          <textarea
            id="field-traction"
            value={form.traction}
            onChange={e => update('traction', e.target.value)}
            rows={3}
            placeholder="營收、用戶數、合作夥伴、獲獎紀錄..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Fundraising */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold">募資狀態</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-2">募資階段</label>
          <div className="flex flex-wrap gap-2">
            {STAGE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => update('stage', opt.value)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  form.stage === opt.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {form.stage !== 'not_raising' && (
          <>
            <div>
              <label htmlFor="field-fundraising-target" className="block text-sm text-gray-600 mb-1">目標募資金額</label>
              <input
                id="field-fundraising-target"
                value={form.fundraising_target}
                onChange={e => update('fundraising_target', e.target.value)}
                placeholder="例：NT$ 1,500 萬"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="field-fundraising-use" className="block text-sm text-gray-600 mb-1">資金用途</label>
              <textarea
                id="field-fundraising-use"
                value={form.fundraising_use}
                onChange={e => update('fundraising_use', e.target.value)}
                rows={2}
                placeholder="產品開發 40%、行銷 30%、人才招募 30%..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
