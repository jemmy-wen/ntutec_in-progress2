/**
 * Vincent 欽點校友 SOT（來源：NTUTEC_Center_Introduction_20260317.pdf）
 * 每筆亮點都含外部資料來源 URL，可被驗證
 */

export interface AlumniSource {
  label: string;
  url: string;
}

export interface VincentAlumnus {
  name: string;                  // 公司名
  nameEn?: string;
  founder: string;               // 創辦人
  founderTitle: string;          // 職稱
  batchYear: number;             // 入駐年
  category: "edu" | "enterprise" | "sustainability" | "web3" | "health";
  sector: string;                // 領域一句話
  highlight: string;             // 近年亮點（一句話）
  sources: AlumniSource[];       // 資料來源
  companyUrl?: string;
}

export const VINCENT_ALUMNI: VincentAlumnus[] = [
  // ─────── 教育科技 ───────
  {
    name: "AmazingTalker",
    founder: "趙捷平",
    founderTitle: "創辦人暨執行長",
    batchYear: 2020,
    category: "edu",
    sector: "線上語言家教平台",
    highlight: "A 輪募資 NT$4.3 億（US$15.5M），年營收突破 NT$10 億，用戶遍及 190+ 國家。",
    sources: [
      { label: "數位時代 A 輪報導", url: "https://www.bnext.com.tw/article/67696/amazingtalker-a-round" },
      { label: "INSIDE 報導", url: "https://www.inside.com.tw/article/26717-amazing-talker" },
    ],
    companyUrl: "https://www.amazingtalker.com/",
  },
  {
    name: "知識衛星",
    nameEn: "SAT. Knowledge",
    founder: "游弘宇",
    founderTitle: "創辦人暨執行長",
    batchYear: 2020,
    category: "edu",
    sector: "精品大師線上課程",
    highlight: "2024 年營業額突破 NT$7 億，2025 高峰會 1,500 人參與、32 位老師。",
    sources: [
      { label: "關鍵評論網報導", url: "https://www.thenewslens.com/article/247363" },
      { label: "看雜誌報導", url: "https://www.watchinese.com/article/2024/26929" },
    ],
    companyUrl: "https://sat.cool/",
  },
  {
    name: "歐姆佳科技",
    nameEn: "OhmyAnt Tech",
    founder: "鞠志遠",
    founderTitle: "執行長",
    batchYear: 2021,
    category: "edu",
    sector: "高速 RF 射頻測量技術",
    highlight: "2025 新北市新創之星首獎，完成 A 輪募資 NT$6,000 萬，主攻日本市場。",
    sources: [
      { label: "INSIDE 新北新創之星報導", url: "https://www.inside.com.tw/feature/ntpc2025/40963-ntpc_venturestar2026_ohmplus" },
    ],
  },

  // ─────── 企業服務 ───────
  {
    name: "MoBagel 行動貝果",
    founder: "鍾哲民",
    founderTitle: "創辦人暨執行長",
    batchYear: 2019,
    category: "enterprise",
    sector: "AutoML / 企業 AI 數據平台",
    highlight: "累計募資 US$21M+，服務 3,000+ 品牌（含 Fortune 500），2026 Q1 獲台大天使會投資。",
    sources: [
      { label: "INSIDE A+ 輪報導", url: "https://www.inside.com.tw/article/27055-mobagel" },
      { label: "工商時報 AI 專訪", url: "https://ctee.com.tw/industrynews/technology/317716.html" },
    ],
    companyUrl: "https://www.mobagel.com/",
  },
  {
    name: "漸強實驗室",
    nameEn: "Crescendo Lab",
    founder: "薛覲",
    founderTitle: "共同創辦人暨執行長",
    batchYear: 2018,
    category: "enterprise",
    sector: "AI 對話雲平台、行銷科技",
    highlight: "服務 700+ 亞洲品牌（H&M、IKEA、Rakuten），2025 導入 Google Agentspace。",
    sources: [
      { label: "Compotech Asia 2025 報導", url: "https://www.compotechasia.com/a/press/2025/0613/60973.html" },
    ],
    companyUrl: "https://www.cresclab.com/",
  },
  {
    name: "方格子",
    nameEn: "vocus",
    founder: "翁子騏",
    founderTitle: "共同創辦人暨執行長",
    batchYear: 2019,
    category: "enterprise",
    sector: "華文內容訂閱平台",
    highlight: "月均 200 萬不重複造訪、會員 72 萬、創作者 2 萬+。",
    sources: [
      { label: "數位時代報導", url: "https://www.bnext.com.tw/article/63252/vocus-2021" },
    ],
    companyUrl: "https://vocus.cc/",
  },
  {
    name: "Hotcake 夯客",
    founder: "王嘉宏",
    founderTitle: "創辦人暨執行長",
    batchYear: 2020,
    category: "enterprise",
    sector: "美業預約與會員系統",
    highlight: "Pre-A 輪 US$1M+（統一國際開發領投），商家續訂率 98%，2025 拓展日泰。",
    sources: [
      { label: "創業小聚 Pre-A 報導", url: "https://meet.bnext.com.tw/articles/view/52246" },
      { label: "Startup101 報導", url: "https://startup101.biz/en-US/news/240" },
    ],
    companyUrl: "https://hotcake.app/",
  },
  {
    name: "3drens 三維人",
    founder: "余嘉淵",
    founderTitle: "創辦人暨執行長",
    batchYear: 2019,
    category: "enterprise",
    sector: "車聯網 × IoT × 大數據",
    highlight: "募得近 NT$1 億（台杉、活水、廣信領投），客戶含 yoxi、PChome。",
    sources: [
      { label: "AppWorks 專訪", url: "https://appworks.tw/3drens-interview/" },
    ],
    companyUrl: "https://tms.3drens.com/",
  },

  // ─────── 永續循環 ───────
  {
    name: "ECOCO 宜可可",
    founder: "李漢揚",
    founderTitle: "執行長",
    batchYear: 2021,
    category: "sustainability",
    sector: "智慧回收 × 循環經濟",
    highlight: "2024 完成億元 Pre-A 輪（台塑生醫領投），AI 回收再生率 95%，合作 70+ 品牌。",
    sources: [
      { label: "ECOCO 官方募資公告", url: "https://www.ecocogroup.com/2024/03/01/ecoco-%E5%BE%AA%E7%92%B0%E7%B6%93%E6%BF%9F%E5%AE%8C%E6%88%90-pre-a-%E8%BC%AA%E5%84%84%E5%85%83%E5%8B%9F%E8%B3%87%EF%BC%8C%E6%9D%B1%E5%8D%97%E4%BA%9E%E4%BD%88%E5%B1%80%E6%89%93%E9%80%A0%E6%99%BA/" },
    ],
    companyUrl: "https://www.ecocogroup.com/",
  },
  {
    name: "配客嘉",
    nameEn: "PackAge+",
    founder: "葉德偉",
    founderTitle: "創辦人暨執行長",
    batchYear: 2021,
    category: "sustainability",
    sector: "電商循環包裝生態系",
    highlight: "Pre-A 輪 NT$5,200 萬（國發基金、中信、彰銀），合作 200+ 企業，拓展東南亞。",
    sources: [
      { label: "經濟日報 Pre-A 報導", url: "https://money.udn.com/money/story/10860/7050336" },
    ],
    companyUrl: "https://package-plus.com/",
  },
  {
    name: "Datayoo 悠由數據",
    founder: "吳君孝",
    founderTitle: "創辦人暨總經理",
    batchYear: 2021,
    category: "sustainability",
    sector: "農業 × AI × 氣候韌性",
    highlight: "服務農地 6,000+ 公頃，與 Qualcomm 完成全球首個農作邊緣晶片；2021 首家與 WFO 合作新創。",
    sources: [
      { label: "經濟部國家產業創新獎", url: "https://service.moea.gov.tw/EE514/tw/niia/290-2492.html" },
      { label: "經濟日報北菱合作", url: "https://money.udn.com/money/story/11799/8563459" },
    ],
    companyUrl: "https://datayoo.com.tw/",
  },

  // ─────── Web3 / 區塊鏈 ───────
  {
    name: "KryptoGO 重量科技",
    founder: "歐曜瑋",
    founderTitle: "創辦人暨執行長",
    batchYear: 2020,
    category: "web3",
    sector: "虛擬資產監理科技（RegTech）",
    highlight: "服務 40+ 銀行/政府/虛擬資產業者，入選微軟新創加速器（131 選 18）。",
    sources: [
      { label: "INSIDE 報導", url: "https://www.inside.com.tw/article/33860-KryptoGO" },
    ],
  },
  {
    name: "Turing Space",
    founder: "胡耀傑",
    founderTitle: "創辦人暨執行長",
    batchYear: 2020,
    category: "web3",
    sector: "數位身份 × 區塊鏈信任科技",
    highlight: "策略輪累計募資 NT$1 億+，WHO 委託開發數位國際青年證（160 國）。",
    sources: [
      { label: "資安人科技網策略輪報導", url: "https://www.informationsecurity.com.tw/article/article_detail.aspx?aid=11384" },
      { label: "創業小聚 6000 萬募資報導", url: "https://meet.bnext.com.tw/articles/view/51830" },
    ],
    companyUrl: "https://turingcerts.com/",
  },

  // ─────── 健康照護 ───────
  {
    name: "Home心",
    founder: "蕭存佑",
    founderTitle: "創辦人暨執行長",
    batchYear: 2020,
    category: "health",
    sector: "醫院看護 × 居家照護媒合",
    highlight: "3,000+ 照服員、10,000+ 媒合案件，最快 7 秒配對，LINE 整合。",
    sources: [
      { label: "LINE 官方 BLOG", url: "https://line-tw-official.weblog.to/archives/27179746.html" },
    ],
  },
  {
    name: "思輔科技",
    nameEn: "SAVFE",
    founder: "周皓凱",
    founderTitle: "創辦人暨執行長",
    batchYear: 2024,
    category: "health",
    sector: "醫療機器人 × 微創手術導引",
    highlight: "2025 國家新創獎，亞東醫院場域驗證，2026 Q1 獲台大天使會投資。",
    sources: [
      { label: "國家新創獎官方頁", url: "https://innoaward.taiwan-healthcare.org/award_detail.php?REFDOCTYPID=0mge2rck644mcfl0&num=1&REFDOCID=0sq2hwdu6fedv1i8" },
    ],
  },
];

export const CATEGORY_META = {
  edu: { label: "教育科技", color: "bg-blue-50 text-blue-700 border-blue-200" },
  enterprise: { label: "企業服務", color: "bg-teal-wash text-teal border-teal/30" },
  sustainability: { label: "永續循環", color: "bg-green-50 text-green-700 border-green-200" },
  web3: { label: "Web3 區塊鏈", color: "bg-purple-50 text-purple-700 border-purple-200" },
  health: { label: "健康照護", color: "bg-rose-50 text-rose-700 border-rose-200" },
} as const;
