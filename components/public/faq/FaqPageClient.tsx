'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Minus } from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

interface FaqItem {
  question: string
  answer: string
  answerLink?: { text: string; href: string }
  category: string
}

const faqs: FaqItem[] = [
  { category: '計畫相關', question: '台大加速器和台大車庫有什麼差別？', answer: '台大加速器適合已有 MVP 或初期營收的成長期新創，為期十個月（3月至12月），提供深度業師一對一輔導、企業資源對接與募資機會，不限台大身分。台大車庫適合概念驗證至 MVP 階段的早期團隊，提供免費虛擬進駐與社群支持，以台大身分優先，特殊情況可個案評估。' },
  { category: '計畫相關', question: '計畫需要支付費用或出讓股權嗎？', answer: '台大車庫與台大加速器均為完全免費計畫，不收取任何費用，也不要求股權。台大創創中心以促進台大創業生態系為使命，不以營利為目的。', answerLink: { text: '前往台大捐款平台', href: 'https://my.ntu.edu.tw/donation2/donationFormTW.aspx?dit=88' } },
  { category: '計畫相關', question: '計畫為期多久？每年招募幾梯？', answer: '台大加速器與台大車庫均為每年一梯，計畫時間為 3 月至 12 月，共十個月。申請通常在每年 12 月至隔年 2 月開放，入選結果約 2 月底公布。' },
  { category: '計畫相關', question: '計畫期間需要全程進駐嗎？', answer: '不需要全程駐點。台大車庫與台大加速器均採虛擬進駐模式，不提供固定座位，也不要求每日出勤。學員以參加定期輔導會議與中心活動為主，另可依需求預約使用中心會議室與活動場地。' },
  { category: '計畫相關', question: '計畫結束後還能獲得什麼支持？', answer: '畢業團隊可持續參與中心的校友網絡活動、業師諮詢，以及台大天使會的募資機會。台大車庫畢業團隊享有台大加速器的優先申請資格。' },
  { category: '計畫相關', question: '什麼是企業垂直加速器？和一般加速器有何不同？', answer: '企業垂直加速器是台大創創中心與各大企業夥伴合作的專項加速計畫，累計已舉辦逾 27 期。由企業提出真實業務需求，新創團隊以解決方案回應，成功者可獲企業資源挹注、場域驗證或合作機會。' },
  { category: '計畫相關', question: '計畫聚焦哪些產業領域？', answer: '台大創創中心 2026 年四大聚焦領域為：AI 軟體（企業 AI、SaaS、資料基礎設施）、生技醫療（AI 診斷、精準醫療、醫材）、硬科技（半導體、先進製造、機器人、顯示技術）、創新商模（ESG、循環經濟、FinTech、社會創新）。' },
  { category: '申請相關', question: '申請需要準備哪些資料？', answer: '基本申請資料包括：團隊介紹（成員背景與分工）、產品或服務說明、目標市場與商業模式、目前進度與未來規劃。台大加速器申請建議附上 Pitch Deck。' },
  { category: '申請相關', question: '非台大背景的團隊可以申請嗎？', answer: '台大加速器完全開放，不限台大身分，任何具備技術或商模創新的團隊均可申請。台大車庫以台大在校生、校友或教職員組成的團隊為主，外部團隊可個案評估。' },
  { category: '申請相關', question: '申請之後，審核流程是什麼？', answer: '申請流程分四步：線上申請 → 書面審查 → 面試邀約（通過書審者） → 結果通知（面試後三週內）。', answerLink: { text: '前往提前登記申請', href: '/apply' } },
  { category: '申請相關', question: '每年入選幾個團隊？', answer: '台大車庫每年約錄取 20 個團隊，台大加速器每年約錄取 20 個團隊，合計每梯次約 40 支新創。名額有限，以確保每個團隊都能獲得充分的輔導資源。' },
  { category: '申請相關', question: '學生團隊可以在課業期間參加嗎？', answer: '可以。許多入選團隊成員仍在就讀中。計畫設計上具彈性，輔導會議與活動以不嚴重影響課業為原則。' },
  { category: '申請相關', question: '落選了可以再次申請嗎？', answer: '可以。落選並不影響後續梯次的申請資格。中心建議落選團隊關注書面回饋（若有提供）、持續推進產品進度後，在下一梯次重新提交申請。' },
  { category: '台大天使會', question: '什麼是 NTUTEC ANGELS 台大天使會？', answer: 'NTUTEC ANGELS 是台大創創中心於 2023 年成立的天使投資社群，匯聚 40+ 位天使會員（150+ 投資人網絡），每月定期舉辦天使例會，提供會員經過三段嚴格篩選的優質早期案源。' },
  { category: '台大天使會', question: '如何成為天使會會員？', answer: '有意加入者可透過官網填寫入會諮詢表單，或直接聯繫投資經理。中心將安排一對一諮詢，說明入會條件、年費結構與會員權益。台大天使會以質量為優先，名額有限。', answerLink: { text: '立即填寫入會申請表', href: '/angel-apply' } },
  { category: '台大天使會', question: '案件如何篩選？投資人能看到哪些資訊？', answer: '所有案件由投資經理逐一審閱，經初篩、面談評估後，撰寫完整盡調報告（市場分析、競爭格局、投資建議）。通過的案件上架月例會，會員可在專屬平台查閱六張資訊卡片與完整評估報告。' },
  { category: '台大天使會', question: '天使例會多久舉辦一次？', answer: '天使例會每月定期舉辦，由新創團隊進行 Pitch 與 Q&A。會員以個人資金直接投資，不受機構共投限制。' },
  { category: '台大天使會', question: '新創團隊要如何接觸台大天使會？', answer: '新創團隊可隨時透過官網投遞表單申請接觸台大天使會，無需事先參加台大加速器或台大車庫計畫。曾參與台大輔導計畫的校友團隊享有優先推薦資格。', answerLink: { text: '前往新創投遞頁面', href: '/pitch' } },
  { category: '企業合作', question: '企業如何與台大創創中心合作？', answer: '合作模式包括：企業垂直加速器（出題共創）、聯合活動（Demo Day、黑客松、論壇）、案源媒合（優先接觸特定領域新創）、諮詢服務（創新策略、開放式創新顧問）。', answerLink: { text: '了解企業合作方案', href: '/corporate' } },
  { category: '企業合作', question: '企業垂直加速器是什麼？如何參與？', answer: '企業垂直加速器由企業提出具體創新需求，中心負責召募並輔導對應的新創解題。合作企業可獲得優先技術接觸、共同開發機會，甚至投資或採購優先權。' },
  { category: '企業合作', question: '諮詢服務的內容是什麼？', answer: '中心提供企業創新策略諮詢，涵蓋開放式創新規劃、新創生態系建構、內部創業（Intrapreneurship）與 CVC（企業創投）策略。' },
  { category: '業師與輔導', question: '業師如何輔導新創？頻率是？', answer: '中心配對業師與入選新創進行每月一對一深度輔導，聚焦商業策略、市場進入、技術驗證或募資準備。業師均具備平均 20 年產業或創投經驗。' },
  { category: '業師與輔導', question: '如何成為台大創創中心業師？', answer: '若您具備創業、投資、技術或產業管理經驗，有意回饋創業生態系，歡迎填寫業師申請表或直接聯繫中心。業師遴選以與中心聚焦領域的契合度與實戰經驗為主要依據。' },
  { category: '聯絡與其他', question: '如何聯繫台大創創中心？', answer: '可透過官網聯絡表單、電子郵件（ntutec@ntutec.com）或直接前往台大創創中心辦公室洽詢。辦公時間為週一至週五 9:00–18:00。' },
  { category: '聯絡與其他', question: '台大創創中心的辦公室在哪裡？', answer: '台大創創中心位於台北市中正區思源街 18 號，台大水源校區卓越研究大樓 7 樓。輔導計畫採虛擬進駐模式，學員可預約使用中心會議室與活動場地。' },
  { category: '聯絡與其他', question: 'Demo Day 是什麼？', answer: 'Demo Day 是台大創創中心每年 12 月舉辦的年度成果展暨投資媒合活動，由當年梯次精選新創向投資人 Pitch，設有互動攤位與媒合機制。' },
  { category: '聯絡與其他', question: '台大創創中心有 Podcast 嗎？', answer: '有。TEC Talk 是台大創創中心的官方 Podcast，自 2021 年開播，邀請業師、知名創業者與產業專家分享創業經驗。可在 Firstory 及 Spotify 等主流平台收聽。' },
]

const categories = ['計畫相關', '申請相關', '台大天使會', '企業合作', '業師與輔導', '聯絡與其他']

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-[#e0ddd8]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="pr-4 font-semibold text-[#181614]">{item.question}</span>
        {isOpen ? <Minus size={16} className="shrink-0 text-[#00AA95]" /> : <Plus size={16} className="shrink-0 text-slate-400" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-relaxed text-slate-500">{item.answer}</p>
            {item.answerLink && (
              <Link href={item.answerLink.href} className="mb-6 inline-block text-sm font-semibold text-[#00AA95] hover:underline">
                {item.answerLink.text} →
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqPageClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('計畫相關')

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory)

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <motion.div
              className="border-r border-[#e0ddd8] py-24 pr-16"
              style={{
                backgroundImage: 'linear-gradient(to right, #e0ddd8 1px, transparent 1px)',
                backgroundSize: '25% 100%',
              }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">FAQ</p>
              <h1 className="text-5xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>常見問題</h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                關於計畫申請、天使投資、企業合作、業師輔導與其他常見疑問的完整解答。
              </p>
            </motion.div>
            <div className="py-24 pl-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">分類</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-[#00AA95] text-white'
                        : 'border border-[#e0ddd8] text-slate-500 hover:border-[#00AA95] hover:text-[#00AA95]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#00AA95]">{activeCategory}</p>
            {filteredFaqs.map((item, i) => {
              const globalIndex = faqs.indexOf(item)
              return (
                <AccordionItem
                  key={globalIndex}
                  item={item}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                />
              )
            })}
            <div className="border-t border-[#e0ddd8]" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[#e0ddd8]">
        <div className="mx-auto max-w-screen-xl px-8 py-20 text-center">
          <h3 className="mb-3 text-2xl font-bold text-[#181614]" style={{ fontFamily: "'Noto Serif TC', serif" }}>找不到答案？</h3>
          <p className="mb-8 text-slate-500">歡迎直接來信，我們將於 3 個工作日內回覆。</p>
          <a href="mailto:ntutec@ntutec.com" className="inline-block rounded-full bg-[#00AA95] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f7d]">
            寄信給我們
          </a>
        </div>
      </section>
    </main>
  )
}
