'use client'

/**
 * Scroll-triggered fade-in using IntersectionObserver + CSS transition.
 * Replaces the framer-motion version to keep motion/react out of the
 * shared client bundle (~124 KB saved).
 *
 * Behavior parity:
 * - Triggers once when element enters viewport (with -80px margin)
 * - Supports up/down/left/right directional slide
 * - Honors delay prop (seconds, applied as transitionDelay)
 * - ~600ms duration, matching the original ease curve feel
 */

import { useEffect, useRef, useState, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  /** Delay in seconds before animation starts (matches framer-motion delay prop) */
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const HIDDEN_TRANSFORM: Record<NonNullable<FadeInProps['direction']>, string> = {
  up: 'translate3d(0, 30px, 0)',
  down: 'translate3d(0, -30px, 0)',
  left: 'translate3d(30px, 0, 0)',
  right: 'translate3d(-30px, 0, 0)',
}

export function FadeIn({ children, className, delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect user's reduced-motion preference — show immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: '-80px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : HIDDEN_TRANSFORM[direction],
        transition: `opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
