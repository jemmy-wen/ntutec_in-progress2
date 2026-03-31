import type { Metadata } from 'next'
import VoteForm from './VoteForm'

export const metadata: Metadata = {
  title: '月會投票 | 天使投資俱樂部',
  description: 'NTU Angel Club 月會現場投票',
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
          <div className="text-4xl mb-3">🗳️</div>
          <h1 className="text-2xl font-bold text-gray-900">
            天使投資俱樂部
          </h1>
          <p className="text-lg text-purple-700 font-medium mt-1">
            {formatCycle(cycle)} 月會投票
          </p>
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
