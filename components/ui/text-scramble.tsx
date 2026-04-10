'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = '台大研究新創科技投資加速生技醫療硬體軟體ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&'

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
  const [display, setDisplay] = useState(text) // start with real text
  const [animating, setAnimating] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    // Prevent double-run in React Strict Mode
    if (mountedRef.current) return
    mountedRef.current = true

    const lines = text.split('\n')
    const totalChars = text.replace(/\n/g, '').length
    const STEPS = 30
    const stepDuration = duration / STEPS
    let step = 0

    // Start with fully scrambled
    const scrambled = (progress: number) =>
      lines
        .map((line) =>
          line
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              const globalIdx = lines
                .slice(0, lines.indexOf(line))
                .join('').length + i
              const threshold = Math.floor(progress * totalChars)
              if (globalIdx < threshold) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        .join('\n')

    const delayTimer = setTimeout(() => {
      setAnimating(true)
      setDisplay(scrambled(0))

      const interval = setInterval(() => {
        step++
        const progress = step / STEPS
        if (progress >= 1) {
          clearInterval(interval)
          setDisplay(text)
          setAnimating(false)
        } else {
          setDisplay(scrambled(progress))
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(delayTimer)
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
