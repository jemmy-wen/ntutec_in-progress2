/**
 * Auto-reply email templates for website form submissions.
 * All templates are in Traditional Chinese with NTUTEC branding.
 */

export type FormType = 'contact' | 'apply' | 'angel_apply' | 'pitch' | 'consulting' | 'angel_individual' | 'angel_corporate'

interface AutoReplyOptions {
  name: string
  type: FormType
}

interface EmailTemplate {
  subject: string
  html: string
}

const SITE_NAME = '台大創創中心 NTUTEC'
const REPLY_TO = 'ntutec@ntu.edu.tw'

/** Brand-consistent HTML wrapper */
function wrap(name: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background:#0d9488;padding:24px 32px;">
      <div style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;">NTUTEC</div>
      <div style="color:#ccfbf1;font-size:13px;margin-top:2px;">台大創創中心</div>
    </div>
    <!-- Body -->
    <div style="padding:32px;">
      <p style="margin:0 0 16px;color:#111827;font-size:16px;">
        ${escapeHtml(name)} 您好，
      </p>
      ${bodyContent}
      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;" />
      <p style="margin:0;color:#6b7280;font-size:13px;">
        ${SITE_NAME}<br />
        回覆信箱：<a href="mailto:${REPLY_TO}" style="color:#0d9488;">${REPLY_TO}</a><br />
        官網：<a href="https://tec.ntu.edu.tw" style="color:#0d9488;">tec.ntu.edu.tw</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const TEMPLATES: Record<FormType, (name: string) => EmailTemplate> = {
  contact: (name) => ({
    subject: '感謝您的來信 — 台大創創中心 NTUTEC',
    html: wrap(name, `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        感謝您與我們聯繫！我們已收到您的訊息，將在 <strong>3 個工作天內</strong>回覆您。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        如需即時協助，歡迎直接來信 <a href="mailto:${REPLY_TO}" style="color:#0d9488;">${REPLY_TO}</a>。
      </p>
    `),
  }),

  apply: (name) => ({
    subject: '已收到您的加速器申請 — 台大創創中心 NTUTEC',
    html: wrap(name, `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        感謝您申請台大加速器計畫！我們已收到您的申請資料，審查團隊將逐一評估。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        預計在 <strong>3 週內</strong>通知您審查結果。請保持 Email 暢通，若有需要補充說明，我們會主動聯繫。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        了解更多計畫資訊：<a href="https://tec.ntu.edu.tw/programs" style="color:#0d9488;">tec.ntu.edu.tw/programs</a>
      </p>
    `),
  }),

  angel_apply: (name) => ({
    subject: '已收到您的天使會員申請 — NTUTEC ANGELS',
    html: wrap(name, `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        感謝您申請加入 NTUTEC ANGELS 台大天使會！我們已收到您的申請。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        投資團隊將盡速安排與您聯繫，進一步說明會員制度與參與方式。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        了解台大天使會：<a href="https://tec.ntu.edu.tw/angel" style="color:#0d9488;">tec.ntu.edu.tw/angel</a>
      </p>
    `),
  }),

  pitch: (name) => ({
    subject: '已收到您的新創投遞 — NTUTEC ANGELS',
    html: wrap(name, `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        感謝您向 NTUTEC ANGELS 投遞您的新創！我們已收到您的提案資料。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        投資經理將逐一審閱每份資料。符合條件的新創，我們<strong>會主動與您聯繫</strong>，安排進一步了解，不需等待回音。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        了解投遞流程：<a href="https://tec.ntu.edu.tw/pitch" style="color:#0d9488;">tec.ntu.edu.tw/pitch</a>
      </p>
    `),
  }),

  consulting: (name) => ({
    subject: '已收到您的企業諮詢需求 — 台大創創中心 NTUTEC',
    html: wrap(name, `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        感謝您洽詢台大創創中心的企業諮詢服務！我們已收到您的需求說明。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        專人將於 <strong>3 個工作日內</strong>與您聯繫，評估需求並安排後續討論。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        了解諮詢服務：<a href="https://tec.ntu.edu.tw/consulting" style="color:#0d9488;">tec.ntu.edu.tw/consulting</a>
      </p>
    `),
  }),

  angel_individual: (name) => ({
    subject: '已收到您的天使會員申請 — NTUTEC ANGELS',
    html: wrap(name, `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        感謝您申請加入 NTUTEC ANGELS 台大天使會！我們已收到您的個人會員申請。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        投資團隊將盡速安排與您聯繫，進一步說明會員制度與參與方式。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        了解台大天使會：<a href="https://tec.ntu.edu.tw/angel" style="color:#0d9488;">tec.ntu.edu.tw/angel</a>
      </p>
    `),
  }),

  angel_corporate: (name) => ({
    subject: '已收到貴公司的天使會員申請 — NTUTEC ANGELS',
    html: wrap(name, `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        感謝貴公司申請加入 NTUTEC ANGELS 台大天使會！我們已收到貴公司的企業會員申請。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        將由專人與您聯繫，說明企業會員制度及後續流程。
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        了解台大天使會：<a href="https://tec.ntu.edu.tw/angel" style="color:#0d9488;">tec.ntu.edu.tw/angel</a>
      </p>
    `),
  }),
}

/**
 * Get the auto-reply email template for a given form type.
 */
export function getAutoReplyTemplate(options: AutoReplyOptions): EmailTemplate {
  const templateFn = TEMPLATES[options.type] ?? TEMPLATES.contact
  return templateFn(options.name)
}

/**
 * Convenience: get confirmation email for angel_corporate webhook.
 * @param companyOrRepName - 企業名稱 or 第一位代表人姓名
 */
export function getAngelCorporateConfirmation(companyOrRepName: string): EmailTemplate {
  return TEMPLATES.angel_corporate(companyOrRepName)
}

export { REPLY_TO }
