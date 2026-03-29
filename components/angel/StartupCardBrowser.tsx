'use client'

import { useState } from 'react'

interface Startup {
  id: string
  name_zh: string
  name_en: string | null
  sector: string | null
  one_liner: string | null
  pipeline_stage: number
  gate0_score: number | null
  gate1_score: number | null
}

interface Props {
  startup: Startup
  currentResponse: string | null
  onRespond: (response: 'interested' | 'thinking' | 'not_for_me', reason?: string) => void
}

const CARD_LABELS = [
  '公司概要',
  '創辦人背景',
  '產品與市場實績',
  '商業模式',
  '投資條件',
  'TEC 評估摘要',
]

export default function StartupCardBrowser({ startup, currentResponse, onRespond }: Props) {
  const [activeCard, setActiveCard] = useState(0)
  const [reason, setReason] = useState('')
  const [showReason, setShowReason] = useState(false)

  function handleRespond(response: 'interested' | 'thinking' | 'not_for_me') {
    if (response === 'interested' && !showReason) {
      setShowReason(true)
      return
    }
    onRespond(response, reason || undefined)
    setShowReason(false)
    setReason('')
  }

  const RESPONSE_STYLES: Record<string, string> = {
    interested: 'bg-green-100 border-green-500 text-green-700',
    thinking: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    not_for_me: 'bg-gray-100 border-gray-400 text-gray-600',
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 transition-colors ${
      currentResponse ? RESPONSE_STYLES[currentResponse] : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{startup.name_zh}</h3>
            {startup.name_en && (
              <p className="text-sm text-gray-500">{startup.name_en}</p>
            )}
          </div>
          {startup.sector && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
              {startup.sector}
            </span>
          )}
        </div>
        {startup.one_liner && (
          <p className="text-gray-600 mt-2">{startup.one_liner}</p>
        )}
      </div>

      {/* Card tabs */}
      <div className="flex overflow-x-auto border-b border-gray-100 px-2">
        {CARD_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setActiveCard(i)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeCard === i
                ? 'border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Card content area */}
      <div className="p-6 min-h-[200px]">
        <CardContent cardIndex={activeCard} startup={startup} />
      </div>

      {/* Response buttons */}
      <div className="p-5 border-t border-gray-100 space-y-3">
        {currentResponse && (
          <div className="text-sm text-center text-gray-500">
            已選擇：<span className="font-medium">
              {currentResponse === 'interested' ? '有興趣' : currentResponse === 'thinking' ? '再想想' : '不適合我'}
            </span>
            （可重新選擇）
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => handleRespond('interested')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              currentResponse === 'interested'
                ? 'bg-green-600 text-white'
                : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
            }`}
          >
            有興趣
          </button>
          <button
            onClick={() => handleRespond('thinking')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              currentResponse === 'thinking'
                ? 'bg-yellow-500 text-white'
                : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
            }`}
          >
            再想想
          </button>
          <button
            onClick={() => handleRespond('not_for_me')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              currentResponse === 'not_for_me'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            不適合我
          </button>
        </div>

        {/* Interest reason input */}
        {showReason && (
          <div className="space-y-2">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="為什麼感興趣？（選填，供 Admin 撮合參考）"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              rows={2}
            />
            <button
              onClick={() => {
                onRespond('interested', reason || undefined)
                setShowReason(false)
                setReason('')
              }}
              className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              確認有興趣
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CardContent({ cardIndex, startup }: { cardIndex: number; startup: Startup }) {
  // Placeholder content — will be populated from enrichment data
  const contents = [
    // Card 1: Company overview
    <div key={0}>
      <dl className="space-y-3">
        <div><dt className="text-sm text-gray-500">公司名稱</dt><dd className="font-medium">{startup.name_zh}</dd></div>
        {startup.name_en && <div><dt className="text-sm text-gray-500">英文名稱</dt><dd>{startup.name_en}</dd></div>}
        {startup.sector && <div><dt className="text-sm text-gray-500">產業別</dt><dd>{startup.sector}</dd></div>}
        {startup.one_liner && <div><dt className="text-sm text-gray-500">一句話描述</dt><dd>{startup.one_liner}</dd></div>}
      </dl>
    </div>,
    // Card 2: Founder background
    <div key={1} className="text-gray-500 text-sm">
      <p>創辦人資料將於投資摘要完成後顯示</p>
    </div>,
    // Card 3: Product & traction
    <div key={2} className="text-gray-500 text-sm">
      <p>產品與市場實績資料將於投資摘要完成後顯示</p>
    </div>,
    // Card 4: Business model
    <div key={3} className="text-gray-500 text-sm">
      <p>商業模式資料將於投資摘要完成後顯示</p>
    </div>,
    // Card 5: Investment terms
    <div key={4} className="text-gray-500 text-sm">
      <p>投資條件資料將於投資摘要完成後顯示</p>
    </div>,
    // Card 6: TEC assessment
    <div key={5}>
      <dl className="space-y-3">
        {startup.gate0_score != null && (
          <div><dt className="text-sm text-gray-500">Gate 0 分數</dt><dd className="font-medium">{startup.gate0_score}/100</dd></div>
        )}
        {startup.gate1_score != null && (
          <div><dt className="text-sm text-gray-500">Gate 1 分數</dt><dd className="font-medium">{startup.gate1_score}/100</dd></div>
        )}
        <div><dt className="text-sm text-gray-500">Pipeline 階段</dt><dd>Stage {startup.pipeline_stage}</dd></div>
      </dl>
    </div>,
  ]

  return contents[cardIndex] || null
}
