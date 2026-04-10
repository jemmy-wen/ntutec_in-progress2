import { describe, it, expect } from 'vitest'
import {
  getNextTransition,
  getNextStatus,
  canTransition,
  isPhaseAllowed,
  CYCLE_TRANSITIONS,
  STATUS_LABELS,
  STATUS_COLORS,
  type MeetingCycleStatus,
} from '@/lib/utils/state-machine'

// ─── getNextTransition ───

describe('getNextTransition', () => {
  it('setup → cards_ready', () => {
    const t = getNextTransition('setup')
    expect(t?.next).toBe('cards_ready')
    expect(t?.trigger).toBe('manual')
  })

  it('cards_ready → vote_open', () => {
    const t = getNextTransition('cards_ready')
    expect(t?.next).toBe('vote_open')
    expect(t?.trigger).toBe('deadline')
  })

  it('vote_open → meeting', () => {
    const t = getNextTransition('vote_open')
    expect(t?.next).toBe('meeting')
    expect(t?.trigger).toBe('manual')
  })

  it('meeting → followup', () => {
    const t = getNextTransition('meeting')
    expect(t?.next).toBe('followup')
    expect(t?.trigger).toBe('auto')
  })

  it('followup → closed', () => {
    const t = getNextTransition('followup')
    expect(t?.next).toBe('closed')
    expect(t?.trigger).toBe('deadline')
  })

  it('closed returns null (terminal state)', () => {
    expect(getNextTransition('closed')).toBeNull()
  })
})

// ─── getNextStatus ───

describe('getNextStatus', () => {
  const cases: [MeetingCycleStatus, MeetingCycleStatus | null][] = [
    ['setup', 'cards_ready'],
    ['cards_ready', 'vote_open'],
    ['vote_open', 'meeting'],
    ['meeting', 'followup'],
    ['followup', 'closed'],
    ['closed', null],
  ]

  for (const [from, expected] of cases) {
    it(`${from} → ${expected}`, () => {
      expect(getNextStatus(from)).toBe(expected)
    })
  }
})

// ─── canTransition ───

describe('canTransition', () => {
  it('setup can transition (manual)', () => {
    expect(canTransition('setup')).toBe(true)
  })

  it('cards_ready can transition (deadline)', () => {
    expect(canTransition('cards_ready')).toBe(true)
  })

  it('vote_open can transition (manual)', () => {
    expect(canTransition('vote_open')).toBe(true)
  })

  it('meeting: auto trigger → canTransition returns false (auto not in manual|deadline)', () => {
    // meeting→followup is trigger:'auto', which is NOT in the manual|deadline check
    expect(canTransition('meeting')).toBe(false)
  })

  it('followup can transition (deadline)', () => {
    expect(canTransition('followup')).toBe(true)
  })

  it('closed cannot transition', () => {
    expect(canTransition('closed')).toBe(false)
  })

  it('canTransition with correct target returns true', () => {
    expect(canTransition('setup', 'cards_ready')).toBe(true)
  })

  it('canTransition with wrong target returns false', () => {
    expect(canTransition('setup', 'meeting')).toBe(false)
  })

  it('canTransition to null next (closed) returns false', () => {
    expect(canTransition('closed', 'setup')).toBe(false)
  })
})

// ─── isPhaseAllowed ───

describe('isPhaseAllowed', () => {
  describe('browse_cards', () => {
    it('allowed in cards_ready', () => {
      expect(isPhaseAllowed('browse_cards', 'cards_ready')).toBe(true)
    })
    it('allowed in vote_open', () => {
      expect(isPhaseAllowed('browse_cards', 'vote_open')).toBe(true)
    })
    it('not allowed in setup', () => {
      expect(isPhaseAllowed('browse_cards', 'setup')).toBe(false)
    })
    it('not allowed in meeting', () => {
      expect(isPhaseAllowed('browse_cards', 'meeting')).toBe(false)
    })
    it('not allowed in closed', () => {
      expect(isPhaseAllowed('browse_cards', 'closed')).toBe(false)
    })
  })

  describe('submit_response', () => {
    it('allowed in cards_ready', () => {
      expect(isPhaseAllowed('submit_response', 'cards_ready')).toBe(true)
    })
    it('allowed in vote_open', () => {
      expect(isPhaseAllowed('submit_response', 'vote_open')).toBe(true)
    })
    it('not allowed in followup', () => {
      expect(isPhaseAllowed('submit_response', 'followup')).toBe(false)
    })
  })

  describe('submit_vote', () => {
    it('only allowed in vote_open', () => {
      expect(isPhaseAllowed('submit_vote', 'vote_open')).toBe(true)
    })
    it('not allowed in cards_ready', () => {
      expect(isPhaseAllowed('submit_vote', 'cards_ready')).toBe(false)
    })
    it('not allowed in meeting', () => {
      expect(isPhaseAllowed('submit_vote', 'meeting')).toBe(false)
    })
  })

  describe('record_decision', () => {
    it('allowed in meeting', () => {
      expect(isPhaseAllowed('record_decision', 'meeting')).toBe(true)
    })
    it('allowed in followup', () => {
      expect(isPhaseAllowed('record_decision', 'followup')).toBe(true)
    })
    it('not allowed in vote_open', () => {
      expect(isPhaseAllowed('record_decision', 'vote_open')).toBe(false)
    })
  })

  it('returns false for unknown action', () => {
    expect(isPhaseAllowed('unknown_action', 'meeting')).toBe(false)
  })
})

// ─── Static data integrity ───

describe('CYCLE_TRANSITIONS completeness', () => {
  const expectedKeys = [
    'setup→cards_ready',
    'cards_ready→vote_open',
    'vote_open→meeting',
    'meeting→followup',
    'followup→closed',
  ]

  for (const key of expectedKeys) {
    it(`has transition: ${key}`, () => {
      expect(CYCLE_TRANSITIONS[key]).toBeDefined()
      expect(CYCLE_TRANSITIONS[key].next).toBeTruthy()
    })
  }
})

describe('STATUS_LABELS', () => {
  const allStatuses: MeetingCycleStatus[] = [
    'setup', 'cards_ready', 'vote_open', 'meeting', 'followup', 'closed',
  ]

  for (const status of allStatuses) {
    it(`has label for ${status}`, () => {
      expect(STATUS_LABELS[status]).toBeTruthy()
      expect(typeof STATUS_LABELS[status]).toBe('string')
    })
  }
})

describe('STATUS_COLORS', () => {
  const allStatuses: MeetingCycleStatus[] = [
    'setup', 'cards_ready', 'vote_open', 'meeting', 'followup', 'closed',
  ]

  for (const status of allStatuses) {
    it(`has Tailwind color class for ${status}`, () => {
      expect(STATUS_COLORS[status]).toBeTruthy()
      expect(STATUS_COLORS[status]).toMatch(/bg-\w+/)
    })
  }
})
