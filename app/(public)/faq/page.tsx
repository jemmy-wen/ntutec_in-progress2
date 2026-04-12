"use client";

import { useState } from "react";
import PageHero from "@/components/public/PageHero";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  // ── 計畫相關 ──────────────────────────────────────────────────────────
  {
    category: "計畫相關",
    question: "台大加速器和台大車庫有什麼差別？",
    answer:
      "台大加速器適合已有 MVP 或初期營收的成長期新創，為期十個月（3月至12月），提供深度業師一對一輔導、企業資源對接與募資機會，不限台大身分。台大車庫適合概念驗證至 MVP 階段的早期團隊，提供免費共創空間與社群支持，以台大身分優先，特殊情況可個案評估。",
  },
  {
    category: "計畫相關",
    question: "計畫需要支付費用或出讓股權嗎？",
    answer:
      "不需要。台大車庫與台大加速器均為免費計畫，不收取任何費用，也不要求股權。台大創創中心以促進台大創業生態系為使命，不以營利為目的。",
  },
  {
    category: "計畫相關",
    question: "計畫為期多久？每年招募幾梯？",
    answer:
      "台大加速器與台大車庫均為每年一梯，計畫時間為 3 月至 12 月，共十個月。申請通常在每年 12 月至隔年 2 月開放，入選結果約 2 月底公布。",
  },
  {
    category: "計畫相關",
    question: "計畫期間需要全程進駐嗎？",
    answer:
      "台大車庫提供實體共創空間，鼓勵日常進駐，但不強制全程駐點。台大加速器則以定期輔導會議與活動出席為主，不要求全天候進駐，彈性配合創業團隊的節奏。",
  },
  {
    category: "計畫相關",
    question: "計畫結束後還能獲得什麼支持？",
    answer:
      "畢業團隊可持續參與中心的校友網絡活動、業師諮詢，以及天使投資俱樂部的募資機會。台大車庫畢業團隊享有台大加速器的優先申請資格。我們也長期追蹤校友成長，協助對接創投與企業合作機會。",
  },
  {
    category: "計畫相關",
    question: "什麼是企業垂直加速器？和一般加速器有何不同？",
    answer:
      "企業垂直加速器是台大創創中心與鴻海、Nvidia、Synopsys、玉山銀行、遠傳電信等企業合作的專項加速計畫。由企業提出真實業務需求，新創團隊以解決方案回應，成功者可獲企業資源挹注或合作機會。與一般加速器相比，企業垂直加速器有更明確的產業場景與商業化路徑。",
  },
  {
    category: "計畫相關",
    question: "計畫聚焦哪些產業領域？",
    answer:
      "台大創創中心 2026 年四大聚焦領域為：AI 軟體（企業 AI、SaaS、資料基礎設施）、生技醫療（AI 診斷、精準醫療、醫材）、硬科技（半導體、先進製造、機器人、顯示技術）、創新商模（ESG、循環經濟、FinTech、社會創新）。其他具潛力的領域也歡迎申請，由中心個案評估。",
  },

  // ── 申請相關 ──────────────────────────────────────────────────────────
  {
    category: "申請相關",
    question: "申請需要準備哪些資料？",
    answer:
      "基本申請資料包括：團隊介紹（成員背景與分工）、產品或服務說明、目標市場與商業模式、目前進度與未來規劃。台大加速器申請建議附上 Pitch Deck。詳細要求請參閱各計畫的線上申請表單。",
  },
  {
    category: "申請相關",
    question: "非台大背景的團隊可以申請嗎？",
    answer:
      "台大加速器完全開放，不限台大身分，任何具備技術或商模創新的團隊均可申請。台大車庫以台大在校生、校友或教職員組成的團隊為主，外部團隊可個案評估。",
  },
  {
    category: "申請相關",
    question: "申請之後，審核流程是什麼？",
    answer:
      "申請流程分四步：線上申請 → 書面審查 → 面試邀約（通過書審者） → 結果通知（面試後三週內）。書面審查由中心投資團隊進行，面試為線上或實體形式，通過後安排入駐說明。",
  },
  {
    category: "申請相關",
    question: "每年入選幾個團隊？競爭激烈嗎？",
    answer:
      "各梯次入選名額有限，以確保每個團隊都能獲得充分的輔導資源。中心注重團隊質量與多元性，而非單純的數量篩選。建議提早準備、清晰呈現核心問題與解決方案。",
  },
  {
    category: "申請相關",
    question: "學生團隊可以在課業期間參加嗎？",
    answer:
      "可以。許多入選團隊成員仍在就讀中。計畫設計上具彈性，輔導會議與活動以不嚴重影響課業為原則。事實上，台大車庫即專為在學階段的早期創業者設計。",
  },
  {
    category: "申請相關",
    question: "落選了可以再次申請嗎？",
    answer:
      "可以。落選並不影響後續梯次的申請資格。中心建議落選團隊關注書面回饋（若有提供）、持續推進產品進度後，在下一梯次重新提交申請。",
  },

  // ── 天使俱樂部 ────────────────────────────────────────────────────────
  {
    category: "天使投資俱樂部",
    question: "什麼是 NTUTEC ANGELS 臺大天使會？",
    answer:
      "NTUTEC ANGELS 是台大創創中心於 2023 年成立的天使投資社群，匯聚 150+ 位投資人，每月定期舉辦天使例會，提供會員經過三段嚴格篩選的優質早期案源、業師網絡與投資人交流場域。",
  },
  {
    category: "天使投資俱樂部",
    question: "如何成為天使會會員？",
    answer:
      "有意加入者可透過官網填寫入會諮詢表單，或直接聯繫投資經理。中心將安排一對一諮詢，說明入會條件、年費結構與會員權益。天使俱樂部以質量為優先，名額有限。",
  },
  {
    category: "天使投資俱樂部",
    question: "案件如何篩選？投資人能看到哪些資訊？",
    answer:
      "所有案件經過三段篩選機制：初篩（基本資格與領域契合）→ 快速評分（多維度評估）→ 完整報告（市場分析、財務模型、投資建議）。通過的案件才上架月例會，會員可在專屬平台查閱完整的六張資訊卡片與投資評估報告。",
  },
  {
    category: "天使投資俱樂部",
    question: "天使例會多久舉辦一次？投資規模有無限制？",
    answer:
      "天使例會每月定期舉辦，由新創團隊進行 Pitch 與 Q&A。會員以個人資金直接投資，不受機構共投限制，可自主選擇投資規模（50 萬以下 / 50–100 萬 / 100–200 萬 / 200 萬以上）與時機。",
  },
  {
    category: "天使投資俱樂部",
    question: "新創團隊要如何接觸天使投資俱樂部？",
    answer:
      "新創團隊無法直接報名天使例會。所有案件須先通過台大加速器或台大車庫計畫，經中心投資團隊完成盡調後，才由中心推薦至天使例會。這確保每個上架案件都具備一定品質門檻。",
  },

  // ── 企業合作 ──────────────────────────────────────────────────────────
  {
    category: "企業合作",
    question: "企業如何與台大創創中心合作？",
    answer:
      "合作模式包括：企業垂直加速器（出題共創）、聯合活動（Demo Day、黑客松、論壇）、案源媒合（優先接觸特定領域新創）、諮詢服務（創新策略、開放式創新顧問）。歡迎填寫合作洽詢表單，我們將安排專人說明。",
  },
  {
    category: "企業合作",
    question: "企業垂直加速器是什麼？如何參與？",
    answer:
      "企業垂直加速器由企業提出具體創新需求，中心負責召募並輔導對應的新創解題。合作企業可獲得優先技術接觸、共同開發機會，甚至投資或採購優先權。有興趣的企業可聯繫中心業務團隊提案。",
  },
  {
    category: "企業合作",
    question: "企業能否直接挖角或投資加速器內的新創？",
    answer:
      "中心不限制企業與新創之間的商業合作或投資行為，但鼓勵以透明方式進行，並在中心知情的情況下促成。直接收購或挖角核心成員的行為，建議事先與中心溝通，以維護新創生態系的健康發展。",
  },
  {
    category: "企業合作",
    question: "諮詢服務的內容是什麼？",
    answer:
      "中心提供企業創新策略諮詢，涵蓋開放式創新規劃、新創生態系建構、內部創業（Intrapreneurship）與 CVC（企業創投）策略。服務形式包括工作坊、顧問諮詢與客製化研究，適合希望系統性推進創新的大型企業或公部門。",
  },

  // ── 業師與輔導 ────────────────────────────────────────────────────────
  {
    category: "業師與輔導",
    question: "業師如何輔導新創？頻率是？",
    answer:
      "中心配對業師與入選新創進行每月一對一深度輔導，聚焦商業策略、市場進入、技術驗證或募資準備。業師均具備 15 年以上產業或創投經驗，依新創需求彈性調整輔導重點。",
  },
  {
    category: "業師與輔導",
    question: "如何成為台大創創中心業師？",
    answer:
      "若您具備創業、投資、技術或產業管理經驗，有意回饋創業生態系，歡迎填寫業師申請表或直接聯繫中心。業師遴選以與中心聚焦領域的契合度與實戰經驗為主要依據。",
  },
  {
    category: "業師與輔導",
    question: "諮詢委員會扮演什麼角色？",
    answer:
      "諮詢委員會（Advisory Board）由資深產業領袖、學者與投資人組成，負責提供中心的策略方向、計畫設計與重大決策的外部視角，不直接參與日常輔導，但可在特定議題上提供高階諮詢。",
  },

  // ── 聯絡與其他 ────────────────────────────────────────────────────────
  {
    category: "聯絡與其他",
    question: "如何聯繫台大創創中心？",
    answer:
      "可透過官網聯絡表單、電子郵件（ntutec@ntutec.com）或直接前往台大創創中心辦公室洽詢。辦公時間為週一至週五 9:00–18:00。我們也定期舉辦開放日，歡迎預約參觀。",
  },
  {
    category: "聯絡與其他",
    question: "台大創創中心的辦公室在哪裡？",
    answer:
      "台大創創中心位於台灣大學校園內（台北市大安區羅斯福路四段一號），鄰近捷運公館站。台大車庫另設有共創空間，詳細地點請參閱官網或來信詢問。",
  },
  {
    category: "聯絡與其他",
    question: "Demo Day 是什麼？一般民眾可以參加嗎？",
    answer:
      "Demo Day 是台大創創中心每年 12 月舉辦的年度成果展暨投資媒合活動，由當年梯次精選新創向投資人 Pitch，設有互動攤位與媒合機制。活動開放報名，投資人、企業代表與媒體皆可申請出席，一般民眾視名額開放。",
  },
  {
    category: "聯絡與其他",
    question: "台大創創中心有 Podcast 或媒體內容可以收聽嗎？",
    answer:
      "有。TEC Talk 是台大創創中心的官方 Podcast，自 2021 年開播，邀請業師、知名創業者與產業專家分享第一線的創業經驗、投資觀點與產業趨勢。可在 Firstory、Spotify 等主流平台收聽，或透過官網部落格瀏覽文字版內容。",
  },
];

const categories = [
  "計畫相關",
  "申請相關",
  "天使投資俱樂部",
  "企業合作",
  "業師與輔導",
  "聯絡與其他",
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-teal"
      >
        <span className="pr-4 font-semibold text-charcoal">{item.question}</span>
        <span
          className={`flex-shrink-0 text-xl text-teal transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="leading-relaxed text-slate-muted">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("計畫相關");

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <PageHero
        title="常見問題"
        subtitle="FAQ"
        description="關於計畫申請、天使投資、企業合作、業師輔導與其他常見疑問的完整解答。"
      />

      <section className="section-spacing">
        <div className="container">
          {/* Category tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-teal text-white"
                    : "bg-stone text-slate-muted hover:bg-teal-wash hover:text-teal-deep"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-3xl">
            <div>
              {filteredFaqs.map((item) => {
                const globalIndex = faqs.indexOf(item);
                return (
                  <AccordionItem
                    key={globalIndex}
                    item={item}
                    isOpen={openIndex === globalIndex}
                    onToggle={() =>
                      setOpenIndex(
                        openIndex === globalIndex ? null : globalIndex
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
