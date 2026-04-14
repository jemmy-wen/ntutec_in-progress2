-- ============================================================
-- NTUTEC Platform — Migration 009 (v2): Mentors Bio Backfill
-- ============================================================
-- Date: 2026-04-14
-- v2 fix: production mentors table lacks `updated_at` column;
--   also ensures `bio` column exists (defensive).
-- Source: WP page 2863 [team_member] shortcode (73 parsed, 35 matched)
-- ============================================================

-- Defensive: ensure bio column exists before UPDATE
ALTER TABLE mentors ADD COLUMN IF NOT EXISTS bio TEXT;

BEGIN;

-- [vc] 江進元  (bio 224 chars)
UPDATE mentors SET bio = $bio00$專長項目

網狀式價值鏈 / 數據智能商業模式 / P2P 商業模式 / FinTech / 跨界新商業模式

重要經歷

– 永豐餘投資 (集團創投) 總經理

– 麥實創投 合夥人/副總經理

– 漢鼎創投 投資協理

– Compaq 業務協理、事業群總經理新能源科技 (全球第四大電池)董事

– 多家上市、非上市公司董監事

熟悉領域

物聯網 / 人工智慧 / 金融科技 / 半導體 / 數位平台 / 智慧零售 / 智慧製造 / 區塊鏈$bio00$ WHERE name = '江進元' AND (bio IS NULL OR bio = '');

-- [vc] 李明哲  (bio 75 chars)
UPDATE mentors SET bio = $bio01$專長項目

創業、募資、投資評估、產品研發、市場拓展、組織管理

重要經歷

– KKBOX 技術長、營運長、總裁、副董事長

– 文化內容策進院院長$bio01$ WHERE name = '李明哲' AND (bio IS NULL OR bio = '');

-- [vc] 李晃  (bio 324 chars)
UPDATE mentors SET bio = $bio02$專長項目

產品開發及進入市場 Product dev. and go-to-market／新創募資 Startup fundraising／國際鏈結 International connections

重要經歷

- 多家矽谷和台灣新創公司董事 Board of Directors of several startups in Silicon Valley and Taiwan

- 台美產業科技協會會長 President of TAITA

- 博世研發中心領導工程師 Lead Engineer at Bosch Research Center

熟悉領域

物聯網 / 人工智慧 / 半導體 / 資訊安全 / 數位平台 / 智慧製造$bio02$ WHERE name = '李晃' AND (bio IS NULL OR bio = '');

-- [vc] 林文欽  (bio 151 chars)
UPDATE mentors SET bio = $bio03$專長項目

品牌營銷、電子商務、OMO、新創顧問、管理領導、資本操作、增長與融資顧問

重要經歷

- 騰訊科技市場副總經理

- 京東商城市場副總裁

- 大疆DJI全球電商負責人

- Yahoo奇摩購物中心副總經理

- PCHome副總經理

熟悉領域

新創增長、電子商務、金融科技、品牌營銷$bio03$ WHERE name = '林文欽' AND (bio IS NULL OR bio = '');

-- [vc] 陳一強  (bio 139 chars)
UPDATE mentors SET bio = $bio04$專長項目

陪跑社會創新 / 創業團隊

重要經歷

– 若水國際創始團隊成員

– 勤業/德勤/德碩管理顧問公司合夥人

熟悉領域

高齡,照護 / 健身,運動,健康 / 綠能科技 / 新農業 / 共享經濟 / 循環經濟 / 文化創意 / 教育創新 / 農食創新 / 社會創新$bio04$ WHERE name = '陳一強' AND (bio IS NULL OR bio = '');

-- [vc] 陳怡如  (bio 393 chars)
UPDATE mentors SET bio = $bio05$專長

-新創輔導 Startup Mentoring

-創業投資 Venture Capital

-醫療器材 Medical Device

-事業發展 Business Development

-策略規劃 Strategic Planning

重要經歷：

-益安生醫(股)公司執行副總經理

Executive Vice President of Medeon Biodesign, Inc.

-智融集團智融創新顧問(股)公司副總經理

Principal of iD Innovation, Inc. (iD SoftCapital Group)

-和通創投集團投資部經理

Manager, Department of Investment, Hotung Venture Capital Group

熟悉領域

生醫/藥/醫材, 高齡/照護, 健身/運動/健康$bio05$ WHERE name = '陳怡如' AND (bio IS NULL OR bio = '');

-- [vc] 蕭一白  (bio 145 chars)
UPDATE mentors SET bio = $bio06$專長項目

- Entrepreneurship, Management of Technology, Advising

重要經歷

- Founding CEO multiple tech companies, Angel and venture investor, Professor$bio06$ WHERE name = '蕭一白' AND (bio IS NULL OR bio = '');

-- [vc] 瞿志豪  (bio 209 chars)
UPDATE mentors SET bio = $bio07$專長項目

早期新創輔導 / 策略規劃 / 校園技術商業化 / 團隊輔導 / 創業投資 / 策略性投資 / 國際購併 / 網路平台 / 生物科技 / 醫療器材 / 農業科技 / 材料科學

重要經歷

– 行政院生醫創新方案執行中心 創新長

– Executive Vice President / Chief Technology Officer , GigaMedia Limited

– 橡子園創投台灣合夥人$bio07$ WHERE name = '瞿志豪' AND (bio IS NULL OR bio = '');

-- [founder] 任麗玲  (bio 147 chars)
UPDATE mentors SET bio = $bio08$專長項目

品牌行銷 / 市調分析 / 新產品開發 / 策略規劃及執行

重要經歷

– 沙威隆公司 總經理

– 新萬仁公司 執行副總

– 默克消費保健部Head-台灣 / 新加坡

– 葛蘭素史克公司行銷總監

熟悉領域

生醫,藥,醫材 / 健身,運動,健康 / 智慧零售 / 行銷科技$bio08$ WHERE name = '任麗玲' AND (bio IS NULL OR bio = '');

-- [founder] 洪小玲  (bio 213 chars)
UPDATE mentors SET bio = $bio09$專長項目

新事業規劃與發展 / 電子商務 / 數位行銷與廣告 / Fintech (互聯網金融)

重要經歷

– Yahoo!奇摩（雅虎臺灣）董事總經理

– Yahoo!奇摩電子商務創始人與負責人

– 亞馬遜全球副總裁 中國商戶事業部

– 遠傳電信 網路與電子商務事業部

執行副總經理

– 鉅亨網 執行長

熟悉領域

金融科技 / 數位平台 / 電子商務 / 智慧零售 / 共享經濟 / 教育創新 / 行銷科技$bio09$ WHERE name = '洪小玲' AND (bio IS NULL OR bio = '');

-- [founder] 陳宏益  (bio 138 chars)
UPDATE mentors SET bio = $bio10$專長項目

CRM / 互聯網 / 大健康管理 / 新創團隊

重要經歷

– 天使投資人

– 興奇科技 資訊長暨副總經理

– 上海財大軟件 首席營運長

– 甲骨文總部及大中華區 資深經理

熟悉領域

高齡,照護 / 數位平台 / 電子商務 / 共享經濟 / 社會創新$bio10$ WHERE name = '陳宏益' AND (bio IS NULL OR bio = '');

-- [founder] 梁幸堯  (bio 372 chars)
UPDATE mentors SET bio = $bio11$專長項目

創業股權策略與募資 Share Structuring and Funding Strategy / 雲端運算與服務 Cloud Computing and Services / 視覺科技 CG/CV/XR/Metaverse

重要經歷

- 瑞雲科技董事長 President, Rayvision Inc.

- 絲路視覺科技公司資深合夥人 Senior Partner, Silkroad Visual Technologies. Co., Ltd (SHE: 300556)

- 國際電腦圖形圖像學會亞洲區主席團成員 SIGGRAPH Asia Committee, 2016 &amp; 2019

- 古希臘文化愛好者 Philhellene

熟悉領域

雲端運算｜高性能運算｜AIGC ｜AR/VR｜傳媒文化科技$bio11$ WHERE name = '梁幸堯' AND (bio IS NULL OR bio = '');

-- [founder] 黃逸甫  (bio 226 chars)
UPDATE mentors SET bio = $bio12$專長項目

數位轉型 / 數位行銷 / 策略規劃 / 品牌管理 / AI與數據應用 / 天使投資人

重要經歷

– 4A台北市廣告經營人協會 理事長

– IAA國際廣告協會台北分會 理事長

– ADK聯旭廣告 執行長

– BBDO黃禾廣告 總經理

– 台新金控暨台新銀行 副總經理

– SHAPE雪芃廣告 執行長

熟悉領域

人工智慧 / 金融科技 / 生醫/藥/醫材 / 文化創意 / 教育創新 / 農食創新 / 社會創新 / 行銷科技$bio12$ WHERE name = '黃逸甫' AND (bio IS NULL OR bio = '');

-- [founder] 楊立偉  (bio 203 chars)
UPDATE mentors SET bio = $bio13$專長項目

搜尋引擎 Search Engine

機器學習及語意分析 Machine Learning &amp; NLP

大數據與商業分析 Big data and Business analytics

數位行銷 Digital Marketing

重要經歷

- 台大工管系兼任助理教授

- 資訊及通信國家標準技術委員

熟悉領域

人工智慧, 數位平台, 行銷科技, 大數據，資訊管理及應用$bio13$ WHERE name = '楊立偉' AND (bio IS NULL OR bio = '');

-- [founder] 劉政惠  (bio 279 chars)
UPDATE mentors SET bio = $bio14$專長項目

3C(content/community/commerce)營運模式 / 生活型態店創新營運模式 / 品牌促動及沉浸式體驗行銷 / 智能商業模式

重要經歷

– Ogilvy台灣奧美促動行銷 總經理

– Intel英特爾台灣區品牌代理商 Brand Campaigns Leader

– 台灣創意設計中心文化創意產業設計輔導案 專家顧問

– 騎士堡(玩中學/親子課程) 顧問

– 雄獅集團雄獅旅行社企劃處 副總經理

熟悉領域

人工智慧 / 數位平台 / 電子商務 / 文化創意 / 教育創新 / 社會創新 / 旅遊創新 / 行銷科技$bio14$ WHERE name = '劉政惠' AND (bio IS NULL OR bio = '');

-- [founder] 鍾哲民  (bio 327 chars)
UPDATE mentors SET bio = $bio15$專長項目

- AI/科技創新

- 商業模式創新 (BP &amp; GTM)

- 新創募資/國際募資 (Angel, Seed, A, B)

- B2B 國際市場開發

- 企業願景與組織文化

重要經歷

- 創辦 AI 新創獲美國、日本、新加坡等知名基金投資近10億元

- 美國 UC Berkeley Skydeck 新創加速器導師

- 微軟加速器、500 Global、Plug and Play 等加速器

- SoftBank, NTT Data, SAP, Fujitsu, Hitachi 等國際創新計畫合作

擔任導師的奉獻目標

- 天使投資

- 新創成長生態圈建立

- 新創出海生態圈建立

- AI 產業生態圈建立$bio15$ WHERE name = '鍾哲民' AND (bio IS NULL OR bio = '');

-- [exec] 王同年  (bio 153 chars)
UPDATE mentors SET bio = $bio16$專長項目

- 新零售OMO商業模式

- 策略規劃

- 經營管理與分析

- 組織與領導能力發展

- 變革管理

重要經歷

- 黛安芬台灣 董事總經理

- 黛安芬台灣 財務長兼營運長

- Unilever英國總部 供應鏈資深經理

熟悉領域

電子商務 / 智慧零售 / 循環經濟 / 教育創新$bio16$ WHERE name = '王同年' AND (bio IS NULL OR bio = '');

-- [exec] 卓政宏  (bio 352 chars)
UPDATE mentors SET bio = $bio17$專長項目

- 科技創新 Technological Innovation

- 人工智慧Artificial Intelligence

重要經歷

- 財團法人資訊工業策進會執行長

President, the Institute for Information Industry (III)

- 財團法人台灣網路資訊中⼼董事長

Chairman of the Board, Taiwan Network Information Center (TWNIC)

- 友邁科技股份有限公司董事長

Chairman of the Board, OleMap

-臺灣科技大學電機工程系副教授

Associate Professor , Science and Technology, NTUST$bio17$ WHERE name = '卓政宏' AND (bio IS NULL OR bio = '');

-- [exec] 柏健生  (bio 215 chars)
UPDATE mentors SET bio = $bio18$專長項目

創新管理 / 新事業發展 / Go-to-Market策略/ 商业模式及盈利策略/ 轉型策略 /大陸市場發展/

企業運營管理

重要經歷

– 台灣飛利浦 董事長及集團總經理

– 興迪電子 董事長

– 飛利浦建興數位科技 監察人

– 統寶電子 董事

– 經濟部審議委員

– 照明公會常務理事暨產業政策主委, 電機電子公會委員

熟悉領域

物聯網, 數位平台, 電子商務, 智慧零售, 綠能科技, 循環經濟$bio18$ WHERE name = '柏健生' AND (bio IS NULL OR bio = '');

-- [exec] 張安佐  (bio 160 chars)
UPDATE mentors SET bio = $bio19$專長項目

國際企業管理／國際行銷／品牌行銷／品牌管理

重要經歷

– 明基亞太 總經理

– 明基電通 明基醫 董事

– 國立臺北教育大學 兼任副教授

熟悉領域

數位平台 / 電子商務 / 智慧零售 / 共享經濟 / 循環經濟 / 文化創意 / 教育創新 / 農食創新 / 社會創新 / 旅遊創新 / 行銷科技$bio19$ WHERE name = '張安佐' AND (bio IS NULL OR bio = '');

-- [exec] 張益肇  (bio 461 chars)
UPDATE mentors SET bio = $bio20$專長項目

公司發展策略擬定、價值主張/商業模式/定位、了解客戶需求、技術與產品開發、組織設計/人才發展、公司管理/組織發展/文化建立

重要經歷

– 微軟亞洲研究院副院長, Partner Director of Technology Strategy, Microsoft Research Asia

– 微軟亞洲工程院副院長, Assistant Managing Director, Microsoft Advanced Technology Center

– Nuance Communications 研究部創始成員, Nuance Communications Research Group founding member

– 日本東芝研究院研究員 Toshiba ULSI Research Center Researcher

– MIT Chinese Alumni Group Board Member

熟悉領域

人工智慧, 金融科技, 高齡/照護, 健身/運動/健康, AR/VR/MR$bio20$ WHERE name = '張益肇' AND (bio IS NULL OR bio = '');

-- [exec] 陶韻智  (bio 314 chars)
UPDATE mentors SET bio = $bio21$專長項目

商機發掘與商業模式建立 / 精實執行 / 新創事業與新創組織輔導 / 數位經濟思維 / 平台與生態系 /

成長策略規劃

重要經歷

– LINE Fellow、LINE 總經理、 LINE PAY 董事暨總經理。

– 創辦人，Passion Bean Company 健康行動 App 開發運營新創。

– 創辦人，Inside.com.tw 硬塞的網路趨勢部落格，科技媒體。（已於 2018 年由關鍵評論網收購）

– 美商 IBM、 hTC、韓商 NHN， 電腦、資訊、互聯網與行動公司等工作經驗

熟悉領域

金融科技 / 健身,運動,健康 / 數位平台 / 電子商務 / 共享經濟 / AR,VR,MR$bio21$ WHERE name = '陶韻智' AND (bio IS NULL OR bio = '');

-- [exec] 楊本豫  (bio 306 chars)
UPDATE mentors SET bio = $bio22$專長項目

- 企業財務管理 Corporate Finance

- 投資併購 Investments and M&amp;A

- 策略轉型 Strategic Transfomation

- 新事業育成 New Business Incubation

重要經歷

- 友達光電財務長 CFO, AUO

- 友達光電策略長 CSO, AUO

- 友達集團智慧零售事業群總經理 GM, Smart Retail BG, AUO Group

- 友達數位董事長 Chairman, AUO Digitech

- 荷蘭銀行企業金融處協理 AVP, Corporate Banking, ABN AMRO$bio22$ WHERE name = '楊本豫' AND (bio IS NULL OR bio = '');

-- [exec] 盧人瑞  (bio 146 chars)
UPDATE mentors SET bio = $bio23$專長項目

內容&amp;軟體開發 / 專案管理 / 全傳播策略規劃 / 整合行銷傳播

重要經歷

– 達寬數位行銷 總經理

– 異言堂廣告業務副總

– 上海麥肯數位 專案總監

– 上海安索帕數位業務 / 專案總監

– 惠普電腦 網路行銷服務 台灣區專案經理

熟悉領域

行銷科技$bio23$ WHERE name = '盧人瑞' AND (bio IS NULL OR bio = '');

-- [exec] 蔡秀麗  (bio 330 chars)
UPDATE mentors SET bio = $bio24$專長領域：

市場洞察, 定位, 解決方案設計, 數位轉型策略, 市場開發及成長策略,公司營運, CRM 顧客關係管理,數據轉型. 及 Martech行銷科技

重要經歷：

-安索帕資深副總經理

-安布思沛執行長：推動以數據及技術為核心翻轉媒體採購從買賣思維到優化投資與績效思維.以併購為策略.,成功建立iProspect 為績效行銷領導品牌

-美庫爾執行長：推動CXM客戶體驗管理. 提供數據轉型, 商務轉型及體驗轉型服務

-提出台灣 Small business day ：小企業大經濟”協助中小企業轉型

熟悉領域

數位平台, 電子商務, 行銷科技, Adtech . media and CRM , Data driven marketing$bio24$ WHERE name = '蔡秀麗' AND (bio IS NULL OR bio = '');

-- [exec] 羅子亮  (bio 140 chars)
UPDATE mentors SET bio = $bio25$專長項目

業務發展策略 / 策略夥伴關係 / 客戶群增長 / 和國際投資人關係（豐富的創業和企業經驗創造盈利的商業模式，帶領公司創新和轉型並成功帶給投資人最大效益）

重要經歷

–Oriente 台灣總經理

–Zoom 亞太區執行副總

–PChome-Skype 副總經理$bio25$ WHERE name = '羅子亮' AND (bio IS NULL OR bio = '');

-- [exec] 蘇欽豐  (bio 237 chars)
UPDATE mentors SET bio = $bio26$專長項目

機器學習／搜索引擎和線上廣告／大數據處理／新創團隊建立

重要經歷

- Quora 機器學習負責人 / Head of Machine Learning at Quora

- 美國雅虎 工程總監 / Director of Engineering, Yahoo

- Polyvore 工程總監 / Director of Engineering, Polyvore (acquired by Yahoo)

熟悉領域

人工智慧 / 數位平台 / 電子商務$bio26$ WHERE name = '蘇欽豐' AND (bio IS NULL OR bio = '');

-- [expert] 孫憶明  (bio 343 chars)
UPDATE mentors SET bio = $bio27$專長項目

企業策略 / 組織變革 / 智慧零售 / 顧客體驗 / 產品創新

重要經歷

– People Squared Solutions, Head of Asia Strategic Accounts

– 澔奇科技創辦人. HiAchieve Technology, Founder &amp; CEO

– 瀚師科技創辦人, AceMentor, Founder &amp; CEO

– 麥肯錫資深顧問, McKinsey &amp; Company, Senior Consultant

– 微軟產品行銷經理, Microsoft, Product Marketing Manage

熟悉領域

人工智慧, 電子商務, 智慧零售, 文化創意, 教育創新, 行銷科技$bio27$ WHERE name = '孫憶明' AND (bio IS NULL OR bio = '');

-- [expert] 陳百州  (bio 113 chars)
UPDATE mentors SET bio = $bio28$專長項目

sustainable profitable growth / go to market innovation

重要經歷

– 前 台灣飛利浦董事長暨總經理

– 兼任健康生活事業群總經理

熟悉領域

智慧零售$bio28$ WHERE name = '陳百州' AND (bio IS NULL OR bio = '');

-- [expert] 陳琚安  (bio 443 chars)
UPDATE mentors SET bio = $bio29$專長項目

- 行銷科技 / 大數據行銷 MarTech / Data science

- 新產品開發與管理 New product development &amp; management

- 跨國管理 International management

- 組織文化與溝通 Culture &amp; communication

重要經歷

- Yahoo 國際市場用戶營銷副總裁 Yahoo International VP, Consumer Growth &amp; Marketing

- Priceline 亞太區資深行銷總監 Priceline Senior Marketing Director, Asia Region

- 新浪網大中華資深行銷總監 Sina Senior Marketing Director, Greater China

熟悉領域

人工智慧 / 健身/運動/健康 / 數位平台 / 電子商務 / 智慧零售 / 社會創新 / 行銷科技$bio29$ WHERE name = '陳琚安' AND (bio IS NULL OR bio = '');

-- [expert] 黃世貝  (bio 142 chars)
UPDATE mentors SET bio = $bio30$專長項目

臨床醫學及腫瘤醫學／遠距健康醫療服務／醫療資訊系統研發／生技產業及技術分析

重要經歷

– 台大醫院消化內科、健康管理中心 主治醫師

– 永齡健康基金會

– 有勁生技股份有限公司醫學長

– 商之器科技股份有限公司監察人

熟悉領域

生醫,藥,醫材 / 高齡,照護$bio30$ WHERE name = '黃世貝' AND (bio IS NULL OR bio = '');

-- [expert] 黃沛聲  (bio 159 chars)
UPDATE mentors SET bio = $bio31$專長項目

創新創業股權設計與募資規劃／公司架構與境外公司法制／企業併購與創新創業投資

重要經歷

- 新加坡商齊威資本股份有限公司執行董事

- 中華電信投資顧問

- 國泰創投法律顧問

- BoniO Inc.(幫你優股份有限公司) 董事

- FITI創新創業激勵計畫 / 價創計畫 / Spark計畫 業師$bio31$ WHERE name = '黃沛聲' AND (bio IS NULL OR bio = '');

-- [expert] 曾正忠  (bio 277 chars)
UPDATE mentors SET bio = $bio32$其他現職

– 企業外部創新顧問 / 高階人才培訓講師

– 宏碁基金會 董事

專長項目

企業外部創新 / 新創輔導 / 策略規劃 / 新事業發展 / 電子商務 / 數位轉型 / 創業投資 / 策略性投資

重要經歷

– 台灣飛利浦 策略長兼品牌暨數位部門主管

– 台灣飛利浦 新事業發展協理

– 元大創投 副總經理

– 商之器科技 董事

– 數位發展部領域專家會議召集人

– 經濟部 / 科技部 / 國發基金 審查委員

– 工研院 前瞻技術指導委員會委員 &amp; 商業化諮詢委員會委員

– 台大後 EMBA 專班 (E勢泮)講師$bio32$ WHERE name = '曾正忠' AND (bio IS NULL OR bio = '');

-- [expert] 楊志偉  (bio 181 chars)
UPDATE mentors SET bio = $bio33$專長項目

早期新創商業模式規劃／融資策略規劃及談判／跨國市場發展策略及團隊運營／創辦人心理輔導

重要經歷

– 數位廣告集團 cacafly 共同創辦人及投融資負責人

– 美商Wonder Workshop 亞太區總經理

– 德國上市集團策略投資部 亞太區負責人

熟悉領域

半導體 / 數位平台 / 電子商務 / 共享經濟 / 教育創新 / 行銷科技$bio33$ WHERE name = '楊志偉' AND (bio IS NULL OR bio = '');

-- [expert] 簡榮宗  (bio 102 chars)
UPDATE mentors SET bio = $bio34$專長項目

新創管理 / 公司治理 / 智財專利 / 電子商務

重要經歷

– 永豐金融控股集團法務長

– 永豐商業銀行副總經理

– 兩岸暨跨境創新創業交流協會理事長

– 台灣創新法律協會 理事長$bio34$ WHERE name = '簡榮宗' AND (bio IS NULL OR bio = '');

COMMIT;

-- Verify:
-- SELECT COUNT(*) AS with_bio FROM mentors WHERE bio IS NOT NULL AND bio != '';
-- Expected: 35 rows
