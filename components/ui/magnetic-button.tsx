'use client'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  ...props
}: {
  children: React.ReactNode
  className?: string
  strength?: number
  [key: string]: unknown
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const onMove = (e: React.MouseEvent) => {
    if (prefersReduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // Cap displacement to 12px max so button stays within click zone
    const dx = Math.min(Math.max((e.clientX - cx) * strength, -12), 12)
    const dy = Math.min(Math.max((e.clientY - cy) * strength, -12), 12)
    x.set(dx)
    y.set(dy)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('cursor-pointer', className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  )
}
