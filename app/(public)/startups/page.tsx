export const metadata = {
  title: '新創團隊 | 台大創創中心',
  description: '台大創創中心輔導的新創團隊，涵蓋 AI、SaaS、醫療、永續等多元領域。',
}

export default function StartupsPublicPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-cyan-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">新創團隊</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            台大創創中心已輔導 200+ 支新創團隊，涵蓋 AI、SaaS、醫療、永續等多元領域。
          </p>
        </div>
      </section>

      {/* Portfolio placeholder */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">🏢</div>
          <h2 className="text-xl font-bold mb-2">新創名錄即將上線</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            新創名錄資料整理中，敬請期待。<br />
            上線後將提供產業分類、發展階段、團隊介紹等完整資訊。
          </p>
        </div>

        {/* Sector stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { sector: 'AI / ML', count: 42 },
            { sector: 'SaaS', count: 35 },
            { sector: '醫療健康', count: 28 },
            { sector: '永續 / ESG', count: 22 },
            { sector: 'FinTech', count: 18 },
            { sector: '物聯網', count: 15 },
            { sector: '教育科技', count: 12 },
            { sector: '其他', count: 28 },
          ].map(s => (
            <div key={s.sector} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-gray-900">{s.count}</div>
              <div className="text-xs text-gray-500">{s.sector}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
