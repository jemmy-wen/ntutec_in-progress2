'use client'

import { useState } from 'react'

/**
 * Mentor Slots page — placeholder skeleton.
 * Full implementation will port P014's SlotCalendar component + mentor profile form.
 * API: GET/POST /api/mentor/slots
 */

const SPECIALTY_OPTIONS = [
  '行銷策略', '品牌定位', '產品開發', '技術架構',
  '募資策略', '財務規劃', '商業模式', '使用者研究',
  '業務開發', '團隊管理', '法律諮詢', '國際拓展',
]

export default function MentorSlotsPage() {
  const [name, setName] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    // TODO: POST /api/mentor/mentors with profile + slots
    await new Promise(r => setTimeout(r, 500))
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">我的時段與資料</h1>

      {/* Profile section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold">個人資料</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">姓名</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">專長領域</label>
          <div className="flex flex-wrap gap-2">
            {SPECIALTY_OPTIONS.map(s => {
              const selected = specialties.includes(s)
              return (
                <button
                  key={s}
                  onClick={() => setSpecialties(prev =>
                    selected ? prev.filter(x => x !== s) : [...prev, s]
                  )}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">簡介</label>
          <textarea
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
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          <div className="text-4xl mb-3">📅</div>
          <p>時段選擇日曆將從 P014 SlotCalendar 元件遷入</p>
          <p className="text-xs text-gray-400 mt-2">點選日期 + 時段即可開放預約</p>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {saving ? '儲存中...' : '儲存時段與資料'}
      </button>
    </div>
  )
}
