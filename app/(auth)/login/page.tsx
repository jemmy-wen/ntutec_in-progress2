'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key) {
        setDebugInfo(`ENV missing: URL=${url ? 'OK' : 'EMPTY'}, KEY=${key ? 'OK' : 'EMPTY'}`)
      }
    }
  }, [])

  async function handleGoogleLogin() {
    setGoogleLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback?redirect=${encodeURIComponent(redirectTo)}`,
      },
    })

    if (error) {
      setError(error.message)
      setGoogleLoading(false)
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback?redirect=${encodeURIComponent(redirectTo)}`,
      },
    })

    if (error) {
      if (error.message.includes('rate limit') || error.message.includes('too many')) {
        setError('寄送過於頻繁，請稍候幾分鐘後再試。')
      } else if (error.message.includes('invalid') || error.message.includes('email')) {
        setError('Email 格式不正確，請確認後再試。')
      } else {
        setError(error.message)
      }
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">登入連結已寄出</h1>
        <p className="text-gray-600 text-sm mb-1">
          請查看 <span className="font-medium text-gray-900">{email}</span> 的收件匣
        </p>
        <p className="text-gray-400 text-sm mb-6">
          點擊信件中的連結即可完成登入，連結 10 分鐘內有效。
        </p>
        <button
          onClick={() => { setSent(false); setEmail('') }}
          className="text-sm text-teal-600 hover:text-teal-700 font-medium"
        >
          重新寄送 →
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      {/* Logo + title */}
      <div className="text-center mb-7">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <Image
            src="/images/brand/ntutec-logo-horizontal.png"
            alt="NTUTEC"
            width={160}
            height={32}
            className="mx-auto h-8 w-auto"
          />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">登入台大創創中心平台</h1>
        <p className="text-sm text-gray-400 mt-1">台大天使會・業師媒合・新創申請</p>
      </div>

      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2 mb-4">
          {debugInfo}
        </div>
      )}

      {/* Google OAuth */}
      <button
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 mb-4 text-sm"
      >
        <svg className="w-4.5 h-4.5" width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {googleLoading ? '連線中...' : '以 Google 帳號登入'}
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">或以 Email 登入</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Email Magic Link */}
      <form onSubmit={handleEmailLogin} className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          {loading ? '寄送中...' : '發送登入連結'}
        </button>
      </form>

      {/* First-time note */}
      <p className="mt-4 text-center text-xs text-gray-400">
        首次使用？輸入 Email 即可自動建立帳號。
      </p>

      {/* Back to home */}
      <div className="mt-6 pt-5 border-t border-gray-100 text-center">
        <Link href="/" className="text-xs text-gray-400 hover:text-teal-600 transition-colors">
          ← 回到首頁
        </Link>
      </div>
    </div>
  )
}
