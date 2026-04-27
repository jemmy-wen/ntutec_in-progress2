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
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-8 lg:px-16">

        {/* 置中標題區 */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2
            className="text-[40px] md:text-[48px] font-bold text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "'Noto Serif TC', 'GenWanMin2 TW', serif" }}
          >
            台大創新生態系
          </h2>

          {/* 底線 SVG — 與 Community 區塊同款 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/Vector2.svg"
            alt=""
            aria-hidden="true"
            className="mt-3 h-4 w-auto"
          />

          <p className="mt-6 max-w-lg text-[15px] text-[#888] leading-relaxed">
            NTUTEC 與台大各創新單位緊密協作，共同構建校園創業生態系
          </p>
        </div>

        {/* Logo 列 — 6 個均分，置中 */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 items-start">
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
                  className="max-h-12 w-auto object-contain opacity-70 transition-opacity group-hover:opacity-100"
                />
              </div>
              <span className="text-center text-[12px] text-[#888] transition-colors group-hover:text-[#00AA95]">
                {p.label}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
