export interface MockPost {
  id: string
  slug: string
  title: string
  excerpt: string
  feature_image: string
  feature_image_alt: string
  published_at: string
  reading_time: number
  primary_tag: { name: string; slug: string } | null
  primary_author: { name: string; profile_image: string | null } | null
  tags: { name: string; slug: string }[]
  html: string
}

export const MOCK_POSTS: MockPost[] = [
  {
    id: 'mock-1',
    slug: '2026-accelerator-opening',
    title: '2026 台大加速器開幕式：80 位創業者正式啟程',
    excerpt: '逾 80 位創業者與 40 位業師在台大共同揭開 2026 輔導計畫序幕，十個月的創業加速旅程正式展開。',
    feature_image: '/images/events/opening-2026-biggroup.jpg',
    feature_image_alt: '2026 輔導計畫開幕式大合照',
    published_at: '2026-03-15T10:00:00.000Z',
    reading_time: 4,
    primary_tag: { name: '計畫動態', slug: 'program-news' },
    primary_author: { name: 'NTUTEC 編輯部', profile_image: null },
    tags: [
      { name: '計畫動態', slug: 'program-news' },
      { name: '台大加速器', slug: 'accelerator' },
    ],
    html: `
      <p>2026 年 3 月，台大創創中心正式迎來年度最重要的時刻——台大加速器與台大車庫 2026 梯次聯合開幕式。超過 80 位新創創辦人、40 位業師，以及來自各大投資機構的代表，齊聚台大校園，共同見證新一批創業者踏上為期十個月的加速旅程。</p>

      <h2>開幕式亮點</h2>
      <p>今年的開幕式首次採用「創業者主場」形式，邀請 10 位往屆校友回台分享創業歷程，包括 MoBagel 創辦人陳智威、AmazingTalker 創辦人趙捷平，以及漸強實驗室執行長張育誠。他們從親身經驗出發，回答現場創業者最真實的疑問。</p>

      <h2>2026 梯次四大聚焦領域</h2>
      <p>今年輔導計畫持續聚焦 AI 軟體、生技醫療、硬科技與創新商模四大領域。台大創創中心執行長表示，隨著 AI 浪潮持續深化，今年 AI 軟體類別的申請量較去年成長逾 40%，顯示台大研究能量正在快速轉化為市場可投資的新創。</p>

      <h2>業師陣容再升級</h2>
      <p>2026 梯次共有 42 位陪跑業師參與，涵蓋連續創業者、企業創新長、VC 合夥人與技術顧問。每組新創將配對 2–3 位業師，進行為期十個月的定期 1:1 mentoring。</p>

      <p>開幕式結束後，所有參與者移師椰林大道旁的草坪，在輕鬆的 Networking 氛圍中展開第一輪業師媒合。許多創業者表示，這是他們第一次感受到「台大校園是自己的基地」。</p>
    `,
  },
  {
    id: 'mock-2',
    slug: 'demo-day-2025-recap',
    title: 'Demo Day 2025 回顧：74 位投資人見證 18 組新創 Pitch',
    excerpt: 'NTUTEC Demo Day 2025 吸引 74 位投資人到場，18 組新創完成 Demo，現場媒合率創歷年新高。',
    feature_image: '/images/events/opening-2026-pitching.jpg',
    feature_image_alt: '新創上台 Pitch 現場',
    published_at: '2025-11-20T10:00:00.000Z',
    reading_time: 5,
    primary_tag: { name: 'Demo Day', slug: 'demo-day' },
    primary_author: { name: 'NTUTEC 編輯部', profile_image: null },
    tags: [
      { name: 'Demo Day', slug: 'demo-day' },
      { name: '投資人', slug: 'investors' },
    ],
    html: `
      <p>2025 年 11 月，台大創創中心年度最重要的展演活動 Demo Day 於台大校內舉行。今年共有 18 組新創團隊完成正式 Pitch，吸引來自國內外共 74 位投資人、企業代表與媒體出席，創下歷年最高紀錄。</p>

      <h2>18 組新創，跨越四大領域</h2>
      <p>今年上台的 18 組新創分布於 AI 軟體（7 組）、生技醫療（5 組）、硬科技（4 組）與創新商模（2 組）。每組擁有 5 分鐘的 Pitch 時間與 3 分鐘的 Q&A，評審團由業師代表、VC 合夥人與企業創新長組成。</p>

      <h2>現場媒合率創新高</h2>
      <p>根據活動後問卷統計，超過 60% 的到場投資人表示有意進一步接觸至少一組新創，媒合意願率較 2024 年提升 18 個百分點。台大天使會成員更在會後即與三組新創啟動正式盡職調查（DD）流程。</p>

      <h2>最受矚目的三組新創</h2>
      <p>現場評審票選出三組最受矚目新創，分別是以 AI 驅動醫療影像分析的思輔科技、開發下一代固態電池材料的歐姆佳科技，以及打造 B2B SaaS 採購平台的 Hotcake。三組團隊均由台大在學或畢業生創辦，技術核心直接源自台大實驗室。</p>

      <p>台大創創中心執行長在閉幕致詞中表示：「Demo Day 不是終點，而是新創真正被市場看見的起點。我們期待這 18 組團隊，在接下來的一年內，讓台灣和世界看到台大創業生態的爆發力。」</p>
    `,
  },
  {
    id: 'mock-3',
    slug: 'ntu-angel-network-2026',
    title: '台大天使會 2026：早期投資如何與台大研究能量對接',
    excerpt: '台大天使會持續擴大規模，2026 年新增 12 位天使成員，累計投資超過 NT$1.2 億。',
    feature_image: '/images/events/opening-2026-networking.jpg',
    feature_image_alt: '業師與創業者交流 Networking',
    published_at: '2026-01-08T10:00:00.000Z',
    reading_time: 6,
    primary_tag: { name: '天使投資', slug: 'angel' },
    primary_author: { name: 'NTUTEC 編輯部', profile_image: null },
    tags: [
      { name: '天使投資', slug: 'angel' },
      { name: '台大天使會', slug: 'ntu-angel' },
    ],
    html: `
      <p>台大天使會成立至今，已成為台灣校園天使投資網絡中規模最具代表性的組織之一。2026 年初，天使會正式宣布新增 12 位成員，累計成員總數突破 80 人，涵蓋連續創業者、上市公司高管與海外歸台的科技創業者。</p>

      <h2>什麼是台大天使會？</h2>
      <p>台大天使會是台大創創中心旗下的早期投資人網絡，主要任務是讓台大校友投資人與台大新創之間建立有效的媒合橋樑。天使會成員優先接觸每年通過台大加速器篩選的新創團隊，並可在正式 Demo Day 前取得 preview 機會。</p>

      <h2>2026 年新增成員亮點</h2>
      <p>今年新加入的 12 位成員中，有 5 位具備美國矽谷創業或投資背景，3 位來自半導體與硬科技產業，另有 2 位是台大醫學院校友，專注於生醫新創的早期布局。成員的多元背景，讓天使會的產業覆蓋面進一步擴大。</p>

      <h2>從台大實驗室到天使輪</h2>
      <p>台大天使會的核心優勢，在於能夠在技術成熟度極早期的階段介入。透過與台大各院系研究室的長期合作，天使會成員得以在新創正式成立前，即接觸到具有市場潛力的研究成果。這種「研究室到投資人」的直連模式，是台大天使會有別於一般天使網絡的關鍵差異。</p>

      <p>有興趣了解台大天使會的投資人，可透過台大創創中心官網申請入會，每年招募兩次，下一輪申請截止日期為 2026 年 6 月 30 日。</p>
    `,
  },
]

export function getMockPostBySlug(slug: string): MockPost | null {
  return MOCK_POSTS.find((p) => p.slug === slug) ?? null
}
