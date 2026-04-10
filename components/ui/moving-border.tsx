'use client'
import React, { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'motion/react'

export function MovingBorder({
  children,
  duration = 3000,
  rx = '30',
  ry = '30',
  className,
  containerClassName,
  borderClassName,
  as: Component = 'button',
  ...props
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
  className?: string
  containerClassName?: string
  borderClassName?: string
  as?: React.ElementType
  [key: string]: unknown
}) {
  const pathRef = useRef<SVGRectElement | null>(null)
  const progress = useMotionValue<number>(0)

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.() ?? 0
    if (length) {
      const pxPerMs = length / duration
      progress.set((time * pxPerMs) % length)
    }
  })

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0)
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0)

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <Component
      className={cn('relative overflow-hidden rounded-full p-[1px]', containerClassName)}
      {...props}
    >
      <div className="absolute inset-0 rounded-full" style={{ overflow: 'hidden' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
            ref={pathRef as any}
          />
        </svg>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, transform }}
          className={cn(
            'h-16 w-16 opacity-80 rounded-full bg-[radial-gradient(oklch(0.66_0.12_180)_40%,transparent_60%)]',
            borderClassName
          )}
        />
      </div>
      <div
        className={cn(
          'relative flex h-full w-full items-center justify-center rounded-full bg-teal-deep px-6 py-2.5 text-sm font-semibold text-white antialiased',
          className
        )}
      >
        {children}
      </div>
    </Component>
  )
}
