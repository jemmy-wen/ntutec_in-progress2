'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = '台大研究新創科技投資加速器孵化器生技醫療硬體軟體ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

function scramble(target: string, progress: number): string {
  return target
    .split('')
    .map((char, i) => {
      if (char === '\n' || char === ' ') return char
      if (i < Math.floor(progress * target.replace(/\n/g, '').length)) return char
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    })
    .join('')
}

export function TextScramble({
  text,
  className,
  delay = 0,
  duration = 1800,
}: {
  text: string
  className?: string
  delay?: number
  duration?: number
}) {
  const [display, setDisplay] = useState(() => scramble(text, 0))
  const frameRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const animate = (ts: number) => {
        if (!startRef.current) startRef.current = ts
        const elapsed = ts - startRef.current
        const progress = Math.min(elapsed / duration, 1)

        setDisplay(scramble(text, progress))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        } else {
          setDisplay(text)
        }
      }
      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frameRef.current)
    }
  }, [text, delay, duration])

  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {display}
    </span>
  )
}
