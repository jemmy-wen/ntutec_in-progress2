'use client'

import { useState, useEffect, useCallback } from 'react'
import { ErrorState } from '@/components/shared/ErrorState'

/**
 * Mentor Slots page — profile editing + slot calendar placeholder.
 * API: GET/POST /api/mentor/slots
 */

const SPECIALTY_OPTIONS = [
  '行銷策略', '品牌定位', '產品開發', '技術架構',
  '募資策略', '財務規劃', '商業模式', '使用者研究',
  '業務開發', '團隊管理', '法律諮詢', '國際拓展',
]

interface ValidationErrors {
  name?: string
  specialties?: string
}

export default function MentorSlotsPage() {
  const [name, setName] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const loadProfile = useCallback(async () => {
    setError(null)
    try {
      const res = await fetch('/api/mentor/slots')
      if (res.ok) {
        const data = await res.json()
        if (data.profile) {
          setName(data.profile.display_name || '')
          setSpecialties(data.profile.specialties || [])
          setBio(data.profile.bio || '')
        }
      } else if (res.status !== 401) {
        throw new Error(`載入個人資料失敗（${res.status}）`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '載入個人資料時發生未知錯誤'
      setError(message)
      console.error('Failed to load mentor profile:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadProfile() }, [loadProfile])

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  function validate(): boolean {
    const errors: ValidationErrors = {}
    if (!name.trim()) {
      errors.name = '請輸入姓名'
    }
    if (specialties.length === 0) {
      errors.specialties = '請至少選擇一項專長領域'
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSave() {
    if (!validate()) return

    setSaving(true)
    setToast(null)
    try {
      const res = await fetch('/api/mentor/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), specialties, bio: bio.trim() }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `儲存失敗（${res.status}）`)
      }

      setToast({ type: 'success', message: '個人資料已儲存成功' })
    } catch (err) {
      const message = err instanceof Error ? err.message : '儲存時發生未知錯誤'
      setToast({ type: 'error', message })
      console.error('Failed to save mentor profile:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="animate-pulse space-y-4"><div className="h-32 bg-gray-200 rounded-xl" /><div className="h-48 bg-gray-200 rounded-xl" /></div>
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">我的時段與資料</h1>
        <ErrorState message={error} onRetry={loadProfile} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">我的時段與資料</h1>

      {/* Toast notification */}
      {toast && (
        <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Profile section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold">個人資料</h2>

        <div>
          <label htmlFor="mentor-name" className="block text-sm text-gray-600 mb-1">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            id="mentor-name"
            value={name}
            onChange={e => {
              setName(e.target.value)
              if (validationErrors.name) setValidationErrors(prev => ({ ...prev, name: undefined }))
            }}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              validationErrors.name ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {validationErrors.name && (
            <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label id="specialties-label" className="block text-sm text-gray-600 mb-2">
            專長領域 <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="specialties-label">
            {SPECIALTY_OPTIONS.map(s => {
              const selected = specialties.includes(s)
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSpecialties(prev =>
                      selected ? prev.filter(x => x !== s) : [...prev, s]
                    )
                    if (validationErrors.specialties) setValidationErrors(prev => ({ ...prev, specialties: undefined }))
                  }}
                  aria-pressed={selected}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>
          {validationErrors.specialties && (
            <p className="text-xs text-red-500 mt-1">{validationErrors.specialties}</p>
          )}
        </div>

        <div>
          <label htmlFor="mentor-bio" className="block text-sm text-gray-600 mb-1">簡介</label>
          <textarea
            id="mentor-bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="簡述您的專業背景與可提供的協助..."
          />
        </div>
      </div>

      {/* Slot calendar placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">可用時段</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">📅</div>
          <p className="text-amber-700 font-medium mb-1">時段設定功能開發中</p>
          <p className="text-sm text-amber-600">目前僅支援個人資料修改，時段選擇日曆將於後續版本開放。</p>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {saving ? '儲存中...' : '儲存個人資料'}
      </button>
    </div>
  )
}
