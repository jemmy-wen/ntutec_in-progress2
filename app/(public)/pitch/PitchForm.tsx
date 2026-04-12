'use client'

import { useState } from 'react'

/**
 * PitchForm — native form for /pitch page.
 * Posts to /api/forms/submit with type='pitch'.
 */
export default function PitchForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    sector: '',
    stage: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pitch',
          name: form.name,
          email: form.email,
          data: {
            company: form.company,
            website: form.website,
            sector: form.sector,
            stage: form.stage,
            description: form.description,
          },
        }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || `送出失敗（${res.status}）`)
      }
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '送出失敗，請稍後再試或直接來信 ntutec@ntu.edu.tw。'
      )
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mb-3 text-4xl">&#x2705;</div>
        <h2 className="mb-2 text-lg font-bold text-green-800">已收到您的投遞</h2>
        <p className="text-sm text-green-600">
          投資經理將逐一審閱並主動與您聯繫，不需等待回音。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="pitch-name" className="mb-1 block text-sm font-medium text-gray-700">
            聯絡人姓名 *
          </label>
          <input
            id="pitch-name"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="請輸入姓名"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="pitch-email" className="mb-1 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            id="pitch-email"
            required
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="請輸入 Email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="pitch-company" className="mb-1 block text-sm font-medium text-gray-700">
            公司 / 團隊名稱 *
          </label>
          <input
            id="pitch-company"
            required
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="請輸入公司或團隊名稱"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="pitch-website" className="mb-1 block text-sm font-medium text-gray-700">
            官方網站
          </label>
          <input
            id="pitch-website"
            type="url"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="https://"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="pitch-sector" className="mb-1 block text-sm font-medium text-gray-700">
            主要行業別
          </label>
          <select
            id="pitch-sector"
            value={form.sector}
            onChange={(e) => update('sector', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="">請選擇</option>
            <option value="AI 軟體">AI 軟體</option>
            <option value="生技醫療">生技醫療</option>
            <option value="硬科技">硬科技</option>
            <option value="創新商模">創新商模</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div>
          <label htmlFor="pitch-stage" className="mb-1 block text-sm font-medium text-gray-700">
            目前募資輪次
          </label>
          <select
            id="pitch-stage"
            value={form.stage}
            onChange={(e) => update('stage', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="">請選擇</option>
            <option value="Pre-seed">Pre-seed</option>
            <option value="Seed">Seed</option>
            <option value="Pre-A">Pre-A</option>
            <option value="Series A">Series A</option>
            <option value="其他">其他</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="pitch-description" className="mb-1 block text-sm font-medium text-gray-700">
          一句話描述你的新創 *
        </label>
        <textarea
          id="pitch-description"
          required
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
          placeholder="解決什麼問題？面向哪個市場？"
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-pill-primary flex w-full items-center justify-center gap-2 py-4 text-base disabled:opacity-50"
      >
        {submitting ? '送出中...' : '立即投遞'}
      </button>

      <p className="text-center text-xs text-gray-400">
        投遞後投資經理將審閱並主動聯繫，無截止日
      </p>
    </form>
  )
}
