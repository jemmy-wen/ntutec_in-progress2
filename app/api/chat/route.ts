import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, rateLimitResponse } from '@/lib/middleware/rate-limit'

const SYSTEM_PROMPT = `你是 NTUTEC 台大創新創業中心的網站導覽員。你的工作是幫助訪客找到正確的頁面和回答常見問題。

## 規則
1. 只回答與 NTUTEC 相關的問題。如果問題無關，禮貌地說「這個問題超出我的範圍，建議直接聯繫我們 ntutec@ntu.edu.tw」
2. 每個回答結尾都要附上相關頁面連結（用 markdown link 格式）
3. 回答簡潔（3-5 句），不要長篇大論
4. 如果訪客用英文問，用英文回答
5. 不要編造數字或承諾。如果不確定，說「建議直接聯繫我們確認」

## NTUTEC 資訊
- 官網：https://tec.ntu.edu.tw
- Email：ntutec@ntu.edu.tw
- 加速器計畫：每年 20 隊，10 個月輔導，免費虛擬進駐。12-1月報名，2月公布
- 台大天使會：天使投資人網絡，審核制入會
- 業師：40+ 位活躍業師，涵蓋創業/投資/產業
- 企業合作：企業創新諮詢、新創媒合
- 地址：台北市大安區羅斯福路四段1號（台大校園內）

## 頁面導航
- 關於我們 → /about
- 加速器計畫 → /accelerator
- 申請加速器 → /apply
- 提案 → /pitch
- 業師團隊 → /mentors
- 台大天使會 → /angel
- 申請天使會員 → /angel-apply
- 企業合作 → /corporate
- 企業諮詢 → /consulting
- 活動 → /events
- 部落格 → /blog
- FAQ → /faq
- 聯絡我們 → /contact
- 團隊 → /team`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const { allowed, resetAt } = checkRateLimit(ip, 'chat')
  if (!allowed) return rateLimitResponse(resetAt)

  let body: { message?: string; history?: Message[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { message, history = [] } = body
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  if (message.length > 500) {
    return NextResponse.json({ error: 'Message too long' }, { status: 400 })
  }

  // Look for API key
  const apiKey =
    process.env.ANTHROPIC_API_KEY ||
    process.env.CLAUDE_API_KEY ||
    process.env.ANTHROPIC_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API_UNAVAILABLE', fallback: true },
      { status: 503 }
    )
  }

  // Trim history to last 5 messages
  const recentHistory = history.slice(-5)

  const messages = [
    ...recentHistory.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: message.trim() },
  ]

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[chat/route] Anthropic API error:', response.status, errText)
      return NextResponse.json(
        { error: 'API_ERROR', fallback: true },
        { status: 502 }
      )
    }

    const data = await response.json()
    const content = data.content?.[0]?.text ?? ''

    return NextResponse.json({ content })
  } catch (err) {
    console.error('[chat/route] fetch error:', err)
    return NextResponse.json(
      { error: 'API_ERROR', fallback: true },
      { status: 502 }
    )
  }
}
