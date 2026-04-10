'use client'
import { useEffect, useRef } from 'react'

export function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.parentElement?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.opacity = '1'
    }
    const onLeave = () => { el.style.opacity = '0' }

    const parent = el.parentElement
    parent?.addEventListener('mousemove', onMove)
    parent?.addEventListener('mouseleave', onLeave)
    return () => {
      parent?.removeEventListener('mousemove', onMove)
      parent?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={spotRef}
      className="pointer-events-none absolute z-[2] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background: 'radial-gradient(circle, oklch(0.66 0.12 180 / 0.18) 0%, transparent 70%)',
      }}
    />
  )
}
