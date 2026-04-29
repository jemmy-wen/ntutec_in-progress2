'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

/* ── count-up hook ─────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.6, start = false) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1000 / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [start, target, duration])
  return value
}

/* ── single stat item ──────────────────────────────────────────────── */
interface StatItemProps {
  value: number
  suffix?: string
  unit: string
  label: string
  delay?: number
}

function StatItem({ value, suffix = '', unit, label, delay = 0 }: StatItemProps) {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 1.6, triggered)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); io.unobserve(el) } },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 數字 + 符號 + 單位 */}
      <div className="flex items-baseline gap-1 leading-none">
        <span className="text-[56px] font-bold tabular-nums text-[#1a1a1a]">
          {count}
        </span>
        {suffix && (
          <span className="text-[28px] font-bold text-[#1a1a1a]">{suffix}</span>
        )}
        <span className="text-[15px] text-[#888] ml-1">{unit}</span>
      </div>
      {/* 標籤 */}
      <p className="text-[13px] text-[#888]">{label}</p>
    </motion.div>
  )
}

/* ── section ───────────────────────────────────────────────────────── */
const STATS: StatItemProps[] = [
  { value: 600, suffix: '+', unit: '支', label: '新創團隊加速'     },
  { value: 350, suffix: '+', unit: '位', label: '投資人網路'       },
  { value: 35,  suffix: '+', unit: '家', label: '企業夥伴'         },
  { value: 13,               unit: '年', label: '深耕台大創業生態' },
]

export default function StatsSection() {
  return (
    <section className="bg-white py-14 md:py-18">
      <div className="container mx-auto px-8 lg:px-16">

        {/* 水平分隔線 */}
        <div className="border-t border-[#e5e5e5] mb-12" />

        <div className="flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-0">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-0">
              <StatItem {...s} delay={i * 0.1} />
              {i < STATS.length - 1 && (
                <div className="hidden sm:block w-px h-12 bg-[#e0e0e0] mx-8 lg:mx-12 self-center" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
