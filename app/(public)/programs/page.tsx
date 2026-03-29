import Link from 'next/link'

export const metadata = {
  title: '輔導計畫 | 台大創創中心',
  description: '台大創創中心提供育成、加速器、業師健診等多元輔導計畫，陪伴新創從 0 到 1。',
}

export default function ProgramsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">輔導計畫</h1>
          <p className="text-lg text-gray-600">
            從概念驗證到產品上市，我們提供全方位的輔導資源。
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <ProgramCard
            title="育成進駐"
            badge="常態招收"
            description="提供辦公空間、業師輔導、資源媒合。適合已有初步產品或服務的早期新創團隊。進駐期間享有台大校園資源、實驗室設備共用、及創創中心活動優先參與權。"
            features={['共同工作空間', '業師一對一輔導', '投資人媒合', '資源與活動優先權']}
            cta={{ label: '申請進駐', href: '/contact?type=startup' }}
          />
          <ProgramCard
            title="業師健診"
            badge="每月開放"
            description="配對專業業師進行一對一健診，針對團隊當前最急迫的問題提供實戰建議。涵蓋行銷、技術、募資、法律等 12+ 專長領域。"
            features={['12+ 專長領域', '智慧配對演算法', '一對一深度諮詢', '後續追蹤回饋']}
            cta={{ label: '預約健診', href: '/contact?type=mentor' }}
          />
          <ProgramCard
            title="加速器計畫"
            badge="梯次制"
            description="為期 3-6 個月的密集輔導計畫，包含系列課程、業師工作坊、模擬投資人 Pitch、Demo Day 成果展示。適合準備進入募資階段的團隊。"
            features={['密集課程模組', 'Pitch 訓練', 'Demo Day 舞台', '投資人直接對接']}
            cta={{ label: '了解梯次', href: '/events' }}
          />
          <ProgramCard
            title="天使俱樂部投資月會"
            badge="每月舉辦"
            description="NTU Angel Club 每月篩選 2-3 家優質新創進行 Pitch，天使投資人現場評估並決定投資意向。通過預審的團隊可獲得在 50+ 位投資人面前展示的機會。"
            features={['專業預審流程', '50+ 位天使聽眾', '即時投資決策', '後續對接安排']}
            cta={{ label: '申請 Pitch', href: '/contact?type=angel' }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">不確定適合哪個計畫？</h2>
          <p className="text-green-100 mb-8">
            歡迎來信或來電，我們的團隊會根據您的需求推薦最合適的方案。
          </p>
          <Link href="/contact" className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
            聯絡我們
          </Link>
        </div>
      </section>
    </div>
  )
}

function ProgramCard({ title, badge, description, features, cta }: {
  title: string; badge: string; description: string; features: string[]
  cta: { label: string; href: string }
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{badge}</span>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {features.map(f => (
          <div key={f} className="flex items-center gap-2 text-sm">
            <span className="text-green-500">✓</span>
            <span className="text-gray-700">{f}</span>
          </div>
        ))}
      </div>
      <Link href={cta.href} className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        {cta.label} →
      </Link>
    </div>
  )
}
