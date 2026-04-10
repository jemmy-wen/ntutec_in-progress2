import { describe, it, expect, vi, beforeEach } from 'vitest'

// ─── Mocks (must be hoisted before imports) ───

vi.mock('@/lib/notifications/in-app', () => ({
  createInAppNotification: vi.fn().mockResolvedValue(undefined),
  sendBulkNotifications: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@/lib/notifications/email', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      not: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: { telegram_chat_id: 'chat-123' } }),
    })),
    auth: {
      admin: {
        listUsers: vi.fn().mockResolvedValue({ data: { users: [] } }),
      },
    },
  })),
}))

import { notify, notifyBulk, sendTelegramNotification } from '@/lib/notifications/service'
import { createInAppNotification, sendBulkNotifications } from '@/lib/notifications/in-app'
import { sendEmail } from '@/lib/notifications/email'

// ─── Helpers ───

function mockFetch(ok: boolean, body = {}) {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    text: vi.fn().mockResolvedValue(JSON.stringify(body)),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  delete process.env.TELEGRAM_BOT_TOKEN
})

// ─── sendTelegramNotification ───

describe('sendTelegramNotification', () => {
  it('returns false and skips when TELEGRAM_BOT_TOKEN not set', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    const result = await sendTelegramNotification({ chatId: '123', message: 'hello' })
    expect(result).toBe(false)
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('sends POST to Telegram API when token is set', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'test-token'
    mockFetch(true)

    const result = await sendTelegramNotification({ chatId: '456', message: 'test msg' })

    expect(result).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.telegram.org/bottest-token/sendMessage',
      expect.objectContaining({ method: 'POST' })
    )

    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
    expect(body.chat_id).toBe('456')
    expect(body.text).toBe('test msg')
    expect(body.parse_mode).toBe('Markdown')
  })

  it('returns false when Telegram API responds with error', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'test-token'
    mockFetch(false)

    const result = await sendTelegramNotification({ chatId: '456', message: 'test' })
    expect(result).toBe(false)
  })

  it('returns false when fetch throws', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'test-token'
    global.fetch = vi.fn().mockRejectedValue(new Error('network error'))

    const result = await sendTelegramNotification({ chatId: '456', message: 'test' })
    expect(result).toBe(false)
  })
})

// ─── notify: in_app channel ───

describe('notify — in_app channel', () => {
  it('calls createInAppNotification with correct params', async () => {
    await notify({
      userId: 'user-1',
      title: '測試通知',
      body: '內容',
      type: 'info',
      link: '/angel/portal',
      channels: ['in_app'],
    })

    expect(createInAppNotification).toHaveBeenCalledWith({
      userId: 'user-1',
      title: '測試通知',
      body: '內容',
      type: 'info',
      link: '/angel/portal',
    })
  })

  it('defaults to in_app when channels not specified', async () => {
    await notify({ userId: 'user-2', title: 'default' })
    expect(createInAppNotification).toHaveBeenCalledOnce()
  })

  it('does not call in_app when not in channels', async () => {
    await notify({
      userId: 'user-3',
      title: 'email only',
      channels: ['email'],
      email: { to: 'a@b.com' },
    })
    expect(createInAppNotification).not.toHaveBeenCalled()
  })
})

// ─── notify: email channel ───

describe('notify — email channel', () => {
  it('sends email when channel and email params provided', async () => {
    await notify({
      userId: 'user-1',
      title: 'Email 通知',
      body: 'body text',
      channels: ['email'],
      email: { to: 'test@example.com', subject: '主旨', html: '<p>test</p>' },
    })

    expect(sendEmail).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: '主旨',
      html: '<p>test</p>',
    })
  })

  it('uses title as subject when email.subject not provided', async () => {
    await notify({
      userId: 'user-1',
      title: '自動主旨',
      channels: ['email'],
      email: { to: 'test@example.com' },
    })

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: '自動主旨' })
    )
  })

  it('does not send email when email params missing', async () => {
    await notify({ userId: 'user-1', title: 'no email', channels: ['email'] })
    expect(sendEmail).not.toHaveBeenCalled()
  })
})

// ─── notify: telegram channel ───

describe('notify — telegram channel', () => {
  it('skips Telegram when token not set', async () => {
    const fetchSpy = vi.fn()
    global.fetch = fetchSpy

    await notify({
      userId: 'user-1',
      title: 'Test',
      channels: ['telegram'],
      telegramChatId: 'chat-999',
    })

    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('sends Telegram when token set and chatId provided directly', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'test-token'
    mockFetch(true)

    await notify({
      userId: 'user-1',
      title: 'Telegram Test',
      channels: ['telegram'],
      telegramChatId: 'direct-chat-id',
    })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.telegram.org'),
      expect.any(Object)
    )
  })
})

// ─── notifyBulk ───

describe('notifyBulk', () => {
  it('sends in-app to all users and returns sent count', async () => {
    const result = await notifyBulk({
      userIds: ['u1', 'u2', 'u3'],
      title: 'Bulk 通知',
      channels: ['in_app'],
    })

    expect(sendBulkNotifications).toHaveBeenCalledWith(
      ['u1', 'u2', 'u3'],
      expect.objectContaining({ title: 'Bulk 通知' })
    )
    expect(result.sent).toBe(3)
  })

  it('does not send email unless includeEmail is true', async () => {
    await notifyBulk({
      userIds: ['u1'],
      title: 'test',
      channels: ['in_app', 'email'],
      includeEmail: false,
    })
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('returns sent count from in_app only when in_app channel used', async () => {
    const result = await notifyBulk({
      userIds: ['u1', 'u2'],
      title: 'count test',
      channels: ['in_app'],
    })
    expect(result.sent).toBe(2)
  })
})
