import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getDefaultRoute } from '@/lib/utils/roles'

/**
 * Public homepage — entry point for all visitors.
 * - Authenticated → redirect to role-based landing page
 * - Unauthenticated → show full public homepage
 *
 * Three audience entries: Startups, Angel Investors, Mentors
 * (aligned with Platform Architecture v0.4 three-audience design).
 */

export const metadata = {
  title: '台大創創中心 | NTU Technology & Entrepreneurship Center',
  description: '台灣大學創意創業中心以創業教育、育成輔導、天使投資三軌並行，打造台灣最具影響力的大學創業生態系。',
}

export default async function PublicHomePage() {
  // Check if user is authenticated — redirect to role-based landing
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: roleRows } = await (supabase.from('module_roles') as any)
        .select('role')
        .eq('user_id', data.user.id)
        .eq('is_active', true)
      const roles = (roleRows || []).map((r: { role: string }) => r.role) as string[]
      redirect(getDefaultRoute(roles))
    }
  } catch (err) {
    // redirect() throws — rethrow it; other errors = show public page
    if (err && typeof err === 'object' && 'digest' in err) throw err
  }
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              打造台灣最具影響力的
              <br />
              <span className="text-blue-300">大學創業生態系</span>
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl">
              台大創創中心以創業教育、育成輔導、天使投資三軌並行，
              連結校園創新能量與產業資源，協助優秀團隊走向市場。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/programs"
                className="px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                探索計畫
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                聯絡我們
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Three audience entries */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-center mb-4">我們如何幫助您</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          無論您是創業者、投資人還是產業專家，都能在這裡找到最適合的參與方式。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AudienceCard
            gradient="from-blue-500 to-blue-600"
            title="新創團隊"
            subtitle="Startups"
            description="從概念到產品上市，我們提供育成進駐、業師健診、資源媒合與投資對接。"
            features={['育成進駐空間', '業師一對一健診', '加速器計畫', '投資人媒合']}
            cta={{ label: '了解更多', href: '/programs' }}
          />
          <AudienceCard
            gradient="from-purple-500 to-purple-600"
            title="天使投資人"
            subtitle="Angel Investors"
            description="加入 NTU Angel Club，共同投資台灣最具潛力的早期新創團隊。"
            features={['精選案源篩選', '共同投資機制', '專業盡調支援', '投資人社群']}
            cta={{ label: '加入俱樂部', href: '/angel' }}
          />
          <AudienceCard
            gradient="from-orange-500 to-orange-600"
            title="業師"
            subtitle="Mentors"
            description="運用您的專業經驗，為新創團隊提供實戰建議，共創價值。"
            features={['智慧配對系統', '彈性時段選擇', '12+ 專長領域', '持續回饋機制']}
            cta={{ label: '成為業師', href: '/mentors' }}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatBlock number="200+" label="輔導新創團隊" />
            <StatBlock number="50+" label="天使投資人" />
            <StatBlock number="100+" label="專業業師" />
            <StatBlock number="NT$2B+" label="媒合投資金額" />
          </div>
        </div>
      </section>

      {/* Recent highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">最新動態</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HighlightCard
            tag="月會"
            title="4 月天使投資月會"
            description="三家精選新創 Pitch，涵蓋 AI、生技、永續領域。歡迎天使會員出席。"
            date="2026-04-02"
          />
          <HighlightCard
            tag="活動"
            title="FINDIT 春季媒合會"
            description="與 FINDIT 共同舉辦，協助新創對接政府補助與早期投資資源。"
            date="2026-04-01"
          />
          <HighlightCard
            tag="計畫"
            title="2026 年加速器第二梯次"
            description="即日起接受申請，提供 6 個月密集輔導與 Demo Day 舞台。"
            date="2026-03-15"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">準備好開始了嗎？</h2>
          <p className="text-blue-100 mb-8">
            不論是申請輔導、加入投資人行列，還是成為業師，我們都歡迎您。
          </p>
          <Link href="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            立即聯絡
          </Link>
        </div>
      </section>
    </div>
  )
}

function AudienceCard({ gradient, title, subtitle, description, features, cta }: {
  gradient: string; title: string; subtitle: string; description: string
  features: string[]; cta: { label: string; href: string }
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
      <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm opacity-80">{subtitle}</p>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map(f => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">{f}</span>
            </li>
          ))}
        </ul>
        <Link href={cta.href} className="text-sm font-medium text-blue-600 hover:text-blue-700">
          {cta.label} →
        </Link>
      </div>
    </div>
  )
}

function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-blue-600">{number}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  )
}

function HighlightCard({ tag, title, description, date }: {
  tag: string; title: string; description: string; date: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{tag}</span>
      <h3 className="font-bold mt-3 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="text-xs text-gray-400">{new Date(date).toLocaleDateString('zh-TW')}</div>
    </div>
  )
}
