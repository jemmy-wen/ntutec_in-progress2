'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const HIGHLIGHTS = [
  'Demo Day 2025 投資人到場 74 位',
  '歷屆校友最高單筆募資 NT$1 億+',
  '企業垂直加速器累計 27 期',
]

function useCountUp(target: number, duration = 1.6, start = false) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [start, target, duration])

  return value
}

interface StatCardProps {
  value: number
  suffix: string
  label: string
  bg: string
  textColor: string
  subColor: string
  labelColor: string
  delay?: number
}

function StatCard({ value, suffix, label, bg, textColor, subColor, labelColor, delay = 0 }: StatCardProps) {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 1.8, triggered)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col justify-between rounded-[20px] p-7 ${bg}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${labelColor}`}>
        {label.split('|')[0]}
      </p>
      <div>
        <div className="flex items-baseline gap-1">
          <span className={`text-6xl font-bold leading-none lg:text-7xl ${textColor}`}>
            {count}
          </span>
          {suffix && (
            <span className={`text-4xl font-bold ${subColor}`}>{suffix}</span>
          )}
        </div>
        <p className={`mt-2 text-sm ${subColor}`}>{label.split('|')[1]}</p>
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-[#F6F5F1] py-16 md:py-24">
      <div className="container">

        {/* Section label */}
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Impact
        </motion.p>

        {/* Main bento grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">

          {/* Headline card — col 1-5 */}
          <motion.div
            className="flex flex-col justify-between rounded-[20px] bg-[#0A192F] p-8 md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                數字，<br />見證我們<br />的影響力。
              </h2>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {HIGHLIGHTS.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[8px] text-teal">◆</span>
                  <p className="text-xs leading-relaxed text-white/60">{h}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 2×2 stat grid — col 6-12 */}
          <div className="grid grid-cols-2 gap-3 md:col-span-7">
            <StatCard
              value={600} suffix="+" label="Startups|支累計輔導新創"
              bg="bg-teal" textColor="text-white" subColor="text-white/75" labelColor="text-white/60"
              delay={0.1}
            />
            <StatCard
              value={13} suffix="" label="Years|年深耕台大創業生態"
              bg="bg-white" textColor="text-[#0A192F]" subColor="text-slate-500" labelColor="text-slate-400"
              delay={0.15}
            />
            <StatCard
              value={35} suffix="" label="Partners|家企業合作夥伴"
              bg="bg-[#F6F5F1] border border-stone-200" textColor="text-teal" subColor="text-slate-500" labelColor="text-slate-400"
              delay={0.2}
            />
            <StatCard
              value={127} suffix="+" label="Investors|位投資人與天使網絡"
              bg="bg-[#0A192F]" textColor="text-white" subColor="text-white/60" labelColor="text-white/40"
              delay={0.25}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
