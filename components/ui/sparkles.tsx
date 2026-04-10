'use client'
import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

interface Particle {
  id: string
  x: string
  y: string
  size: number
  opacity: number
  duration: number
  delay: number
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${i}`,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }))
}

export function SparklesCore({
  id,
  background,
  minSize = 0.4,
  maxSize = 1.5,
  speed = 1,
  particleColor = 'oklch(0.66 0.12 180)',
  className,
  particleDensity = 80,
}: {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  className?: string
  particleDensity?: number
}) {
  const uid = useId()
  const particles = React.useMemo(() => generateParticles(particleDensity), [particleDensity])

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {background && <rect width="100%" height="100%" fill={background} />}
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particleColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              y: [0, -(Math.random() * 30 + 10)],
            }}
            transition={{
              duration: particle.duration / speed,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Convenience wrapper: text with sparkles behind it
export function SparklesText({
  children,
  className,
  sparkleColor,
}: {
  children: React.ReactNode
  className?: string
  sparkleColor?: string
}) {
  return (
    <div className={cn('relative inline-block', className)}>
      <SparklesCore
        particleColor={sparkleColor}
        particleDensity={30}
        className="pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </div>
  )
}
