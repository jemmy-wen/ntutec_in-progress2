import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "常見問題 | NTUTEC",
  description:
    "關於台大加速器、台大車庫、天使投資俱樂部、企業合作與業師輔導的完整問答。計畫免費、不要求股權；台大加速器不限身分；天使例會每月舉辦。",
  alternates: { canonical: "https://tec.ntu.edu.tw/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "台大加速器和台大車庫有什麼差別？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "台大加速器是為期 10 個月的密集輔導計畫，提供業師陪跑、Demo Day 展示及投資人媒合；台大車庫則是共創工作空間，提供彈性進駐與社群支持，不要求固定時數。兩者皆免費，不收取股權。"
        }
      },
      {
        "@type": "Question",
        "name": "申請需要繳費或釋出股權嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不需要。台大加速器與台大車庫均完全免費，且不要求任何股權。"
        }
      },
      {
        "@type": "Question",
        "name": "非台大背景可以申請嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "台大加速器不限身分，歡迎所有創業團隊申請。台大車庫優先提供台大在校生、校友或教職員組成的團隊，外部團隊可個案評估。"
        }
      },
      {
        "@type": "Question",
        "name": "天使例會多久舉辦一次？如何參加？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "天使例會每月舉辦一次，為 NTUTEC 天使俱樂部會員專屬活動，需成為天使會員方可出席。"
        }
      },
      {
        "@type": "Question",
        "name": "如何成為天使俱樂部會員？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "請至天使入會申請頁面填寫申請表，投資經理將於 3 個工作日內聯繫您說明資格與流程。個人會員年費 NT$50,000，企業會員 NT$100,000。"
        }
      },
      {
        "@type": "Question",
        "name": "申請輔導計畫的流程是什麼？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "申請流程分為四步：填寫線上申請表 → 書面審核 → 線上面談 → 錄取通知。12 月至 1 月開放申請，2 月公布結果，3 月正式開始輔導。"
        }
      },
      {
        "@type": "Question",
        "name": "企業如何與 NTUTEC 合作？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NTUTEC 提供企業垂直加速器、業師掛牌、活動贊助等多元合作方案。請至企業合作頁面了解詳情或直接聯繫我們。"
        }
      },
      {
        "@type": "Question",
        "name": "輔導計畫有辦公空間可以使用嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "台大加速器提供虛擬進駐（不含固定座位）；台大車庫提供共創工作空間，學員可彈性使用。"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: "首頁", url: "https://tec.ntu.edu.tw" },
        { name: "常見問題", url: "https://tec.ntu.edu.tw/faq" }
      ]} />
      {children}
    </>
  );
}
