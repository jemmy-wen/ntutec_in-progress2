import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '使用條款 | NTUTEC',
  description: '台大創創中心網站使用條款：存取本網站即表示您同意以下條款。',
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="使用條款"
        subtitle="Terms of Use"
        description="存取或使用本網站，即表示您同意以下使用條款。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-slate">
            <p className="text-sm text-slate-muted mb-8">最後更新：2026 年 1 月</p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">一、著作權</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站所有內容（包含文字、圖片、商標、影片）均屬國立臺灣大學創意創業中心或相關權利人所有，未經書面授權不得擅自重製、轉載或用於商業用途。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">二、免責聲明</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站資訊僅供參考，不構成任何投資建議或法律意見。本中心對網站內容的準確性及完整性不作任何明示或默示之保證，亦不對因使用本網站內容所產生的損失承擔責任。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">三、外部連結</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站可能包含第三方網站連結，僅供方便使用。本中心不對第三方網站的內容或隱私實踐負責。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">四、適用法律</h2>
            <p className="text-slate-muted leading-relaxed">
              本條款依中華民國法律解釋，任何爭議以台灣台北地方法院為第一審管轄法院。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">五、聯絡我們</h2>
            <p className="text-slate-muted leading-relaxed">
              如有任何疑問，歡迎來信：
              <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4 hover:text-teal ml-1">ntutec@ntutec.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
