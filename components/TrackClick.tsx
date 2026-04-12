'use client'

// components/TrackClick.tsx
// Thin client wrapper that fires a GA4 event on click.
// Wraps any child element — use this when the parent is a Server Component
// and you can't add onClick directly.
//
// Usage:
//   <TrackClick eventName="cta_apply_click" eventParams={{ location: 'hero' }}>
//     <Link href="/apply">申請</Link>
//   </TrackClick>

import { event } from '@/lib/analytics'

interface TrackClickProps {
  eventName: string
  eventParams?: Record<string, string | number | boolean>
  children: React.ReactNode
  className?: string
}

export default function TrackClick({
  eventName,
  eventParams,
  children,
  className,
}: TrackClickProps) {
  return (
    <span
      className={className}
      onClick={() => event(eventName, eventParams)}
      // Pass through so the inner Link/button still handles keyboard activation
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') event(eventName, eventParams)
      }}
    >
      {children}
    </span>
  )
}
