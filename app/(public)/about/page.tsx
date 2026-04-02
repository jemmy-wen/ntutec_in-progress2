import Link from 'next/link'

/**
 * About page — NTU TEC overview, mission, team, ecosystem funds.
 * Content sourced from ntutec-center-intro-sot.md (institutional SOT).
 */

export const metadata = {
  title: '關於我們 | 台大創創中心',
  description: '台灣大學創意創業中心（NTU TEC）以創業教育、育成輔導、天使投資三軌並行，打造台灣最具影響力的大學創業生態系。',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">關於台大創創中心</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            NTU TEC 以創業教育、育成輔導、天使投資三軌並行，
            打造台灣最具影響力的大學創業生態系。
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MissionCard
            icon="🎓"
            title="創業教育"
            description="從課程到實作，培育下一代創業者。整合台大六院資源，提供跨領域創業學習機會。"
          />
          <MissionCard
            icon="🚀"
            title="育成輔導"
            description="從概念到產品，陪伴新創走過 0 到 1。業師健診、加速器計畫、資源媒合一站完成。"
          />
          <MissionCard
            icon="💰"
            title="天使投資"
            description="NTU Angel Club 匯聚 50+ 位天使投資人，每月舉辦投資例會，為優質新創提供第一筆資金。"
          />
        </div>
      </section>

      {/* Ecosystem */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">生態系基金</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FundCard
              name="台大種子基金"
              description="專注 Pre-Seed 階段，投資台大相關新創團隊"
              amount="NT$ 5,000 萬"
            />
            <FundCard
              name="NTU Angel Club"
              description="天使投資人俱樂部，共同投資優質早期新創"
              amount="50+ 位天使"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem number="200+" label="輔導新創" />
          <StatItem number="50+" label="天使投資人" />
          <StatItem number="100+" label="業師" />
          <StatItem number="30+" label="投資案例" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">加入台大創創生態系</h2>
          <p className="text-blue-100 mb-8">
            無論您是新創團隊、天使投資人、還是業師，我們都歡迎您的加入。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              聯絡我們
            </Link>
            <Link href="/programs" className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              了解計畫
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function MissionCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function FundCard({ name, description, amount }: { name: string; description: string; amount: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="text-2xl font-bold text-blue-600">{amount}</div>
    </div>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-blue-600">{number}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  )
}
