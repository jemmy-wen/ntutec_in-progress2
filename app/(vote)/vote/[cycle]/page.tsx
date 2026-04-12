import type { Metadata } from 'next'
import Image from 'next/image'
import VoteForm from './VoteForm'

export const metadata: Metadata = {
  title: '天使例會投票 | 台大天使會 NTUTEC ANGELS',
  description: '台大天使會天使例會現場投票',
}

interface PageProps {
  params: Promise<{ cycle: string }>
}

export default async function VotePage({ params }: PageProps) {
  const { cycle } = await params

  return (
    <div>
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Image src="/logo-angels.png" alt="NTUTEC ANGELS 台大天使會" width={200} height={64} priority className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">
            {formatCycle(cycle)} 天使例會投票
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            請為每組 Pitch 新創評分，您的意見將協助投資決策
          </p>
        </div>

        <VoteForm cycle={cycle} />
      </div>
    </div>
  )
}

function formatCycle(cycle: string): string {
  // "2026-04" → "2026 年 4 月"
  const [year, month] = cycle.split('-')
  return `${year} 年 ${parseInt(month, 10)} 月`
}
