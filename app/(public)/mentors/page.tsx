import Link from 'next/link'

export const metadata = {
  title: '業師陣容 | 台大創創中心',
  description: '台大創創中心擁有 100+ 位來自各產業的專業業師，提供行銷、技術、募資、法律等 12+ 領域的一對一諮詢。',
}

const SPECIALTY_AREAS = [
  { name: '行銷策略', count: 15, icon: '📣' },
  { name: '技術架構', count: 12, icon: '⚙️' },
  { name: '募資策略', count: 10, icon: '💰' },
  { name: '產品開發', count: 14, icon: '🛠️' },
  { name: '商業模式', count: 11, icon: '📊' },
  { name: '品牌定位', count: 8, icon: '🎨' },
  { name: '使用者研究', count: 7, icon: '🔬' },
  { name: '業務開發', count: 9, icon: '🤝' },
  { name: '團隊管理', count: 6, icon: '👥' },
  { name: '法律諮詢', count: 5, icon: '⚖️' },
  { name: '財務規劃', count: 8, icon: '📑' },
  { name: '國際拓展', count: 4, icon: '🌏' },
]

export default function MentorsPublicPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">業師陣容</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            100+ 位來自各產業的專業業師，涵蓋 12 大專長領域，
            為新創團隊提供最實戰的一對一諮詢。
          </p>
        </div>
      </section>

      {/* Specialty grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">專長領域</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPECIALTY_AREAS.map(area => (
            <div key={area.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center hover:border-orange-300 transition-colors">
              <div className="text-3xl mb-2">{area.icon}</div>
              <div className="font-semibold text-sm mb-1">{area.name}</div>
              <div className="text-xs text-gray-500">{area.count} 位業師</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">健診流程</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: '提出需求', desc: '團隊填寫健診申請表，描述目前面臨的挑戰與期望獲得的協助方向。' },
              { step: 2, title: '智慧配對', desc: '系統根據團隊需求、業師專長與時間，自動推薦最適配的業師人選。' },
              { step: 3, title: '一對一健診', desc: '60 分鐘深度對談，業師針對團隊具體問題提供實戰建議與行動方案。' },
              { step: 4, title: '回饋追蹤', desc: '健診後雙方填寫回饋，系統持續優化配對品質，團隊可追蹤執行進度。' },
            ].map(item => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">成為業師</h2>
          <p className="text-orange-100 mb-8">
            用您的專業經驗，幫助台灣新創走得更穩更遠。
          </p>
          <Link href="/contact" className="px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors">
            申請成為業師
          </Link>
        </div>
      </section>
    </div>
  )
}
