'use client'

import { useState, useEffect } from 'react'

interface Badge {
  id: string
  code: string
  name: string
  description: string | null
  icon: string | null
  category: string
  earned: boolean
  earned_at: string | null
}

interface BadgesWidgetProps {
  /** Max badges to show in the row (default 5). Remaining are hidden. */
  maxVisible?: number
  /** Show a header label above the badges */
  showHeader?: boolean
  /** Compact mode — smaller icons, no label below */
  compact?: boolean
}

/**
 * BadgesWidget — F-017 Phase 1
 *
 * Displays the current angel member's badge status.
 * Earned badges are full colour; unearned are greyed out with a lock icon overlay.
 * Max 5 badges shown in a horizontal row.
 */
export default function BadgesWidget({
  maxVisible = 5,
  showHeader = true,
  compact = false,
}: BadgesWidgetProps) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/angel/badges')
        if (res.ok) {
          const data = await res.json()
          setBadges(data.badges || [])
        }
      } catch {
        // silently fail — badges are non-critical
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex gap-3">
        {Array.from({ length: maxVisible }).map((_, i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        ))}
      </div>
    )
  }

  const visible = badges.slice(0, maxVisible)
  const earnedCount = badges.filter(b => b.earned).length

  return (
    <div className="space-y-2">
      {showHeader && (
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold text-gray-700 ${compact ? 'text-xs' : 'text-sm'}`}>
            成就徽章
          </h3>
          <span className={`text-gray-400 ${compact ? 'text-xs' : 'text-xs'}`}>
            {earnedCount}/{badges.length} 已獲得
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {visible.map(badge => (
          <div
            key={badge.code}
            className="relative group cursor-default"
            onMouseEnter={() => setTooltip(badge.code)}
            onMouseLeave={() => setTooltip(null)}
          >
            {/* Badge circle */}
            <div
              className={`
                flex items-center justify-center rounded-full border-2 transition-all
                ${compact ? 'w-9 h-9 text-lg' : 'w-12 h-12 text-2xl'}
                ${badge.earned
                  ? 'border-teal-400 bg-teal-50 shadow-sm'
                  : 'border-gray-200 bg-gray-100 grayscale opacity-40'
                }
              `}
            >
              <span role="img" aria-label={badge.name}>
                {badge.icon || '🏅'}
              </span>
            </div>

            {/* Lock overlay for unearned */}
            {!badge.earned && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-400">🔒</span>
              </div>
            )}

            {/* Tooltip */}
            {tooltip === badge.code && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 w-40 pointer-events-none">
                <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 text-center shadow-lg">
                  <div className="font-semibold mb-0.5">{badge.name}</div>
                  {badge.description && (
                    <div className="text-gray-300 text-[10px]">{badge.description}</div>
                  )}
                  {badge.earned && badge.earned_at && (
                    <div className="text-teal-300 text-[10px] mt-1">
                      {new Date(badge.earned_at).toLocaleDateString('zh-TW')} 獲得
                    </div>
                  )}
                  {!badge.earned && (
                    <div className="text-gray-400 text-[10px] mt-1">尚未獲得</div>
                  )}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                </div>
              </div>
            )}

            {/* Name label (non-compact only) */}
            {!compact && (
              <div className={`mt-1 text-center text-[10px] leading-tight ${
                badge.earned ? 'text-teal-700 font-medium' : 'text-gray-400'
              }`}>
                {badge.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
