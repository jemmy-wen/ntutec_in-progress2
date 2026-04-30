'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import TrackClick from '@/components/TrackClick'
import cohort from '@/data/cohort_2026.json'

const EASE = [0.22, 1, 0.36, 1] as const

interface Team {
  name: string
  display_name: string
  contact_title: string | null
  industry_sectors: string[] | null
  business_model: string[] | null
  target_market: string | null
  product_description: string | null
  ntu_identity: string | null
  stage: string | null
  website_url: string | null
}

const teams = cohort.teams as Team[]

function ExternalIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" />
      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" />
    </svg>
  )
}

export default function StartupsPageClient() {
  const ntuCount = teams.filter((t) => t.ntu_identity && t.ntu_identity !== '無').length
  const stageCount = teams.filter((t) => t.stage).length

  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">2026 Cohort</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              2026 年度<br />新創團隊
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              {teams.length} 個正在輔導的新創團隊，涵蓋 AI 軟體、生技醫療、硬科技與創新商模四大聚焦領域。
            </p>
          </div>
          <div className="flex items-center gap-8">
            {[
              { num: `${teams.length}`, label: '輔導新創團隊' },
              { num: `${ntuCount}`, label: '具台大身份' },
              { num: `${stageCount}`, label: '已進入加速器' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-[#181614]">{s.num}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="relative w-1/2 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <Image src="/images/photos/ntu-beauty-5.jpg" alt="2026 年度新創團隊" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/30" />
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-3 divide-x divide-[#e0ddd8]">
            {[
              { value: String(teams.length), unit: '個', label: '輔導新創團隊', sub: '2026 年度梯次' },
              { value: String(ntuCount), unit: '個', label: '具台大身份', sub: '學生 / 校友 / 教職員' },
              { value: String(stageCount), unit: '個', label: '已進入加速器', sub: '通過階段審核' },
            ].map((s) => (
              <motion.div key={s.label} className="py-12 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}>
                <span className="text-5xl font-bold text-[#181614]">{s.value}</span>
                <span className="text-xl font-semibold text-[#00AA95]">{s.unit}</span>
                <p className="mt-2 text-sm font-semibold text-[#181614]">{s.label}</p>
                <p className="mt-1 text-xs text-slate-400">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams list */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">2026 Teams</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>所有新創團隊</h2>
          </div>
          <div className="grid gap-px bg-[#e0ddd8] md:grid-cols-2">
            {teams.map((team, i) => (
              <motion.div
                key={team.name}
                className="bg-white p-8"
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.35, ease: EASE, delay: (i % 4) * 0.06 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#181614]">
                      {team.website_url ? (
                        <a href={team.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AA95] hover:underline underline-offset-2 inline-flex items-center gap-1.5">
                          {team.display_name}<ExternalIcon />
                        </a>
                      ) : team.display_name}
                    </h3>
                    {team.display_name !== team.name && (
                      <p className="mt-0.5 text-xs text-slate-400">{team.name}</p>
                    )}
                  </div>
                  {team.stage && (
                    <span className="shrink-0 rounded-full bg-[#e8f7f5] px-2.5 py-0.5 text-xs font-medium text-[#00AA95]">
                      {team.stage}
                    </span>
                  )}
                </div>

                {team.product_description && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">{team.product_description}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {team.ntu_identity && team.ntu_identity !== '無' && (
                    <span className="rounded-full bg-[#e8f7f5] px-2.5 py-0.5 text-xs font-medium text-[#00AA95]">
                      台大 {team.ntu_identity.replace(/^有[，,]?\s*/, '')}
                    </span>
                  )}
                  {team.industry_sectors?.map((sector) => (
                    <span key={sector} className="rounded-full bg-[#f9f8f6] px-2.5 py-0.5 text-xs text-[#181614]">
                      {sector}
                    </span>
                  ))}
                  {team.business_model?.map((bm) => (
                    <span key={bm} className="rounded-full border border-[#e0ddd8] px-2.5 py-0.5 text-xs text-slate-400">
                      {bm}
                    </span>
                  ))}
                  {team.target_market && (
                    <span className="rounded-full border border-[#e0ddd8] px-2.5 py-0.5 text-xs text-slate-400">
                      {team.target_market}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">
            * 以上為 2026 年度正在輔導的新創團隊。資料來源：台大創創中心 2026 業師健診媒合系統。
          </p>
        </div>
      </section>

      {/* Three-way CTA */}
      <section className="relative overflow-hidden border-b border-[#e0ddd8]" style={{ minHeight: '420px' }}>
        <Image src="/images/photos/ntu-beauty-5.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0A192F]/80" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-8 py-20">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Get Involved</p>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>加入台大新創生態系</h2>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            <div className="bg-white/5 p-10 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">For Startups</p>
              <h3 className="mb-3 text-xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>我也想加入</h3>
              <p className="mb-6 text-sm text-white/60">申請 2027 梯次台大加速器或台大車庫</p>
              <TrackClick eventName="cta_apply_click" eventParams={{ location: 'startups_page' }}>
                <Link href="/apply" className="inline-block rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10">
                  提前登記申請
                </Link>
              </TrackClick>
            </div>
            <div className="bg-white/5 p-10 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">For Investors</p>
              <h3 className="mb-3 text-xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>我是投資人</h3>
              <p className="mb-6 text-sm text-white/60">了解台大天使會，參與早期案件媒合</p>
              <Link href="/angel" className="inline-block rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10">
                了解台大天使會
              </Link>
            </div>
            <div className="bg-white/5 p-10 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">For Enterprises</p>
              <h3 className="mb-3 text-xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>我是企業</h3>
              <p className="mb-6 text-sm text-white/60">探索企業垂直加速器與新創合作機會</p>
              <Link href="/corporate" className="inline-block rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10">
                探索企業合作
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
