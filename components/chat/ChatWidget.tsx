'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MessageCircle, X, Send, ExternalLink } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: '👋 你好！我是 NTUTEC 導覽員。有什麼可以幫你的嗎？',
}

const FALLBACK_CONTENT = (
  <div className="space-y-3 text-sm text-gray-700">
    <p className="font-medium text-gray-900">目前無法連線，以下是常用連結：</p>
    <ul className="space-y-2">
      {[
        { href: '/faq', label: '常見問題 FAQ' },
        { href: '/apply', label: '申請加速器' },
        { href: '/angel-apply', label: '申請天使會員' },
        { href: '/contact', label: '聯絡我們' },
      ].map(({ href, label }) => (
        <li key={href}>
          <a
            href={href}
            className="flex items-center gap-1 text-teal hover:text-teal-deep underline-offset-2 hover:underline"
          >
            <ExternalLink size={12} />
            {label}
          </a>
        </li>
      ))}
    </ul>
    <p className="text-gray-500 text-xs mt-2">
      或直接寄信至{' '}
      <a href="mailto:ntutec@ntu.edu.tw" className="text-teal hover:underline">
        ntutec@ntu.edu.tw
      </a>
    </p>
  </div>
)

const QUICK_ACTIONS = ['加速器申請', '天使會員', '企業合作', '聯絡我們'] as const

/** Minimal markdown renderer — handles **bold**, [text](url), newlines */
function renderMarkdown(text: string) {
  // Split by lines
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    // Parse inline elements: bold + links
    const parts: React.ReactNode[] = []
    // Regex: **bold** | [text](url)
    const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index))
      }
      if (match[1]) {
        // bold
        parts.push(<strong key={match.index}>{match[1]}</strong>)
      } else if (match[2] && match[3]) {
        // link
        const isExternal = match[3].startsWith('http')
        parts.push(
          <a
            key={match.index}
            href={match[3]}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-teal underline underline-offset-2 hover:text-teal-deep"
          >
            {match[2]}
          </a>
        )
      }
      lastIndex = regex.lastIndex
    }
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex))
    }

    return (
      <span key={lineIdx}>
        {parts.length > 0 ? parts : line}
        {lineIdx < lines.length - 1 && line.trim() !== '' && <br />}
      </span>
    )
  })
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [quickActionsUsed, setQuickActionsUsed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Restore open state from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ntutec-chat-open')
      if (saved === 'true') setIsOpen(true)
    } catch {}
  }, [])

  // Persist open state
  useEffect(() => {
    try {
      sessionStorage.setItem('ntutec-chat-open', String(isOpen))
    } catch {}
  }, [isOpen])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Focus trap when open on mobile
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      const userMsg: Message = { role: 'user', content: trimmed }
      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsLoading(true)
      setQuickActionsUsed(true)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: messages.slice(1), // exclude welcome message
          }),
        })

        const data = await res.json()

        if (!res.ok || data.fallback) {
          setShowFallback(true)
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: '抱歉，目前服務暫時無法使用。請查看下方連結或直接寄信給我們。',
            },
          ])
        } else {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.content },
          ])
        }
      } catch {
        setShowFallback(true)
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '抱歉，目前服務暫時無法使用。請查看下方連結或直接寄信給我們。',
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Widget container */}
      <div
        ref={widgetRef}
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3"
        role="region"
        aria-label="NTUTEC 導覽聊天"
      >
        {/* Chat window */}
        <div
          className={[
            'bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden',
            'transition-all duration-300 ease-in-out origin-bottom-right',
            'w-[calc(100vw-2rem)] sm:w-[350px]',
            isOpen
              ? 'opacity-100 scale-100 pointer-events-auto h-[500px] sm:h-[520px]'
              : 'opacity-0 scale-95 pointer-events-none h-0',
          ].join(' ')}
          aria-hidden={!isOpen}
        >
          {isOpen && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-teal text-white shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">NTUTEC 導覽員</p>
                    <p className="text-white/70 text-xs leading-tight">AI 助理</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="關閉聊天視窗"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth"
                role="log"
                aria-live="polite"
                aria-label="對話訊息"
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={[
                        'max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-teal text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm',
                      ].join(' ')}
                    >
                      {msg.role === 'assistant'
                        ? renderMarkdown(msg.content)
                        : msg.content}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                      <span className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                )}

                {/* Fallback links */}
                {showFallback && (
                  <div className="bg-teal-light rounded-xl p-3 border border-teal/20">
                    {FALLBACK_CONTENT}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick actions — show only before first user message */}
              {!quickActionsUsed && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action}
                      onClick={() => sendMessage(action)}
                      className="text-xs px-2.5 py-1 rounded-full border border-teal text-teal bg-white hover:bg-teal hover:text-white transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="px-3 pb-3 pt-1 flex gap-2 shrink-0 border-t border-gray-100"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="輸入問題..."
                  disabled={isLoading}
                  maxLength={500}
                  className="flex-1 text-sm rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal disabled:opacity-50 bg-gray-50"
                  aria-label="輸入訊息"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-teal text-white hover:bg-teal-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="送出訊息"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Floating button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={[
            'w-14 h-14 rounded-full bg-teal text-white shadow-lg',
            'hover:bg-teal-deep active:scale-95 transition-all duration-200',
            'flex items-center justify-center',
            'focus:outline-none focus:ring-4 focus:ring-teal/30',
          ].join(' ')}
          aria-label={isOpen ? '關閉聊天' : '開啟 NTUTEC 導覽聊天'}
          aria-expanded={isOpen}
        >
          <span
            className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
          >
            {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
          </span>
        </button>
      </div>
    </>
  )
}
