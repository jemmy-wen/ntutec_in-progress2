'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — fall back to prompt
      window.prompt('複製連結：', url)
    }
  }

  const btnClass =
    'inline-flex items-center gap-2 rounded-full border border-stone-warm bg-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-teal hover:text-teal'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-slate-muted">分享文章：</span>

      <a
        href={fbHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`分享到 Facebook：${title}`}
        className={btnClass}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.563 9.875V14.89H7.898V12h2.539V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.461h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.985A10.002 10.002 0 0 0 22 12z" />
        </svg>
        Facebook
      </a>

      <a
        href={liHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`分享到 LinkedIn：${title}`}
        className={btnClass}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.555v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.352V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 5.456v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.45H3.555V9h3.564v11.45zM22.225 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="複製連結"
        className={btnClass}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {copied ? '已複製！' : '複製連結'}
      </button>
    </div>
  )
}
