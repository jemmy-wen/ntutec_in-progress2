'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

export interface HoverCard {
  title: string
  description: string
  link?: string
  icon?: React.ReactNode
  micro?: string
}

export function HoverEffect({
  items,
  className,
}: {
  items: HoverCard[]
  className?: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((item, idx) => {
        const Wrapper = item.link ? Link : 'div'
        const wrapperProps = item.link ? { href: item.link } : {}

        return (
          <Wrapper
            key={idx}
            {...(wrapperProps as any)}
            className="group relative block p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 block h-full w-full rounded-2xl bg-teal-wash"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-10 rounded-2xl border border-stone-warm bg-white p-6 transition-shadow duration-200 group-hover:shadow-md">
              {item.micro && (
                <p className="micro-label mb-3">{item.micro}</p>
              )}
              {item.icon && (
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-wash text-teal-deep">
                  {item.icon}
                </div>
              )}
              <h3 className="mb-2 text-lg font-semibold text-charcoal">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-muted">{item.description}</p>
            </div>
          </Wrapper>
        )
      })}
    </div>
  )
}
