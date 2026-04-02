import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { getDefaultRoute } from '@/lib/utils/roles'

/**
 * NTUTEC ANGELS Landing Page
 *
 * Visible to everyone (authenticated and unauthenticated).
 * - Authenticated → show "進入後台" CTA
 * - Unauthenticated → show "會員登入" CTA
 */

export const metadata = {
  title: 'NTUTEC ANGELS — 臺大天使會',
  description: '台大創業生態系的投資入口。精選案源、決策支持、投資人社群，與 40+ 位天使投資人共同發掘下一個獨角獸。',
}

export default async function LandingPage() {
  // Check auth state for conditional CTA
  let isLoggedIn = false
  let portalRoute = '/angel/portal/upcoming'
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      isLoggedIn = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: roleRows } = await (supabase.from('module_roles') as any)
        .select('role')
        .eq('user_id', data.user.id)
        .eq('is_active', true)
      const roles = (roleRows || []).map((r: { role: string }) => r.role) as string[]
      portalRoute = getDefaultRoute(roles)
    }
  } catch {
    // Ignore — show public landing
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="mb-6">
            <p className="text-teal-400 font-bold tracking-[0.25em] text-2xl sm:text-3xl">NTUTEC</p>
            <p className="text-teal-400 font-bold tracking-[0.25em] text-2xl sm:text-3xl">ANGELS</p>
            <p className="text-slate-400 tracking-[0.5em] text-xs mt-1">臺 大 天 使 會</p>
          </div>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            台大創業生態系的投資入口。<br className="hidden sm:block" />
            與 40+ 位天使投資人，共同發掘下一個獨角獸。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={isLoggedIn ? portalRoute : '/login'}
              className="px-8 py-3.5 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-400 transition-colors text-lg"
            >
              {isLoggedIn ? '進入後台' : '會員登入'}
            </Link>
            <a
              href="#vote"
              className="px-8 py-3.5 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-lg"
            >
              本月投票 ↓
            </a>
          </div>
        </div>
      </section>

      {/* ─── Section 1: 天使例會投票 ─── */}
      <section id="vote" className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
              本次天使例會 — 4/2（四）14:00-17:00
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">本期 Pitch 新創</h2>
            <p className="text-slate-500 mb-2">三家精選新創等你評分，你的意見將影響投資決策</p>
            <p className="text-sm text-slate-400 mb-3">下次天使例會：4/23（四）14:00-17:00</p>
            <a
              href="https://luma.com/dmve0xtc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              前往 LUMA 報名 →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StartupCard
              emoji="🏗️"
              name="士芃科技"
              subtitle="Shipeng"
              sector="建築 AI SaaS"
              description="以 AI 優化建築工程排程與成本管理，切入營建業數位轉型痛點。台灣營造業年產值超過兩兆，但數位化程度長期偏低，士芃從工程排程切入，協助營造廠即時掌握進度與成本偏差，降低工期延誤風險。"
            />
            <StartupCard
              emoji="🛩️"
              name="澤龍智能"
              subtitle="Longlink"
              sector="無人機 FPV 通訊"
              description="突破無人機通訊距離限制，專利 FPV 低延遲傳輸技術，鎖定工業與國防市場。在無人機操控中，通訊延遲與距離是核心瓶頸，澤龍的技術方案在長距離場景下仍能維持低延遲的即時影像回傳，適用於巡檢、測繪與特殊任務場景。"
            />
            <StartupCard
              emoji="🧬"
              name="星誠細胞生醫"
              subtitle="StellarCell"
              sector="外泌體再生醫療"
              description="以外泌體技術開發再生醫療產品，瞄準皮膚修復與抗衰老市場。外泌體是細胞間溝通的天然載體，近年成為再生醫學熱門方向。星誠聚焦將實驗室技術轉化為可規模量產的產品，目標從醫美通路切入，逐步拓展至臨床醫療應用。"
            />
          </div>

          <div className="text-center">
            <Link
              href="/vote/2026-04"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-xl font-semibold text-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
            >
              前往投票
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Section 2: 會員方案 ─── */}
      <section id="membership" className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">會員方案</h2>
            <p className="text-slate-500">加入臺大天使會，取得精選案源與投資決策支持</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 個人會員 */}
            <div className="relative bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-teal-400 transition-colors">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">個人會員</h3>
                <p className="text-slate-500 text-sm mt-1">適合天使投資人、企業高階主管</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">NT$50,000</span>
                <span className="text-slate-500 text-sm ml-1">/年</span>
              </div>
              <ul className="space-y-3 mb-8">
                <Benefit text="每月精選 2-3 家新創 Pitch" />
                <Benefit text="投資備忘錄與案件分析資料" />
                <Benefit text="天使例會出席與投票權" />
                <Benefit text="40+ 天使投資人社群交流" />
                <Benefit text="不定期新創實地參訪機會" />
              </ul>
              <a
                href="https://forms.gle/zgjGP7RW7sgG911YA"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                申請個人會員
              </a>
            </div>

            {/* 企業會員 */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
              <div className="absolute top-4 right-4">
                <span className="bg-teal-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">推薦</span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold">企業會員</h3>
                <p className="text-slate-400 text-sm mt-1">適合 CVC、創投、金融機構、企業集團</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">NT$100,000</span>
                <span className="text-slate-400 text-sm ml-1">/年</span>
              </div>
              <ul className="space-y-3 mb-8">
                <Benefit text="可指派最多 3 位代表出席" light />
                <Benefit text="所有個人會員權益" light />
                <Benefit text="優先安排企業參訪機會" light />
                <Benefit text="共投與策略合作機會" light />
              </ul>
              <a
                href="https://forms.gle/n38sNQznLG62ypyK9"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-400 transition-colors"
              >
                申請企業會員
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-6">
            ※ 會費以捐款方式繳納至國立臺灣大學，可開立抵稅捐款收據
          </p>
        </div>
      </section>

      {/* ─── Section 3: 為什麼加入 ─── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">為什麼加入臺大天使會</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <ValueCard
              icon="🎯"
              title="精選案源"
              description="從累計 600+ 輔導新創及台大創業生態系中，篩選最具潛力的 2-3 家進入天使例會 Pitch"
            />
            <ValueCard
              icon="📊"
              title="決策支持"
              description="每案提供投資備忘錄與案件分析，協助會員快速掌握投資要點"
            />
            <ValueCard
              icon="🤝"
              title="投資人社群"
              description="40+ 位跨領域天使投資人，橫跨多元投資領域，共投機會豐富"
            />
            <ValueCard
              icon="🏭"
              title="實地參訪"
              description="不定期安排新創實地參訪，深入了解團隊與產品"
            />
          </div>

          {/* 投資案例 */}
          <h3 className="text-xl font-bold text-slate-900 text-center mb-8">近期投資案例</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CaseCard
              name="先勁智能 AHEAD Medicine"
              sector="AI 醫療"
              stage="Series A"
              description="源自台大醫院與清華大學研究團隊，以 AI 技術革新流式細胞分析領域。產品 Cyto-copilot 將血液疾病診斷速度提升 50-100 倍，已獲美國 Mayo Clinic 與 UPMC 臨床驗證，並加入 NIST 流式細胞標準聯盟。"
            />
            <CaseCard
              name="行動貝果 MoBagel"
              sector="企業 AI 數據分析"
              stage="Series B"
              description="矽谷起家的 AutoML 平台公司，旗艦產品 Decanter AI 為企業提供無代碼機器學習解決方案。累計服務超過 3,000 個品牌、10 萬用戶，客戶涵蓋中華電信、太古可口可樂、New Balance 等，連續三年獲 Gartner 認可為關鍵廠商。"
            />
            <CaseCard
              name="思輔科技 SAVFE"
              sector="手術機器人"
              stage="Pre-A"
              description="開發高精度醫療數位手臂，應用於微創脊椎手術定位。核心突破：術中定位僅需 3 秒（傳統需 15 分鐘），無需光學攝影機或標記，已於亞東醫院完成場域驗證。國家新創獎得主，目前進入醫材許可申請階段。"
            />
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-teal-400 font-medium tracking-[0.2em] text-sm mb-2">NTUTEC ANGELS</p>
          <p className="text-slate-500 text-sm mb-6">臺大天使會 — 台大創業生態系的投資入口</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm mb-8">
            <span>國立臺灣大學創意創業中心</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a href="mailto:ntutec@ntutec.com" className="hover:text-white transition-colors">ntutec@ntutec.com</a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span>台北市中正區思源街 18 號 卓越研究大樓 7F</span>
          </div>
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Taidah Entrepreneurship Center, National Taiwan University. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ─── Sub-components ─── */

function StartupCard({ emoji, name, subtitle, sector, description }: {
  emoji: string; name: string; subtitle: string; sector: string; description: string
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold text-slate-900">{name}</h3>
      <p className="text-sm text-slate-400 mb-1">{subtitle}</p>
      <span className="inline-block text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded mb-3">{sector}</span>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}

function Benefit({ text, light }: { text: string; light?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${light ? 'text-teal-400' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      <span className={`text-sm ${light ? 'text-slate-300' : 'text-slate-600'}`}>{text}</span>
    </li>
  )
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  )
}

function CaseCard({ name, sector, stage, description }: {
  name: string; sector: string; stage: string; description: string
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium bg-teal-100 text-teal-700 px-2 py-0.5 rounded">{sector}</span>
        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{stage}</span>
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{name}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  )
}
