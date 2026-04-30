'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const leadership = [
  {
    initials: '莊',
    name: '莊裕澤',
    title: '中心主任',
    en: 'Director',
    bio: '台大資訊管理學系暨研究所專任教授，具多年新創育成經驗。主任代表校方監督中心營運，負責對校層級的治理、財務、人事與組織規章。',
    photo: '/images/team/chuang-yuze.jpg',
  },
  {
    initials: '林',
    name: '林文欽 Vincent',
    title: '執行長 CEO',
    en: 'Chief Executive Officer',
    bio: '前騰訊副總經理、京東商城副總裁，台大 EMBA。負責中心日常營運、策略方向與投資決策，主導台大天使會與新創輔導整體規劃。',
    photo: '/images/team/vincent-lin.png',
  },
]

const team = [
  {
    initials: '陳',
    name: '陳盈盈 Yingying',
    title: '資深經理',
    en: 'Senior Manager',
    focus: '硬科技 & 先進製造組',
    bio: '主責加速器、企業垂直加速器與中心行政營運。輔導小組帶領硬科技與先進製造組，串接企業合作夥伴資源。',
    photo: '/images/brand/ntutec-icon-teal.png',
  },
  {
    initials: '江',
    name: '江旻壕 Howard',
    title: '投資經理',
    en: 'Investment Manager',
    focus: '生技醫療組',
    bio: '主責台大天使會與案源篩選評估，協同企業垂直加速器。輔導小組帶領生技醫療組，負責投資人關係經營與案源評估。',
    photo: '/images/brand/ntutec-icon-teal.png',
  },
  {
    initials: '許',
    name: '許瀞之 Raven',
    title: '輔導經理',
    en: 'Program Manager',
    focus: '創新商模組',
    bio: '主責台大車庫與整體輔導計畫設計，含必修課程規劃。輔導小組帶領創新商模組，打造新創團隊的成長路徑。',
    photo: '/images/brand/ntutec-icon-teal.png',
  },
  {
    initials: '楊',
    name: '楊智堯 Neil',
    title: '營運經理',
    en: 'Operations Manager',
    focus: 'AI 軟體組',
    bio: '主責對外行銷、活動企劃與校友關懷。輔導小組帶領 AI 軟體組，連結校友網絡與生態系。',
    photo: '/images/brand/ntutec-icon-teal.png',
  },
]

export default function TeamPageClient() {
  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{
            backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)',
            backgroundSize: '25% 100%',
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Our Team</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              執行團隊
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              結合學術視野、產業經驗與創投背景，全力支持每一支新創團隊的成長。
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]"
          >
            聯繫輔導經理
          </Link>
        </motion.div>
        <motion.div
          className="relative w-1/2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <Image src="/images/events/opening-2026-group.jpg" alt="NTUTEC 團隊" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* Leadership section */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Leadership</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                中心領導
              </h2>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {leadership.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="flex items-start gap-6 py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    <Image src={member.photo} alt={member.name} fill className="object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00AA95]">{member.en}</p>
                    <h3 className="mt-1 text-xl font-bold text-[#181614]">{member.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">{member.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Core Team</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                核心團隊
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500">
                四位經理依四大聚焦領域分工，分別帶領 AI 軟體、生技醫療、硬科技與創新商模輔導小組。
              </p>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f7f5] text-lg font-bold text-[#00AA95]">
                      {member.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-[#181614]">{member.name}</h3>
                        <span className="rounded-full bg-[#e8f7f5] px-2.5 py-0.5 text-xs font-medium text-[#00AA95]">{member.focus}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-400">{member.title} · {member.en}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Contact</p>
          <h2 className="mb-4 text-3xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            有任何問題？
          </h2>
          <p className="mb-8 text-slate-500">歡迎聯繫我們的輔導團隊，我們將盡快回覆。</p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-[#00AA95] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]"
          >
            聯繫輔導經理
          </Link>
        </div>
      </section>
    </main>
  )
}
