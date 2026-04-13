import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { Plant, RocketLaunch, GraduationCap, Lightbulb, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "加入我們 | NTUTEC",
  description:
    "加入台大創創中心團隊或實習計畫，在台大創業生態系的核心，與創業者、投資人和業師並肩工作。",
};

const whyJoinCards = [
  {
    emoji: Plant,
    title: "深度接觸創業生態系",
    description:
      "每天與新創創辦人、天使投資人和業師互動，學習課堂學不到的實戰知識。",
  },
  {
    emoji: RocketLaunch,
    title: "實際參與高影響力工作",
    description:
      "不是打雜的實習——你的工作直接影響輔導計畫的品質、天使例會的準備和對外溝通。",
  },
  {
    emoji: GraduationCap,
    title: "台大資源與人脈",
    description:
      "深入台大創業社群，連結校內外優秀校友與產業資源，建立長期職涯人脈。",
  },
  {
    emoji: Lightbulb,
    title: "多元角色學習機會",
    description:
      "從事業發展、行銷、研究到投資評估，依你的興趣和能力發展跨域能力。",
  },
];

const internInfoCards = [
  {
    emoji: CalendarBlank,
    title: "招募時間",
    description: "依學期滾動開放招募，正式開放時以 Email 通知。",
  },
  {
    emoji: CalendarBlank,
    title: "實習時數",
    description:
      "每週 2–3 天，可配合課堂時間彈性調整，優先考慮能長期配合的同學。",
  },
  {
    emoji: CalendarBlank,
    title: "工作地點",
    description:
      "台北市中正區思源街 18 號，台大水源校區卓越研究大樓 7 樓。",
  },
];

const testimonials = [
  {
    quote:
      "主管直接告訴我：『你不可以把這裡當工讀生，要真正在工作中有收穫。』進來一個單位，離開變成故鄉——這八個字精準描述了我在台大創創中心的實習。",
    author: "葉思宏",
    role: "2022 秋季實習生｜事業發展暨行銷部門",
  },
  {
    quote:
      "在這裡不只是執行任務，而是不斷被要求思考：『為什麼要提這個案例？這個方法帶來什麼價值？』這種批判性思維是我帶走的最重要資產。",
    author: "林君燕",
    role: "2023 春季實習生｜事業發展暨行銷部門",
  },
  {
    quote:
      "你能在這裡感受到真實的團隊文化，而不只是打雜。從客戶痛點到服務價值，每個思考都在鍛鍊商業邏輯——讓我真正理解什麼叫避免曇花一現的偉大。",
    author: "施奕丞",
    role: "2022 秋季實習生｜事業發展暨行銷部門",
  },
  {
    quote:
      "會計系學生在行銷部門做企業創新文案、電子報與社群策略，工作節奏快、挑戰大，但也因此累積了跨域能力，成為我職涯最有價值的半年。",
    author: "許安聆",
    role: "2022 秋 + 2023 春季實習生｜事業發展暨行銷部門",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="加入我們"
        subtitle="Careers & Internships"
        description="無論是全職工作或學期實習，在台大創創中心你將接觸到最前沿的新創生態系，與頂尖創業者和投資人共事。"
      />

      {/* Why Join Us */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Why Join Us</p>
            <h2>為什麼加入台大創創中心</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {whyJoinCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <card.emoji size={28} weight="duotone" className="mb-3 text-teal" />
                <h3 className="mb-2 font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Program */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="micro-label mb-4">Internship Program</p>
            <h2 className="mb-4">實習計畫</h2>
            <p className="mx-auto max-w-xl text-center text-slate-muted">
              每學期招募實習生，加入事業發展暨行銷部門，深度參與中心日常運營。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {internInfoCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 text-center"
              >
                <card.emoji size={28} weight="duotone" className="mb-3 mx-auto text-teal" />
                <h3 className="mb-2 font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <p className="micro-label text-center mt-12 mb-2">近期實習生反饋</p>
          <h3 className="mb-8 text-center text-xl font-semibold text-charcoal">
            前輩實習心得（歷屆）
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-2xl bg-teal-wash p-6">
                <p className="mb-4 text-sm italic leading-relaxed text-charcoal">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-semibold text-charcoal">{t.author}</p>
                <p className="text-xs text-slate-muted">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="micro-label mb-4">Open Positions</p>
            <h2 className="mb-4">常態開放職缺</h2>
            <p className="text-slate-muted">
              以下職缺長期徵才，歡迎隨時投遞。我們將於收到履歷後 5 個工作日內回覆。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {/* 工讀生 */}
            <div className="rounded-2xl border border-stone-warm bg-stone p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-teal-wash px-3 py-1 text-xs font-semibold text-teal">工讀生</span>
                <span className="text-xs text-slate-muted">1–2 位</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-charcoal">行政工讀生</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-muted">
                協助中心全體經理進行日常行政支援，包含文件整理、活動佈場協助、會議記錄與資料庫維護。適合希望深入了解新創生態系、對創業領域有熱忱的在學學生。
              </p>
              <ul className="mb-6 space-y-1 text-sm text-slate-muted">
                <li>・每週 10–15 小時，可配合課堂時間</li>
                <li>・台大水源校區卓越研究大樓 7F</li>
                <li>・歡迎各系所在學學生投遞</li>
              </ul>
              <Link
                href="mailto:ntutec@ntutec.com?subject=應徵工讀生"
                className="btn-pill-outline inline-flex w-full justify-center text-sm"
              >
                投遞履歷
              </Link>
            </div>

            {/* 輔導專員 */}
            <div className="rounded-2xl border border-teal/20 bg-teal-wash p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">全職／兼職</span>
                <span className="text-xs text-slate-muted">1–2 位</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-charcoal">輔導專員</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-muted">
                協助加速器與台大車庫輔導計畫的全流程執行，包含課程規劃與場務、業師媒合排程、新創團隊追蹤，以及活動籌辦與對外溝通，直接支援輔導經理與營運經理。
              </p>
              <ul className="mb-6 space-y-1 text-sm text-slate-muted">
                <li>・1–2 年專案執行或新創相關經驗佳</li>
                <li>・具強溝通與多工管理能力</li>
                <li>・應屆畢業生亦歡迎投遞</li>
              </ul>
              <Link
                href="mailto:ntutec@ntutec.com?subject=應徵輔導專員"
                className="btn-pill-primary inline-flex w-full justify-center text-sm"
              >
                投遞履歷
              </Link>
            </div>

            {/* 投資經理 */}
            <div className="rounded-2xl border border-stone-warm bg-stone p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-teal-wash px-3 py-1 text-xs font-semibold text-teal">全職</span>
                <span className="text-xs text-slate-muted">1 位</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-charcoal">投資經理（非生醫領域）</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-muted">
                負責天使投資俱樂部的案源開發與評估，聚焦 AI／軟體、硬科技、先進製造與創新商模等領域。主責投資案篩選、盡職調查、天使例會報告準備及投資人關係維護。
              </p>
              <ul className="mb-6 space-y-1 text-sm text-slate-muted">
                <li>・2 年以上創投、顧問或新創工作經驗</li>
                <li>・具獨立完成案件評估報告之能力</li>
                <li>・生醫領域以外之產業背景優先</li>
              </ul>
              <Link
                href="mailto:ntutec@ntutec.com?subject=應徵投資經理"
                className="btn-pill-outline inline-flex w-full justify-center text-sm"
              >
                投遞履歷
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">對實習機會有興趣？</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            歡迎來信告訴我們你的背景與興趣，我們將在下一梯次招募時優先通知你。
          </p>
          <Link href="mailto:ntutec@ntutec.com" className="btn-pill-primary">
            登記下一梯次招募通知
          </Link>
          <p className="mt-4 text-sm text-slate-muted">
            地址：台北市中正區思源街 18 號，台大水源校區卓越研究大樓 7 樓
          </p>
        </div>
      </section>
    </>
  );
}
