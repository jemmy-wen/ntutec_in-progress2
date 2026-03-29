/**
 * Navigation menu definitions for each role
 */

export interface NavItem {
  label: string
  href: string
  icon?: string
}

export const ANGEL_NAV: NavItem[] = [
  { label: '下次月會', href: '/angel/portal/upcoming' },
  { label: '瀏覽新創', href: '/angel/portal/cards' },
  { label: '投資意向', href: '/angel/portal/vote' },
  { label: '學習中心', href: '/angel/portal/learn' },
  { label: 'Digest', href: '/angel/portal/digest' },
  { label: '投後追蹤', href: '/angel/portal/portfolio' },
  { label: '個人偏好', href: '/angel/portal/profile' },
]

export const MENTOR_NAV: NavItem[] = [
  { label: '我的時段', href: '/mentor/portal/slots' },
  { label: '配對結果', href: '/mentor/portal/matches' },
  { label: '回饋填寫', href: '/mentor/portal/feedback' },
  { label: '歷史紀錄', href: '/mentor/portal/history' },
]

export const STARTUP_NAV: NavItem[] = [
  { label: '團隊首頁', href: '/startup/portal' },
  { label: '業師健診', href: '/startup/portal/clinic' },
  { label: '團隊資料', href: '/startup/portal/profile' },
  { label: '活動報名', href: '/startup/portal/events' },
  { label: '資源中心', href: '/startup/portal/resources' },
]

export const ADMIN_NAV: NavItem[] = [
  { label: '儀表板', href: '/admin/dashboard' },
  { label: 'Pipeline', href: '/admin/pipeline' },
  { label: '月會管理', href: '/admin/meetings' },
  { label: '投資人管理', href: '/admin/investors' },
  { label: '系統設定', href: '/admin/settings' },
]
