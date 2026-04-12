import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "成功校友 | NTUTEC",
  description:
    "13 年、逾 600 支團隊，從台大走向世界。配客嘉 A 輪逾 NT$1 億、Botbonnie 被 Appier 收購、艾斯創 SelectUSA 冠軍——見證 NTUTEC 校友的國際里程碑。",
};

const exitCases = [
  {
    company: "Botbonnie",
    acquirer: "→ Appier",
    domain: "對話式行銷平台",
    desc: "被日本上市 AI 公司 Appier 收購",
    tags: ["#MarTech", "#Exit", "#日本市場"],
  },
  {
    company: "Dapp Pocket",
    acquirer: "",
    domain: "區塊鏈錢包應用",
    desc: "完成國際 Exit，進入加密貨幣生態系",
    tags: ["#Web3", "#Blockchain", "#Exit"],
  },
];

const milestoneCases = [
  {
    company: "配客嘉",
    companyEn: "PackAge+",
    domain: "循環經濟 ESG",
    highlight: "A 輪逾 NT$1 億",
    desc: "台灣首創循環包裝平台，獲國發基金投資，推動網購零廢棄。",
    source: "2025年年報",
  },
  {
    company: "艾斯創生醫",
    companyEn: "Aistrom",
    domain: "MedTech 骨科",
    highlight: "SelectUSA MedTech 冠軍 · US$250萬",
    desc: "骨科微創手術器材，獲美國最大投資促進賽冠軍，完成 250 萬美元募資。",
    source: "2025年年報",
  },
  {
    company: "真實引擎",
    companyEn: "Portaly",
    domain: "ContentTool",
    highlight: "獲投 US$35萬",
    desc: "Link-in-bio 數位名片平台，2022 Demo Day Pitch 後獲 AVA Angels 投資。",
    source: "112年報 / 2022 Demo Day",
  },
  {
    company: "律果科技",
    companyEn: "LegalSign.ai",
    domain: "LegalTech AI",
    highlight: "HBR 哈佛商業評論報導",
    desc: "AI 合約管理平台，獲《哈佛商業評論》專文，榮獲經濟部白科技獎。",
    source: "2025年年報",
  },
  {
    company: "股股",
    companyEn: "GUGU",
    domain: "FinTech GenZ",
    highlight: "美股開戶破 2 萬",
    desc: "Gen Z 美股免手續費平台，已布局新馬港市場。",
    source: "2024 梯次健診",
  },
  {
    company: "幻控科技",
    companyEn: "Jmem Tek",
    domain: "DeepTech 3D顯示",
    highlight: "Touch Taiwan 友達發明獎冠軍",
    desc: "裸眼 3D 懸浮顯示技術，與三菱電梯、NEC 展開合作。",
    source: "2024 梯次健診",
  },
];

const moreAlumni = [
  "媽爹講故事",
  "水滴",
  "精拓生技",
  "SHOWHUE 選優科技",
  "SURREAL 超現實科技",
  "Aistrom 艾斯創生醫",
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
  "GUGU 股股",
  "Jmem Tek 幻控科技",
  "Portaly 真實引擎",
  "LegalSign.ai 律果科技",
];

export default function AlumniPage() {
  return (
    <>
      {/* Section 1: PageHero */}
      <PageHero
        title="成功校友"
        subtitle="Success Stories"
        description="13 年、逾 600 支團隊，從台大走向世界。以下是部分校友里程碑。"
      />

      {/* Section 2: Stats Banner */}
      <section className="section-spacing bg-teal-wash">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { number: "600+", label: "歷年輔導新創團隊" },
              { number: "NT$1 億+", label: "單筆最高 A 輪募資（配客嘉）" },
              { number: "2", label: "成功國際 Exit 案例" },
              { number: "US$250萬", label: "國際競賽冠軍募資（艾斯創）" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-teal">{stat.number}</p>
                <p className="mt-1 text-sm text-slate-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Exit 榮譽榜 */}
      <section className="section-spacing bg-charcoal">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4 text-white/60">
              THE ULTIMATE MILESTONE
            </p>
            <h2 className="mb-4 text-white">Exit &amp; M&amp;A 成功退場</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              被國際企業收購，是新創成功的最高驗證。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {exitCases.map((item) => (
              <div
                key={item.company}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="text-2xl text-yellow-400">✦</span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.company}
                      {item.acquirer && (
                        <span className="ml-2 text-teal text-base font-normal">
                          {item.acquirer}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-white/60">{item.domain}</p>
                  </div>
                </div>
                <p className="mb-4 text-white/80">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: 募資亮點案例 */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">FUNDRAISING MILESTONES</p>
            <h2 className="mb-4">募資與國際里程碑</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              從種子輪到 A 輪，從國內競賽到國際舞台，校友們持續突破。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {milestoneCases.map((item) => (
              <div
                key={item.company}
                className="rounded-2xl border border-stone-warm/60 bg-white p-6 card-hover"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{item.company}</h3>
                    <p className="text-sm text-slate-muted">{item.companyEn}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-stone px-2.5 py-0.5 text-xs font-medium text-charcoal">
                    {item.domain}
                  </span>
                </div>
                <p className="mb-3 text-2xl font-bold text-teal">
                  {item.highlight}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-slate-muted">
                  {item.desc}
                </p>
                <p className="text-xs text-slate-muted/60">
                  來源：{item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: 更多校友 */}
      <section className="section-spacing bg-stone">
        <div className="container text-center">
          <p className="micro-label mb-4">More Alumni</p>
          <h2 className="mb-4">更多輔導校友</h2>
          <p className="mb-10 text-slate-muted">
            以下是部分歷屆參與台大加速器與台大車庫的校友團隊：
          </p>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
            {moreAlumni.map((name) => (
              <span
                key={name}
                className="rounded-full border border-stone-warm bg-white px-4 py-2 text-sm text-charcoal"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">成為下一個成功校友</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            加入台大加速器或台大車庫，獲得導師輔導、資金媒合與生態系支持。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
