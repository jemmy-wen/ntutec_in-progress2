import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative py-12">
      {/* SVG background shape */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svg/Subtract.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-fill"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center">
        <h2
          className="mb-4 text-3xl font-bold text-white lg:text-4xl"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
        >
          馬上加入合作
        </h2>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-white/70">
          無論是探索新技術、尋找創新解決方案，或建立人才管道，台大創創中心都能量身打造合作方案。
        </p>
        <div className="flex gap-4">
          <Link
            href="/corporate"
            className="rounded border border-white/60 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            了解諮詢服務
          </Link>
          <Link
            href="/contact"
            className="rounded bg-white px-7 py-3 text-sm font-semibold text-[#003637] transition-colors hover:bg-white/90"
          >
            聯繫我們
          </Link>
        </div>
      </div>
    </section>
  )
}
