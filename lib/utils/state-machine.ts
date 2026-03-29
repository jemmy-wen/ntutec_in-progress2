/**
 * Angel Meeting Cycle State Machine
 *
 * Each monthly angel club meeting follows this lifecycle:
 *   setup → cards_ready → vote_open → meeting → followup → closed
 *
 * Adapted from P014 Mentor Matching cycle states.
 */

export type MeetingCycleStatus =
  | 'setup'         // Admin 準備候選新創
  | 'cards_ready'   // D-21: 卡片上架，會員可瀏覽
  | 'vote_open'     // D-7: 正式投票開放
  | 'meeting'       // D-0: 月會進行中
  | 'followup'      // D+1~D+30: 投後追蹤
  | 'closed'        // 歸檔

export interface Transition {
  next: MeetingCycleStatus
  trigger: 'manual' | 'auto' | 'deadline'
  description: string
}

export const CYCLE_TRANSITIONS: Record<string, Transition> = {
  'setup→cards_ready':     { next: 'cards_ready', trigger: 'manual',   description: 'Admin 上架候選新創卡片（D-21）' },
  'cards_ready→vote_open': { next: 'vote_open',   trigger: 'deadline', description: '投票開放（D-7）或 Admin 手動開啟' },
  'vote_open→meeting':     { next: 'meeting',     trigger: 'manual',   description: 'Admin 標記月會開始（D-0）' },
  'meeting→followup':      { next: 'followup',    trigger: 'auto',     description: '月會結束 → 自動進入追蹤期' },
  'followup→closed':       { next: 'closed',      trigger: 'deadline', description: 'D+30 或 Admin 手動歸檔' },
}

export const STATUS_LABELS: Record<MeetingCycleStatus, string> = {
  setup: '準備中',
  cards_ready: '卡片瀏覽期',
  vote_open: '投票開放',
  meeting: '月會進行中',
  followup: '投後追蹤',
  closed: '已歸檔',
}

export const STATUS_COLORS: Record<MeetingCycleStatus, string> = {
  setup: 'bg-gray-100 text-gray-700',
  cards_ready: 'bg-blue-100 text-blue-700',
  vote_open: 'bg-purple-100 text-purple-700',
  meeting: 'bg-orange-100 text-orange-700',
  followup: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-green-100 text-green-700',
}

export function getNextTransition(current: MeetingCycleStatus): Transition | null {
  for (const [key, value] of Object.entries(CYCLE_TRANSITIONS)) {
    if (key.startsWith(current + '→')) return value
  }
  return null
}

export function getNextStatus(current: MeetingCycleStatus): MeetingCycleStatus | null {
  return getNextTransition(current)?.next ?? null
}

export function canTransition(current: MeetingCycleStatus, target?: MeetingCycleStatus): boolean {
  const transition = getNextTransition(current)
  if (!transition) return false
  if (target) return transition.next === target
  return transition.trigger === 'manual' || transition.trigger === 'deadline'
}

// ─── Phase Enforcement ───

export const ALLOWED_PHASES: Record<string, MeetingCycleStatus[]> = {
  browse_cards:    ['cards_ready', 'vote_open'],
  submit_response: ['cards_ready', 'vote_open'],
  submit_vote:     ['vote_open'],
  record_decision: ['meeting', 'followup'],
}

export function isPhaseAllowed(action: string, currentStatus: MeetingCycleStatus): boolean {
  const allowed = ALLOWED_PHASES[action]
  return allowed ? allowed.includes(currentStatus) : false
}
