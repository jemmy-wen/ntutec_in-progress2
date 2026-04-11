import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "校友新創 | NTUTEC",
  description:
    "台大創創中心輔導超過 600 支新創團隊，培育出多家完成募資、獲得國際認可的知名校友企業。",
};

const featuredAlumni = [
  {
    initials: "配",
    company: "配客嘉",
    domain: "循環包裝",
    desc: "台灣首創循環包裝平台，讓網購包材得以重複使用。獲多輪融資，成為台灣循環經濟代表新創之一，並獲媒體廣泛報導。",
  },
  {
    initials: "Pi",
    company: "PicSee",
    domain: "行銷科技",
    desc: "社群網址縮短與預覽圖自訂工具，服務超過百萬用戶。產品簡單易用，已成為台灣行銷人員必備工具。",
  },
  {
    initials: "醫",
    company: "醫光生技",
    domain: "生醫/醫材",
    desc: "開發創新醫療光學技術，專注於眼科與醫療器材領域，獲得天使投資人青睞，持續推進商業化進程。",
  },
  {
    initials: "Gi",
    company: "Giftpack",
    domain: "企業贈禮 AI",
    desc: "以 AI 驅動的企業禮物個人化平台，進軍美國市場，服務多家跨國企業，完成海外融資。",
  },
  {
    initials: "Wa",
    company: "WaCare",
    domain: "遠距照護",
    desc: "台灣領先的居家照護媒合平台，連結照護需求家庭與專業照護人員，疫情期間業務快速成長。",
  },
  {
    initials: "Bo",
    company: "BotBonnie",
    domain: "對話式行銷",
    desc: "企業級對話式行銷自動化平台，協助品牌經營 LINE、Facebook 等社群渠道，累計服務超過千家企業。",
  },
];

const moreAlumni = [
  "媽爹講故事",
  "水滴",
  "精拓生技",
  "SHOWHUE 選優科技",
  "SURREAL 超現實科技",
  "Astron Medtech 艾斯創生醫",
  "澔心科技",
  "Encore 安可日子",
  "Amago Trip",
  "Applato",
  "MangaChat 漫話科技",
  "KOLpass",
  "ArtzyPlanet 玩藝星球",
  "發票特務",
  "UFO pay 優付",
  "Tracle 垃可",
  "科學毛怪",
  "ECOCO",
];

const angelPortfolio = [
  {
    initials: "醫",
    company: "醫光生技",
    domain: "生醫/醫材",
    desc: "眼科醫療光學技術新創。",
  },
  {
    initials: "Pi",
    company: "PicSee",
    domain: "行銷科技",
    desc: "社群行銷工具，百萬用戶規模。",
  },
  {
    initials: "配",
    company: "配客家",
    domain: "循環包裝",
    desc: "台灣循環包裝先驅。",
  },
];

export default function AlumniPage() {
  return (
    <>
      <PageHero
        title="校友新創"
        subtitle="Alumni Startups"
        description="超過 600 支輔導團隊，13 年來培育出眾多在各領域發光發熱的新創。以下是部分令我們驕傲的校友故事。"
      />

      {/* Stats Banner */}
      <section className="section-spacing bg-teal-wash">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { number: "600+", label: "輔導新創團隊" },
              { number: "13", label: "年輔導經驗" },
              { number: "42", label: "業師陣容" },
              { number: "35+", label: "企業合作夥伴" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-teal">{stat.number}</p>
                <p className="mt-1 text-sm text-slate-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Featured Alumni</p>
            <h2 className="mb-4">知名校友新創</h2>
            <p className="mb-12 mx-auto max-w-2xl text-lg text-slate-muted text-center">
              以下校友團隊曾參與台大創創中心加速器或車庫孵化器，並在各自領域取得突出成就。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredAlumni.map((alumni) => (
              <div
                key={alumni.company}
                className="rounded-2xl bg-white border border-stone-warm/60 p-6 card-hover"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-light text-lg font-bold text-teal-deep">
                    {alumni.initials}
                  </div>
                  <h3 className="text-lg font-semibold">{alumni.company}</h3>
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-stone text-charcoal">
                  {alumni.domain}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                  {alumni.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Alumni */}
      <section className="section-spacing bg-stone">
        <div className="container text-center">
          <p className="micro-label mb-4">More Alumni</p>
          <h2 className="mb-4">更多輔導校友</h2>
          <p className="mb-10 text-slate-muted">
            以下是部分歷屆參與台大創創加速器與車庫孵化器的校友團隊：
          </p>
          <div className="flex flex-wrap gap-2 max-w-3xl mx-auto justify-center">
            {moreAlumni.map((name) => (
              <span
                key={name}
                className="rounded-full bg-white border border-stone-warm px-4 py-2 text-sm text-charcoal"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Angel Club Portfolio */}
      <section className="section-spacing bg-white">
        <div className="container text-center">
          <p className="micro-label mb-4">Angel Club Portfolio</p>
          <h2 className="mb-4">天使俱樂部代表案例</h2>
          <p className="mb-8 mx-auto max-w-xl text-slate-muted text-center">
            以下新創曾獲台大創創天使投資俱樂部會員關注與支持：
          </p>
          <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
            {angelPortfolio.map((item) => (
              <div
                key={item.company}
                className="rounded-2xl bg-white border border-stone-warm/60 p-6 card-hover"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-light text-lg font-bold text-teal-deep">
                    {item.initials}
                  </div>
                  <h3 className="text-lg font-semibold">{item.company}</h3>
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-stone text-charcoal">
                  {item.domain}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">成為下一個成功校友</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            每年兩梯次招募，加入台大創創加速器或車庫孵化器，獲得導師輔導、資金媒合與生態系支持。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="btn-pill-primary">
              提前登記申請
            </Link>
            <Link href="/programs" className="btn-pill-outline">
              了解計畫方案
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
