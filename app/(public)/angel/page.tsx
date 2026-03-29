import Link from 'next/link'

export const metadata = {
  title: '天使俱樂部 | 台大創創中心',
  description: 'NTU Angel Club 匯聚 50+ 位天使投資人，每月舉辦投資月會，共同投資台灣最具潛力的早期新創。',
}

export default function AngelPublicPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">NTU Angel Club</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            台大天使俱樂部匯聚 50+ 位天使投資人，每月篩選優質新創進行 Pitch，
            共同投資台灣最具潛力的早期團隊。
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">運作方式</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: '案源篩選', desc: '來自校園、加速器、業界推薦的案源，經三層 Gate 篩選', icon: '🔍' },
            { step: '02', title: '卡片瀏覽', desc: '天使會員提前 21 天收到候選新創 6 張資訊卡，自主研究', icon: '📋' },
            { step: '03', title: '投資月會', desc: '通過預審的新創進行 30 分鐘 Pitch，天使現場互動提問', icon: '🎤' },
            { step: '04', title: '共同投資', desc: '有興趣的天使組成投資群，進行盡職調查並完成投資', icon: '🤝' },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="text-xs text-blue-600 font-bold mb-1">STEP {item.step}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">會員權益</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BenefitCard
              title="精選案源"
              description="每月 2-3 家經專業預審的候選新創，節省您的篩選時間"
            />
            <BenefitCard
              title="共同投資"
              description="與其他天使共同出資，降低單一投資風險，分享盡調資源"
            />
            <BenefitCard
              title="學習成長"
              description="月度 Digest、產業報告、投資人工作坊，持續提升投資能力"
            />
            <BenefitCard
              title="社群網絡"
              description="結識來自不同產業的天使投資人，拓展人脈與合作機會"
            />
            <BenefitCard
              title="優先投資"
              description="台大相關新創優先對接，掌握校園創新第一手資訊"
            />
            <BenefitCard
              title="專業支援"
              description="投資摘要、盡職調查、法律架構等專業團隊全程支援"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">成為天使投資人</h2>
          <p className="text-purple-100 mb-8">
            無論您是資深投資人還是初次接觸天使投資，我們都歡迎您的加入。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              申請加入
            </Link>
            <Link href="/login" className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
              會員登入
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
