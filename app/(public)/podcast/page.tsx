import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "TEC Talk Podcast | NTUTEC",
  description:
    "TEC Talk 是台大創創中心的 Podcast 頻道，專訪創業業師、新創創辦人與產業專家，分享創業心法與產業洞察。",
};

const episodes = [
  {
    date: "2024-07-18",
    series: "",
    title: "探索創新與影響力投資",
    subtitle: "專訪活水影響力投資共同創辦人 陳一強",
    desc: "深入探討影響力投資的本質，以及如何在追求財務回報的同時，創造社會與環境的正面影響。",
    href: "https://open.firstory.me/story/clyijgdvc07da01zs7xz0h9t8/platforms",
  },
  {
    date: "2023-02-06",
    series: "創新前線 EP.3",
    title: "從系統出發，推動傳統產業數位化",
    subtitle: "專訪樂多科技創辦人 楊景棠 Rony",
    desc: "從傳統產業的痛點出發，談如何以系統性思維推動數位轉型，打造可複製的創新模式。",
  },
  {
    date: "2022-11-28",
    series: "創創咖啡館 EP.3",
    title: "創創聊人才",
    subtitle: "專訪藝珂集團台灣暨南韓區總經理 陳玉芬 Cindy Chen",
    desc: "從人才招募專家的視角，探討新創如何吸引頂尖人才、建立高效能團隊文化。",
  },
  {
    date: "2022-05-26",
    series: "創新前線 EP.2",
    title: "零背景也能跨領域創業",
    subtitle: "專訪慧景科技執行長 黃建峯 Cardy、產品總監 陳韋婷 Jubi",
    desc: "沒有科技背景，照樣創辦 AI 新創？兩位創辦人分享如何突破背景限制，打造成功產品。",
  },
  {
    date: "2022-04-01",
    series: "S2 EP.8",
    title: "新創的組織運作心法",
    subtitle: "專訪創業業師、ITIC 總經理 瞿志豪",
    desc: "從大企業高管到創業顧問，談新創在快速成長期如何建立有效的組織架構與決策機制。",
  },
  {
    date: "2022-02-18",
    series: "S2 EP.7",
    title: "揭開新創加速器的神秘面紗",
    subtitle: "專訪 LINE 前總經理 陶韻智 Sting 與循環經濟新創 ECOCO 創辦人 Andrew",
    desc: "加速器能為新創帶來什麼？從業師與新創兩個角度，深度解析加速器的運作模式與價值。",
  },
  {
    date: "2022-01-05",
    series: "S2 EP.6",
    title: "如何建立高效率的新創團隊？（下）",
    subtitle: "專訪創業業師、亞馬遜前全球副總裁 洪小玲 Charlene",
    desc: "延續上集，深入探討新創在擴張期面臨的團隊管理挑戰，以及如何建立健康的組織文化。",
  },
  {
    date: "2022-01-04",
    series: "S2 EP.5",
    title: "如何打造偉大的團隊？（上）",
    subtitle: "專訪創業業師、亞馬遜前全球副總裁 洪小玲 Charlene",
    desc: "從亞馬遜全球副總裁的視角，分享打造高效新創團隊的核心原則與實戰方法。",
  },
  {
    date: "2021-11-16",
    series: "S2 EP.4",
    title: "產品的市場機會在哪裡？",
    subtitle: "專訪創業業師、亞馬遜前全球副總裁 洪小玲 Charlene",
    desc: "如何從市場中找到真正的痛點？如何驗證產品假設？洪小玲分享她在亞馬遜學到的市場洞察方法。",
  },
  {
    date: "2021-10-20",
    series: "S2 EP.3",
    title: "如何進行使用者洞察？",
    subtitle: "專訪創業業師、LINE 前總經理 陶韻智",
    desc: "使用者洞察是產品開發的核心。陶韻智分享他在 LINE 的實戰經驗，以及如何系統性地理解用戶需求。",
  },
];

const FIRSTORY_URL = 'https://open.firstory.me/user/ntutec'

const platforms = [
  { emoji: "🎙️", name: "Firstory", href: FIRSTORY_URL },
  { emoji: "🎵", name: "Apple Podcasts", href: "https://podcasts.apple.com/tw/podcast/tec-talk/id1581567868" },
  { emoji: "▶️", name: "YouTube", href: 'https://www.youtube.com/results?search_query=TEC+Talk+NTUTEC' },
];

export default function PodcastPage() {
  return (
    <>
      <PageHero
        title="TEC Talk"
        subtitle="Podcast"
        description="由台大創創中心製作，深度專訪創業業師、新創創辦人與產業專家，帶你探索創業的每一個面向。"
      />

      {/* About Section */}
      <section className="section-spacing">
        <div className="container">
          <p className="micro-label mb-4">About</p>
          <h2 className="mb-12">關於 TEC Talk</h2>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="text-slate-muted leading-relaxed">
                TEC Talk 是台大創創中心的官方 Podcast，自 2021
                年開播，節目邀請台大創創中心的業師、知名創業者與產業專家，分享第一線的創業經驗、投資觀點與產業趨勢。
              </p>
              <p className="mt-4 text-slate-muted leading-relaxed">
                無論你是正在考慮創業的在校生、尋求突破的創業者，或是對新創生態系感興趣的從業者，TEC
                Talk 都能為你帶來實戰洞見。
              </p>
            </div>
            <div className="rounded-2xl bg-teal-wash p-8">
              <p className="text-4xl text-center">🎙️</p>
              <h3 className="text-teal font-bold text-center mt-4">37</h3>
              <p className="text-center text-slate-muted">集深度訪談</p>
              <hr className="my-4 border-stone-warm" />
              <h3 className="text-teal font-bold text-center mt-4">2021</h3>
              <p className="text-center text-slate-muted">年開播至今</p>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <p className="micro-label mb-4">Episodes</p>
          <h2 className="mb-12">精選集數</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {episodes.map((ep) => (
              <div
                key={ep.title}
                className={`rounded-2xl bg-white p-6 hover:shadow-md transition-shadow${ep.href ? " relative" : ""}`}
              >
                {ep.href && (
                  <Link
                    href={ep.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 rounded-2xl"
                    aria-label={`收聽 ${ep.title}`}
                  />
                )}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    {ep.series && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal text-white mr-2">
                        {ep.series}
                      </span>
                    )}
                    <span className="text-xs text-slate-muted">{ep.date}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-1">
                  {ep.title}
                </h3>
                <p className="text-sm text-teal-deep font-medium mb-3">
                  {ep.subtitle}
                </p>
                <p className="text-sm text-slate-muted leading-relaxed">
                  {ep.desc}
                </p>
                {ep.href && (
                  <p className="mt-3 text-xs font-semibold text-teal">
                    ▶ 點擊收聽
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Listen */}
      <section className="section-spacing bg-white">
        <div className="container">
          <p className="micro-label mb-4">Listen</p>
          <h2 className="mb-8">收聽平台</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 mx-auto max-w-2xl">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-stone-warm bg-stone p-5 text-center block hover:border-teal/40 hover:bg-teal-wash transition-colors"
              >
                <p className="text-3xl mb-2">{platform.emoji}</p>
                <p className="text-sm font-semibold text-charcoal">
                  {platform.name}
                </p>
                <p className="text-xs text-slate-muted">前往收聽</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-teal-wash">
        <div className="container text-center">
          <h2 className="mb-6">不想錯過最新集數？</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-muted">
            訂閱台大創創中心電子報，每月收到新集數通知與創業相關資訊。
          </p>
          <Link href="/contact" className="btn-pill-primary">
            訂閱電子報
          </Link>
        </div>
      </section>
    </>
  );
}
