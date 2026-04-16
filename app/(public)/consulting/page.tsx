import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/public/PageHero";
import BreadcrumbSchema from "@/components/public/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "諮詢服務 | NTUTEC",
  description:
    "台大創創中心提供企業創新策略、技術商業化與新創輔導等專業諮詢服務。",
};

const services = [
  {
    title: "企業創新策略諮詢",
    description:
      "協助企業制定創新轉型策略，導入新創思維與敏捷開發方法論，建立內部創新機制。",
    features: ["創新文化診斷", "內部創業機制設計", "開放式創新策略"],
  },
  {
    title: "技術商業化輔導",
    description:
      "將學術研究成果轉化為具商業價值的產品或服務，提供從概念驗證到市場進入的完整輔導。",
    features: ["技術評估與定位", "商業模式設計", "市場進入策略"],
  },
  {
    title: "新創加速輔導",
    description:
      "為早期新創團隊提供系統化的輔導計畫，涵蓋產品開發、團隊建設、募資策略與市場拓展。",
    features: ["產品市場適配", "募資簡報優化", "業師一對一輔導"],
  },
];

export default function ConsultingPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: '首頁', url: 'https://tec.ntu.edu.tw' },
        { name: '諮詢服務', url: 'https://tec.ntu.edu.tw/consulting' },
      ]} />
      <PageHero
        title="諮詢服務"
        subtitle="Consulting"
        description="突破企業創新卡點，結合 13 年台大加速器 know-how 與產業實務經驗，提供專業的創新轉型諮詢服務。"
      />

      {/* Services */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Our Services</p>
            <h2>服務項目</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
              自 2019 年首創企業垂直加速器，累計 27 期、35 家企業夥伴，涵蓋科技、媒體、金融等多元產業。
              從設計思考工作坊、商業模式共創，到場域驗證與新創媒合，提供端對端的企業創新解決方案。
              合作企業涵蓋科技、製造、金融、媒體等多元產業之國內外知名企業。
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="card-hover rounded-2xl bg-white p-8"
              >
                <h3 className="mb-4 text-xl font-semibold">{service.title}</h3>
                <p className="mb-6 text-slate-muted leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-muted"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate case study cross-link */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mt-8 p-6 bg-stone rounded-lg">
              <h3 className="font-semibold text-charcoal mb-2">垂直加速器成功案例</h3>
              <p className="text-slate-muted mb-4">透過深度共創，協助企業發現新市場、孵育新事業。</p>
              <Link href="/corporate" className="text-teal hover:underline font-medium">查看合作案例 →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/events/opening-2026-04.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0A192F]/80" />
        <div className="container relative z-[2]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="micro-label mb-4 text-white/60">Get in Touch</p>
            <h2 className="mb-4 text-white">洽詢諮詢服務</h2>
            <p className="mb-8 text-lg text-white/80">
              請來信說明您的需求（企業規模、創新議題、期望時程），我們評估後安排合適窗口與您聯繫。通常於 3 個工作日內回覆。
            </p>
            <a
              href="mailto:ntutec@ntutec.com?subject=諮詢服務洽詢"
              className="btn-pill-primary inline-flex items-center gap-2"
            >
              來信洽詢
            </a>
            <p className="mt-6 text-sm text-white/60">
              ntutec@ntutec.com　·　週一至週五 9:00–18:00
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
