'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@ntutec',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ntutec',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ntutec',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ntutec',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.046c.431-.818 1.484-1.681 3.054-1.681 3.266 0 3.867 2.149 3.867 4.944v6.627zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.556 13.019H3.78V9h3.113v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export default function RightSidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Right sidebar — white bg, dark text, always visible */}
      <div className="fixed right-0 top-0 z-[140] flex h-full w-14 flex-col items-center bg-white border-l border-[#e0ddd8]">

        {/* Top: hamburger + 立即申請 — one combined button */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="開啟選單"
          className="group flex flex-col items-center gap-2 pt-5 pb-4 w-full transition-colors"
        >
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[18px] w-[18px] text-[#181614]/50 group-hover:text-[#00AA95] transition-colors" aria-hidden="true">
            <line x1="0" y1="2" x2="18" y2="2" />
            <line x1="0" y1="9" x2="18" y2="9" />
            <line x1="0" y1="16" x2="18" y2="16" />
          </svg>
          <span
            className="text-[14px] font-semibold tracking-[0.2em] text-[#181614]/50 group-hover:text-[#00AA95] transition-colors"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            立即申請
          </span>
        </button>

        <div className="h-px w-8 bg-[#e0ddd8]" />

        {/* Middle: social icons */}
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <div className="mb-2 h-8 w-px bg-[#e0ddd8]" />
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e0ddd8] text-[#181614]/40 transition-all hover:border-[#00AA95] hover:text-[#00AA95] hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
          <div className="mt-2 h-8 w-px bg-[#e0ddd8]" />
        </div>

        {/* Bottom: grid icon + 走進台大創創 */}
        <div className="flex flex-col items-center pb-5 gap-2">
          <div className="grid grid-cols-2 gap-0.5 mb-1" aria-hidden="true">
            <div className="h-2 w-2 rounded-sm bg-[#00AA95]" />
            <div className="h-2 w-2 rounded-sm bg-[#00AA95]/40" />
            <div className="h-2 w-2 rounded-sm bg-[#00AA95]/40" />
            <div className="h-2 w-2 rounded-sm bg-[#00AA95]/70" />
          </div>
          <Link
            href="/about"
            className="text-[14px] font-semibold tracking-[0.2em] text-[#181614]/50 hover:text-[#00AA95] transition-colors"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            走進台大創創
          </Link>
        </div>
      </div>

      {/* Overlay menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[300] flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="relative ml-auto flex h-full w-80 flex-col bg-[#181614] px-8 py-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="關閉選單"
                className="mb-10 self-end text-white/50 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
              <nav className="flex flex-col gap-6">
                {[
                  { label: '輔導計畫', href: '/programs' },
                  { label: '企業合作', href: '/corporate' },
                  { label: '台大天使會', href: '/angel' },
                  { label: '關於我們', href: '/about' },
                  { label: '最新動態', href: '/blog' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-bold text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: "'Noto Serif TC', serif" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">立即申請</p>
                <Link
                  href="/apply"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-[#00AA95] px-4 py-3 text-sm font-semibold text-white hover:bg-[#008f7d] transition-colors"
                >
                  <span>預約 2027 輔導計畫</span>
                  <span className="text-white/60 text-xs">加速器・車庫</span>
                </Link>
                {[
                  { label: '新創投遞 Pitch', desc: '提交新創案件', href: '/pitch' },
                  { label: '企業合作洽談', desc: '啟動外部創新', href: '/corporate#contact' },
                  { label: '加入台大天使會', desc: '成為天使投資人', href: '/angel-apply' },
                ].map((opt) => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors"
                  >
                    <span>{opt.label}</span>
                    <span className="text-white/40 text-xs">{opt.desc}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
