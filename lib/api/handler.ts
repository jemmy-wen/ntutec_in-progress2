/**
 * 統一 API Route Handler — 共用防護管線
 *
 * Ported from P014 Mentor Matching, adapted for multi-module platform.
 * All API routes share one pipeline: Rate Limit → Auth → Role → Body Parse → Cycle/Phase → Handler → Audit
 *
 * Modules: angel (天使會員), mentor (業師健診), admin (後台)
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, rateLimitResponse } from '@/lib/middleware/rate-limit'
import { auditLog, extractRequestMetadata, type AuditAction, type AuditEntityType } from '@/lib/audit/logger'

// ─── Types ─────────────────────────────────────────────

/** Platform roles across all modules */
export type PlatformRole =
  | 'admin' | 'staff_admin' | 'staff_accelerator'  // Team backend
  | 'angel_member'                                    // Angel Club
  | 'mentor' | 'team'                                 // Mentor Matching (reserved)
  | 'startup_incubated' | 'startup_fundraising'       // Startup portal (reserved)
  | 'vc_partner'                                       // VC partner (reserved)

/** Handler context */
export interface ApiContext {
  auth: { id: string; email?: string }
  roles: string[]
  isAdmin: boolean
  supabase: ReturnType<typeof createClient> extends Promise<infer T> ? T : never
  searchParams: URLSearchParams
  body: Record<string, unknown> | null
  params: Record<string, string>
  request: Request
  /** Meeting cycle (angel module) or clinic cycle (mentor module) */
  cycle: { id: string; status: string; is_archived: boolean } | null
}

/** Handler config */
export interface ApiHandlerConfig {
  roles: PlatformRole[]
  rateLimit?: 'auth' | 'api' | 'ai' | 'voting' | 'export' | 'invitation'
  /** Load meeting cycle: 'query' reads from ?cycle_id=, 'body' reads from body.cycle_id */
  requireCycleId?: 'query' | 'body' | false
  /** Phase enforcement action name (checked against cycle status) */
  phaseAction?: string
  cycleIdForNonAdmin?: boolean
  maxBodySize?: number
  audit?: { action: AuditAction; entityType: AuditEntityType }
  /** Which cycle table to load from (default: 'pip_meetings' for angel) */
  cycleTable?: string
}

type HandlerFn = (ctx: ApiContext) => Promise<NextResponse | Response>

// ─── Validation Helpers ─────────────────────────────────

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const CYCLE_ID_RE = /^\d{4}-(0[1-9]|1[0-2])$/

export function isValidUUID(s: string): boolean {
  return UUID_RE.test(s)
}

export function isValidCycleId(s: string): boolean {
  return CYCLE_ID_RE.test(s)
}

// ─── Core: withApiHandler ──────────────────────────────

export function withApiHandler(config: ApiHandlerConfig, handler: HandlerFn) {
  return async (request: Request, routeContext: { params: Promise<Record<string, string>> }) => {
    try {
      // ── 1. Rate Limiting ──
      const category = config.rateLimit || 'api'
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
      const rateCheck = checkRateLimit(ip, category)
      if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt)
      }

      // ── 2. Auth ──
      const supabase = await createClient()
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return NextResponse.json({ error: '未登入' }, { status: 401 })
      }

      // Fetch user roles from unified module_roles table
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: roleRows } = await (supabase.from('module_roles') as any)
        .select('role, module')
        .eq('user_id', user.id)
        .eq('is_active', true)
      const roles = (roleRows || []).map((r: { role: string }) => r.role) as string[]
      const isAdmin = roles.includes('admin') || roles.includes('staff_admin')

      // Check required roles
      if (config.roles.length > 0) {
        const hasRole = config.roles.some(r => roles.includes(r))
        if (!hasRole) {
          return NextResponse.json({ error: '權限不足' }, { status: 403 })
        }
      }

      // ── 3. Parse params ──
      const params: Record<string, string> = routeContext?.params
        ? await routeContext.params
        : {}

      // ── 4. Parse body ──
      let body: Record<string, unknown> | null = null
      const method = request.method.toUpperCase()
      if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
        const maxSize = config.maxBodySize || 1_048_576
        const contentLength = parseInt(request.headers.get('content-length') || '0')
        if (contentLength > maxSize) {
          return NextResponse.json(
            { error: `請求內容過大，上限為 ${Math.round(maxSize / 1024)}KB` },
            { status: 413 }
          )
        }
        try {
          body = await request.json()
        } catch {
          body = null
        }
      }

      // ── 5. Search params ──
      const searchParams = new URL(request.url).searchParams

      // ── 6. Cycle loading (angel: pip_meetings, mentor: cycles) ──
      let cycle: ApiContext['cycle'] = null
      let cycleId: string | null = null

      if (config.requireCycleId === 'query') {
        cycleId = searchParams.get('cycle_id')
      } else if (config.requireCycleId === 'body' && body) {
        cycleId = (body.cycle_id as string) || null
      }

      if (config.cycleIdForNonAdmin && !cycleId && !isAdmin) {
        return NextResponse.json({ error: 'cycle_id is required' }, { status: 400 })
      }

      if (cycleId) {
        if (!isValidCycleId(cycleId)) {
          return NextResponse.json({ error: '週期 ID 格式無效（應為 YYYY-MM）' }, { status: 400 })
        }

        const table = config.cycleTable || 'pip_meetings'
        const { data: cycleData } = await supabase
          .from(table)
          .select('id, status, is_archived')
          .eq('id', cycleId)
          .maybeSingle() as { data: { id: string; status: string; is_archived: boolean } | null }

        if (!cycleData) {
          return NextResponse.json({ error: '找不到指定週期' }, { status: 404 })
        }
        if (cycleData.is_archived) {
          return NextResponse.json({ error: '此週期已歸檔，無法修改' }, { status: 403 })
        }
        cycle = cycleData
      } else if (config.requireCycleId) {
        return NextResponse.json({ error: 'cycle_id is required' }, { status: 400 })
      }

      // ── 7. Build context & call handler ──
      const ctx: ApiContext = {
        auth: { id: user.id, email: user.email },
        roles,
        isAdmin,
        supabase: supabase as ApiContext['supabase'],
        searchParams,
        body,
        params,
        request,
        cycle,
      }

      const response = await handler(ctx)

      // ── 8. Auto audit log ──
      if (config.audit && response.status >= 200 && response.status < 300) {
        auditLog({
          userId: user.id,
          action: config.audit.action,
          entityType: config.audit.entityType,
          entityId: params.id || cycleId || '',
          metadata: extractRequestMetadata(request),
        }).catch(err => console.error('Audit log error:', err))
      }

      return response
    } catch (err) {
      const errorInfo = {
        method: request.method,
        url: request.url,
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
        timestamp: new Date().toISOString(),
      }
      console.error('API Error:', JSON.stringify(errorInfo))
      return NextResponse.json({ error: '伺服器內部錯誤' }, { status: 500 })
    }
  }
}

// ─── Common validation helpers ────────────────────────

export function requireFields(
  body: Record<string, unknown> | null,
  ...fields: string[]
): string | null {
  if (!body) return '請求內容為空'
  for (const field of fields) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return `缺少必填欄位：${field}`
    }
  }
  return null
}

export function sanitizeSearch(search: string): string {
  return search
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
    .replace(/[,.()/\\]/g, '')
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function filterFields(
  fields: Record<string, unknown>,
  allowedKeys: Set<string>
): Record<string, unknown> {
  const filtered: Record<string, unknown> = {}
  for (const key of Object.keys(fields)) {
    if (allowedKeys.has(key)) {
      filtered[key] = fields[key]
    }
  }
  return filtered
}
