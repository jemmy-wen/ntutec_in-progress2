import { createAdminClient } from '@/lib/supabase/admin'

export type AuditAction =
  | 'create' | 'update' | 'delete' | 'hard_delete'
  | 'archive' | 'unarchive' | 'transition' | 'rollback'
  | 'login' | 'redeem'
  | 'view_card' | 'submit_response' | 'submit_vote'
  | 'send_notification'
  | 'add_observation' | 'reactivate'

export type AuditEntityType =
  | 'meeting_cycle' | 'member' | 'startup' | 'invitation'
  | 'card_response' | 'vote' | 'learning_progress'
  | 'notification' | 'observation' | 'settings'
  // Mentor module (reserved)
  | 'mentor' | 'team' | 'slot' | 'wish' | 'matching' | 'decision' | 'feedback'

export interface AuditLogParams {
  userId: string | null
  action: AuditAction
  entityType: AuditEntityType
  entityId?: string
  changes?: {
    before?: Record<string, unknown>
    after?: Record<string, unknown>
  }
  metadata?: Record<string, unknown>
}

/**
 * Write audit log entry. Uses service_role to bypass RLS.
 * Non-blocking: errors logged but never thrown.
 */
export async function auditLog(params: AuditLogParams): Promise<void> {
  try {
    const admin = createAdminClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = admin.from('audit_logs') as any
    const { error } = await table.insert({
      user_id: params.userId,
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId || null,
      changes: params.changes || null,
      metadata: params.metadata || null,
    })
    if (error) {
      console.error('[AuditLog] Failed:', error.message)
    }
  } catch (err) {
    console.error('[AuditLog] Unexpected error:', err)
  }
}

export function extractRequestMetadata(request: Request): Record<string, unknown> {
  return {
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
  }
}
