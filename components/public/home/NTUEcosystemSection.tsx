import Image from 'next/image'
import Link from 'next/link'

const PARTNERS = [
  {
    label: '國立臺灣大學',
    href: 'https://www.ntu.edu.tw',
    logo: '/images/ecosystem/ntu.svg',
    width: 160,
    height: 48,
  },
  {
    label: '研究發展處',
    href: 'https://ord.ntu.edu.tw',
    logo: '/images/ecosystem/ord.png',
    width: 160,
    height: 32,
  },
  {
    label: '創新設計學院 D-School',
    href: 'https://dschool.ntu.edu.tw',
    logo: '/images/ecosystem/dschool.png',
    width: 160,
    height: 40,
  },
  {
    label: '國際產學聯盟 ILO',
    href: 'https://homepage.ntu.edu.tw/~ntuilo/ntuilo/Default.html',
    logo: '/images/ecosystem/ilo.png',
    width: 160,
    height: 32,
  },
  {
    label: '創新育成中心',
    href: 'https://ntuiic.ntu.edu.tw',
    logo: '/images/ecosystem/ntuiic.png',
    width: 160,
    height: 36,
  },
  {
    label: '台大校友創投',
    href: 'https://ntu.vc',
    logo: '/images/ecosystem/ntuvc.png',
    width: 48,
    height: 48,
  },
]

export default function NTUEcosystemSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-screen-xl px-8 lg:px-16">

        {/* Header — label + title left, description right */}
        <div className="mb-16 flex items-end justify-between gap-16">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#00AA95]">
              <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
                <circle cx="3" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="13" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="3" cy="13" r="1.5" fill="currentColor"/>
                <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                <circle cx="13" cy="13" r="1.5" fill="currentColor"/>
              </svg>
              NTU Ecosystem
            </p>
            <h2 className="text-3xl font-bold text-[#181614] lg:text-4xl">台大創新生態系</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#181614]/50">
            NTUTEC 與台大各創新單位緊密協作，共同構建校園創業生態系，連結研究能量與市場資本。
          </p>
        </div>

        {/* Logo row */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-12 sm:grid-cols-6 items-center">
          {PARTNERS.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.label}
              className="group flex flex-col items-center gap-4"
            >
              <div className="flex h-14 items-center justify-center">
                <Image
                  src={p.logo}
                  alt={p.label}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  className="max-h-12 w-auto object-contain opacity-60 transition-opacity group-hover:opacity-100"
                />
              </div>
              <span className="text-center text-[11px] text-[#181614]/40 transition-colors group-hover:text-[#00AA95]">
                {p.label}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
