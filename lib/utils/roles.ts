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
  | 'angel_member' | 'visitor'
  | 'mentor' | 'team'
  | 'startup_incubated' | 'startup_fundraising'
  | 'vc_partner'

export const ROLE_LABELS: Record<PlatformRole, string> = {
  admin: '管理員',
  staff_admin: '行政人員',
  staff_accelerator: '加速器專員',
  angel_member: '天使會員',
  visitor: '訪客',
  mentor: '業師',
  team: '新創團隊',
  startup_incubated: '育成新創',
  startup_fundraising: '募資新創',
  vc_partner: '創投夥伴',
}

/**
 * Route-to-role mapping for server-side guards in platform layout.
 * Order matters: more specific paths must come BEFORE broader prefixes.
 * The layout iterates and breaks on the first startsWith() match.
 *
 * visitor = auto-assigned on first login (unpaid). Only allowed on:
 *   /my, /angel/onboarding, /angel/portal/upcoming, /angel/portal/profile
 * All other /angel/portal/* sub-pages require paid angel_member role.
 */
export const ROLE_ROUTE_MAP: Record<string, PlatformRole[]> = {
  // ── Visitor-accessible angel paths (must be listed BEFORE /angel/portal) ──
  '/angel/onboarding':          ['admin', 'staff_admin', 'staff_accelerator', 'angel_member', 'visitor'],
  '/angel/portal/upcoming':     ['admin', 'staff_admin', 'staff_accelerator', 'angel_member', 'visitor'],
  '/angel/portal/profile':      ['admin', 'staff_admin', 'staff_accelerator', 'angel_member', 'visitor'],
  // ── All other angel portal pages: paid members only ──
  '/angel/portal':              ['admin', 'staff_admin', 'staff_accelerator', 'angel_member'],
  // ── Admin ──
  '/admin':                     ['admin', 'staff_admin', 'staff_accelerator'],
  // ── My page: all authenticated roles ──
  '/my': ['admin', 'staff_admin', 'staff_accelerator', 'angel_member', 'visitor', 'mentor', 'team', 'startup_incubated', 'startup_fundraising', 'vc_partner'],
}

/** Get the default landing page for a user based on their roles */
export function getDefaultRoute(roles: string[]): string {
  if (roles.includes('admin') || roles.includes('staff_admin')) return '/admin/dashboard'
  if (roles.includes('staff_accelerator')) return '/admin/dashboard'
  if (roles.includes('angel_member')) return '/angel/portal/upcoming'
  // visitor → /my (not portal — avoids redirect loop and keeps portal gated)
  if (roles.includes('visitor')) return '/my'
  if (roles.includes('mentor')) return '/my'
  if (roles.includes('startup_incubated') || roles.includes('startup_fundraising') || roles.includes('team')) return '/my'
  if (roles.includes('vc_partner')) return '/my'
  return '/my'
}

/** Check if user has paid member access (angel_member or above) */
export function isPaidMember(roles: string[]): boolean {
  return roles.includes('admin') || roles.includes('staff_admin') || roles.includes('angel_member')
}

/** Check if user has any of the required roles */
export function hasAnyRole(userRoles: string[], requiredRoles: PlatformRole[]): boolean {
  return requiredRoles.some(r => userRoles.includes(r))
}

/** Check if user is admin-tier (full backend access) */
export function isAdminTier(roles: string[]): boolean {
  return roles.includes('admin') || roles.includes('staff_admin')
}
