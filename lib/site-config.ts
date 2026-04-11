/**
 * NTUTEC 全域數據設定檔
 * 單一修改點 — 所有頁面共用這裡的數字，避免跨頁不一致
 * 來源：114年年度成果報告書
 * 最後更新：2026-04-11
 */

export const SITE_STATS = {
  totalTeams: 600,          // 歷年累計輔導新創團隊（逾 600 支）
  totalInvestors: 350,      // 天使投資人網絡（350+）
  totalPartners: 35,        // 企業合作夥伴（35+）
  yearsOfOperation: 13,     // 深耕年數（2013-2026）
  verticalAcceleratorCycles: 27, // 企業垂直加速器累計期數
  exitCases: 2,             // 成功國際 Exit 案例數
  demoDay2025Attendees: 300, // 2025 Demo Day 出席人數
  demoDay2025Investors: 74,  // 2025 Demo Day 投資人數
} as const

export const SITE_META = {
  name: "台大創創中心",
  fullName: "國立臺灣大學創新創業中心",
  englishName: "NTU Taidah Entrepreneurship Center",
  shortName: "NTUTEC",
  founded: 2013,
  tagline: "Bridging NTU Deep Tech to Global Impact",
} as const
