'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Target, RocketLaunch, Buildings, Flask } from '@phosphor-icons/react'
import MentorFilterTabs from '@/components/public/MentorFilterTabs'
import { MENTORS_STATIC, type StaticMentor } from '@/lib/data/mentors-static'

const EASE = [0.22, 1, 0.36, 1] as const

const CATEGORY_META: Record<string, {
  key: string; title: string; subtitle: string
  Icon: React.ComponentType<{ size?: number; weight?: 'duotone' | 'regular' | 'bold'; className?: string }>
  description: string; display_count?: string
}> = {
  vc: {
    key: 'vc', title: '投資人', subtitle: 'VC Partners', Icon: Target, display_count: '10+',
    description: '現職或前創投 / 天使 / 加速器主理人。能投資、能介紹 LP、能提供融資策略。',
  },
  founder: {
    key: 'founder', title: '創業家', subtitle: 'Serial Founders', Icon: RocketLaunch, display_count: '10+',
    description: '有 exit 經驗或正在經營第二、第三家公司的實戰派。踩過的坑都能告訴你。',
  },
  exec: {
    key: 'exec', title: '企業高管', subtitle: 'Corporate Executives', Icon: Buildings, display_count: '10+',
    description: '大企業 C-level / VP / 集團策略主管。打開客戶、通路、策略合作的入口。',
  },
  expert: {
    key: 'expert', title: '產業專家', subtitle: 'Domain Experts', Icon: Flask, display_count: '5+',
    description: '深度技術 / 法律 / 財會 / 營運 know-how。特定領域的顧問深度。',
  },
}

const CATEGORY_ORDER = ['vc', 'founder', 'exec', 'expert']

function MentorCard({ mentor }: { mentor: StaticMentor }) {
  const initial = mentor.name.charAt(0)
  const displayTitle = mentor.highlight || mentor.title
  const isFacebook = mentor.social_url?.includes('facebook.com')

  return (
    <div className="group relative flex flex-col overflow-hidden border border-[#e0ddd8] bg-white">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f9f8f6]">
        {mentor.photo_url ? (
          <Image
            src={mentor.photo_url}
            alt={`${mentor.name}${mentor.title ? `，${mentor.title}` : ''}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#e8f7f5]">
            <span className="text-5xl font-bold text-[#00AA95]/30">{initial}</span>
          </div>
        )}
        {mentor.is_new_2026 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#00AA95] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
            2026 新任
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-[#181614]">{mentor.name}</h3>
          {mentor.social_url && (
            <a
              href={mentor.social_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${mentor.name} ${isFacebook ? 'Facebook' : 'LinkedIn'}`}
              className="shrink-0 rounded p-1 text-slate-300 transition-colors hover:text-[#00AA95]"
            >
              {isFacebook ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.046c.431-.818 1.484-1.681 3.054-1.681 3.266 0 3.867 2.149 3.867 4.944v6.627zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.556 13.019H3.78V9h3.113v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )}
            </a>
          )}
        </div>
        {displayTitle && (
          <p className="mt-1 text-xs leading-relaxed text-slate-400 line-clamp-2">{displayTitle}</p>
        )}
      </div>
    </div>
  )
}

export default function MentorsPageClient() {
  const allMentors = MENTORS_STATIC
  const grouped: Record<string, StaticMentor[]> = {}
  for (const m of allMentors) {
    if (!grouped[m.category]) grouped[m.category] = []
    grouped[m.category].push(m)
  }

  const categories = CATEGORY_ORDER
    .map((key) => ({ ...CATEGORY_META[key], mentors: grouped[key] || [] }))
    .filter((cat) => cat.mentors.length > 0)

  const totalActive = allMentors.length

  return (
    <main>
      {/* Hero */}
      <section className="flex border-b border-[#e0ddd8]" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          className="relative flex w-1/2 flex-col justify-between border-r border-[#e0ddd8] px-12 py-16"
          style={{ backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)', backgroundSize: '25% 100%' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Mentor Network</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              業師陣容
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              歷年累計 80+ 位業師，{totalActive}+ 位活躍陪跑 2026，涵蓋投資人、創業家、企業高管與產業專家，一對一深度輔導每支新創。
            </p>
          </div>
          <div className="flex items-center gap-8">
            {[
              { num: '80+', label: '歷年業師累計' },
              { num: `${totalActive}+`, label: '2026 陪跑業師' },
              { num: '20年+', label: '平均產業深耕' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-[#181614]">{s.num}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="relative w-1/2 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <Image src="/images/events/opening-2026-mentoring.jpg" alt="業師輔導現場" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/20" />
        </motion.div>
      </section>

      {/* Category overview */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-20">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Mentor Categories</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>四大業師類型</h2>
            <p className="mt-4 text-slate-500">依背景類型劃分，幫助新創快速找到最適合的諮詢對象</p>
          </div>
          <div className="grid gap-px bg-[#e0ddd8] md:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.key}
                className="bg-[#f9f8f6] p-8 text-center"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
              >
                <div className="mb-3 flex justify-center text-[#00AA95]">
                  <cat.Icon size={32} weight="duotone" />
                </div>
                <p className="text-2xl font-bold text-[#181614]">{cat.display_count ?? cat.mentors.length}</p>
                <p className="mt-1 text-sm font-semibold text-[#181614]">{cat.title}</p>
                <p className="mt-1 text-xs text-slate-400">{cat.subtitle}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoring photos */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Mentoring in Action</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>業師輔導現場</h2>
            <p className="mt-4 text-slate-500">一對一深度諮詢，從策略到執行，業師全程陪跑。</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/events/opening-2026-mentoring.jpg" alt="業師輔導現場" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="50vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/events/opening-2026-01.jpg" alt="業師深度討論" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Mentor filter tabs + grids */}
      <MentorFilterTabs
        categories={categories.map((cat) => ({
          key: cat.key,
          title: cat.title,
          subtitle: cat.subtitle,
          iconName: cat.key,
          mentorCount: cat.mentors.length,
        }))}
      >
        {categories.map((cat, idx) => (
          <section
            key={cat.key}
            id={cat.key}
            className={`border-b border-[#e0ddd8] scroll-mt-20 ${idx % 2 === 0 ? '' : 'bg-[#f9f8f6]'}`}
          >
            <div className="mx-auto max-w-screen-xl px-8">
              <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                <div className="border-r border-[#e0ddd8] py-16 pr-16">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">{cat.subtitle}</p>
                  <div className="mb-3 flex items-center gap-3 text-[#00AA95]">
                    <cat.Icon size={36} weight="duotone" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    {cat.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">{cat.display_count ?? cat.mentors.length} 位業師</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">{cat.description}</p>
                </div>
                <div className="py-16 pl-16">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {cat.mentors.map((mentor, i) => (
                      <motion.div
                        key={mentor.slug}
                        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ duration: 0.3, ease: EASE, delay: i * 0.04 }}
                      >
                        <MentorCard mentor={mentor} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </MentorFilterTabs>

      {/* About mentor matching */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-16 text-center">
          <div className="mx-auto max-w-2xl rounded border border-[#e0ddd8] bg-white p-8">
            <p className="text-sm font-semibold text-[#181614]">關於業師陣容</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              本頁呈現 NTUTEC 歷年業師累計名單（2025–2026）。業師背景分類依其主要身份判斷，部分業師可能具備跨類型經驗。業師配對由中心依新創團隊需求與業師專長安排，非公開申請制。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[#e0ddd8] bg-[#181614]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Join Us</p>
          <h2 className="mb-4 text-4xl font-bold text-white" style={{ fontFamily: "'Noto Serif TC', serif" }}>與頂尖業師並肩創業</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/60">
            申請台大加速器或台大車庫，通過錄取後由中心依需求為你媒合最適合的業師。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="rounded-full bg-[#00AA95] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              立即申請輔導計畫
            </Link>
            <a href="/contact?type=mentor" className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10">
              有意成為業師？洽詢中心
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
