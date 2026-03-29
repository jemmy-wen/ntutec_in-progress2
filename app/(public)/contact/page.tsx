import { Suspense } from 'react'
import ContactForm from './ContactForm'

/**
 * Contact page — inquiry form + contact info.
 * Server Component: exports metadata properly.
 * Form logic is in ContactForm (client component).
 */

export const metadata = {
  title: '聯絡我們 | 台大創創中心',
  description: '有任何問題或合作想法，歡迎與台大創創中心聯繫。',
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">聯絡我們</h1>
          <p className="text-lg text-gray-600">
            有任何問題或合作想法，歡迎與我們聯繫。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="text-center py-8 text-gray-400">載入中...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold mb-4">聯絡資訊</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700">地址</div>
                  <div className="text-gray-600">台北市大安區羅斯福路四段一號<br />台大水源校區卓越研究大樓</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Email</div>
                  <div className="text-gray-600">
                    <a href="mailto:tec@ntu.edu.tw" className="text-blue-600 hover:text-blue-700 transition-colors">
                      tec@ntu.edu.tw
                    </a>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">電話</div>
                  <div className="text-gray-600">(02) 3366-9949</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold mb-2 text-blue-900">辦公時間</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <div>週一至週五</div>
                <div>09:00 - 18:00</div>
                <div className="text-blue-500 text-xs mt-2">國定假日休息</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
