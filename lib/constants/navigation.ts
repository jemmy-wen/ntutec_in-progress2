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
  { label: '投資情報', href: '/angel/portal/digest' },
  { label: '本月 Pipeline', href: '/angel/portal/pipeline' },
  { label: '投後追蹤', href: '/angel/portal/portfolio' },
  { label: '個人偏好', href: '/angel/portal/profile' },
]

export const ADMIN_NAV: NavItem[] = [
  { label: '儀表板', href: '/admin/dashboard' },
  { label: 'Gate 0 評估', href: '/admin/gate0-review' },
  { label: 'Pipeline', href: '/admin/pipeline' },
  { label: '月會管理', href: '/admin/meetings' },
  { label: '回覆分析', href: '/admin/meetings/responses' },
  { label: '投票結果', href: '/admin/meetings/vote-results' },
  { label: '業師管理', href: '/admin/mentors' },
  { label: '投資人管理', href: '/admin/investors' },
  { label: '表單提交', href: '/admin/forms' },
  { label: '系統設定', href: '/admin/settings' },
]
