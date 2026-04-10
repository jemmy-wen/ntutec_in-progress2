import type { Metadata } from "next";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "合作夥伴 | NTUTEC",
  description:
    "臺大創創中心的合作企業與機構夥伴，共同推動創新創業生態系發展。",
};

const partners = [
  {
    name: "台積電",
    type: "技術合作",
    description: "半導體前沿技術共創，支持新創團隊進行晶片設計與驗證。",
  },
  {
    name: "中華電信",
    type: "加速器共創",
    description: "5G 與 AIoT 應用場景開發，提供新創團隊測試環境與市場通路。",
  },
  {
    name: "國泰金控",
    type: "策略投資",
    description: "金融科技創新合作，協助新創團隊對接金融場景與資金資源。",
  },
  {
    name: "台達電子",
    type: "技術合作",
    description: "綠能與智慧製造領域的產學合作，推動永續科技商業化。",
  },
  {
    name: "緯創資通",
    type: "加速器共創",
    description: "AIoT 與智慧醫療解決方案共同開發，提供硬體製造資源。",
  },
  {
    name: "遠傳電信",
    type: "聯合活動",
    description: "共同舉辦創新論壇與 Demo Day，促進新創與企業的深度交流。",
  },
  {
    name: "研華科技",
    type: "技術合作",
    description: "工業物聯網平台合作，為新創提供邊緣運算與雲端服務資源。",
  },
  {
    name: "AWS",
    type: "資源贊助",
    description: "提供雲端運算資源與技術培訓，加速新創團隊的產品開發。",
  },
];

const badgeColor: Record<string, string> = {
  技術合作: "bg-teal/10 text-teal-deep",
  加速器共創: "bg-amber-100 text-amber-800",
  策略投資: "bg-emerald-100 text-emerald-800",
  聯合活動: "bg-purple-100 text-purple-800",
  資源贊助: "bg-blue-100 text-blue-800",
};

export default function CorporatePartnersPage() {
  return (
    <>
      <PageHero
        title="合作夥伴"
        subtitle="Our Partners"
        description="攜手產業領袖，共同打造最具影響力的創新創業生態系。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="card-hover rounded-2xl bg-white p-6"
              >
                {/* Logo placeholder */}
                <div className="mb-4 flex h-20 items-center justify-center rounded-xl bg-stone">
                  <span className="text-sm text-slate-muted">Logo</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{partner.name}</h3>
                <span
                  className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    badgeColor[partner.type] || "bg-stone text-charcoal"
                  }`}
                >
                  {partner.type}
                </span>
                <p className="text-sm text-slate-muted leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
