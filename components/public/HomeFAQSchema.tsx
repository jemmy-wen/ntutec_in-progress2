/**
 * Homepage FAQPage JSON-LD schema.
 *
 * AEO Scanner (aeoscan.tw) gave tec.ntu.edu.tw 0/10 on FAQ Schema because
 * only /faq has FAQPage JSON-LD — the homepage had none, so crawling "/"
 * yielded no Q&A structure for AI assistants to cite.
 *
 * We inject the 5 most-asked questions on the homepage so GPT/Claude/Perplexity
 * can surface them directly when users ask about NTUTEC.
 *
 * Content is hand-picked from /faq (8 questions there) — kept in sync with
 * app/(public)/faq/layout.tsx. If the /faq version is updated, update this too.
 */
export default function HomeFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '台大創創中心 NTUTEC 是什麼？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '台大創創中心（NTUTEC，National Taiwan University Taidah Entrepreneurship Center）是台大創業生態系的實戰基地，2013 年成立，隸屬國立臺灣大學。以台大加速器、台大車庫、企業垂直加速器、台大天使會四大業務，連結台大、連結產業、連結資本，13 年累計輔導逾 600 支新創團隊。',
        },
      },
      {
        '@type': 'Question',
        name: '台大加速器和台大車庫有什麼差別？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '台大加速器是為期 10 個月的密集輔導計畫，提供業師陪跑、Demo Day 展示及投資人媒合；台大車庫則是共創工作空間，提供彈性進駐與社群支持，不要求固定時數。兩者皆免費，不收取股權。',
        },
      },
      {
        '@type': 'Question',
        name: '申請需要繳費或釋出股權嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '不需要。台大加速器與台大車庫均完全免費，且不要求任何股權。',
        },
      },
      {
        '@type': 'Question',
        name: '非台大背景可以申請嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '台大加速器不限身分，歡迎所有創業團隊申請。台大車庫優先提供台大在校生、校友或教職員組成的團隊，外部團隊可個案評估。',
        },
      },
      {
        '@type': 'Question',
        name: '申請輔導計畫的流程與時程是什麼？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '申請流程分為四步：填寫線上申請表 → 書面審核 → 線上面談 → 錄取通知。每年 12 月至隔年 1 月開放申請，2 月公布錄取結果，3 月正式開始輔導，12 月 Demo Day 總結。',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
