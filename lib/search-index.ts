export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: "頁面" | "業師" | "新創團隊" | "常見問題";
  keywords: string[];
}

// ── 頁面 ───────────────────────────────────────────────────────────────────
const PAGES: SearchItem[] = [
  {
    title: "首頁",
    description: "台大創創中心 NTUTEC — 台大創業生態系實戰基地",
    href: "/",
    category: "頁面",
    keywords: ["首頁", "NTUTEC", "台大創創", "TEC"],
  },
  {
    title: "台大加速器",
    description: "已有 MVP 或初期營收的成長期新創，為期十個月的深度輔導計畫",
    href: "/accelerator",
    category: "頁面",
    keywords: ["加速器", "accelerator", "新創", "輔導", "申請", "MVP"],
  },
  {
    title: "台大車庫",
    description: "概念驗證至 MVP 階段的早期創業者，免費虛擬進駐與社群支持",
    href: "/garage",
    category: "頁面",
    keywords: ["車庫", "garage", "早期", "新創", "台大學生", "創業"],
  },
  {
    title: "校友新創",
    description: "台大校友創業資源、校友網絡與輔導支持",
    href: "/alumni",
    category: "頁面",
    keywords: ["校友", "alumni", "台大校友", "新創"],
  },
  {
    title: "計畫申請",
    description: "預約登記 2027 梯次申請，加速器與車庫計畫報名",
    href: "/apply",
    category: "頁面",
    keywords: ["申請", "apply", "報名", "2027", "登記"],
  },
  {
    title: "企業合作總覽",
    description: "企業垂直加速器、聯合活動、案源媒合與諮詢服務",
    href: "/corporate",
    category: "頁面",
    keywords: ["企業", "合作", "corporate", "垂直加速器", "諮詢"],
  },
  {
    title: "合作夥伴",
    description: "歷年企業合作夥伴與贊助企業一覽",
    href: "/corporate-partners",
    category: "頁面",
    keywords: ["合作夥伴", "partners", "企業", "贊助"],
  },
  {
    title: "聯合活動",
    description: "與企業共同舉辦的活動、黑客松與論壇",
    href: "/co-events",
    category: "頁面",
    keywords: ["聯合活動", "co-events", "黑客松", "hackathon", "論壇"],
  },
  {
    title: "諮詢服務",
    description: "企業創新策略諮詢，開放式創新規劃與內部創業",
    href: "/consulting",
    category: "頁面",
    keywords: ["諮詢", "consulting", "顧問", "創新策略", "CVC"],
  },
  {
    title: "台大天使會",
    description: "NTUTEC ANGELS — 台大天使投資社群，每月天使例會",
    href: "/angel",
    category: "頁面",
    keywords: ["天使", "angel", "投資", "天使例會", "Angels Club", "NTUTEC ANGELS"],
  },
  {
    title: "申請入會 — 台大天使會",
    description: "填寫入會諮詢表單，加入 NTUTEC ANGELS 天使會",
    href: "/angel-apply",
    category: "頁面",
    keywords: ["天使入會", "angel apply", "投資人", "加入天使會"],
  },
  {
    title: "新創投遞",
    description: "投遞創業計畫給台大天使會，接受盡調評估",
    href: "/pitch",
    category: "頁面",
    keywords: ["投遞", "pitch", "新創", "募資", "盡調"],
  },
  {
    title: "關於 TEC",
    description: "台大創創中心的使命、歷史與願景",
    href: "/about",
    category: "頁面",
    keywords: ["關於", "about", "使命", "歷史", "NTUTEC"],
  },
  {
    title: "我們的團隊",
    description: "台大創創中心核心團隊成員介紹",
    href: "/team",
    category: "頁面",
    keywords: ["團隊", "team", "成員", "工作人員"],
  },
  {
    title: "業師",
    description: "40+ 位資深業師，涵蓋投資人、創業家、企業高管與產業專家",
    href: "/mentors",
    category: "頁面",
    keywords: ["業師", "mentors", "導師", "輔導", "投資人"],
  },
  {
    title: "諮詢委員會",
    description: "Advisory Board — 資深產業領袖與投資人組成的顧問委員會",
    href: "/advisory-board",
    category: "頁面",
    keywords: ["諮詢委員會", "advisory board", "顧問", "委員"],
  },
  {
    title: "加入我們",
    description: "台大創創中心職缺，加入台大創業生態系的最前線",
    href: "/careers",
    category: "頁面",
    keywords: ["加入", "careers", "職缺", "工作", "徵才"],
  },
  {
    title: "最新消息",
    description: "台大創創中心官方消息與媒體報導",
    href: "/news",
    category: "頁面",
    keywords: ["消息", "news", "新聞", "媒體"],
  },
  {
    title: "活動",
    description: "台大創創中心近期與即將舉辦的活動",
    href: "/events",
    category: "頁面",
    keywords: ["活動", "events", "講座", "工作坊"],
  },
  {
    title: "Demo Day",
    description: "年度成果展暨投資媒合活動，精選新創向投資人 Pitch",
    href: "/demo-day",
    category: "頁面",
    keywords: ["Demo Day", "成果展", "年度", "投資媒合", "pitch"],
  },
  {
    title: "部落格",
    description: "創業知識、產業洞察與中心最新文章",
    href: "/blog",
    category: "頁面",
    keywords: ["部落格", "blog", "文章", "知識"],
  },
  {
    title: "TEC Talk Podcast",
    description: "台大創創中心 Podcast 節目，創業者第一手觀點",
    href: "/podcast",
    category: "頁面",
    keywords: ["podcast", "TEC Talk", "廣播", "節目"],
  },
  {
    title: "常見問題",
    description: "申請、計畫、台大天使會與企業合作的常見問題解答",
    href: "/faq",
    category: "頁面",
    keywords: ["FAQ", "常見問題", "Q&A", "疑問"],
  },
  {
    title: "聯絡我們",
    description: "台大創創中心聯絡方式與辦公室位置",
    href: "/contact",
    category: "頁面",
    keywords: ["聯絡", "contact", "地址", "辦公室", "email"],
  },
  {
    title: "新創團隊",
    description: "2026 梯次 43 支優秀新創團隊",
    href: "/startups",
    category: "頁面",
    keywords: ["新創", "startups", "團隊", "2026", "portfolio"],
  },
  {
    title: "TEC Deals",
    description: "會員專屬優惠方案與資源",
    href: "/tec-deals",
    category: "頁面",
    keywords: ["deals", "優惠", "會員", "資源"],
  },
  {
    title: "隱私政策",
    description: "台大創創中心個人資料保護與隱私政策",
    href: "/privacy",
    category: "頁面",
    keywords: ["隱私", "privacy", "個資", "政策"],
  },
  {
    title: "服務條款",
    description: "台大創創中心網站服務條款與使用規範",
    href: "/terms",
    category: "頁面",
    keywords: ["條款", "terms", "服務", "使用規範"],
  },
];

// ── 業師 ───────────────────────────────────────────────────────────────────
const MENTORS: SearchItem[] = [
  // 投資人
  { title: "王俊傑", description: "天使投資人", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "VC"] },
  { title: "江旻峻", description: "富旌創投 創始合夥人 / 台大校友創投 總裁", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "創投"] },
  { title: "江進元", description: "艾新銳創業顧問 執行長", href: "/mentors", category: "業師", keywords: ["業師", "投資人"] },
  { title: "李明哲", description: "Visionary Capital 維思諾理投資有限公司 董事長", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "創投"] },
  { title: "李晃", description: "Astra Partners Founder & Managing Partner", href: "/mentors", category: "業師", keywords: ["業師", "投資人"] },
  { title: "林文欽", description: "微曦投資 董事長 ／ 蜂行資本 Venture Partner", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "VC"] },
  { title: "陳一強", description: "活水影響力投資 共同創辦人暨總經理", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "影響力投資"] },
  { title: "陳怡如", description: "生醫專家", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "生醫"] },
  { title: "張家銘", description: "東安投資 副總經理", href: "/mentors", category: "業師", keywords: ["業師", "投資人"] },
  { title: "彭志強", description: "宏誠創投 總經理", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "創投"] },
  { title: "黃凱祥", description: "如海創業投資 總經理", href: "/mentors", category: "業師", keywords: ["業師", "投資人", "創投"] },
  { title: "蕭一白", description: "BonHope Capital 管理合夥人 / 喬治華盛頓大學客座教授", href: "/mentors", category: "業師", keywords: ["業師", "投資人"] },
  { title: "瞿志豪", description: "ITIC 創新工業技術移轉 總經理／VSense 董事長", href: "/mentors", category: "業師", keywords: ["業師", "投資人"] },
  // 創業家
  { title: "任麗玲", description: "連續創業家", href: "/mentors", category: "業師", keywords: ["業師", "創業家"] },
  { title: "李昆謀", description: "91APP 產品長", href: "/mentors", category: "業師", keywords: ["業師", "創業家", "91APP"] },
  { title: "洪小玲", description: "新創顧問", href: "/mentors", category: "業師", keywords: ["業師", "創業家"] },
  { title: "陳宏益", description: "優照護 & 優時間銀行雲 創辦人", href: "/mentors", category: "業師", keywords: ["業師", "創業家"] },
  { title: "梁幸堯", description: "甲尚科技（Reallusion）獨立董事", href: "/mentors", category: "業師", keywords: ["業師", "創業家"] },
  { title: "黃逸甫", description: "cacaFly 聖洋科技 執行董事", href: "/mentors", category: "業師", keywords: ["業師", "創業家"] },
  { title: "楊立偉", description: "意藍資訊股份有限公司 董事總經理", href: "/mentors", category: "業師", keywords: ["業師", "創業家"] },
  { title: "劉政惠", description: "奇創國際資訊 共同創辦人", href: "/mentors", category: "業師", keywords: ["業師", "創業家"] },
  { title: "鄧耀中", description: "VOCAL MIDDLE 布爾喬亞公關顧問 創辦人暨執行長", href: "/mentors", category: "業師", keywords: ["業師", "創業家", "公關"] },
  { title: "鍾哲民", description: "MoBagel 美商行動貝果 執行長暨共同創辦人", href: "/mentors", category: "業師", keywords: ["業師", "創業家", "AI"] },
  // 企業高管
  { title: "王同年", description: "前黛安芬台灣 董事總經理", href: "/mentors", category: "業師", keywords: ["業師", "企業高管"] },
  { title: "卓政宏", description: "前資策會執行長 / AFACT 前亞太代表", href: "/mentors", category: "業師", keywords: ["業師", "企業高管"] },
  { title: "柏健生", description: "飛利浦大中華區總經理", href: "/mentors", category: "業師", keywords: ["業師", "企業高管", "飛利浦"] },
  { title: "張安佐", description: "前明基友達文教基金會 董事長", href: "/mentors", category: "業師", keywords: ["業師", "企業高管"] },
  { title: "張益肇", description: "人工智慧科技基金會 常務董事", href: "/mentors", category: "業師", keywords: ["業師", "企業高管", "AI"] },
  { title: "陶韻智", description: "德豐管理顧問 合夥人", href: "/mentors", category: "業師", keywords: ["業師", "企業高管"] },
  { title: "楊本豫", description: "友達光電集團策略長室顧問", href: "/mentors", category: "業師", keywords: ["業師", "企業高管", "友達"] },
  { title: "盧人瑞", description: "凱絡媒體 董事總經理", href: "/mentors", category: "業師", keywords: ["業師", "企業高管", "媒體"] },
  { title: "蔡秀麗", description: "前安布思沛績效行銷公司副董事長", href: "/mentors", category: "業師", keywords: ["業師", "企業高管", "行銷"] },
  { title: "魏資文", description: "秀傳集團鼎澄生醫 總經理", href: "/mentors", category: "業師", keywords: ["業師", "企業高管", "生醫"] },
  { title: "羅子亮", description: "科技業顧問", href: "/mentors", category: "業師", keywords: ["業師", "企業高管"] },
  // 產業專家
  { title: "蘇欽豐", description: "Hyperscience 機器學習副總 (VP Machine Learning)", href: "/mentors", category: "業師", keywords: ["業師", "產業專家", "AI", "機器學習"] },
  { title: "孫憶明", description: "台灣大學領導學程兼任副教授", href: "/mentors", category: "業師", keywords: ["業師", "產業專家", "台大"] },
  { title: "陳百州", description: "企業顧問 / 兼任教授", href: "/mentors", category: "業師", keywords: ["業師", "產業專家"] },
  { title: "陳琚安", description: "安智管理顧問 管理顧問", href: "/mentors", category: "業師", keywords: ["業師", "產業專家"] },
  { title: "黃世貝", description: "台大醫師", href: "/mentors", category: "業師", keywords: ["業師", "產業專家", "醫療"] },
  { title: "黃沛聲", description: "立勤國際法律事務所 主持律師", href: "/mentors", category: "業師", keywords: ["業師", "產業專家", "法律"] },
  { title: "楊志偉", description: "陽明交通大學 經營管理研究所 兼任助理教授", href: "/mentors", category: "業師", keywords: ["業師", "產業專家"] },
];

// ── 新創團隊 ───────────────────────────────────────────────────────────────
const STARTUPS: SearchItem[] = [
  { title: "『鎂』麗救星", description: "金屬表面處理環保製程，獨家研發專有技術", href: "/startups", category: "新創團隊", keywords: ["新創", "金屬", "製造", "環保"] },
  { title: "Aboard AI", description: "AI 報關協作平台，降低報關作業成本", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "報關", "FinTech"] },
  { title: "autopos", description: "連鎖餐飲與零售品牌全球化雲端營運系統（POS、點餐、支付）", href: "/startups", category: "新創團隊", keywords: ["新創", "SaaS", "POS", "餐飲", "零售"] },
  { title: "Brainmate", description: "臨床級 AI 認知評估及治療平台", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "醫療", "認知"] },
  { title: "Chang und Lin KI Studio", description: "AI 版 LinkedIn，以作品集解決企業選才痛點", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "人才", "HR"] },
  { title: "CircleCare", description: "獸醫專業 AI 引導系統，協助飼主判斷是否需要就醫", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "寵物", "獸醫"] },
  { title: "DTMaker", description: "No-code 數位孿生 SaaS 平台，支援 GIS", href: "/startups", category: "新創團隊", keywords: ["新創", "SaaS", "數位孿生", "IoT"] },
  { title: "Four-T Semiconductor", description: "48V-1V 直接降壓轉換器，用於 AI 伺服器", href: "/startups", category: "新創團隊", keywords: ["新創", "半導體", "AI", "硬科技"] },
  { title: "Inscalia", description: "B2B 銷售領域 Fractional 高階業務服務平台", href: "/startups", category: "新創團隊", keywords: ["新創", "B2B", "銷售", "SaaS"] },
  { title: "iNTER", description: "剩食再分配數位平台，即時媒合餐飲業者與消費者", href: "/startups", category: "新創團隊", keywords: ["新創", "ESG", "食品", "永續"] },
  { title: "Intevia AI", description: "語音驅動即時 AI 助理，解決視窗切換導致的效率下降", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "語音", "生產力"] },
  { title: "Longlink Solutions", description: "符合非紅供應鏈規範的無人機 FPV 通訊系統", href: "/startups", category: "新創團隊", keywords: ["新創", "無人機", "硬科技", "通訊"] },
  { title: "NTU.SERVICES", description: "解決商品全球化、服務在地化斷層的跨境服務平台", href: "/startups", category: "新創團隊", keywords: ["新創", "跨境", "服務", "平台"] },
  { title: "ParkHub", description: "智慧停車媒合平台，預約閒置私人與公有車位", href: "/startups", category: "新創團隊", keywords: ["新創", "停車", "共享", "平台"] },
  { title: "PJ NEXUS", description: "ØFF10 — 基於真實距離的遊戲社交 App", href: "/startups", category: "新創團隊", keywords: ["新創", "社交", "App", "遊戲"] },
  { title: "Praxis AI 喬喜科技", description: "傳統產業嵌入式知識 AI 平台，將老師傅經驗數位化", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "製造", "知識管理"] },
  { title: "R2C2", description: "台大創創 2026 梯次新創", href: "/startups", category: "新創團隊", keywords: ["新創"] },
  { title: "Sellfix", description: "Q-Bot Mini — 專為狹窄複雜場域設計的小型四足機器人", href: "/startups", category: "新創團隊", keywords: ["新創", "機器人", "硬科技", "AI"] },
  { title: "SENZFOR", description: "AI 人才評估系統，讓人力成為人利", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "人才", "HR"] },
  { title: "SilverMemory", description: "懷舊治療 AI 平台，解決輕度認知障礙長者快速惡化問題", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "醫療", "長照", "失智"] },
  { title: "Tera Thinker", description: "台大創創 2026 梯次新創", href: "/startups", category: "新創團隊", keywords: ["新創"] },
  { title: "Xensur Medical 超術感醫學科技", description: "高精度顯微手術訓練系統，結合 AR、動作追蹤及 AI", href: "/startups", category: "新創團隊", keywords: ["新創", "醫療", "AR", "AI", "手術"] },
  { title: "初茶弁飯科技", description: "商辦大樓餐飲科技新創，整合 500+ 家餐廳訂餐服務", href: "/startups", category: "新創團隊", keywords: ["新創", "餐飲", "外送", "B2B"] },
  { title: "吉格線", description: "AI 衛教系統，以超低幻覺 AI 提供語音互動與虛擬角色引導", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "醫療", "衛教"] },
  { title: "士芃科技", description: "數位孿生與 AI 平台，為建築產業提供一站式智慧平台", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "建築", "數位孿生"] },
  { title: "媽媽號", description: "CareMate AI — 長照據點多模態 AI 行為分析系統", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "長照", "醫療"] },
  { title: "宇創系統整合科技", description: "SENCEFORE — 以 AI 為引擎、以人才為資產的企業運營系統", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "企業", "HR"] },
  { title: "安美洛生醫", description: "MACS 技術開發可被人體吸收的超高速止血粉", href: "/startups", category: "新創團隊", keywords: ["新創", "生醫", "醫材", "止血"] },
  { title: "寵訊生醫", description: "寵物癌症精準醫療，液態切片與次世代基因定序", href: "/startups", category: "新創團隊", keywords: ["新創", "生醫", "寵物", "癌症"] },
  { title: "寶淇智慧科技", description: "毛安住 — 信任科技的寵物旅宿賦能系統", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "寵物", "旅宿"] },
  { title: "思輔科技", description: "提供外科醫師微創手術定位參考資訊的精準手術系統", href: "/startups", category: "新創團隊", keywords: ["新創", "醫療", "手術", "AI"] },
  { title: "昇駿生醫", description: "非光學式近場感測技術，24 小時高精度生理訊號監測", href: "/startups", category: "新創團隊", keywords: ["新創", "生醫", "感測", "穿戴"] },
  { title: "晴覓科技", description: "Sunmee — 去除幻覺降低風險的理性交友 App", href: "/startups", category: "新創團隊", keywords: ["新創", "社交", "App", "交友"] },
  { title: "水永續實驗室", description: "蝦醫生 — 專攻白蝦病害，結合專利飼料與 AI 系統", href: "/startups", category: "新創團隊", keywords: ["新創", "農業", "AI", "ESG"] },
  { title: "派斯科技", description: "語音 AI Agent，自動化企業來電與外撥電話處理", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "語音", "企業服務"] },
  { title: "瀚漠低溫科技", description: "量子供應鏈品質守門員，工業級微波元件驗證", href: "/startups", category: "新創團隊", keywords: ["新創", "量子", "硬科技"] },
  { title: "火炬方舟 TorchBase", description: "Torch — 先導優化，二階段機器學習誤差校正框架", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "機器學習", "SaaS"] },
  { title: "琋琦科技", description: "BuyLive — AI 直播代購自動化平台", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "直播", "電商"] },
  { title: "睿識", description: "傳統製造業技術人才斷層解決方案，智慧數位化平台", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "製造", "數位化"] },
  { title: "美少女去哪？", description: "SAFII — 解決女性日常安全焦慮的即時安全 App", href: "/startups", category: "新創團隊", keywords: ["新創", "安全", "App", "社會創新"] },
  { title: "臺灣碳農 TANNON", description: "高社會價值碳移除解決方案，輔導非洲小農製作生物炭", href: "/startups", category: "新創團隊", keywords: ["新創", "ESG", "碳", "農業", "永續"] },
  { title: "臻至科技", description: "低功耗 NPU IP 解決方案，邊緣裝置 AI 推論", href: "/startups", category: "新創團隊", keywords: ["新創", "AI", "半導體", "硬科技", "NPU"] },
  { title: "食材地圖", description: "全台最大 B2B 食材媒合採購平台", href: "/startups", category: "新創團隊", keywords: ["新創", "食品", "B2B", "平台"] },
];

// ── 常見問題 ───────────────────────────────────────────────────────────────
const FAQS: SearchItem[] = [
  { title: "台大加速器和台大車庫有什麼差別？", description: "台大加速器適合已有 MVP 或初期營收的成長期新創；台大車庫適合概念驗證至 MVP 階段的早期團隊", href: "/faq", category: "常見問題", keywords: ["加速器", "車庫", "差別", "比較"] },
  { title: "計畫需要支付費用或出讓股權嗎？", description: "台大車庫與台大加速器均為完全免費計畫，不收取任何費用，也不要求股權", href: "/faq", category: "常見問題", keywords: ["費用", "免費", "股權", "申請"] },
  { title: "計畫為期多久？每年招募幾梯？", description: "台大加速器與台大車庫均為每年一梯，計畫時間為 3 月至 12 月，共十個月", href: "/faq", category: "常見問題", keywords: ["時間", "梯次", "期間", "申請"] },
  { title: "計畫期間需要全程進駐嗎？", description: "不需要全程駐點，採虛擬進駐模式，不提供固定座位", href: "/faq", category: "常見問題", keywords: ["進駐", "辦公", "空間", "虛擬"] },
  { title: "計畫結束後還能獲得什麼支持？", description: "畢業團隊可持續參與校友網絡活動、業師諮詢，以及台大天使會的募資機會", href: "/faq", category: "常見問題", keywords: ["畢業", "校友", "後續", "支持"] },
  { title: "什麼是企業垂直加速器？", description: "企業提出真實業務需求，新創以解決方案回應，可獲企業資源挹注", href: "/faq", category: "常見問題", keywords: ["企業", "垂直加速器", "合作"] },
  { title: "申請需要準備哪些資料？", description: "包括團隊介紹、產品說明、商業模式、目前進度，加速器建議附上 Pitch Deck", href: "/faq", category: "常見問題", keywords: ["申請", "資料", "Pitch Deck", "準備"] },
  { title: "非台大背景的團隊可以申請嗎？", description: "台大加速器完全開放不限台大身分；台大車庫以台大身分優先", href: "/faq", category: "常見問題", keywords: ["台大", "申請", "資格", "限制"] },
  { title: "申請之後，審核流程是什麼？", description: "線上申請 → 書面審查 → 面試邀約 → 結果通知（面試後三週內）", href: "/faq", category: "常見問題", keywords: ["審核", "流程", "面試", "書面"] },
  { title: "什麼是 NTUTEC ANGELS 台大天使會？", description: "匯聚 40+ 位天使會員（150+ 投資人網絡），每月定期舉辦天使例會", href: "/faq", category: "常見問題", keywords: ["天使", "Angels", "投資人", "例會"] },
  { title: "如何成為天使會會員？", description: "填寫入會諮詢表單或聯繫投資經理，安排一對一諮詢說明入會條件", href: "/faq", category: "常見問題", keywords: ["天使", "入會", "會員", "加入"] },
  { title: "新創團隊要如何接觸台大天使會？", description: "透過官網投遞表單申請，無需事先參加加速器或車庫計畫", href: "/faq", category: "常見問題", keywords: ["天使", "新創", "投遞", "募資"] },
  { title: "企業如何與台大創創中心合作？", description: "合作模式包括企業垂直加速器、聯合活動、案源媒合、諮詢服務", href: "/faq", category: "常見問題", keywords: ["企業", "合作", "垂直加速器"] },
  { title: "業師如何輔導新創？頻率是？", description: "每月一對一深度輔導，業師均具備平均 20 年產業或創投經驗", href: "/faq", category: "常見問題", keywords: ["業師", "輔導", "頻率"] },
  { title: "如何聯繫台大創創中心？", description: "可透過官網聯絡表單或 ntutec@ntutec.com 聯絡，辦公時間週一至週五", href: "/faq", category: "常見問題", keywords: ["聯絡", "email", "辦公室"] },
];

// ── Export ─────────────────────────────────────────────────────────────────
export const SEARCH_INDEX: SearchItem[] = [
  ...PAGES,
  ...MENTORS,
  ...STARTUPS,
  ...FAQS,
];

export function searchItems(query: string): Record<SearchItem["category"], SearchItem[]> {
  const q = query.toLowerCase().trim();

  const empty: Record<SearchItem["category"], SearchItem[]> = {
    頁面: [],
    業師: [],
    新創團隊: [],
    常見問題: [],
  };

  if (!q) return empty;

  const results: Record<SearchItem["category"], SearchItem[]> = {
    頁面: [],
    業師: [],
    新創團隊: [],
    常見問題: [],
  };

  const MAX_PER_GROUP = 8;

  for (const item of SEARCH_INDEX) {
    const group = results[item.category];
    if (group.length >= MAX_PER_GROUP) continue;

    const haystack = [
      item.title,
      item.description,
      ...item.keywords,
    ]
      .join(" ")
      .toLowerCase();

    if (haystack.includes(q)) {
      group.push(item);
    }
  }

  return results;
}
