'use client'

import { useState } from 'react'

/**
 * ConsultingForm — consultation request form for /consulting page.
 * Posts to /api/forms/submit with type='consulting'.
 */
export default function ConsultingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    topic: '',
    message: '',
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
          type: 'consulting',
          name: form.name,
          email: form.email,
          data: {
            company: form.company,
            companySize: form.companySize,
            topic: form.topic,
            message: form.message,
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
        <h2 className="mb-2 text-lg font-bold text-green-800">已收到您的諮詢需求</h2>
        <p className="text-sm text-green-600">
          專人將於 3 個工作日內與您聯繫，評估需求並安排後續討論。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="consulting-name" className="mb-1 block text-sm font-medium text-gray-700">
            姓名 *
          </label>
          <input
            id="consulting-name"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="請輸入姓名"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="consulting-email" className="mb-1 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            id="consulting-email"
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
          <label htmlFor="consulting-company" className="mb-1 block text-sm font-medium text-gray-700">
            公司名稱 *
          </label>
          <input
            id="consulting-company"
            required
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="請輸入公司名稱"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="consulting-size" className="mb-1 block text-sm font-medium text-gray-700">
            企業規模
          </label>
          <select
            id="consulting-size"
            value={form.companySize}
            onChange={(e) => update('companySize', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="">請選擇</option>
            <option value="1-50 人">1–50 人</option>
            <option value="51-200 人">51–200 人</option>
            <option value="201-1000 人">201–1,000 人</option>
            <option value="1000 人以上">1,000 人以上</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="consulting-topic" className="mb-1 block text-sm font-medium text-gray-700">
          諮詢主題
        </label>
        <select
          id="consulting-topic"
          value={form.topic}
          onChange={(e) => update('topic', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        >
          <option value="">請選擇</option>
          <option value="企業創新策略">企業創新策略諮詢</option>
          <option value="技術商業化">技術商業化輔導</option>
          <option value="新創加速">新創加速輔導</option>
          <option value="垂直加速器合作">企業垂直加速器合作</option>
          <option value="其他">其他</option>
        </select>
      </div>

      <div>
        <label htmlFor="consulting-message" className="mb-1 block text-sm font-medium text-gray-700">
          需求說明 *
        </label>
        <textarea
          id="consulting-message"
          required
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          rows={4}
          placeholder="請簡述您的創新議題、期望合作方式與時程（如有），我們評估後安排合適窗口回覆"
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
        className="w-full rounded-lg bg-teal px-5 py-3 font-medium text-white transition-colors hover:bg-teal-deep disabled:opacity-50"
      >
        {submitting ? '送出中...' : '送出諮詢需求'}
      </button>

      <p className="text-center text-xs text-gray-400">
        通常於 3 個工作日內回覆　·　ntutec@ntu.edu.tw
      </p>
    </form>
  )
}
