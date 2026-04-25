'use client'

import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'

const STATS = [
  { label: 'STARTUPS', value: '510', suffix: '+', unit: '支', desc: '累計輔導新創團隊' },
  { label: 'INVESTORS', value: '127', suffix: '+', unit: '位', desc: '投資人與天使網絡' },
  { label: 'PARTNERS', value: '29', suffix: '', unit: '家', desc: '企業合作夥伴' },
  { label: 'YEARS', value: '11', suffix: '', unit: '年', desc: '深耕台大創業生態' },
]

const PILLS = [
  'Demo Day 2025 投資人到場 74 位',
  '510+ 支新創團隊',
  '歷屆校友最高單筆募資 NT$1 億+',
  '企業垂直加速器累計 27 期',
]

const PILL_HEIGHT = 42
const WALL_T = 60 // wall thickness

function PhysicsPills() {
  const { ref: containerRef, isInView } = useInView()
  const pillRefs = useRef<(HTMLDivElement | null)[]>([])
  const engineRef = useRef<unknown>(null)
  const rafRef = useRef<number | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    const container = containerRef.current
    if (!container) return

    import('matter-js').then((Matter) => {
      const { Engine, Runner, Bodies, Composite } = Matter

      const W = container.offsetWidth
      const H = container.offsetHeight

      const engine = Engine.create({ gravity: { x: 0, y: 2 } })
      engineRef.current = engine

      // Static walls: floor + left + right
      const floor = Bodies.rectangle(W / 2, H + WALL_T / 2, W + 200, WALL_T, { isStatic: true })
      const wallL = Bodies.rectangle(-WALL_T / 2, H / 2, WALL_T, H * 2, { isStatic: true })
      const wallR = Bodies.rectangle(W + WALL_T / 2, H / 2, WALL_T, H * 2, { isStatic: true })
      Composite.add(engine.world, [floor, wallL, wallR])

      // Spread pills horizontally so they land in different columns, not stacked
      // X positions: left-center, right-center, far-left, far-right (as fractions of W)
      const xFractions = [0.28, 0.72, 0.18, 0.62]
      const bodies = pillRefs.current.map((el, i) => {
        const w = el ? el.offsetWidth : 180
        const startX = W * xFractions[i]
        const startY = -(PILL_HEIGHT / 2) - i * 60
        const body = Bodies.rectangle(startX, startY, w, PILL_HEIGHT, {
          restitution: 0.25,  // slight bounce
          friction: 0.6,
          frictionAir: 0.02,
          label: `pill-${i}`,
        })
        return body
      })

      // Add all pills at once
      Composite.add(engine.world, bodies)

      const runner = Runner.create()
      Runner.run(runner, engine)

      // Sync DOM elements to physics bodies each frame
      const tick = () => {
        bodies.forEach((body, i) => {
          const el = pillRefs.current[i]
          if (!el) return
          const { x, y } = body.position
          const angle = body.angle
          const w = el.offsetWidth
          el.style.transform = `translate(${x - w / 2}px, ${y - PILL_HEIGHT / 2}px) rotate(${angle}rad)`
          el.style.opacity = '1'
        })
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)

      // Stop micro-movements after 4s (settle phase)
      setTimeout(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        // one final sync
        bodies.forEach((body, i) => {
          const el = pillRefs.current[i]
          if (!el) return
          const { x, y } = body.position
          const angle = body.angle
          const w = el.offsetWidth
          el.style.transform = `translate(${x - w / 2}px, ${y - PILL_HEIGHT / 2}px) rotate(${angle}rad)`
        })
        Runner.stop(runner)
        Engine.clear(engine)
      }, 5000)

      return () => {
        Runner.stop(runner)
        Engine.clear(engine)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    })
  }, [isInView])

  return (
    <div
      ref={containerRef}
      className="relative mt-16 w-full overflow-hidden"
      style={{ height: '180px' }}
    >
      {PILLS.map((pill, i) => (
        <div
          key={pill}
          ref={(el) => { pillRefs.current[i] = el }}
          className="absolute left-0 top-0 flex items-center gap-2 rounded-full bg-[#00aa95] px-5 py-2.5 text-sm font-medium text-white shadow-md"
          style={{
            height: `${PILL_HEIGHT}px`,
            opacity: 0,
            willChange: 'transform',
            whiteSpace: 'nowrap',
          }}
        >
          <span className="text-[10px] leading-none">♦</span>
          {pill}
        </div>
      ))}
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-[#F6F5F1] py-20 md:py-28">
      <div className="container">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00aa95]">
            Social Proof
          </p>
          <h2 className="text-2xl font-bold text-[#181614] sm:text-3xl md:text-[2.75rem] md:leading-tight">
            數字，見證我們的影響力。
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-[40px] font-bold leading-none text-[#00aa95] md:text-[60px] lg:text-[80px]">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-[28px] font-bold leading-none text-[#00aa95] md:text-[42px] lg:text-[56px]">
                    {stat.suffix}
                  </span>
                )}
                <span className="ml-1 text-base text-slate-500 md:text-lg">{stat.unit}</span>
              </div>
              <p className="mt-3 text-sm text-slate-500 md:text-base">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: static pill row — physics doesn't work well on narrow screens */}
        <div className="md:hidden mt-10 flex flex-wrap justify-center gap-2">
          {PILLS.map((pill) => (
            <div
              key={pill}
              className="flex items-center gap-2 rounded-full bg-[#00aa95] px-4 py-2 text-xs font-medium text-white shadow-md"
            >
              <span className="text-[9px] leading-none">♦</span>
              {pill}
            </div>
          ))}
        </div>

        {/* Desktop: Physics pills */}
        <div className="hidden md:block">
          <PhysicsPills />
        </div>

      </div>
    </section>
  )
}
