/**
 * Unified role system for NTUTEC Platform
 *
 * 9 roles as defined in Platform Architecture v0.4:
 * - admin, staff_admin, staff_accelerator (Team)
 * - angel_member (Angel Club)
 * - mentor, team (Mentor Matching)
 * - startup_incubated, startup_fundraising (Startup Portal)
 * - vc_partner (VC Partner)
 */

export type PlatformRole =
  | 'admin' | 'staff_admin' | 'staff_accelerator'
  | 'angel_member'
  | 'mentor' | 'team'
  | 'startup_incubated' | 'startup_fundraising'
  | 'vc_partner'

export const ROLE_LABELS: Record<PlatformRole, string> = {
  admin: '管理員',
  staff_admin: '行政人員',
  staff_accelerator: '加速器專員',
  angel_member: '天使會員',
  mentor: '業師',
  team: '新創團隊',
  startup_incubated: '育成新創',
  startup_fundraising: '募資新創',
  vc_partner: '創投夥伴',
}

/** Route-to-role mapping for middleware/layout guards */
export const ROLE_ROUTE_MAP: Record<string, PlatformRole[]> = {
  '/angel/portal': ['angel_member'],
  '/mentor/portal': ['mentor'],
  '/startup/portal': ['team', 'startup_incubated', 'startup_fundraising'],
  '/admin': ['admin', 'staff_admin', 'staff_accelerator'],
}

/** Get the default landing page for a user based on their roles */
export function getDefaultRoute(roles: string[]): string {
  if (roles.includes('admin') || roles.includes('staff_admin')) return '/admin/dashboard'
  if (roles.includes('staff_accelerator')) return '/admin/dashboard'
  if (roles.includes('angel_member')) return '/angel/portal/upcoming'
  if (roles.includes('mentor')) return '/mentor/portal'
  if (roles.includes('team') || roles.includes('startup_incubated') || roles.includes('startup_fundraising')) return '/startup/portal'
  if (roles.includes('vc_partner')) return '/angel/portal/upcoming'  // VC partners see angel pipeline
  return '/'
}

/** Check if user has any of the required roles */
export function hasAnyRole(userRoles: string[], requiredRoles: PlatformRole[]): boolean {
  return requiredRoles.some(r => userRoles.includes(r))
}

/** Check if user is admin-tier (full backend access) */
export function isAdminTier(roles: string[]): boolean {
  return roles.includes('admin') || roles.includes('staff_admin')
}
