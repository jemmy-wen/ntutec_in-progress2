-- =========================================================
-- Migration 014: Archive 33 legacy mentors (DB-only, hidden from site)
-- =========================================================
-- Date: 2026-04-14
-- Source: WP salvage wp_mentors_archived.csv (incident_20260414)
-- Decision (Howard 2026-04-14): Keep in DB + local only, NOT on website.
-- is_active=false → RLS hides from public SELECT.
-- =========================================================

BEGIN;

-- [vc] 謝忠高 Peter Hsieh
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('謝忠高 Peter Hsieh', 'General Partner of Acorn Pacific Ventures', $b00$專長項目

Venture Capital Business / Investment / M&A (in Silicon Valley and Greater China) / Corporate Strategy & Operations / Startup Mentoring



重要經歷

- Chief Strategy Officer of Coretronic Corporation

- President of Coretronic Venture Capital

- CEO of Optoma Corporation

- partner with AsiaVest Partners (Beijing)

- partner with Harbinger Ventures (Silicon Valley)

- Sr. VP of H&Q Asia Pacific

- Senior Associate with InveStar Capital (Silicon Valley)

- engineering and sales management, KLA Instruments

- 2021 Chairman of Monte Jade Science and Technology Association (美西玉山科技協會)

- mentor at AAMA Beijing’s and AAMA Taipei’s Cradle Plan (AAMA 北京，AAMA臺北搖籃計劃導師)

- board seats and investment exits include IPO’s of OmniVision, Oplink, Applied Optoelectronic Inc, and iSoftStone, as well as M&As of Ultima Interconnect (Cadence), U-Systems (GE Medical), Lattice Power (Shunfeng), and Leyou



熟悉領域

物聯網 / 數位平台 / 智慧零售 / 智慧製造 / 綠能科技 / 新農業 / AR,VR,MR$b00$, '7822', 'www.linkedin.com/in/peter-hsieh-9165a', 'vc', false, 'archived-peter-hsieh')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 陳嫦芬 Felice Chen
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('陳嫦芬 Felice Chen', '台灣大學管理學院財金系兼任教授 Adjunct Professor, Finance Department, College of Management, National Taiwan University', $b01$專長項目

策略規劃、談判與組織改造 Strategic Planning, Negotiation & Company Reorganization



重要經歷

* 元大金融控股集團首席執行長兼總經理 CEO & President, Yuanta Financial Holdings Co.

* 瑞銀集團投資銀行亞太區副主席暨董事總經理 Vice Chairman and Managing Director, UBS Investment Bank Asia

* 雷曼兄弟金融集團亞太區資深副總裁 Vice President of Lehman Brothers Asia Pacific

* 匯豐金融控股集團台灣區投行總經理 President of HSBC James Capel in Taiwan$b01$, '17390', NULL, 'vc', false, 'archived-felice-chen')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 王帛霞 Janice Wang
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('王帛霞 Janice Wang', '台灣大學電機系兼任教授 / 神基投控 獨立董事', $b02$專長項目

企業新創與研發策略管理 (Innovation & RD Strategic Management)

新產品/服務研發流程管理 (New Product/Service Development Management)

研發組織與高效文化管理 (RD Organization and High Performance Culture Management)



重要經歷

– IBM Power 商用伺服器研發中心總經理(Director, IBM Worldwide Power Servers Development Lab)

– IBM 大中華軟體研發中心副總經理 (Program Director, IBM Greater China Software Development Lab)

– 台達研究院技術顧問 (Technical Consultant, Delta Research Lab)

– 證交所創櫃板講師 : Teacher, GISA Stock, Taipei Exchange$b02$, '19000', NULL, 'expert', false, 'archived-janice-wang')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 郭大經 Ryan Kuo
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('郭大經 Ryan Kuo', '中華開發創新加速股份有限公司 總經理', $b03$專長項目

創業投資/數位經濟/商業模式/軟硬體整合



重要經歷

– 開發創新管理顧問(股)有限公司 總經理

– GP, 台灣阿里巴巴創業者基金 Fund I

– 中華開發資本管理顧問股份有限公司 副總經理

– 華矽半導體公司共同創辦人及總經理

– YEF 創業導師及科技部萌芽計畫審查委員$b03$, '4026', NULL, 'vc', false, 'archived-ryan-kuo')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [exec] 黃彗真 Jane Huang
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('黃彗真 Jane Huang', '前外商人資長', $b04$專長項目

- 組織設計 Organization Design

- 變革管理 Change Management

- 接班人計畫與人才發展 Succession Planning and talent development

- 領導力培養與發展 Leadership capability development

- Career & Executive Coach

- HOGAN & DISC Assessment Certified



重要經歷

- 嬌生集團台灣人資長 HR Country Lead, Johnson & Johnson Taiwan

- 嬌生集團中國醫療器材事業體資深人資經理 Sr. HR Manager, Medical Devices China, Johnson & Johnson

- 諾華亞太區專案副理 Assistant Project Manager, Asia-Pacific, Novartis$b04$, '6332', NULL, 'exec', false, 'archived-jane-huang')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 王琍瑩 Liying Wang
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('王琍瑩 Liying Wang', '明日科技法律事務所 / 主持律師 Next and Nexus Law Office / Founding Attorney', $b05$專長項目

新興科技與法律 Emerging Technologies and Law / 募資規劃 Fundraising



重要經歷

- 之初創業投資管理顧問股份有限公司 / 法律顧問

AppWorks Ventures / Legal Counsel

- 台北律師公會創新科技委員會 / 主任委員

Taipei Bar Association / Innovation and Technology Committee / Chairwoman

- 台北市政府資料治理委員會 / 外聘委員

Taipei City Government / Data Governance Board / Board Member

- 比特幣及虛擬通貨發展協會 / 常務監事

Bitcoin and Cryptocurrency Development Association / Chief Supervisor$b05$, '17740', 'https://www.linkedin.com/in/liying-wang-054280143/', 'vc', false, 'archived-liying-wang')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 駱國綸 KL
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('駱國綸 KL', '前波士頓咨詢公司 合夥人', $b06$專長項目

市場開發 / 成長策略 / 商業模式 / 市場行銷 / 企業管理



重要經歷

– 波士頓咨詢公司台灣區金融服務業負責人

– 渣打銀行集團策略部總監



熟悉領域

金融科技 / 高齡,照護$b06$, '18995', NULL, 'vc', false, 'archived-kl')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 楊家彥 Steven Yang
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('楊家彥 Steven Yang', '樹冠影響力投資創辦人 / 執行長', $b07$專長項目

影響力投資 / 無形價值評估 / 經濟產業分析



重要經歷

–台經院六所所長

–鴻海智庫執行長

–富奇想SquareX策略長

–AVPN台灣顧問



熟悉領域

高齡,照護 / 新農業 / 共享經濟 / 循環經濟 / 文化創意 / 教育創新 / 農食創新 / 社會創新$b07$, '18996', NULL, 'vc', false, 'archived-steven-yang')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [founder] 劉永信 Spencer Liu
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('劉永信 Spencer Liu', 'CloudMile 萬里雲創辦人暨執行長 (CloudMile Founder &amp; CEO)', $b08$專長項目

雲端物聯網 / 雲端服務 / 人工智慧應用 / 大數據



重要經歷

- CloudMile 萬里雲互聯網路有限公司創辦人暨執行長

- 社團法人數位經濟暨產業發展協會理事

- 臺灣臺復新創學會理事

- 新加坡國立大學商學院校友會理事

- 伊雲谷數位科技股份有限公司共同創辦人

- 蕃薯藤創始員工暨電子商務「賣蕃天」創辦人$b08$, '18997', 'https://www.linkedin.com/in/spencer-liu-06729222/', 'founder', false, 'archived-spencer-liu')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 吳昇奇 Gary
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('吳昇奇 Gary', 'Samsung Taiwan商業顧問', $b09$專長項目

企業管理 / 策略思維 / 培訓領導力



重要經歷

– 台灣三星電子 企業解決方案事業部 總經理

– 思愛普軟體系統股份有限公司 總理

– Oracle夥伴亞太數位菁英(Apdex) 總經理

– SAP大中華區金融服務事業群 總經理



熟悉領域

物聯網 / 人工智慧 / 資訊安全 / 高齡/照護 / 電子商務 / 智慧零售$b09$, '18998', NULL, 'expert', false, 'archived-gary')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [founder] 郭家齊 Andy Kuo
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('郭家齊 Andy Kuo', '創業家兄弟股份有限公司 共同創辦人&amp;總經理', $b10$專長項目

網路創業 / 電子商務 / 網站程式 / 網路相關技術



重要經歷

– 共同創辦創業家兄弟

– 地圖日記

– Groupon Taiwan$b10$, '3151', NULL, 'founder', false, 'archived-andy-kuo')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 葉丙成 Benson Yeh
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('葉丙成 Benson Yeh', '國立臺灣大學電機工程學系教授 (Professor of EE Dept. at National Taiwan University)', $b11$專長項目

新創 / 教育科技 / 實驗教育 / 非營利組織 / 社會企業

Startup, Ed Tech, Alternate/Experimental Education, NPO, Social enterprise



重要經歷

- 2016 年獲臺灣最高創新獎項「總統創新獎」，為臺灣首位以教育創新得此殊榮者。(In 2016, Prof. Yeh received the highest award for innovators in Taiwan, the Presidential Innovation Award.)

- 2014 年以 PaGamO 創新，從全球 428 所大學名校隊伍中脫穎而出，榮獲華頓商學院 Reimagine Education 全球教育創新首獎。(In 2014, PaGamO developed by Prof. Yeh received the Overall Award and E-Learning Award in Wharton-QS 2014 Stars Awards: Reimagine Education, the ``Oscars`` of innovations in higher education.)



熟悉領域

數位平台 / 教育創新$b11$, '6573', NULL, 'expert', false, 'archived-benson-yeh')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 詹益鑑 IC Jan
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('詹益鑑 IC Jan', 'Taiwan Global Angels 創辦人', $b12$專長項目

國際天使投資 / 新創企業管理 / 募資簡報訓練



重要經歷

– 之初創投 共同創辦人暨合夥人

– 國家生技研究園區 創服育成中心助執行長

– Startup Genome 台灣新創生態系大使

– UC Berkeley 訪問學者 / 公衛學院院長資深顧問

– Berkeley SkyDeck / 500 Global 創業導師$b12$, '3162', NULL, 'vc', false, 'archived-ic-jan')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [exec] 羅台青 Josephine Lo
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('羅台青 Josephine Lo', '台灣雀巢董事長兼總經理', $b13$專長項目

企業策略制定 / 企業文化發展 / 跨國團隊協作和管理 / 食品營養產業行銷策略和管理



重要經歷

台灣香港澳門雀巢嬰幼兒食品部事業總監$b13$, '6728', NULL, 'exec', false, 'archived-josephine-lo')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 王俞又
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('王俞又', '500 Startups 創業合夥人及臺灣區負責人', $b14$專長項目

創業投資 / 策略規劃 / 商業模式 / 新創培育 / 行動科技 / 公司管理



重要經歷

– 500 Startups 創業合夥人及臺灣區負責人

– Tickle Labs聯合創始人

– appWorks共同合夥人

– Wantoto Inc瑞策國際股份有限公司 創辦人暨執行長

– Microsoft Corporation

– Atmel Corporation$b14$, '3169', NULL, 'vc', false, 'archived-mentor-15')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 李如虹 Joyce Lee
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('李如虹 Joyce Lee', '瑞典商BTS顧問公司 資深培訓顧問', $b15$專長項目

- 領導力培訓 & 教練 Leadership Training & Coaching

- 健康產業行銷管理 Commercial/Marketing/Sales Management in Healthcare Industry



重要經歷

- BTS (瑞典商培訓顧問公司) & EMC(上海合毅企業管理諮詢公司) 資深培訓顧問 Senior Consultant

- 日商白蘭氏三得利 台灣總經理 General Manager, Brand’s Suntory Taiwan

- 英商葛蘭素史克藥廠 消費品事業 台灣總經理 General Manager, GlaxoSmithKline Consumer Healthcare, Taiwan



熟悉領域

生醫,藥,醫材$b15$, '6337', NULL, 'expert', false, 'archived-joyce-lee')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 黃怡佳 Nancy Huang
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('黃怡佳 Nancy Huang', '品牌＆新創顧問', $b16$專長項目

成長策略 / 商業模式 / 市場開發 / 品牌及銷售管理



重要經歷

-eBay亞太區策略及市場開發經理

-Nike 台灣＆大中華區新事業部主管

-Clarks 大中華區總經理、亞太區總裁$b16$, '3159', NULL, 'expert', false, 'archived-nancy-huang')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 楊光磊 Konrad Young
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('楊光磊 Konrad Young', '逢甲大學創能學院講座教授／台灣大學領導學程兼任教授／政治大學 IMBA 兼任教授／英特爾資深顧問／LeadBest Consulting Group 資深顧問／LeadAgilex 產業賦能加速平台合夥創辦人／商業思維學院 Mentor', $b17$專長項目

半導體 Semiconductor／數位轉型 Digital Transformation／領導與管理 Leadership and Management／職涯發展 Career Development



重要經歷

- 中芯國際 獨立董事 SMIC Independent Director

- 鼎恒科技 獨立董事 Mayo Human Capital Independent Director

- 台積電 研發處長 TSMC R&D Director



熟悉領域

半導體 / 數位平台 / 智慧製造 / 教育創新$b17$, '9334', 'https://www.linkedin.com/in/konrad-young-340a8b91/', 'vc', false, 'archived-konrad-young')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [exec] 陳仲竹 CC Chen
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('陳仲竹 CC Chen', '萊鎂醫療器材股份有限公司 董事長暨執行長', $b18$專長項目

醫療器材創新與創業 Medtech Innovation & Entrepreneurship／睡眠醫學與生醫工程 Sleep Medicine & Biomedical Engineering／生物晶片與微流體 Biochip & Microfludics



重要經歷

- 益安生醫 前瞻技術副總經理 MEDEON BIODESIGN, Inc. VP Advanced Technology

- 史丹福大學醫學院 STB訪問學者 Stanford University School of Medicine, Stanford-Taiwan Biomedical Fellowship

- 工研院醫療器材科技中心 正工程師 ITRI MED, Senior Engineer



熟悉領域

生醫,藥,醫材 / 高齡,照護 / 健身,運動,健康 / 數位平台$b18$, '6158', 'https://www.linkedin.com/in/chungchu/', 'exec', false, 'archived-cc-chen')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [founder] 何英圻 Steven Ho
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('何英圻 Steven Ho', '91APP創辦人暨董事長 / TiEA 台灣網路暨電子商務產業發展協會理事長', $b19$專長項目

電子商務、商業模式、數位發展



重要經歷

TiEA 台灣網路暨電子商務產業發展協會理事長

91APP 創辦人暨董事長

Yahoo! 電子商務事業群總經理

興奇科技董事長

AAMA 台北搖籃計畫導師



熟悉領域

電子商務／智慧零售／數位平台／行銷科技／區塊鏈／人工智慧$b19$, '14961', NULL, 'founder', false, 'archived-steven-ho')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 張佳欽
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('張佳欽', '台大管理學院 Global MBA 兼任教授', $b20$專長項目

資訊系統策略應用 / 供應鏈網路應用整合系統 / 行動科技應用及數位行銷 / 企業策略擬定執行



重要經歷

– IBM資訊系統業務銷售

– B2B電子商務網路服務

– 行動手機業務&行銷

– B2C 品牌全球電子商務系統建制



熟悉領域

數位平台 / 電子商務 / 智慧零售 / 智慧製造$b20$, '3150', NULL, 'expert', false, 'archived-mentor-21')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [founder] 鄭涵睿 Harris Cheng
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('鄭涵睿 Harris Cheng', '綠藤共同創辦人暨執行長', $b21$專長項目

價值主張/商業模式/定位, 品牌經營, 組織設計/人才發展, 公司管理/組織發展/文化建立



重要經歷

– 匯豐銀行策略發展經理

– 麻省理工史隆管理學院 MBA，專注於創新創業與永續資源管理

– 帶領綠藤成為亞洲唯一五度蟬聯「Best for the World 對世界最好」環境面向大獎的 B 型企業、唯一獲選國發會 NEXT BIG 九大台灣新創國家隊代表的 B 型企業



熟悉領域

電子商務/農食創新/社會創新$b21$, '15600', NULL, 'founder', false, 'archived-harris-cheng')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 蘇柏州 Kenny Su
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('蘇柏州 Kenny Su', 'Kdan Mobile 創辦人兼董事長', $b22$專長項目

軟體與網路技術 /國際市場經營策略 / 跨國團隊管理 /國際行銷與商務開發/ AI與數據應用 / 投資與併購



重要經歷

– JSR 291 國際軟體標準制定 專家委員

– 跨境創新創業交流協會 理事

– 2021年國發會 Next Big 9大代表性創業企業

– 2023年 Financial Times 亞太地區高成長企業500強 台灣IT與軟體產業第一名



熟悉領域

人工智慧, 金融科技, 資訊安全, 數位平台, 電子商務, 共享經濟, 行銷科技, 區塊鏈$b22$, '15277', 'https://www.linkedin.com/in/kenny-su/', 'vc', false, 'archived-kenny-su')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 陳克錡 Frank Chen
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('陳克錡 Frank Chen', '世平集團執行長室顧問', $b23$專長項目

半導體產品行銷與應用 / 市場開發及策略 / 組織及資源運用



重要經歷

– 恩智浦半導體大中華區副總裁暨台灣/南太平洋區總經理

– 飛思卡爾半導體台灣區總經理

– 博通半導體台灣區總經理

– 德州儀器亞洲區寬頻通訊事業部資深協理$b23$, '3154', 'http://linkedin.com/in/frank-ko-chi-chen-68696311', 'expert', false, 'archived-frank-chen')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 張鴻文 Howard Chang
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('張鴻文 Howard Chang', '企業顧問', $b24$專長項目

商業模式 / 品牌管理 / 銷售策略



重要經歷

– New Balance副總裁 大中華區總經理

– Nike 業務總監 代理總經理

– Philip Morris 業務總監$b24$, '4093', NULL, 'expert', false, 'archived-howard-chang')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [exec] 范炘 Thomas Fann
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('范炘 Thomas Fann', '跨國公司高管', $b25$專長項目

策略規劃 / 商業與財務分析 / 新事業規劃與發展 / 損益管理 / 培訓領導力



重要經歷

– 美國密西根大學機械工程博士

– 美國商會 會長

– 歐洲在台商務協會(ECCT)汽車委員會 co-chair

– 美國福特、歐洲福特與長安福特馬自達公司 採購與財務管理

– 福特六和汽車股份有限公司 董事總裁

– 江鈴汽車股份有限公司(Jiangling Motor Co. Ltd.) 董事總裁$b25$, '3149', NULL, 'exec', false, 'archived-thomas-fann')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 陳識仁
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('陳識仁', '匯智資本有限公司 創辦人', $b26$專長項目

商業模式 / 市場開發與行銷策略 / 業務管理模式



重要經歷

– 輔仁大學品牌顧問

– 星展銀行環球交易服務處處長

– 瑞士銀行財富管理營運長

– 花旗銀行投資與企業金融事業群董事

– 職業籃球球評$b26$, '3155', NULL, 'vc', false, 'archived-mentor-27')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [exec] 金麗英 Joset King
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('金麗英 Joset King', '已退休', $b27$專長項目

企業營運管理／市場策略規劃與開發／資訊服務業務模式管理／領導力開發／零售業整合應用



重要經歷

– IBM 大中華區服務部總經理

– 微軟大中華區服務部市場策略總監$b27$, '3999', NULL, 'exec', false, 'archived-joset-king')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [exec] 陳之逵 Allen Chen
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('陳之逵 Allen Chen', '資誠創新諮詢公司 副總經理', $b28$專長項目

企業營運管理 / 跨界數據整合與應用 / CRM雲端服務行銷自動化 / 市場分析調研 / 數據保護 (GDPR)



重要經歷

– Nielsen尼爾森市場研究大中華區營運與科技副總裁

– GfK捷孚凱市場調研 董事總經理

– Oracle美商甲骨文服務與產品支援總經理

– HP 軟體事業部協理

– IBM台灣軟體事業部業務經理

– 盛雲電商 總經理$b28$, '4306', NULL, 'exec', false, 'archived-allen-chen')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [expert] 蔡恩全 Davis Tsai
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('蔡恩全 Davis Tsai', '寶成國際集團 顧問', $b29$專長項目

Building organization capability / Executive coaching / Organization culture transformation



重要經歷

– 台灣微軟總經理

– 微軟大中華區副總裁/中國區區域業務副總裁 兼大中華區經理人培訓主持人

– 微軟大中華區創新業務及戰略伙伴發展副總裁

– 寶成國際集團顧問$b29$, '4330', NULL, 'expert', false, 'archived-davis-tsai')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 謝泰詠 DWAYNE SYE
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('謝泰詠 DWAYNE SYE', 'Founder, The Sye Fund', $b30$專長項目

Managing startup growth／SAAS architectures/models／USA B2B markets



重要經歷

- Co-Founder and former Chief Information Officer, Cvent, Inc.

- Angel investor$b30$, '4668', 'https://www.linkedin.com/in/dwaynesye/', 'vc', false, 'archived-dwayne-sye')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [exec] 連祥一 Sean Lien
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('連祥一 Sean Lien', 'Google 亞洲區用戶及產品事業群 董事總經理 Managing Director, gTech Users and Products, APAC', $b31$專長項目

跨國團隊營運管理 Multinational team management / 國際市場發展策略 Business Development of International market / 公司發展策略擬定 Strategy development and Prioritization



重要經歷

- Google Director of Chrome&Apps Product partnerships, APAC&EMEA

- 蕃薯藤數位科技 副總經理 Vice President, Yam Digital Technology Co., Ltd$b31$, '6285', NULL, 'exec', false, 'archived-sean-lien')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

-- [vc] 洪福利 Felix Hong
INSERT INTO mentors (name, title, bio, photo_url, social_url, category, is_active, slug)
VALUES ('洪福利 Felix Hong', 'VP Engineering, Botrista Technology / 500 Global mentor／關鍵評論網投資人／Hardware Club 投資人', $b32$專長項目

- 消費性電子產品開發

- 跨國團隊協作／管理

- 新創公司文化管理



重要經歷

- 前 Google Nest 台灣團隊負責人

- 前 Google Nest 硬體工程專案團隊經理

- 前 Nest Labs 新創台灣團隊負責人

- 前 鴻海 iPod 新產品硬體專案經理$b32$, '6416', 'https://www.linkedin.com/in/fehong/', 'vc', false, 'archived-felix-hong')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, bio = EXCLUDED.bio,
  photo_url = COALESCE(EXCLUDED.photo_url, mentors.photo_url),
  social_url = COALESCE(EXCLUDED.social_url, mentors.social_url),
  is_active = false;

COMMIT;

-- Verify: SELECT COUNT(*) FROM mentors WHERE is_active=false;  -- expect +33