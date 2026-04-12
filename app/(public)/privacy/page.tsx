import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '隱私權政策 | NTUTEC',
  description: '台大創創中心隱私權政策：說明本網站如何蒐集、使用及保護您的個人資料。',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="隱私權政策"
        subtitle="Privacy Policy"
        description="本政策說明國立臺灣大學創意創業中心如何蒐集、使用及保護您的個人資料。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-slate">
            <p className="text-sm text-slate-muted mb-8">最後更新：2026 年 1 月</p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">一、蒐集的資料</h2>
            <p className="text-slate-muted leading-relaxed">
              當您透過本網站填寫聯絡表單、申請加入輔導計畫或訂閱電子報時，我們可能蒐集您的姓名、電子郵件、聯絡電話及公司/團隊相關資訊。本網站亦使用標準的網站流量分析工具（如 Google Analytics），記錄訪客來源、頁面瀏覽等匿名統計資料。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">二、資料使用目的</h2>
            <p className="text-slate-muted leading-relaxed">
              所蒐集的個人資料僅用於：回覆您的詢問、處理申請案件、發送活動及電子報通知。我們不會將您的個人資料出售或出租予第三方。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">三、資料保護</h2>
            <p className="text-slate-muted leading-relaxed">
              本中心依據《個人資料保護法》採取合理的技術與管理措施，保護您的個人資料不遭未授權存取、洩漏或濫用。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">四、Cookie</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站使用 Cookie 改善使用體驗。您可透過瀏覽器設定拒絕 Cookie，但部分功能可能因此受限。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">五、聯絡我們</h2>
            <p className="text-slate-muted leading-relaxed">
              如對本隱私權政策有任何疑問，歡迎來信：
              <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4 hover:text-teal ml-1">ntutec@ntutec.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
