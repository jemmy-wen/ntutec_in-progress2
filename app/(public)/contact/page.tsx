import { Suspense } from 'react'
import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: '聯絡我們 | NTUTEC',
  description: '聯絡臺大創創中心，取得地址、電話、Email 及辦公時間等資訊。',
}

export default function ContactPage() {
  return (
    <>
      <PageHero title="聯絡我們" subtitle="Contact" description="有任何問題或合作提案，歡迎與我們聯繫。" />

      <section className="section-spacing">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6">寄送訊息</h2>
              <Suspense fallback={<div className="text-center py-8 text-slate-muted">載入中...</div>}>
                <ContactForm />
              </Suspense>
            </div>

            <div>
              <h2 className="mb-6">聯絡資訊</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-1 font-semibold">地址</h4>
                  <p className="text-slate-muted">台北市中正區思源街 18 號<br />台大水源校區卓越研究大樓 7 樓</p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Email</h4>
                  <p><a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4">ntutec@ntutec.com</a></p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">辦公時間</h4>
                  <p className="text-slate-muted">週一至週五 09:00 - 18:00<br />週六、日及國定假日休息</p>
                </div>
              </div>

              <div className="mt-8 flex h-64 items-center justify-center rounded-xl bg-stone">
                <span className="text-sm text-slate-muted">Google Map</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
