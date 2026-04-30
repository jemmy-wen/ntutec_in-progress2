'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { VINCENT_ALUMNI, CATEGORY_META } from '@/data/vincent-alumni'

const EASE = [0.22, 1, 0.36, 1] as const

const categoryOrder = ['edu', 'enterprise', 'sustainability', 'web3', 'health'] as const

const alumniByCategory = categoryOrder.map((cat) => ({
  category: cat,
  meta: CATEGORY_META[cat],
  alumni: VINCENT_ALUMNI.filter((a) => a.category === cat),
}))

function ExternalIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" />
      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" />
    </svg>
  )
}

export default function AlumniPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <motion.div
              className="border-r border-[#e0ddd8] py-24 pr-16"
              style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Success Stories</p>
              <h1 className="text-5xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>成功校友</h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                13 年來，逾 600 支團隊從台大起步。台大創業生態系累計公開募資超過 NT$20 億，以下列舉部分代表校友，每項里程碑皆附公開資料來源。
              </p>
            </motion.div>
            <motion.div
              className="py-24 pl-16"
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">亮點數據</p>
              <p className="mb-6 text-xs text-slate-400">※ 以下數據均為歷屆校友於畢業後在市場上的公開里程碑，資料來源可追溯外部公開媒體報導。</p>
              <div className="grid grid-cols-2 gap-px bg-[#e0ddd8]">
                {[
                  { number: '600+', label: '歷年輔導新創團隊' },
                  { number: '13年', label: '台大創業生態系深耕' },
                  { number: 'NT$20億+', label: '歷屆校友累計公開募資' },
                  { number: '5', label: '涵蓋領域' },
                ].map((s) => (
                  <div key={s.label} className="bg-white p-6 text-center">
                    <p className="text-2xl font-bold text-[#00AA95]">{s.number}</p>
                    <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alumni by category */}
      {alumniByCategory.map(({ category, meta, alumni }, catIdx) => {
        if (alumni.length === 0) return null
        return (
          <section key={category} className={`border-b border-[#e0ddd8] ${catIdx % 2 === 1 ? 'bg-[#f9f8f6]' : ''}`}>
            <div className="mx-auto max-w-screen-xl px-8">
              <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                <div className="border-r border-[#e0ddd8] py-24 pr-16">
                  <span className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold ${meta.color}`}>{meta.label}</span>
                  <h2 className="mt-4 text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    {meta.label}新創
                  </h2>
                  <p className="mt-4 text-slate-400 text-sm">{alumni.length} 間代表校友</p>
                </div>
                <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
                  {alumni.map((alumnus, i) => (
                    <motion.div
                      key={alumnus.name}
                      className="py-8 first:pt-0 last:pb-0"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-[#181614]">
                            {alumnus.companyUrl ? (
                              <a href={alumnus.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AA95] hover:underline underline-offset-2">
                                {alumnus.name}
                              </a>
                            ) : alumnus.name}
                          </h3>
                          {alumnus.nameEn && <p className="text-xs text-slate-400">{alumnus.nameEn}</p>}
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">{alumnus.batchYear} 梯</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        <span className="font-medium text-slate-600">{alumnus.founder}</span>
                        {' · '}{alumnus.founderTitle}{' · '}{alumnus.sector}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-500">{alumnus.highlight}</p>
                      {alumnus.sources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {alumnus.sources.map((source) => (
                            <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#00AA95] hover:underline">
                              {source.label}<ExternalIcon />
                            </a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Join Us</p>
          <h2 className="mb-4 text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>成為下一個成功校友</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-slate-500">加入台大加速器或台大車庫，獲得業師輔導、資金媒合與生態系支持。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="rounded-full bg-[#00AA95] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              成為下一個里程碑案例
            </Link>
            <Link href="/programs" className="rounded-full border border-[#e0ddd8] px-8 py-3.5 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">
              了解輔導計畫
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
