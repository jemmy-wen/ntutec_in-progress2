-- ============================================================
-- NTUTEC Platform — Migration 016: Seed Corporate Partners
-- ============================================================
-- Date: 2026-04-14
-- Source: wp_corporate_partners.csv (49 rows from WP page 3018)
-- 21 canonical displayed + 28 hidden (dupes/placeholders/ambiguous).
-- Re-runnable via ON CONFLICT on attachment_id.
-- Depends on: 015_corporate_partners.sql
-- ============================================================

INSERT INTO corporate_partners (name, wp_original_name, attachment_id, logo_local_path, logo_url_wp, category, is_displayed, uploaded_at) VALUES
  ('友達光電', '友達光電2', 3026, '/partners/wp/3026.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2019/11/友達光電2.jpg', 'electronics', true, '2019-11-23 19:15:45'),
  ('玉山銀行', '玉山銀行2', 3028, '/partners/wp/3028.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2019/11/玉山銀行2.jpg', 'finance', true, '2019-11-23 19:21:44'),
  ('商之器科技', '商之器2', 3029, '/partners/wp/3029.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2019/11/商之器2.jpg', 'medtech', true, '2019-11-23 19:21:44'),
  ('康寧公司', '康寧公司2', 3030, '/partners/wp/3030.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2019/11/康寧公司2.jpg', 'materials', true, '2019-11-23 19:21:45'),
  ('添翼音樂', '添翼音樂2', 3031, '/partners/wp/3031.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2019/11/添翼音樂2.jpg', 'media', true, '2019-11-23 19:21:45'),
  ('遠傳電信', '遠傳2', 3032, '/partners/wp/3032.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2019/11/遠傳2.jpg', 'telecom', true, '2019-11-23 19:21:45'),
  ('雜學校', '雜學校2', 3033, '/partners/wp/3033.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2019/11/雜學校2.jpg', 'education', true, '2019-11-23 19:21:46'),
  ('台商資源國際集團', '台商資源國際集團', 3798, '/partners/wp/3798.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/台商資源國際集團拷貝.jpg', 'consulting_dup', false, '2020-01-11 10:20:09'),
  ('台商資源國際集團', '台商資源國際集團', 3799, '/partners/wp/3799.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/台商資源國際集團.jpg', 'consulting', true, '2020-01-11 10:20:09'),
  ('東方線上', '東方線上', 3800, '/partners/wp/3800.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/東方線上.jpg', 'research_dup', false, '2020-01-11 10:20:10'),
  ('東方線上', '東方線上', 3801, '/partners/wp/3801.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/東方線上.jpg', 'research', true, '2020-01-11 10:20:10'),
  ('春池玻璃', '春池玻璃拷貝', 3802, '/partners/wp/3802.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃拷貝.jpg', 'materials_dup', false, '2020-01-11 10:20:11'),
  ('春池玻璃', '春池玻璃', 3803, '/partners/wp/3803.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃.jpg', 'materials', true, '2020-01-11 10:20:11'),
  ('春池玻璃', '春池玻璃拷貝6', 3813, '/partners/wp/3813.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃拷貝6.jpg', 'unknown', false, '2020-01-11 10:20:12'),
  ('春池玻璃', '春池玻璃拷貝5', 3814, '/partners/wp/3814.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃拷貝5.jpg', 'unknown', false, '2020-01-11 10:20:12'),
  ('春池玻璃', '春池玻璃拷貝4', 3815, '/partners/wp/3815.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃拷貝4.jpg', 'unknown', false, '2020-01-11 10:20:13'),
  ('春池玻璃', '春池玻璃拷貝3', 3816, '/partners/wp/3816.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃拷貝3.jpg', 'unknown', false, '2020-01-11 10:20:13'),
  ('春池玻璃', '春池玻璃拷貝2', 3817, '/partners/wp/3817.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃拷貝2.jpg', 'unknown', false, '2020-01-11 10:20:13'),
  ('春池玻璃', '春池玻璃拷貝7', 3818, '/partners/wp/3818.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/春池玻璃拷貝7.jpg', 'unknown', false, '2020-01-11 10:20:14'),
  ('logo拷貝8', 'logo拷貝8', 3820, '/partners/wp/3820.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝8.jpg', 'unknown', false, '2020-01-11 10:20:14'),
  ('logo拷貝7', 'logo拷貝7', 3821, '/partners/wp/3821.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝7.jpg', 'unknown', false, '2020-01-11 10:20:14'),
  ('logo拷貝6', 'logo拷貝6', 3822, '/partners/wp/3822.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝6.jpg', 'unknown', false, '2020-01-11 10:20:15'),
  ('logo拷貝5', 'logo拷貝5', 3823, '/partners/wp/3823.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝5.jpg', 'unknown', false, '2020-01-11 10:20:15'),
  ('logo拷貝4', 'logo拷貝4', 3824, '/partners/wp/3824.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝4.jpg', 'unknown', false, '2020-01-11 10:20:15'),
  ('logo拷貝3', 'logo拷貝3', 3825, '/partners/wp/3825.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝3.jpg', 'unknown', false, '2020-01-11 10:20:16'),
  ('logo拷貝2', 'logo拷貝2', 3826, '/partners/wp/3826.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝2.jpg', 'unknown', false, '2020-01-11 10:20:16'),
  ('logo拷貝', 'logo拷貝', 3827, '/partners/wp/3827.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo拷貝.jpg', 'unknown', false, '2020-01-11 10:20:16'),
  ('logo', 'logo', 3828, '/partners/wp/3828.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/01/logo.jpg', 'unknown', false, '2020-01-11 10:20:17'),
  ('科技部', '科技部logo', 4437, '/partners/wp/4437.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/05/科技部logo.png', 'government', true, '2020-05-22 13:31:00'),
  ('新北市政府', '新北市政府logo', 4438, '/partners/wp/4438.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/05/新北市政府logo.jpg', 'government', true, '2020-05-22 13:31:00'),
  ('台灣科技新創基地 TTA', 'TTAlogo', 4439, '/partners/wp/4439.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/05/TTAlogo.png', 'government', true, '2020-05-22 13:31:01'),
  ('親子天下', '親子天下logo', 4457, '/partners/wp/4457.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/05/親子天下logo.png', 'media_dup', false, '2020-05-22 13:40:00'),
  ('經濟日報', '經濟日報logo', 4458, '/partners/wp/4458.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/05/經濟日報logo.png', 'media_dup', false, '2020-05-22 13:40:00'),
  ('社會創新實驗中心', '社創創新實驗中心logo', 4460, '/partners/wp/4460.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/05/社創創新實驗中心logo.png', 'government', true, '2020-05-22 13:40:00'),
  ('親子天下', '親子天下logo_2', 4974, '/partners/wp/4974.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/11/親子天下logo_2.png', 'media_dup', false, '2020-11-04 10:00:00'),
  ('金元福包裝企業', '金元福logo', 4976, '/partners/wp/4976.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/11/金元福logo.png', 'packaging_dup', false, '2020-11-04 10:00:00'),
  ('三泰科技', '三泰科技logo_2', 4978, '/partners/wp/4978.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/11/三泰科技logo_2.png', 'technology_dup', false, '2020-11-04 10:00:00'),
  ('台大創創中心加速器合作夥伴', '台大創創中心加速器合作夥伴', 5023, '/partners/wp/5023.jpg', 'https://tec.ntu.edu.tw/wp-content/uploads/2020/12/台大創創中心加速器合作夥伴.jpg', 'aggregate', false, '2020-12-01 10:00:00'),
  ('親子天下', '親子天下logo', 5110, '/partners/wp/5110.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/02/親子天下logo.png', 'media_dup', false, '2021-02-01 10:00:00'),
  ('金元福包裝企業', '金元福logo', 5112, '/partners/wp/5112.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/02/金元福logo.png', 'packaging_dup', false, '2021-02-01 10:00:00'),
  ('親子天下', '親子天下logo', 5150, '/partners/wp/5150.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/02/親子天下logo.png', 'media', true, '2021-02-15 10:00:00'),
  ('金元福包裝企業', '金元福logo', 5152, '/partners/wp/5152.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/02/金元福logo.png', 'packaging', true, '2021-02-15 10:00:00'),
  ('三泰科技', '三泰科技logo', 5154, '/partners/wp/5154.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/02/三泰科技logo.png', 'technology', true, '2021-02-15 10:00:00'),
  ('宏碁基金會', '宏碁基金會logo', 5938, '/partners/wp/5938.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/06/宏碁基金會logo.png', 'foundation', true, '2021-06-01 10:00:00'),
  ('經濟日報', '經濟日報 EDN logo', 5972, '/partners/wp/5972.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/06/經濟日報-EDN-logo.png', 'media', true, '2021-06-15 10:00:00'),
  ('螢幕快照 2021-06-23', '螢幕快照 2021-06-23 下午5.36.05', 6039, '/partners/wp/6039.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2021/06/螢幕快照-2021-06-23-下午5.36.05.png', 'unknown', false, '2021-06-23 17:36:05'),
  ('天下雜誌', '天下雜誌logo', 6899, '/partners/wp/6899.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2022/01/天下雜誌logo.png', 'media', true, '2022-01-01 10:00:00'),
  ('國廷機電 KTX', '國廷機電 KTX logo', 7424, '/partners/wp/7424.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2022/04/NLogoMarkOnly-1.png', 'industrial', true, '2022-04-26 17:27:17'),
  ('創創中心 logo', '創創中心logo-標準-白底 (1)', 18818, '/partners/wp/18818.png', 'https://tec.ntu.edu.tw/wp-content/uploads/2024/01/創創中心logo-標準-白底-1.png', 'ntutec_self', false, '2024-01-10 14:49:05')
ON CONFLICT (attachment_id) DO UPDATE SET
  name = EXCLUDED.name,
  is_displayed = EXCLUDED.is_displayed,
  category = EXCLUDED.category,
  updated_at = NOW();
