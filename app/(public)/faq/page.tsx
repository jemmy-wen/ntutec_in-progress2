"use client";

import { useState } from "react";
import PageHero from "@/components/public/PageHero";

/* ----- metadata workaround for client component ----- */
// metadata must be exported from a server component; we use a
// separate metadata.ts or head.tsx in production. For now, the
// page title is set via the layout's default.

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: "計畫相關",
    question: "台大加速器和台大車庫有什麼差別？",
    answer:
      "台大加速器為期十個月，適合已有 MVP 或初期營收的成長期新創，提供深度業師輔導、企業資源對接與募資機會。台大車庫為期十個月（3月至12月），適合概念驗證至 MVP 階段的早期團隊，提供免費共創空間與社群支持。",
  },
  {
    category: "計畫相關",
    question: "計畫需要支付費用嗎？",
    answer:
      "台大車庫免費進駐。台大加速器目前不收取任何費用或股權，所有輔導資源均為免費提供。中心以促進校園創新生態系為使命，不以營利為目的。",
  },
  {
    category: "計畫相關",
    question: "計畫結束後，還能獲得什麼支持？",
    answer:
      "畢業團隊可持續參與中心的校友網絡活動、業師諮詢、以及天使投資俱樂部的募資機會。台大車庫畢業團隊享有台大加速器的優先申請資格。",
  },
  {
    category: "申請相關",
    question: "申請需要準備哪些資料？",
    answer:
      "基本申請資料包括：團隊介紹（成員背景與分工）、產品或服務說明、目標市場與商業模式、目前進度與未來規劃。加速器申請建議另附 Pitch Deck。詳細要求請參閱各計畫的申請表單。",
  },
  {
    category: "申請相關",
    question: "非臺大相關的團隊可以申請嗎？",
    answer:
      "台大加速器開放所有團隊申請（不限台大身分），不限學校背景。台大車庫需具備臺大在校生、校友或教職員組成的團隊，但特殊情況可個案評估。",
  },
  {
    category: "其他",
    question: "如何聯繫臺大創創中心？",
    answer:
      "您可以透過官網聯絡表單、電子郵件 (ntutec@ntutec.com) 或直接前往中心辦公室洽詢。辦公時間為週一至週五 9:00-18:00。我們也定期舉辦開放日活動，歡迎預約參觀。",
  },
];

const categories = ["計畫相關", "申請相關", "其他"];

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

  return (
    <>
      <PageHero
        title="常見問題"
        subtitle="FAQ"
        description="關於臺大創創中心計畫、申請與其他常見疑問的解答。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {categories.map((cat) => {
              const items = faqs.filter((f) => f.category === cat);
              return (
                <div key={cat} className="mb-10">
                  <p className="micro-label mb-4">{cat}</p>
                  <div>
                    {items.map((item) => {
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
