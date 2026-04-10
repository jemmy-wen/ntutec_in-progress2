'use client'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Item {
  name: string
  name_en?: string
  type?: string
}

export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
}: {
  items: Item[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        scrollerRef.current!.appendChild(duplicatedItem)
      })
      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      )
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      const durations = { fast: '20s', normal: '40s', slow: '60s' }
      containerRef.current.style.setProperty('--animation-duration', durations[speed])
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative shrink-0 rounded-xl border border-stone-warm bg-white px-5 py-3 shadow-sm"
          >
            <div className="text-sm font-semibold text-charcoal">{item.name}</div>
            {item.name_en && (
              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-slate-muted">
                {item.name_en}
              </div>
            )}
          </li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50%)); }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) linear var(--animation-direction, forwards) infinite;
        }
      `}</style>
    </div>
  )
}
