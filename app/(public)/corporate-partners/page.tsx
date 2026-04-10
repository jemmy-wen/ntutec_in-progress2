import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "合作夥伴 | NTUTEC",
  description:
    "臺大創創中心累計 35 家合作企業，含 Nvidia、Synopsys、鴻海等國際大廠。透過企業垂直加速器、技術合作、創新教育等多元模式共創。",
};

interface Partner {
  name: string;
  type: string;
}

// Source: ntutec_report_114_annual.md §企業垂直加速器、ntutec_report_113_performance.md
// 累計 35 家企業合作（包含企業垂直加速器 27 隻 + 其他合作模式）
const partners: Partner[] = [
  // 國際大廠
  { name: "Nvidia", type: "國際科技" },
  { name: "Synopsys 新思科技", type: "半導體" },
  { name: "鴻海", type: "電子製造" },
  { name: "跨國康寧", type: "材料科技" },
  // 金融保險
  { name: "玉山銀行", type: "金融" },
  // 電信
  { name: "遠傳電信", type: "電信" },
  { name: "北捷", type: "智慧交通" },
  // 光電/電子
  { name: "友達光電", type: "光電" },
  { name: "華碩", type: "資訊" },
  { name: "宏碁", type: "資訊" },
  { name: "神達數位", type: "資訊" },
  { name: "圓展", type: "影音" },
  // 台積電（創新教育）
  { name: "台積電", type: "半導體" },
  // 製造
  { name: "金元福", type: "製造" },
  { name: "東源營造（遠雄）", type: "營造" },
  // 媒體出版
  { name: "聯合報", type: "媒體" },
  { name: "天下雜誌", type: "媒體" },
  { name: "時報出版", type: "出版" },
  { name: "親子天下", type: "出版" },
  { name: "東方線上", type: "數據" },
];

const badgeColor: Record<string, string> = {
  國際科技: "bg-teal/10 text-teal-deep",
  半導體: "bg-amber-100 text-amber-800",
  電子製造: "bg-emerald-100 text-emerald-800",
  材料科技: "bg-purple-100 text-purple-800",
  金融: "bg-blue-100 text-blue-800",
  電信: "bg-cyan-100 text-cyan-800",
  智慧交通: "bg-indigo-100 text-indigo-800",
  光電: "bg-yellow-100 text-yellow-800",
  資訊: "bg-slate-100 text-slate-700",
  影音: "bg-pink-100 text-pink-800",
  製造: "bg-orange-100 text-orange-800",
  營造: "bg-stone text-charcoal",
  媒體: "bg-rose-100 text-rose-800",
  出版: "bg-fuchsia-100 text-fuchsia-800",
  數據: "bg-lime-100 text-lime-800",
};

export default function CorporatePartnersPage() {
  return (
    <>
      <PageHero
        title="合作夥伴"
        subtitle="Our Partners"
        description="累計 35 家合作企業，透過企業垂直加速器、技術合作、創新教育等模式共創臺灣創新生態系。"
      />

      <section className="section-spacing">
        <div className="container">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-muted">
            臺大創創中心自 2019 年首創企業垂直加速器，累計與 35 家知名企業合作。合作模式涵蓋由企業出題、新創解題的垂直加速器、一對一技術合作、企業創新教育，以及跨國技術驗證等。
          </p>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner.name} className="card-hover rounded-2xl border bg-white p-6 text-center">
                <div className="mb-4 flex h-16 items-center justify-center rounded-xl bg-stone">
                  <span className="text-xs text-slate-muted">Logo</span>
                </div>
                <h3 className="mb-2 text-base font-semibold">{partner.name}</h3>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    badgeColor[partner.type] || "bg-stone text-charcoal"
                  }`}
                >
                  {partner.type}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-muted">
            * 以上為部分公開合作企業代表，完整 35 家名單請洽中心。
          </p>
        </div>
      </section>
    </>
  );
}
