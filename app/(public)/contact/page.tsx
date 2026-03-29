'use client'

import { useState } from 'react'

/**
 * Contact page — inquiry form + contact info.
 * Form submissions go to /api/contact (→ sends email to tec@ntu.edu.tw).
 */

const INQUIRY_TYPES = [
  { value: 'startup', label: '新創團隊申請' },
  { value: 'angel', label: '天使俱樂部加入' },
  { value: 'mentor', label: '成為業師' },
  { value: 'partnership', label: '合作洽談' },
  { value: 'media', label: '媒體採訪' },
  { value: 'other', label: '其他' },
]

export default function ContactPage() {
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

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">聯絡我們</h1>
          <p className="text-lg text-gray-600">
            有任何問題或合作想法，歡迎與我們聯繫。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 rounded-xl border border-green-200 p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h2 className="text-lg font-bold text-green-800 mb-2">已收到您的訊息</h2>
                <p className="text-sm text-green-600">我們會在 2-3 個工作天內回覆您。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">電話</label>
                    <input
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">公司/團隊</label>
                    <input
                      value={form.company}
                      onChange={e => update('company', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">詢問類型</label>
                  <select
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">訊息 *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? '送出中...' : '送出訊息'}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold mb-4">聯絡資訊</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700">地址</div>
                  <div className="text-gray-600">台北市大安區羅斯福路四段一號<br />台大水源校區卓越研究大樓</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Email</div>
                  <div className="text-gray-600">tec@ntu.edu.tw</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">電話</div>
                  <div className="text-gray-600">(02) 3366-9949</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold mb-2 text-blue-900">辦公時間</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <div>週一至週五</div>
                <div>09:00 - 18:00</div>
                <div className="text-blue-500 text-xs mt-2">國定假日休息</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
