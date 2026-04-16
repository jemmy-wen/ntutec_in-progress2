interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Cleanup every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}, 5 * 60 * 1000)

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  'auth':            { windowMs: 60_000, maxRequests: 10 },
  'api':             { windowMs: 60_000, maxRequests: 60 },
  'ai':              { windowMs: 60_000, maxRequests: 5 },
  'voting':          { windowMs: 60_000, maxRequests: 30 },
  'export':          { windowMs: 60_000, maxRequests: 3 },
  'invitation':      { windowMs: 60_000, maxRequests: 20 },
  'contact':         { windowMs: 60_000, maxRequests: 5 },
  'chat':            { windowMs: 60_000, maxRequests: 10 },
  'webhook':         { windowMs: 60_000, maxRequests: 60 },
  'privileged-admin': { windowMs: 60_000, maxRequests: 5 },
}

export function checkRateLimit(
  identifier: string,
  category: keyof typeof RATE_LIMITS = 'api'
): { allowed: boolean; remaining: number; resetAt: number } {
  const config = RATE_LIMITS[category]
  const key = `${category}:${identifier}`
  const now = Date.now()

  const entry = store.get(key)
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + config.windowMs })
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs }
  }

  entry.count++
  if (entry.count > config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt }
}

export function rateLimitResponse(resetAt: number) {
  return new Response(
    JSON.stringify({ error: '請求過於頻繁，請稍後再試' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
      },
    }
  )
}
