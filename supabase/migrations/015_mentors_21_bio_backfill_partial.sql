-- ============================================================
-- NTUTEC Platform — Migration 015: Mentors Bio Backfill (Partial, 6/21)
-- ============================================================
-- Date: 2026-04-14
-- Source: 1_Projects/P014_Mentor_Matching_System/Curated_List/NTUTEC_陪跑業師精選名單_2026.md
-- Scope: 6 of the 21 "missing-bio" mentors have rich structured bios in
--        the P014 curated list (陪跑業師精選名單). The remaining 15 only
--        have role/company in industry_advisors_2026.md — those will be
--        solicited from the mentors themselves in a follow-up round.
-- ============================================================

-- Defensive: ensure bio column exists before UPDATE
ALTER TABLE mentors ADD COLUMN IF NOT EXISTS bio TEXT;

BEGIN;

-- [vc] 王俊傑 Jawin Wang
UPDATE mentors SET bio = $bio00$現任天使投資人。前蘇寧零售技術研究院院長、智慧零售公司總經理；前大潤發技術部總經理。

諮詢專長：策略、商模、客戶需求、通路、BD、行銷、品牌、組織管理、海外募資、國際市場。

熟悉產業：AI、電商、智慧零售。經營模式：B2B、B2C、B2B2C、C2B、C2C、O2O。市場：亞洲、北美。

輔導風格：溫和引導、循序漸進。偏好階段：車庫＋加速器皆可。$bio00$
WHERE name = '王俊傑' AND (bio IS NULL OR bio = '');

-- [founder] 李昆謀
UPDATE mentors SET bio = $bio01$現任 91APP 產品長。前 Nexdoor 宇軒數位創辦人與執行長。

諮詢專長：策略、商模、客戶需求、轉換、定價、產品、BD、行銷、組織、管理。

熟悉產業：AI、數位平台、電商、智慧零售、行銷科技。經營模式：B2B、B2B2C、O2O。市場：亞洲。

輔導風格：詰問引導思考、務實、尊重、幽默。$bio01$
WHERE name = '李昆謀' AND (bio IS NULL OR bio = '');

-- [exec] 魏資文 WEI TZU-WEN
UPDATE mentors SET bio = $bio02$現任秀傳集團鼎澄生醫總經理。歷任傳騏動物醫院總經理、盛弘醫藥(8403)財務長、中華開發工業銀行投資部資深副理。

諮詢專長（跨域）：AI、生醫、高齡照護、健身健康、數位平台。

經營模式：B2B、B2C、O2O。市場：亞洲、北美。

輔導風格：引導式請團隊提出問題一起討論並分享經驗。$bio02$
WHERE name = '魏資文' AND (bio IS NULL OR bio = '');

-- [vc] 張家銘
UPDATE mentors SET bio = $bio03$現任東安投資副總經理。

諮詢專長：策略、客戶需求、財務管理。

熟悉產業：半導體、生醫/藥/醫材、高齡照護、健身健康、智慧製造、綠能、文化創意。經營模式：B2B、B2C。市場：亞洲。

輔導風格：輕鬆、明確。$bio03$
WHERE name = '張家銘' AND (bio IS NULL OR bio = '');

-- [vc] 黃凱祥 Kevin
UPDATE mentors SET bio = $bio04$現任如海創業投資總經理。擔任 FITI 業師、國科會萌芽/價創/科研創計劃業師及審查委員、經濟部 A+ 計劃審查委員。

諮詢專長：商模、財務、天使＋Pre-A 募資。

熟悉產業：IoT、AI、金融科技、半導體、高齡照護、智慧製造。經營模式：B2C。市場：亞洲。

輔導風格：目標導向。$bio04$
WHERE name = '黃凱祥' AND (bio IS NULL OR bio = '');

-- [vc] 彭志強
UPDATE mentors SET bio = $bio05$現任宏誠創投總經理。前兆遠科技總經理。

諮詢專長：策略、商模、客戶需求、定價、生產製造、通路、天使＋Pre-A 募資、Pre-A+ 募資。

熟悉產業：半導體。經營模式：B2B。市場：亞洲、北美。

輔導風格：開放。$bio05$
WHERE name = '彭志強' AND (bio IS NULL OR bio = '');

COMMIT;

-- ============================================================
-- Remaining 15 mentors (bio to be solicited from mentors directly):
-- [vc] 江旻峻、沈立平、林子樸、林宇聲、張提提
-- [founder] 鄧耀中
-- [expert] 呂志宏、李彥樞、陳全正、張鼎聲、游森楨、黃慧雯 Anita、劉偉立、薛峻泯、Kevin Huang
-- ============================================================
