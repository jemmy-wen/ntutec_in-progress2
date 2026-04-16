'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const INQUIRY_TYPES = [
  { value: 'startup', label: '新創團隊申請' },
  { value: 'angel', label: '台大天使會加入' },
  { value: 'mentor', label: '成為業師' },
  { value: 'partnership', label: '合作洽談' },
  { value: 'media', label: '媒體採訪' },
  { value: 'other', label: '其他' },
]

export default function ContactForm() {
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: 'startup',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Read query parameter to pre-select inquiry type
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam && INQUIRY_TYPES.some(t => t.value === typeParam)) {
      setForm(prev => ({ ...prev, type: typeParam }))
    }
  }, [searchParams])

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        throw new Error(`送出失敗（${res.status}），請稍後再試。`)
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '送出失敗，請稍後再試或直接來信 ntutec@ntutec.com。')
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 rounded-xl border border-green-200 p-8 text-center">
        <div className="text-4xl mb-3">&#x2705;</div>
        <h2 className="text-lg font-bold text-green-800 mb-2">已收到您的訊息</h2>
        <p className="text-sm text-green-600">{form.type === 'angel' ? '投資團隊將於 3 個工作日內以 Email 與您聯繫。' : '我們會在 2-3 個工作天內回覆您。'}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="請輸入姓名"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            id="contact-email"
            required
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            placeholder="請輸入 Email"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">電話</label>
          <input
            id="contact-phone"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="請輸入電話"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 mb-1">公司/團隊</label>
          <input
            id="contact-company"
            value={form.company}
            onChange={e => update('company', e.target.value)}
            placeholder="請輸入公司或團隊名稱"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-type" className="block text-sm font-medium text-gray-700 mb-1">詢問類型</label>
        <select
          id="contact-type"
          value={form.type}
          onChange={e => update('type', e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          {INQUIRY_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">訊息 *</label>
        <textarea
          id="contact-message"
          required
          value={form.message}
          onChange={e => update('message', e.target.value)}
          rows={5}
          placeholder="請輸入您的訊息"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div role="alert" aria-live="polite">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-label={submitting ? '送出中，請稍候' : undefined}
        className="w-full px-5 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-deep disabled:opacity-50 transition-colors"
      >
        {submitting ? '送出中...' : '送出訊息'}
      </button>
    </form>
  )
}
