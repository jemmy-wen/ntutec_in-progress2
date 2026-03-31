'use client'

import { useState, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PITCHES = [
  { id: 'shipeng', name: '士芃科技', subtitle: '建築 AI SaaS', emoji: '🏗️' },
  { id: 'longlink', name: '澤龍智能', subtitle: '無人機 FPV 通訊', emoji: '🛩️' },
  { id: 'stellarcell', name: '星誠細胞生醫', subtitle: '外泌體再生醫療', emoji: '🧬' },
] as const

const RECOMMENDATIONS = [
  { value: 'follow_up', label: '建議跟進', color: 'green', emoji: '🟢' },
  { value: 'watch', label: '觀望', color: 'yellow', emoji: '🟡' },
  { value: 'pass', label: '不建議', color: 'red', emoji: '🔴' },
] as const

type RecommendationValue = (typeof RECOMMENDATIONS)[number]['value']

interface StartupVote {
  score_interest: number | null
  recommendation: RecommendationValue | null
  comment: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VoteForm({ cycle }: { cycle: string }) {
  const [voterName, setVoterName] = useState('')
  const [voterCompany, setVoterCompany] = useState('')
  const [votes, setVotes] = useState<Record<string, StartupVote>>(() => {
    const init: Record<string, StartupVote> = {}
    for (const p of PITCHES) {
      init[p.id] = { score_interest: null, recommendation: null, comment: '' }
    }
    return init
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check localStorage on mount (avoid SSR)
  const [alreadyVoted] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(`vote_${cycle}`) === 'done'
  })

  const setScore = useCallback((startupId: string, value: number) => {
    setVotes(prev => ({
      ...prev,
      [startupId]: { ...prev[startupId], score_interest: value },
    }))
  }, [])

  const setRecommendation = useCallback((startupId: string, value: RecommendationValue) => {
    setVotes(prev => ({
      ...prev,
      [startupId]: { ...prev[startupId], recommendation: value },
    }))
  }, [])

  const setComment = useCallback((startupId: string, value: string) => {
    setVotes(prev => ({
      ...prev,
      [startupId]: { ...prev[startupId], comment: value },
    }))
  }, [])

  const validate = (): string | null => {
    if (!voterName.trim()) return '請填寫您的姓名'
    if (!voterCompany.trim()) return '請填寫您的公司名稱'
    for (const pitch of PITCHES) {
      if (votes[pitch.id].score_interest === null) {
        return `請為「${pitch.name}」評分投資意願`
      }
    }
    return null
  }

  const handleSubmit = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setSubmitting(true)

    try {
      const payload = {
        voter_name: voterName.trim(),
        voter_company: voterCompany.trim(),
        votes: PITCHES.map(p => ({
          startup_id: p.id,
          startup_name: p.name,
          score_interest: votes[p.id].score_interest,
          recommendation: votes[p.id].recommendation,
          comment: votes[p.id].comment.trim() || undefined,
        })),
      }

      const res = await fetch('/api/public-votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || '投票失敗')
      }

      localStorage.setItem(`vote_${cycle}`, 'done')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '投票失敗，請稍後再試')
    } finally {
      setSubmitting(false)
    }
  }

  // ---- Already voted or just submitted ----
  if (alreadyVoted || submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">感謝投票！</h2>
        <p className="text-gray-600">
          您的意見已成功送出，感謝參與本次月會。
        </p>
      </div>
    )
  }

  // ---- Form ----
  return (
    <div className="space-y-6">
      {/* Voter info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3">
        <div>
          <label htmlFor="voter-name" className="block text-sm font-medium text-gray-700 mb-1">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            id="voter-name"
            type="text"
            value={voterName}
            onChange={e => setVoterName(e.target.value)}
            placeholder="請輸入您的姓名"
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>
        <div>
          <label htmlFor="voter-company" className="block text-sm font-medium text-gray-700 mb-1">
            公司名稱 <span className="text-red-500">*</span>
          </label>
          <input
            id="voter-company"
            type="text"
            value={voterCompany}
            onChange={e => setVoterCompany(e.target.value)}
            placeholder="請輸入您的公司/機構名稱"
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>
      </div>

      {/* Pitch cards */}
      {PITCHES.map((pitch, idx) => (
        <div key={pitch.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Card header */}
          <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{pitch.emoji}</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{pitch.name}</h2>
                <p className="text-sm text-purple-600">{pitch.subtitle}</p>
              </div>
              <span className="ml-auto text-xs text-gray-400 font-mono">{idx + 1}/3</span>
            </div>
          </div>

          <div className="p-4 space-y-5">
            {/* Investment interest — single score */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                投資意願 <span className="text-red-500">*</span>
              </p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(n => {
                  const selected = votes[pitch.id].score_interest === n
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setScore(pitch.id, n)}
                      className={`
                        w-11 h-11 rounded-full text-base font-bold transition-all
                        flex items-center justify-center
                        ${selected
                          ? 'bg-purple-600 text-white shadow-md scale-110'
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700'
                        }
                      `}
                    >
                      {n}
                    </button>
                  )
                })}
                <span className="ml-2 text-xs text-gray-400">
                  {votes[pitch.id].score_interest === null
                    ? ''
                    : votes[pitch.id].score_interest! <= 2
                      ? '低'
                      : votes[pitch.id].score_interest! <= 4
                        ? '中'
                        : '高'}
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">推薦</p>
              <div className="grid grid-cols-3 gap-2">
                {RECOMMENDATIONS.map(rec => {
                  const selected = votes[pitch.id].recommendation === rec.value
                  return (
                    <button
                      key={rec.value}
                      type="button"
                      onClick={() => setRecommendation(pitch.id, rec.value)}
                      className={`
                        py-2.5 px-2 rounded-lg text-sm font-medium transition-all
                        border-2
                        ${selected
                          ? rec.color === 'green'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : rec.color === 'yellow'
                              ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                              : 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }
                      `}
                    >
                      {rec.emoji} {rec.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                文字意見（選填）
              </label>
              <textarea
                value={votes[pitch.id].comment}
                onChange={e => setComment(pitch.id, e.target.value)}
                placeholder="對這組新創的觀察或建議..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className={`
          w-full py-4 rounded-xl text-lg font-bold transition-all
          ${submitting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-lg hover:shadow-xl'
          }
        `}
      >
        {submitting ? '送出中...' : '送出投票'}
      </button>

      <p className="text-xs text-center text-gray-400">
        投票僅供月會決策參考，感謝您的寶貴意見
      </p>
    </div>
  )
}
