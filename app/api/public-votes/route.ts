/**
 * POST /api/public-votes
 * Public endpoint — no auth required.
 * Accepts batch votes from the monthly meeting public voting page.
 * Rate-limited: max 3 submissions per IP per 5 minutes.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Simple in-memory rate limiter (per serverless instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 5 * 60 * 1000 // 5 minutes
const RATE_LIMIT_MAX = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Valid startup IDs for the 2026-04 cycle
const VALID_STARTUP_IDS = new Set(['shipeng', 'longlink', 'stellarcell'])
const VALID_RECOMMENDATIONS = new Set(['follow_up', 'watch', 'pass'])

interface VotePayload {
  startup_id: string
  startup_name: string
  score_interest?: number
  recommendation?: string
  comment?: string
}

function isValidScore(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 1 && v <= 5
}

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: '投票過於頻繁，請 5 分鐘後再試' },
      { status: 429 }
    )
  }

  let body: { votes: VotePayload[]; voter_name?: string; voter_company?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '無效的請求格式' }, { status: 400 })
  }

  const { votes, voter_name, voter_company } = body

  if (!voter_name || !voter_name.trim()) {
    return NextResponse.json({ error: '請填寫您的姓名' }, { status: 400 })
  }

  if (!voter_company || !voter_company.trim()) {
    return NextResponse.json({ error: '請填寫您的公司名稱' }, { status: 400 })
  }

  if (!Array.isArray(votes) || votes.length === 0) {
    return NextResponse.json({ error: '至少需要一組投票' }, { status: 400 })
  }

  // Validate each vote
  const rows = []
  for (const vote of votes) {
    if (!VALID_STARTUP_IDS.has(vote.startup_id)) {
      return NextResponse.json(
        { error: `無效的新創 ID: ${vote.startup_id}` },
        { status: 400 }
      )
    }

    if (!isValidScore(vote.score_interest)) {
      return NextResponse.json(
        { error: `請為「${vote.startup_name}」評分投資意願` },
        { status: 400 }
      )
    }

    if (vote.recommendation && !VALID_RECOMMENDATIONS.has(vote.recommendation)) {
      return NextResponse.json(
        { error: `無效的推薦選項: ${vote.recommendation}` },
        { status: 400 }
      )
    }

    rows.push({
      meeting_cycle: '2026-04',
      startup_id: vote.startup_id,
      startup_name: vote.startup_name,
      voter_name: `${voter_name.trim()} / ${voter_company.trim()}`,
      is_member: false,
      score_interest: vote.score_interest,
      score_business: null,
      score_team: null,
      score_market: null,
      recommendation: vote.recommendation ?? null,
      comment: vote.comment?.trim() || null,
    })
  }

  const { error } = await getSupabase()
    .from('meeting_public_votes')
    .insert(rows)

  if (error) {
    console.error('[public-votes] Insert error:', error)
    return NextResponse.json(
      { error: '投票儲存失敗，請稍後再試' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, count: rows.length })
}
