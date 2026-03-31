import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | 台大創創中心 NTU TEC',
    default: '月會投票 | 台大創創中心',
  },
}

export default function VoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      {/* Minimal header — logo only */}
      <header className="py-4 px-4 text-center border-b border-purple-100 bg-white/80 backdrop-blur-sm">
        <span className="text-lg font-bold text-gray-900">NTU TEC</span>
        <span className="text-sm text-gray-500 ml-2">台大創創中心</span>
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Minimal footer */}
      <footer className="py-4 text-center text-xs text-gray-400 border-t border-gray-100">
        &copy; {new Date().getFullYear()} NTU Technology and Entrepreneurship Center
      </footer>
    </div>
  )
}
