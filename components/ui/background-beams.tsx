'use client'
import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function BackgroundBeams({ className }: { className?: string }) {
  const beams = [
    { x1: '10%', x2: '50%', y1: '0%', y2: '100%', delay: '0s', duration: '8s' },
    { x1: '30%', x2: '60%', y1: '0%', y2: '100%', delay: '1s', duration: '10s' },
    { x1: '50%', x2: '70%', y1: '0%', y2: '100%', delay: '2s', duration: '7s' },
    { x1: '70%', x2: '40%', y1: '0%', y2: '100%', delay: '0.5s', duration: '9s' },
    { x1: '85%', x2: '55%', y1: '0%', y2: '100%', delay: '1.5s', duration: '11s' },
    { x1: '20%', x2: '80%', y1: '0%', y2: '100%', delay: '3s', duration: '8.5s' },
  ]

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="beam-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.66 0.12 180)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.66 0.12 180)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {beams.map((beam, i) => (
          <line
            key={i}
            x1={beam.x1}
            y1={beam.y1}
            x2={beam.x2}
            y2={beam.y2}
            stroke="oklch(0.66 0.12 180)"
            strokeWidth="0.5"
            strokeOpacity="0"
            strokeLinecap="round"
          >
            <animate
              attributeName="strokeOpacity"
              values="0;0.4;0"
              dur={beam.duration}
              begin={beam.delay}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values={`${beam.x2};${parseInt(beam.x2) + 8}%;${beam.x2}`}
              dur={beam.duration}
              begin={beam.delay}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.66_0.12_180/0.15),transparent)]" />
    </div>
  )
}
