'use client'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// ASCII-only chars — no Chinese, so scrambled state reads as "cipher/terminal" not "broken CJK"
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&*+=-~'

export function TextScramble({
  text,
  className,
  delay = 300,
  duration = 1200,
}: {
  text: string
  className?: string
  delay?: number
  duration?: number
}) {
  const [display, setDisplay] = useState(text)
  const mountedRef = useRef(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // Skip animation entirely for reduced-motion users
    if (prefersReduced) return

    // Prevent double-run in React Strict Mode
    if (mountedRef.current) return
    mountedRef.current = true

    const lines = text.split('\n')
    const totalChars = text.replace(/\n/g, '').length
    const STEPS = 30
    const stepDuration = duration / STEPS
    let step = 0
    let interval: ReturnType<typeof setInterval> | null = null

    const scrambled = (progress: number) =>
      lines
        .map((line) =>
          line
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              const globalIdx =
                lines.slice(0, lines.indexOf(line)).join('').length + i
              const threshold = Math.floor(progress * totalChars)
              if (globalIdx < threshold) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        .join('\n')

    const delayTimer = setTimeout(() => {
      setDisplay(scrambled(0))

      interval = setInterval(() => {
        step++
        const progress = step / STEPS
        if (progress >= 1) {
          clearInterval(interval!)
          interval = null
          setDisplay(text)
        } else {
          setDisplay(scrambled(progress))
        }
      }, stepDuration)
    }, delay)

    return () => {
      clearTimeout(delayTimer)
      if (interval !== null) clearInterval(interval)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span
      className={className}
      style={{ whiteSpace: 'pre-line', fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
    </span>
  )
}
