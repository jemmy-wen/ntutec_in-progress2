import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "進駐資源 TEC Deals | NTUTEC",
  description:
    "NTUTEC 錄取新創專屬資源包：雲端服務、財會法務諮詢、辦公空間、媒體曝光等獨家優惠方案。",
};

const partners = [
  {
    category: "雲端服務",
    name: "AWS Activate Program",
    description:
      "亞馬遜雲端計算 AWS 為早期新創提供點數、技術支援與培訓資源，助力快速搭建可擴展的雲端架構。",
  },
  {
    category: "財會/審計",
    name: "勤業眾信聯合會計師事務所 (Deloitte)",
    description:
      "提供財務諮詢、稅務規劃與審計服務，協助新創建立合規的財務體系。",
  },
  {
    category: "財會/審計",
    name: "安永聯合會計師事務所 (EY)",
    description:
      "提供新創專屬的財務顧問與稅務服務，幫助你從早期就建立良好的財務紀律。",
  },
  {
    category: "法律",
    name: "瀛睿律師事務所",
    description:
      "提供新創股權設計、融資法律諮詢、合約審查等法律服務，降低法律風險。",
  },
  {
    category: "法律",
    name: "立勤國際法律事務所",
    description:
      "專精新創募資架構、智慧財產保護與公司治理，提供全方位法律支援。",
  },
  {
    category: "辦公空間",
    name: "Block² 共享辦公空間",
    description:
      "提供彈性辦公桌與獨立辦公室方案，讓新創團隊在優質環境中協作與成長。",
  },
  {
    category: "媒體/社群",
    name: "創業小聚",
    description:
      "台灣最具影響力的創業社群媒體，協助新創進行媒體曝光與社群連結。",
  },
  {
    category: "教育",
    name: "台大創創學程",
    description:
      "台灣大學校內創業相關課程資源，提供新創創辦人深化商業知識的進修管道。",
  },
];

const steps = [
  {
    number: "1",
    title: "申請並錄取計畫",
    description: "通過台大加速器或台大車庫的甄選流程，取得進駐資格。",
  },
  {
    number: "2",
    title: "完成進駐說明會",
    description: "錄取後，中心將舉辦新創說明會，詳細介紹各項資源取得方式。",
  },
  {
    number: "3",
    title: "直接聯繫合作夥伴",
    description:
      "持進駐資格，以 NTUTEC 名義聯繫合作夥伴，享受專屬優惠。",
  },
];

export default function TecDealsPage() {
  return (
    <>
      <PageHero
        title="進駐資源"
        subtitle="TEC Deals"
        description="錄取台大加速器或台大車庫的新創，可享下列合作夥伴提供的獨家優惠方案，降低創業成本、加速成長。"
      />

      {/* Intro Banner */}
      <section className="section-spacing bg-teal-wash">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              什麼是 TEC Deals？
            </h2>
            <p className="text-lg text-slate-muted leading-relaxed">
              進駐台大創創中心的新創團隊，除了業師輔導與投資人媒合外，還可取得合作夥伴提供的限定優惠方案。涵蓋雲端運算、財務會計、法律諮詢、辦公空間等創業必需服務，讓你把資源用在最重要的地方。
            </p>
          </div>
        </div>
      </section>

      {/* Partner Deals Grid */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Partner Deals</p>
            <h2 className="text-3xl font-bold md:text-4xl">合作夥伴優惠方案</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="card-hover rounded-2xl bg-white p-6"
              >
                <span className="mb-4 inline-block bg-teal-light text-teal-deep text-xs font-semibold px-3 py-1 rounded-full">
                  {partner.category}
                </span>
                <h3 className="mb-3 text-xl font-semibold">{partner.name}</h3>
                <p className="text-slate-muted leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Access */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">How to Access</p>
            <h2 className="text-3xl font-bold md:text-4xl">如何取得優惠</h2>
          </div>
          <div className="mx-auto max-w-2xl space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal text-white text-lg font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="text-slate-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            還沒申請？現在開始
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            台大加速器與台大車庫每年招募一梯次，進駐即可享受上述所有資源。
          </p>
          <Link href="/apply" className="btn-pill-primary">
            提前登記 2027 梯次
          </Link>
        </div>
      </section>
    </>
  );
}
