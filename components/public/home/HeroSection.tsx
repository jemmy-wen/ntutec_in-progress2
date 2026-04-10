import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-teal-deep/30" />

      <div className="container relative z-10 py-24">
        <div className="max-w-2xl animate-[fadeUp_0.6s_ease-out_both]">
          <p className="micro-label text-teal-light mb-4">
            NTU Taidah Entrepreneurship Center
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-[fadeUp_0.6s_ease-out_0.1s_both]">
            從研究到市場
            <br />
            <span className="text-teal">加速你的創業旅程</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-stone/80 animate-[fadeUp_0.6s_ease-out_0.2s_both]">
            臺大創創中心整合校內外資源，提供加速器、天使投資、企業合作等完整創業支援，
            協助研究團隊與新創企業從技術驗證走向市場落地。
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-[fadeUp_0.6s_ease-out_0.3s_both]">
            <Link href="/apply" className="btn-pill-primary px-8 py-4 text-base">
              立即申請
            </Link>
            <Link href="/about" className="btn-pill-outline px-8 py-4 text-base border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50">
              了解更多
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
