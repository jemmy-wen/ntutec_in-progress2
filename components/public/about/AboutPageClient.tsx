'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const hi3Model = [
  {
    key: 'H — Incubation',
    title: '輔導培育',
    en: 'Incubation',
    description: '透過輔導經理陪跑、業師一對一諮詢、專業課程（商業模式、募資、法務），陪伴早期創業團隊從構想走到原型驗證。',
  },
  {
    key: 'I — Integration',
    title: '對接整合',
    en: 'Integration',
    description: '銜接台大各院系資源、企業垂直加速器、EiMBA 創業學程，連結政府計畫（FITI、TTA）與國際夥伴，讓新創快速接軌真實場域。',
  },
  {
    key: 'I — Ignition',
    title: '加速起飛',
    en: 'Ignition',
    description: '舉辦 Demo Day（74 位投資人到場，2025）、閉門投資媒合、台大天使會，為準備好的團隊引燃第一桶資本，走向市場起飛。',
  },
]

const alumniHighlights = [
  {
    name: '配客嘉 PackAge+',
    tag: '循環包裝 × ESG',
    result: 'Pre-A NT$5,200 萬',
    detail: '獲國發基金、中信、彰銀入股，合作 200+ 企業，持續拓展東南亞市場。',
  },
  {
    name: '艾斯創生醫 Astron Medtech',
    tag: '醫療器材 × 國際',
    result: '募資 USD 250 萬（2024）',
    detail: 'SelectUSA MedTech 冠軍，NBA 球隊指定名醫等國際骨科權威投資。',
  },
  {
    name: 'Botbonnie',
    tag: '聊天機器人 × AI',
    result: '被 Appier 收購（2023）',
    detail: '創辦人為台大創創歷屆校友。最終被 Appier（東京上市的 AI 公司）收購。',
  },
]

const milestones = [
  { year: '2013', title: '台大車庫（NTU Garage）啟動', description: '於台大水源校區設立 NTU Garage，作為學生創業共享空間，開啟台大創業生態系的基礎建設。' },
  { year: '2014', title: '台大創創中心正式成立', description: '由臺灣大學以校級單位正式設立創創中心，整合校內創業資源，推動校園創新創業生態系。' },
  { year: '2016', title: 'NTU Challenge 校內創業競賽', description: '與創新設計學院合作舉辦 NTU Challenge，結合教育、業師輔導與競賽，發掘校園創業潛力。' },
  { year: '2017', title: '台大加速器（NTU Accelerator）啟動', description: '推出台大加速器，為已有原型的新創團隊提供市場驗證、商業模式迭代與募資對接資源。' },
  { year: '2019', title: '企業垂直加速器首創', description: '首創企業垂直加速器，由企業出題、新創解題，累計與 35 家國內外企業深度合作。' },
  { year: '2020', title: '企業創新諮詢服務', description: '推出企業開放式創新諮詢服務（Consulting），協助中大型企業導入新創思維與敏捷創新方法論。' },
  { year: '2022', title: 'Co-Creation Sandbox', description: '推出 Co-Creation Sandbox 會員制度，為新創提供安全的產品與市場驗證場域。' },
  { year: '2026', title: '四大聚焦領域與台大學研技術', description: '聚焦 AI 軟體、生技醫療、硬科技與創新商模四大領域，攜手台大創業生態系夥伴深化具有技術壁壘的新創育成。' },
]

export default function AboutPageClient() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">About NTUTEC</p>
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              台大創創中心<br />的故事
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-500">
              13 年 · 600+ 新創 · 35 家企業夥伴 · 150+ 投資人網絡——台大創業生態系的完整版圖。
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/apply" className="rounded-full bg-[#00AA95] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
              啟動創業之旅
            </Link>
            <Link href="/corporate" className="text-sm text-slate-400 hover:text-[#00AA95] transition-colors">
              企業合作 →
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="relative w-1/2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <Image src="/images/events/opening-2026-group.jpg" alt="台大創創中心" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#181614]/10" />
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-2 divide-x divide-[#e0ddd8] md:grid-cols-4">
            {[
              { value: '600+', label: '輔導新創團隊', sub: '2013 年至今' },
              { value: '13', label: '年深耕', sub: 'Since 2013' },
              { value: '35+', label: '企業夥伴', sub: '垂直加速器合作' },
              { value: '150+', label: '投資人網絡', sub: '含 40+ 天使會員' },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="py-12 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="text-5xl font-bold text-[#181614]">{s.value}</span>
                <p className="mt-2 text-xs text-slate-400">{s.label}</p>
                <p className="text-xs text-slate-300">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <motion.div
              className="border-r border-[#e0ddd8] py-24 pr-16"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Our Mission</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                使命與願景
              </h2>
              <div className="mt-8 flex items-center gap-3">
                <Image src="/images/partners/ntu.svg" alt="NTU" width={32} height={32} className="h-8 w-auto" />
                <p className="text-xs text-slate-400">國立臺灣大學創意創業中心 — 校級單位</p>
              </div>
            </motion.div>
            <motion.div
              className="py-24 pl-16"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="mb-6 text-lg leading-relaxed text-slate-500">
                台大創創中心是台大創業生態系的實戰基地，以「連結台大、連結產業、連結資本」三個連結為核心，將台大最好的技術能量與人才，轉化為可投資的新創公司。
              </p>
              <p className="mb-6 text-lg leading-relaxed text-slate-500">
                <strong className="text-[#181614]">13 年</strong>來，我們累計輔導逾 <strong className="text-[#181614]">600+</strong> 支新創團隊。透過台大加速器、台大車庫、企業垂直加速器（<strong className="text-[#181614]">27 期</strong>、<strong className="text-[#181614]">35 家企業</strong>）與台大天使會（<strong className="text-[#181614]">150+</strong> 投資人網絡），支持新創從技術驗證走入市場。
              </p>
              <p className="text-lg leading-relaxed text-slate-500">
                我們的願景是成為臺灣創業生態圈受新創信賴的校園創業加速器，以 HI3 模型系統性支持新創，深耕台灣 13 年的大學創業基地。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HI3 Model */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Our Approach</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                HI3 培育模型
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500">
                以人為本（Human-centric），透過三階段系統性支持，陪伴新創從構想走向市場起飛。
              </p>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {hi3Model.map((item, i) => (
                <motion.div
                  key={item.key}
                  className="py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00AA95]">{item.key}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#181614]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni highlights */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="border-r border-[#e0ddd8] py-24 pr-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Alumni Impact</p>
              <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                校友成功案例
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500">
                從台大車庫與加速器起步，這些團隊已完成募資、收購或國際市場驗證。
              </p>
              <Link href="/alumni" className="mt-8 inline-block text-sm font-semibold text-[#00AA95] hover:underline">
                查看所有校友 →
              </Link>
            </div>
            <div className="divide-y divide-[#e0ddd8] py-24 pl-16">
              {alumniHighlights.map((alumni, i) => (
                <motion.div
                  key={alumni.name}
                  className="py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                >
                  <span className="inline-block rounded-full bg-[#e8f7f5] px-2.5 py-0.5 text-xs font-semibold text-[#00AA95]">{alumni.tag}</span>
                  <h3 className="mt-2 text-lg font-bold text-[#181614]">{alumni.name}</h3>
                  <p className="mt-1 text-2xl font-bold text-[#00AA95]">{alumni.result}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{alumni.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-[#e0ddd8] bg-[#f9f8f6]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">History</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>發展歷程</h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px bg-[#e0ddd8]" />
            <div className="space-y-16">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="relative flex"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                >
                  <div className="absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-[#00AA95] ring-4 ring-[#f9f8f6]" />
                  {i % 2 === 0 ? (
                    <>
                      <div className="w-1/2 pr-12 text-right">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00AA95]">{m.year}</span>
                        <h4 className="mt-1 font-bold text-[#181614]">{m.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{m.description}</p>
                      </div>
                      <div className="w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="w-1/2" />
                      <div className="w-1/2 pl-12">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00AA95]">{m.year}</span>
                        <h4 className="mt-1 font-bold text-[#181614]">{m.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{m.description}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-24">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">2026 開幕式現場</p>
            <h2 className="text-4xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>2026 輔導計畫開幕式</h2>
            <p className="mt-4 text-slate-500">2026 年 3 月，第一批輔導團隊在台大水源校區正式啟動。</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-2">
              <Image src="/images/events/opening-2026-group.jpg" alt="2026 開幕式大合照" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 100vw, 66vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/images/events/opening-2026-vincent.jpg" alt="林文欽致詞" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="33vw" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/images/events/opening-2026-audience.jpg" alt="全場聆聽" fill className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/images/events/opening-2026-01.jpg" alt="小組討論" fill className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:col-span-2 lg:col-span-1">
              <Image src="/images/events/opening-2026-03.jpg" alt="業師分享" fill className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">Our People</p>
          <h2 className="mb-4 text-3xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>認識我們的團隊</h2>
          <p className="mx-auto mb-8 max-w-xl text-slate-500">投資經理、輔導經理——每位成員都是新創的第一線戰友，不只給建議，更一起把關鍵路上每個節點走完。</p>
          <Link href="/teams" className="inline-block rounded-full border border-[#e0ddd8] px-7 py-3 text-sm font-semibold text-[#181614] transition-colors hover:border-[#00AA95] hover:text-[#00AA95]">
            查看完整團隊
          </Link>
        </div>
      </section>
    </main>
  )
}
