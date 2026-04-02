import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: {
    template: '%s | 台大創創中心 NTU TEC',
    default: '天使例會投票 | 臺大天使會',
  },
}

export default function VoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      {/* Minimal header — logo only */}
      <header className="py-3 px-4 flex items-center justify-center border-b border-teal-100 bg-white/80 backdrop-blur-sm">
        <Image
          src="/logo-tec.png"
          alt="NTU TEC 台大創創中心"
          width={120}
          height={40}
          className="h-8 w-auto"
          priority
        />
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Minimal footer */}
      <footer className="py-4 text-center text-xs text-gray-400 border-t border-gray-100">
        &copy; {new Date().getFullYear()} Taidah Entrepreneurship Center, National Taiwan University
      </footer>
    </div>
  )
}
