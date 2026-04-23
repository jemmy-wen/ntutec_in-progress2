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
      <div className="container">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            Ecosystem
          </p>
          <h2 className="text-3xl font-bold text-[#181614] md:text-4xl">台大創新生態系</h2>
          <p className="mt-4 mx-auto max-w-lg text-base leading-relaxed text-slate-500">
            NTUTEC 與台大各創新單位緊密協作，共同構建校園創業生態，連結研究能量與市場資本。
          </p>
        </div>

        {/* Logo row — no background, direct on section bg */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
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
              <span className="text-center text-xs text-slate-400 transition-colors group-hover:text-teal">
                {p.label}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
