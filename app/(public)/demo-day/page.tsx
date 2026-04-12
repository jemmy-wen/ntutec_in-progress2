import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: 'Demo Day | NTUTEC',
  description:
    '台大創創中心年度 Demo Day，精選新創向 74 位投資人路演，51 件媒合意向，9.06/10 滿意度。每年 12 月，台大校園。',
}

const stats2025 = [
  {
    value: '74',
    unit: '位',
    label: '投資人到場',
    sub: 'VC 44 位 + 天使 30 位',
  },
  {
    value: '51',
    unit: '件',
    label: '媒合意向',
    sub: '現場直接促成',
  },
  {
    value: '356',
    unit: '人',
    label: '報名參加',
    sub: '233 人到場出席',
  },
  {
    value: '9.06',
    unit: '/10',
    label: '活動滿意度',
    sub: '51 份現場問卷',
  },
]


export default function DemoDayPage() {
  return (
    <>
      <PageHero
        title="Demo Day 年度路演日"
        subtitle="Annual Demo Day"
        description="台大校園年度最大新創投資媒合活動，精選新創與投資人面對面，7 屆持續創下新高。"
      />

      {/* 2025 成果數字 */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">2025 Demo Day 成果</p>
            <h2 className="mb-4">數字說話</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              2025 年 12 月 10 日，正大講堂 &amp; 國學講堂（台大校內），創下 7 屆以來多項最高紀錄。
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats2025.map((stat) => (
              <div
                key={stat.label}
                className="card-hover rounded-2xl border bg-white p-6 text-center"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-teal">{stat.value}</span>
                  <span className="text-xl font-semibold text-teal">{stat.unit}</span>
                </div>
                <p className="mt-2 font-semibold text-charcoal">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-muted">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 活動架構 */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Event Structure</p>
            <h2>活動架構</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* 新創 Pitch 舞台 */}
            <div className="rounded-2xl bg-white p-8">
              <div className="mb-4 inline-flex h-10 items-center justify-center rounded-full bg-teal px-4 text-sm font-bold text-white">
                新創 Pitch 舞台
              </div>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">
                    14
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">組新創路演</p>
                    <p className="mt-0.5 text-sm text-slate-muted">NTUTEC 11 組 + 鳥巢 / EiMBA 3 組</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">
                    15
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">個互動攤位</p>
                    <p className="mt-0.5 text-sm text-slate-muted">新創與投資人一對一深度交流</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">大競賽獎項</p>
                    <p className="mt-0.5 text-sm text-slate-muted">最佳創業簡報獎 · 最具投資價值獎</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 產業論壇 */}
            <div className="rounded-2xl bg-white p-8">
              <div className="mb-4 inline-flex h-10 items-center justify-center rounded-full bg-teal px-4 text-sm font-bold text-white">
                產業論壇
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-muted">2025 論壇主題</p>
              <p className="mt-1 text-lg font-bold text-charcoal leading-snug">
                「創業 x AI：加速、放大、重新定義」
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-muted">共同主辦</p>
              <p className="mt-1 text-charcoal">EiMBA 創業創新 · 台大鳥巢</p>
              <p className="mt-4 text-sm font-semibold text-slate-muted">特邀講者</p>
              <div className="mt-2 flex flex-col gap-2">
                <div className="rounded-xl border border-stone-warm/60 px-4 py-2">
                  <p className="font-semibold text-charcoal">鍾哲民</p>
                </div>
                <div className="rounded-xl border border-stone-warm/60 px-4 py-2">
                  <p className="font-semibold text-charcoal">史大俠</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 出席組成 */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="micro-label mb-4">Who Attends</p>
            <h2 className="mb-4">誰會出席</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              Demo Day 吸引橫跨投資、產業、學術的多元生態系夥伴，形成高密度的媒合場域。
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6">
            <div className="card-hover rounded-2xl border bg-white p-8 text-center">
              <p className="text-4xl font-bold text-teal">74</p>
              <p className="mt-2 font-semibold text-charcoal">投資人到場</p>
              <p className="mt-1 text-sm text-slate-muted">VC 44 位 + 天使 30 位</p>
            </div>
            <div className="card-hover rounded-2xl border bg-white p-8 text-center">
              <p className="text-4xl font-bold text-teal">233</p>
              <p className="mt-2 font-semibold text-charcoal">出席者</p>
              <p className="mt-1 text-sm text-slate-muted">共 356 人報名到場</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 屆歷史 */}
      <section className="section-spacing bg-stone">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="micro-label mb-4">Our History</p>
            <h2 className="mb-6">7 屆持續成長</h2>
            <p className="text-lg leading-relaxed text-slate-muted">
              自 2022 年以來多次舉辦，7 屆以來持續成長。2024 年起固定為每年 12 月單一 Demo Day，
              2025 年 Accupass 瀏覽 9,775 次，創近 7 屆最高。下一屆預計於 2026 年 12 月舉辦。
            </p>
            <div className="mt-8 flex justify-center gap-2 flex-wrap">
              {['2022', '2023', '2024（2屆）', '2025', '2026（預計）'].map((year) => (
                <span
                  key={year}
                  className="rounded-full border border-teal/30 bg-white px-4 py-1.5 text-sm font-medium text-teal"
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 三方 CTA */}
      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {/* 新創 CTA */}
            <div className="rounded-2xl bg-teal p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                For Startups
              </p>
              <h3 className="mt-3 text-2xl font-bold">我是新創團隊</h3>
              <p className="mt-3 leading-relaxed text-white/85">
                想在 Demo Day 向投資人 Pitch？每年 10 月截止收件，先申請輔導計畫、通過 Gate 審核，即可獲得舞台。
              </p>
              <div className="mt-6">
                <Link
                  href="/apply"
                  className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-teal transition hover:bg-white/90"
                >
                  申請輔導計畫
                </Link>
              </div>
            </div>

            {/* 投資人 CTA */}
            <div className="rounded-2xl border-2 border-stone-warm bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-muted">
                For Investors
              </p>
              <h3 className="mt-3 text-2xl font-bold text-charcoal">我是投資人</h3>
              <p className="mt-3 leading-relaxed text-slate-muted">
                想出席下一屆 Demo Day？名額有限，採邀請制。歡迎聯繫我們取得出席邀請。
              </p>
              <div className="mt-6">
                <Link href="/contact" className="btn-pill-outline">
                  聯繫我們
                </Link>
              </div>
            </div>

            {/* 企業贊助 CTA */}
            <div className="rounded-2xl border-2 border-teal/30 bg-teal-wash p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal">
                For Enterprises
              </p>
              <h3 className="mt-3 text-2xl font-bold text-charcoal">企業贊助洽詢</h3>
              <p className="mt-3 leading-relaxed text-slate-muted">
                想共同主辦 Demo Day 或企業垂直加速器？我們提供冠名、攤位與論壇講台，直接對接 600+ 校友新創生態。
              </p>
              <div className="mt-6">
                <Link href="/corporate" className="btn-pill-outline">
                  了解企業合作
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
