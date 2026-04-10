import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "企業合作方案 | NTUTEC",
  description:
    "臺大創創中心企業合作方案：加速器共創、創新競賽、聯合活動與顧問諮詢，助企業對接前沿新創技術。",
};

const valueProps = [
  {
    title: "前沿技術對接",
    description:
      "直接接觸臺大校內最新研究成果與新創團隊，搶先佈局未來技術趨勢，加速企業創新轉型。",
  },
  {
    title: "人才儲備管道",
    description:
      "透過與新創團隊的深度合作，發掘具創業精神與技術能力的優秀人才，建立長期人才供應鏈。",
  },
  {
    title: "品牌創新形象",
    description:
      "與頂尖大學創新中心合作，提升企業在創新生態系中的能見度與品牌價值，吸引更多合作機會。",
  },
];

const collaborationModels = [
  {
    icon: "🚀",
    title: "企業加速器共創",
    description:
      "由企業出題、新創解題，透過十個月深度輔導計畫，共同開發創新解決方案。",
  },
  {
    icon: "🏆",
    title: "創新競賽合辦",
    description:
      "與企業共同舉辦主題式創新競賽，發掘潛力新創並建立合作關係。",
  },
  {
    icon: "🎤",
    title: "聯合活動",
    description:
      "共同舉辦產業論壇、Demo Day、交流活動，促進企業與新創的深度互動。",
  },
  {
    icon: "💡",
    title: "創新顧問諮詢",
    description:
      "提供企業內部創新策略諮詢，協助導入新創思維與敏捷開發方法論。",
  },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        title="企業合作方案"
        subtitle="Corporate Innovation"
        description="與臺大創創中心攜手，共同推動企業創新轉型，對接最前沿的技術與人才。"
      />

      {/* Why partner with TEC */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Why Partner With Us</p>
            <h2>為什麼選擇臺大創創中心</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {valueProps.map((prop) => (
              <div key={prop.title} className="card-hover rounded-2xl bg-white p-8">
                <h3 className="mb-4 text-xl font-semibold">{prop.title}</h3>
                <p className="text-slate-muted leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Models */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Collaboration Models</p>
            <h2>合作模式</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {collaborationModels.map((model) => (
              <div
                key={model.title}
                className="card-hover flex gap-6 rounded-2xl bg-white p-8"
              >
                <span className="text-4xl">{model.icon}</span>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{model.title}</h3>
                  <p className="text-slate-muted leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section-spacing">
        <div className="container text-center">
          <p className="micro-label mb-4">Impact</p>
          <h2 className="mb-12">合作成果</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { number: "50+", label: "合作企業" },
              { number: "120+", label: "共創專案" },
              { number: "85%", label: "專案滿意度" },
              { number: "30+", label: "技術移轉案" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-teal">{stat.number}</p>
                <p className="mt-2 text-slate-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">準備開啟合作了嗎？</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            無論您是想探索新技術、尋找創新解決方案，或是建立人才管道，我們都能為您量身打造合作方案。
          </p>
          <Link href="/consulting" className="btn-pill-primary">
            聯繫我們
          </Link>
        </div>
      </section>
    </>
  );
}
