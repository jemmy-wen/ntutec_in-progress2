import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "業師陣容 | NTUTEC",
  description:
    "臺大創創中心 40+ 位業師，平均 20 年產業與投資經驗。涵蓋國際創投、半導體、網路科技、生技醫療、金融創投等領域，為新創提供一對一深度輔導。",
};

interface Mentor {
  initials: string;
  name: string;
  expertise: string;
  company: string;
}

// Source: ntutec-center-intro-sot.md §2026 新增創投背景業師 + ntutec_institutional_facts.md §導師群
const creditedMentors: Mentor[] = [
  { initials: "彭", name: "彭志強", expertise: "半導體創投", company: "UMC Capital 宏誠創投總經理 · 臺大電機校友" },
  { initials: "江", name: "江旻峻", expertise: "校友創投", company: "臺大校友創投總經理 · 臺大 MBA" },
  { initials: "林", name: "林宇聲", expertise: "科技創投", company: "臺新創投總經理 · 臺大 EMBA" },
  { initials: "魏", name: "魏資文", expertise: "生技創投", company: "鼎澄生醫總經理 / Addin Venture / 中華開發資本 · 臺大資管" },
  { initials: "張", name: "張提提", expertise: "早期投資", company: "中華開發資本協理 · 臺大 GMBA" },
  { initials: "CF", name: "CF Su", expertise: "網路科技", company: "前 Yahoo 工程總監" },
  { initials: "JL", name: "Jonathan Lin", expertise: "國際商務", company: "Andra Global" },
  { initials: "KY", name: "Konrad Young", expertise: "半導體研發", company: "前 TSMC R&D Director" },
  { initials: "EC", name: "Eric Chang", expertise: "AI 研究", company: "前微軟北京研究院副院長" },
  { initials: "ICJ", name: "IC Jan", expertise: "國際天使", company: "Taiwan Global Angels Founder" },
];

export default function MentorsPage() {
  return (
    <>
      <PageHero
        title="業師陣容"
        subtitle="Mentors"
        description="40+ 位業師，平均 20 年產業與投資經驗。為新創團隊提供一對一深度輔導與策略建議。"
      />

      {/* Intro */}
      <section className="section-spacing">
        <div className="container">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-muted">
            臺大創創中心業師網絡涵蓋半導體、網路科技、AI、生技醫療、金融創投、法律、供應鏈等多元領域。每位業師皆具備豐富的產業實戰經驗，透過定期的一對一輔導，協助新創團隊解決從技術驗證到市場擴展的各種挑戰。
          </p>

          {/* Credited mentors */}
          <div className="mb-10">
            <p className="micro-label mb-2">Featured Mentors</p>
            <h3 className="mb-2">業師精選</h3>
            <p className="text-sm text-slate-muted">以下為公開列示之業師，完整 40+ 位陣容請透過申請加入計畫後取得詳細名冊。</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creditedMentors.map((mentor) => (
              <div key={mentor.name} className="card-hover rounded-xl border bg-white p-6">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-teal-wash">
                  <span className="text-base font-bold text-teal">{mentor.initials}</span>
                </div>
                <h4 className="text-lg">{mentor.name}</h4>
                <p className="mt-1 text-sm text-slate-muted leading-relaxed">{mentor.company}</p>
                <span className="mt-3 inline-block rounded-full bg-teal-wash px-3 py-0.5 text-xs font-semibold text-teal-deep">
                  {mentor.expertise}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains covered */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Coverage</p>
            <h2 className="mb-6">涵蓋領域</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "創投與早期投資",
                "半導體與硬科技",
                "AI / 機器學習",
                "網路科技與 SaaS",
                "生技醫療",
                "金融創投",
                "國際市場拓展",
                "法律與智財",
                "供應鏈與製造",
                "品牌與行銷",
              ].map((domain) => (
                <span key={domain} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
