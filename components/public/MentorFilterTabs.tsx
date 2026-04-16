'use client'
import { useState } from 'react'

interface MentorCategory {
  key: string
  title: string
  subtitle: string
  iconName: string
  mentorCount: number
}

interface MentorFilterTabsProps {
  categories: MentorCategory[]
  children: React.ReactNode[]
}

export default function MentorFilterTabs({ categories, children }: MentorFilterTabsProps) {
  const [active, setActive] = useState<string | null>(null)

  const totalCount = categories.reduce((s, c) => s + c.mentorCount, 0)
  const allCategories = [
    { key: 'all', title: '全部', subtitle: 'All Mentors', iconName: '', mentorCount: totalCount },
    ...categories,
  ]

  return (
    <>
      {/* Filter tabs */}
      <div className="sticky top-20 z-30 border-b border-stone-warm/40 bg-white/90 backdrop-blur-md xl:top-24">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {allCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key === 'all' ? null : cat.key)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  (cat.key === 'all' && active === null) || cat.key === active
                    ? 'bg-teal text-white shadow-sm'
                    : 'text-charcoal/70 hover:bg-stone hover:text-charcoal'
                }`}
              >
                {cat.title}
                <span className="ml-1.5 text-xs opacity-70">{cat.mentorCount}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category sections */}
      {children.map((child, idx) => {
        const cat = categories[idx]
        if (!cat) return null
        const show = active === null || active === cat.key
        return (
          <div key={cat.key} style={{ display: show ? 'block' : 'none' }}>
            {child}
          </div>
        )
      })}
    </>
  )
}
