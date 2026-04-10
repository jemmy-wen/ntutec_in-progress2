import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "諮詢服務 | NTUTEC",
  description:
    "臺大創創中心提供企業創新策略、技術商業化與新創輔導等專業諮詢服務。",
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
      <PageHero
        title="諮詢服務"
        subtitle="Consulting"
        description="結合學術研究與產業實務經驗，提供專業的創新與創業諮詢服務。"
      />

      {/* Services */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Our Services</p>
            <h2>服務項目</h2>
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

      {/* Contact Form Placeholder */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="micro-label mb-4">Get in Touch</p>
            <h2 className="mb-8">聯繫我們</h2>
            <div className="rounded-xl bg-stone-warm p-8 text-center">
              <p className="text-slate-muted">諮詢表單將在此處</p>
            </div>
            <p className="mt-8 text-slate-muted">
              或直接來信：
              <a
                href="mailto:ntutec@ntutec.com"
                className="ml-1 font-medium text-teal-deep underline underline-offset-4"
              >
                ntutec@ntutec.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
