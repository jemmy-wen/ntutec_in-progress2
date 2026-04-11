import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "加入我們 | NTUTEC",
  description:
    "加入台大創創中心團隊或實習計畫，在台大創業生態系的核心，與創業者、投資人和業師並肩工作。",
};

const whyJoinCards = [
  {
    emoji: "🌱",
    title: "深度接觸創業生態系",
    description:
      "每天與新創創辦人、天使投資人和業師互動，學習課堂學不到的實戰知識。",
  },
  {
    emoji: "🚀",
    title: "實際參與高影響力工作",
    description:
      "不是打雜的實習——你的工作直接影響輔導計畫的品質、天使例會的準備和對外溝通。",
  },
  {
    emoji: "🎓",
    title: "台大資源與人脈",
    description:
      "深入台大創業社群，連結校內外優秀校友與產業資源，建立長期職涯人脈。",
  },
  {
    emoji: "💡",
    title: "多元角色學習機會",
    description:
      "從事業發展、行銷、研究到投資評估，依你的興趣和能力發展跨域能力。",
  },
];

const internInfoCards = [
  {
    emoji: "📅",
    title: "招募時間",
    description: "每學期開學前招募，春季（2月）與秋季（9月）各一梯次。",
  },
  {
    emoji: "⏱️",
    title: "實習時數",
    description:
      "每週 2–3 天，可配合課堂時間彈性調整，優先考慮能長期配合的同學。",
  },
  {
    emoji: "📍",
    title: "工作地點",
    description:
      "台北市中正區思源街 18 號，台大水源校區卓越研究大樓 7 樓。",
  },
];

const testimonials = [
  {
    quote:
      "進來一個單位，離開變成故鄉。在台大創創中心的每一天，都讓我更確定自己想走的路。",
    author: "葉思宏",
    role: "2022 秋季實習生｜事業發展暨行銷部門",
  },
  {
    quote:
      "避免曇花一現的偉大——這句話從實習第一天就刻在我心裡。這裡讓我學到如何持續地創造價值。",
    author: "施奕丞",
    role: "2022 秋季實習生｜事業發展暨行銷部門",
  },
  {
    quote:
      "從新創 Pitch、天使例會到對外合作提案，每一件事都是真實的挑戰，沒有人對你說『你只是個實習生』。",
    author: "Emily",
    role: "2023 春季實習生｜事業發展暨行銷部門",
  },
  {
    quote:
      "在這裡實習讓我對台灣創業生態系有了全新的認識，也建立了許多珍貴的人脈。",
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
                <p className="mb-3 text-3xl">{card.emoji}</p>
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
              每學期招募少量實習生，加入事業發展暨行銷部門，深度參與中心日常運營。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {internInfoCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 text-center"
              >
                <p className="mb-3 text-3xl">{card.emoji}</p>
                <h3 className="mb-2 font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <h3 className="mb-8 mt-12 text-center text-xl font-semibold text-charcoal">
            前輩實習心得
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

      {/* Full-Time Openings */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="micro-label mb-4">Open Positions</p>
            <h2 className="mb-4">全職職缺</h2>
            <p className="text-slate-muted">
              台大創創中心不定期招募全職工作人員，歡迎對新創生態系充滿熱忱的你加入。
            </p>
          </div>
          <div className="rounded-2xl border border-stone-warm bg-stone p-8 text-center">
            <p className="text-slate-muted">
              目前無固定職缺開放，如對加入台大創創中心有強烈意願，歡迎主動投遞履歷。
            </p>
            <Link
              href="mailto:ntutec@ntutec.com"
              className="btn-pill-outline mt-4 inline-flex text-sm"
            >
              主動投遞履歷
            </Link>
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
            聯繫我們
          </Link>
          <p className="mt-4 text-sm text-slate-muted">
            地址：台北市中正區思源街 18 號，台大水源校區卓越研究大樓 7 樓
          </p>
        </div>
      </section>
    </>
  );
}
