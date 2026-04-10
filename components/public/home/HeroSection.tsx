import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-teal-deep/30" />
      <BackgroundBeams className="z-[1]" />
      <SparklesCore
        particleColor="oklch(0.66 0.12 180)"
        particleDensity={60}
        speed={0.6}
        className="z-[1] opacity-60"
      />

      <div className="container relative z-10 py-24">
        <div className="max-w-3xl animate-[fadeUp_0.6s_ease-out_both]">
          <p className="micro-label text-teal-light mb-4">
            NTU TAIDAH ENTREPRENEURSHIP CENTER · 台大創業生態系實戰基地
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-[fadeUp_0.6s_ease-out_0.1s_both]">
            把台大最硬的研究
            <br />
            <span className="text-teal">打造成世界級的新創</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-stone/80 animate-[fadeUp_0.6s_ease-out_0.2s_both]">
            13 年來累計輔導近 600 支新創團隊。以加速器、車庫孵化器、企業垂直加速器與天使投資俱樂部四大業務，幫助技術團隊從實驗室走進市場、對接產業與資本。
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-[fadeUp_0.6s_ease-out_0.3s_both]">
            <Link href="/apply" className="btn-pill-primary px-8 py-4 text-base">
              申請加入輔導計畫
            </Link>
            <Link href="/about" className="btn-pill-outline px-8 py-4 text-base border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50">
              認識 NTUTEC
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
