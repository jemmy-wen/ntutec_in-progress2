-- ============================================================
-- NTUTEC Platform — Migration 008: Seed Public Mentors
-- ============================================================
-- Date: 2026-04-12
-- Seeds all mentors from data/mentors_all.json into the mentors table.
-- hidden=true mentors are inserted with is_active=false.
-- Depends on: 007_public_mentors_table.sql
-- ============================================================

INSERT INTO mentors (name, title, highlight, category, photo_url, social_url, is_active, is_new_2026, sort_order, slug) VALUES

-- ========================
-- 投資人 (vc)
-- ========================
('王俊傑', '天使投資人', '前大潤發 CTO；前蘇寧零售技術研究院院長', 'vc', '/mentors/wang-junjie.jpg', NULL, true, true, 10, 'wang-junjie'),
('江旻峻', '富旌創投 創始合夥人 / 台大校友創投 總裁', '富旌創投 (Addin Ventures) 創始合夥人；台大校友創投 President', 'vc', '/mentors/jiang-minjun.jpg', 'https://www.linkedin.com/in/brandon-chiang-addinvc/', true, true, 20, 'jiang-minjun'),
('江進元', '艾新銳創業顧問 執行長', '天使與 Pre-A 募資專家', 'vc', '/mentors/wp/3145.jpg', NULL, true, false, 30, 'jiang-jinyuan'),
('沈立平', '益鼎創投 副總經理', NULL, 'vc', NULL, NULL, false, false, 40, 'shen-liping'),
('李明哲', 'Visionary Capital 維思諾理投資有限公司 董事長', NULL, 'vc', '/mentors/wp/19059.png', NULL, true, false, 50, 'li-mingzhe'),
('李晃', 'Astra Partners Founder & Managing Partner', 'Astra Partners Founder & Managing Partner', 'vc', '/mentors/wp/10303.jpg', 'https://www.linkedin.com/in/huanglee', true, false, 60, 'li-huang'),
('林子樸', '基石創投 合夥人', NULL, 'vc', NULL, NULL, false, false, 70, 'lin-zipu'),
('林文欽', '微曦投資 董事長 ／ 蜂行資本 Venture Partner', '前騰訊副總；前京東副總裁；前大疆全球電商負責人', 'vc', '/mentors/wp/20489.jpg', NULL, true, false, 80, 'lin-wenqin'),
('林宇聲', '台新創投 總經理', NULL, 'vc', NULL, NULL, false, true, 90, 'lin-yusheng'),
('陳一強', '活水影響力投資 (B Current Impact Investment) 共同創辦人暨總經理', '活水影響力投資 共同創辦人', 'vc', '/mentors/wp/3152.jpg', NULL, true, false, 100, 'chen-yiqiang'),
('陳怡如', '生醫專家', '創投 10+ 年經驗；醫材背景', 'vc', '/mentors/wp/17125.png', NULL, true, false, 110, 'chen-yiru'),
('張家銘', '東安投資 副總經理', NULL, 'vc', '/mentors/zhang-jiaming.jpg', NULL, true, true, 120, 'zhang-jiaming'),
('張提提', '中華開發資本', NULL, 'vc', NULL, NULL, false, true, 130, 'zhang-titi'),
('彭志強', '宏誠創投 總經理', '宏誠創投 總經理', 'vc', '/mentors/peng-zhiqiang.jpg', 'https://www.linkedin.com/in/kris-peng-b12ba2147/', true, true, 140, 'peng-zhiqiang'),
('黃凱祥', '如海創業投資 總經理', 'FITI 業師；國科會審查委員', 'vc', '/mentors/huang-kaixiang.jpg', NULL, true, true, 150, 'huang-kaixiang'),
('蕭一白', 'BonHope Capital 管理合夥人 / 喬治華盛頓大學客座教授', 'BonHope Capital Managing Partner；跨產業天使投資人', 'vc', '/mentors/wp/17935.jpg', 'https://www.linkedin.com/in/terryhsiao', true, false, 160, 'xiao-yibai'),
('瞿志豪', 'ITIC 創新工業技術移轉 總經理／VSense 董事長', '前 Acorn Taiwan 創辦人；橡子園創投合夥人', 'vc', '/mentors/wp/3165.jpg', 'https://www.linkedin.com/in/michel-chu-a1368124', true, false, 170, 'qu-zhihao'),

-- ========================
-- 創業家 (founder)
-- ========================
('任麗玲', NULL, '全方位諮詢：策略、商模、客戶、產品、通路、品牌', 'founder', '/mentors/wp/3144.jpg', NULL, true, false, 10, 'ren-liling'),
('李昆謀', '91APP 產品長', '前宇軒數位（Nexdoor Taiwan）創辦人 / CEO', 'founder', '/mentors/0b0fff75-0925-4144-8d64-f8bc40431dfa.jpg', 'https://www.linkedin.com/in/leehappy', true, true, 20, 'li-kunmou'),
('洪小玲', '新創顧問', NULL, 'founder', '/mentors/wp/3167.jpg', NULL, true, false, 30, 'hong-xiaoling'),
('陳宏益', '優照護 & 優時間銀行雲 創辦人', '優照護 & 優時間銀行雲 創辦人', 'founder', '/mentors/wp/4009.jpg', NULL, true, false, 40, 'chen-hongyi'),
('梁幸堯', '甲尚科技（Reallusion）獨立董事', '甲尚科技（Reallusion, TPE:6882）獨立董事', 'founder', '/mentors/wp/6309.jpeg', 'https://www.linkedin.com/in/micliang3000', true, false, 50, 'liang-xingyao'),
('黃逸甫', 'cacaFly 聖洋科技 執行董事', 'cacaFly 執行董事', 'founder', '/mentors/wp/3168.jpg', NULL, true, false, 60, 'huang-yifu'),
('楊立偉', '意藍資訊股份有限公司董事總經理', '意藍資訊（6925）— AI 智能數據首家掛牌新創', 'founder', '/mentors/wp/14954.jpeg', 'https://www.facebook.com/willie.yang', true, true, 70, 'yang-liwei'),
('劉政惠', '奇創國際資訊共同創辦人', '奇創國際資訊共同創辦人', 'founder', '/mentors/wp/3163.jpg', NULL, true, false, 80, 'liu-zhenghui'),
('鄧耀中', 'VOCAL MIDDLE 布爾喬亞公關顧問 創辦人暨執行長', 'VOCAL MIDDLE 創辦人暨執行長；艾思智創 共同創辦人', 'founder', '/mentors/deng-yaozhong.jpg', 'https://www.linkedin.com/in/tangyaochung', true, true, 90, 'deng-yaozhong'),
('鍾哲民', 'MoBagel 美商行動貝果 執行長暨共同創辦人', 'MoBagel 美商行動貝果 共同創辦人', 'founder', '/mentors/wp/18816.jpeg', NULL, true, false, 100, 'zhong-zhemin'),

-- ========================
-- 企業高管 (exec)
-- ========================
('王同年', '前黛安芬台灣 董事總經理', '前黛安芬台灣 董事總經理', 'exec', '/mentors/wp/6693.png', NULL, true, false, 10, 'wang-tongnian'),
('卓政宏', '前資策會執行長 / AFACT 前亞太代表', '前 AFACT 亞太貿易便捷化及電子商務理事會 團長', 'exec', '/mentors/wp/20036.jpg', NULL, true, false, 20, 'zhuo-zhenghong'),
('柏健生', '飛利浦大中華區總經理', '飛利浦大中華區總經理', 'exec', '/mentors/wp/17384.jpg', NULL, true, false, 30, 'bai-jiansheng'),
('張安佐', '前明基友達文教基金會 董事長', '前明基友達文教基金會 董事長', 'exec', '/mentors/wp/3928.jpg', 'https://www.linkedin.com/in/adrian-chang-張安佐-74636111', true, false, 40, 'zhang-anzuo'),
('張益肇', '人工智慧科技基金會 常務董事', '前微軟研究院副院長；人工智慧科技基金會 常務董事', 'exec', '/mentors/wp/15696.jpeg', 'https://www.linkedin.com/in/ericichaochang', true, false, 50, 'zhang-yizhao'),
('陶韻智', '德豐管理顧問 合夥人', '前 LINE 台灣總經理', 'exec', '/mentors/wp/4024.png', 'https://www.linkedin.com/in/stingtao/', true, false, 60, 'tao-yunzhi'),
('楊本豫', '友達光電集團策略長室顧問 Corporate Adviser, Group Strategy Office, AUO', '友達光電集團 策略長室顧問', 'exec', '/mentors/wp/19352.png', NULL, true, false, 70, 'yang-benyu'),
('盧人瑞', '凱絡媒體 董事總經理', '凱絡媒體 董事總經理', 'exec', '/mentors/wp/3164.jpg', 'https://www.linkedin.com/in/jjloo', true, false, 80, 'lu-renrui'),
('蔡秀麗', '前安布思沛績效行銷公司副董事長 前美庫爾數據商務顧問公司執行長', '前安布思沛績效行銷 副董事長；前美庫爾數據商務顧問 執行長', 'exec', '/mentors/wp/17134.jpg', 'https://www.linkedin.com/in/carrie-tsai-37687023', true, false, 90, 'cai-xiuli'),
('魏資文', '秀傳集團鼎澄生醫 總經理', '前中華開發投資部資深副理', 'exec', '/mentors/wei-ziwen.jpg', NULL, true, true, 100, 'wei-ziwen'),
('羅子亮', '科技業顧問', '前長佳智能 Everfortune.AI 執行長；前 Zoom 亞太副總；前 Oriente 台灣總經理', 'exec', '/mentors/wp/4243.jpg', 'https://www.linkedin.com/in/robertlo', true, true, 110, 'luo-ziliang'),
('蘇欽豐', 'Hyperscience 機器學習副總 (VP Machine Learning, Hyperscience)', 'Hyperscience 機器學習副總；前 Quora / Yahoo / Polyvore 工程負責人', 'exec', '/mentors/wp/4561.jpg', 'https://www.linkedin.com/in/ching-fong-cf-su-0245b63', true, false, 120, 'su-qinfeng'),

-- ========================
-- 產業專家 (expert)
-- ========================
('呂志宏', '原相半導體 副總', '中華開發資本顧問', 'expert', NULL, NULL, false, false, 10, 'lu-zhihong'),
('李彥樞', '東南亞市場專家', NULL, 'expert', NULL, NULL, false, false, 20, 'li-yanshu'),
('孫憶明', '台灣大學領導學程兼任副教授', '台灣大學領導學程 兼任副教授；教練式輔導專家', 'expert', '/mentors/wp/15694.jpeg', 'https://www.linkedin.com/in/jim-sun-378882', true, false, 30, 'sun-yiming'),
('陳百州', '企業顧問 / 兼任教授', NULL, 'expert', '/mentors/wp/3153.jpg', NULL, true, false, 40, 'chen-baizhou'),
('陳琚安', '安智管理顧問 管理顧問 (J Know Consulting, Consultant)', '安智管理顧問', 'expert', '/mentors/wp/7893.jpg', 'https://www.linkedin.com/in/joannch', true, false, 50, 'chen-juan'),
('陳全正', '法律顧問', '股權架構設計專家', 'expert', NULL, NULL, false, false, 60, 'chen-quanzheng'),
('張鼎聲', '會計師 / 派遣 CFO', NULL, 'expert', NULL, NULL, false, false, 70, 'zhang-dingsheng'),
('黃世貝', '台大醫師', '台大醫師', 'expert', '/mentors/wp/3158.jpg', NULL, true, false, 80, 'huang-shibei'),
('黃沛聲', '立勤國際法律事務所 主持律師', '立勤國際法律事務所 主持律師；TGA Taiwan Global Angels 共同創辦人', 'expert', '/mentors/huang-peisheng.jpg', NULL, true, false, 90, 'huang-peisheng'),
('曾正忠', '宏碁基金會 董事', '前台大創創中心執行長', 'expert', NULL, NULL, false, false, 100, 'zeng-zhengzhong'),
('游森楨', '悅智全球顧問 總經理', NULL, 'expert', NULL, NULL, false, false, 110, 'you-senzhen'),
('黃慧雯 Anita', '國際連結專家', '矽谷、中國海外連結', 'expert', NULL, NULL, false, false, 120, 'huang-huiwen'),
('楊志偉', '陽明交通大學 經營管理研究所 兼任助理教授', '陽明交通大學 經營管理研究所（IBM）兼任助理教授', 'expert', '/mentors/wp/3161.jpg', 'https://www.linkedin.com/in/brianyangcam', true, false, 130, 'yang-zhiwei'),
('劉偉立', '法律顧問', '股權架構設計專家', 'expert', NULL, NULL, false, false, 140, 'liu-weili'),
('薛峻泯', '德勤會計師 合夥人', NULL, 'expert', NULL, NULL, false, false, 150, 'xue-junmin'),
('簡榮宗', '法律顧問', '股權架構設計專家', 'expert', NULL, NULL, false, false, 160, 'jian-rongzong'),
('Kevin Huang', '英飛凌 全球行銷主管', NULL, 'expert', NULL, NULL, false, false, 170, 'kevin-huang')

ON CONFLICT (slug) DO UPDATE SET
  name        = EXCLUDED.name,
  title       = EXCLUDED.title,
  highlight   = EXCLUDED.highlight,
  category    = EXCLUDED.category,
  photo_url   = EXCLUDED.photo_url,
  social_url  = EXCLUDED.social_url,
  is_active   = EXCLUDED.is_active,
  is_new_2026 = EXCLUDED.is_new_2026,
  sort_order  = EXCLUDED.sort_order,
  updated_at  = NOW();

-- ============================================================
-- Done. 56 mentors seeded (active + hidden).
-- ============================================================
