import { createAdminClient } from '@/lib/supabase/admin'

export type NotificationType = 'info' | 'action' | 'warning' | 'success'

interface CreateNotificationParams {
  userId: string
  title: string
  body?: string
  type?: NotificationType
  link?: string
}

/**
 * Create in-app notification for a user.
 * Uses service_role to bypass RLS.
 */
export async function createInAppNotification(params: CreateNotificationParams): Promise<void> {
  try {
    const admin = createAdminClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = admin.from('in_app_notifications') as any
    const { error } = await table.insert({
      user_id: params.userId,
      title: params.title,
      body: params.body || null,
      type: params.type || 'info',
      link: params.link || null,
    })
    if (error) {
      console.error('[Notification] Failed:', error.message)
    }
  } catch (err) {
    console.error('[Notification] Unexpected error:', err)
  }
}

/**
 * Send bulk notifications to multiple users.
 */
export async function sendBulkNotifications(
  userIds: string[],
  notification: { title: string; body?: string; type?: NotificationType; link?: string }
): Promise<void> {
  if (userIds.length === 0) return

  const admin = createAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const table = admin.from('in_app_notifications') as any
  const { error } = await table.insert(
    userIds.map(userId => ({
      user_id: userId,
      title: notification.title,
      body: notification.body || null,
      type: notification.type || 'info',
      link: notification.link || null,
    }))
  )
  if (error) {
    console.error('[BulkNotification] Failed:', error.message)
  }
}
