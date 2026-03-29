'use client'

interface Stage {
  key: string
  label: string
  icon: string
}

interface Props {
  stages: Stage[]
  currentStatus: string
  compact?: boolean
}

/**
 * Shared progress bar for both Angel meeting cycles and Mentor clinic cycles.
 * Pass different `stages` array for each module.
 */
export default function CycleProgressBar({ stages, currentStatus, compact = false }: Props) {
  const currentIndex = stages.findIndex(s => s.key === currentStatus)

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6 overflow-x-auto">
      <div className="text-sm text-gray-500 mb-3">
        當前階段：<span className="font-semibold text-gray-900">{stages[currentIndex]?.label || currentStatus}</span>
      </div>

      <div className="flex items-center gap-0">
        {stages.map((stage, i) => {
          const isPast = i < currentIndex
          const isCurrent = i === currentIndex
          const isFuture = i > currentIndex

          return (
            <div key={stage.key} className="flex items-center flex-1 min-w-0">
              <div className="relative group">
                <div className={`
                  w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm flex-shrink-0
                  ${isPast ? 'bg-green-500 text-white shadow-sm' : ''}
                  ${isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md' : ''}
                  ${isFuture ? 'bg-gray-100 text-gray-400 border border-gray-200' : ''}
                `}>
                  {isPast ? '\u2713' : stage.icon}
                </div>

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2
                  bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0
                  group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {stage.label}
                </div>

                {!compact && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs whitespace-nowrap
                    ${isCurrent ? 'text-blue-600 font-semibold' : 'text-gray-400'}
                  `}>
                    {stage.label}
                  </div>
                )}
              </div>

              {i < stages.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1
                  ${i < currentIndex ? 'bg-green-400' : ''}
                  ${i === currentIndex ? 'bg-gradient-to-r from-green-400 to-blue-400' : ''}
                  ${i > currentIndex ? 'bg-gray-200' : ''}
                `} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Pre-built stage configs ───

export const ANGEL_STAGES: Stage[] = [
  { key: 'setup', label: '準備中', icon: '\u2699\uFE0F' },
  { key: 'cards_ready', label: '卡片瀏覽', icon: '\uD83D\uDCCB' },
  { key: 'vote_open', label: '投票開放', icon: '\uD83D\uDDF3\uFE0F' },
  { key: 'meeting', label: '月會', icon: '\uD83C\uDFA4' },
  { key: 'followup', label: '投後追蹤', icon: '\uD83D\uDCC8' },
  { key: 'closed', label: '已歸檔', icon: '\u2705' },
]

export const MENTOR_STAGES: Stage[] = [
  { key: 'setup', label: '設定中', icon: '\u2699\uFE0F' },
  { key: 'mentor_submit', label: '業師提交', icon: '\uD83D\uDCDD' },
  { key: 'supply_review', label: '供給檢視', icon: '\uD83D\uDCCA' },
  { key: 'team_submit', label: '團隊填志願', icon: '\uD83C\uDFAF' },
  { key: 'mentor_review', label: '業師篩選', icon: '\uD83D\uDD0D' },
  { key: 'matching', label: '配對中', icon: '\uD83D\uDD04' },
  { key: 'admin_review', label: '管理審核', icon: '\u2705' },
  { key: 'round2', label: '第二輪', icon: '\uD83D\uDD01' },
  { key: 'finalized', label: '已定案', icon: '\uD83D\uDCCC' },
  { key: 'feedback', label: '回饋中', icon: '\uD83D\uDCAC' },
]
