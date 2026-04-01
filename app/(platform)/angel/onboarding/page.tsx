'use client'

/**
 * F-006: Onboarding Wizard for New Angel Members
 *
 * 4-step wizard:
 * 1. Welcome + basic info confirmation
 * 2. Investment preference setup (sectors, ticket, stage)
 * 3. How the platform works (quick tour)
 * 4. Complete — redirect to portal
 *
 * Auto-redirects to /angel/portal if onboarding already completed.
 * Sets `onboarding_completed: true` on angel_members after finishing.
 */

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface MemberProfile {
  id: string
  display_name: string
  email: string | null
  phone: string | null
  company: string | null
  title: string | null
  investment_preferences: {
    sectors?: string[]
    ticket_range?: string
    stage_preference?: string
  } | null
  onboarding_completed?: boolean
}

const SECTOR_OPTIONS = [
  { value: 'AI/ML', label: 'AI/ML', icon: '🤖' },
  { value: 'FinTech', label: 'FinTech', icon: '💳' },
  { value: 'HealthTech', label: '醫療科技', icon: '🏥' },
  { value: 'EdTech', label: '教育科技', icon: '📚' },
  { value: 'CleanTech', label: '綠能科技', icon: '🌱' },
  { value: 'IoT', label: '物聯網', icon: '📡' },
  { value: 'SaaS', label: 'SaaS', icon: '☁️' },
  { value: 'BioTech', label: '生技醫藥', icon: '🧬' },
  { value: 'AgriTech', label: '農業科技', icon: '🌾' },
  { value: 'Semiconductor', label: '半導體', icon: '💎' },
  { value: 'E-commerce', label: '電子商務', icon: '🛒' },
  { value: 'DeepTech', label: '深科技', icon: '🔬' },
  { value: 'SpaceTech', label: '太空科技', icon: '🚀' },
  { value: 'FoodTech', label: '食品科技', icon: '🍽️' },
]

const TICKET_OPTIONS = [
  { value: 'under_500k', label: '50萬以下', desc: '初次天使投資的好起點' },
  { value: '500k_1m', label: '50 - 100萬', desc: '最常見的天使投資區間' },
  { value: '1m_2m', label: '100 - 200萬', desc: '適合有經驗的天使投資人' },
  { value: 'over_2m', label: '200萬以上', desc: '領投或策略投資人' },
]

const STAGE_OPTIONS = [
  { value: 'Pre-Seed', label: 'Pre-Seed', desc: '概念驗證、MVP 階段' },
  { value: 'Seed', label: 'Seed', desc: '產品上線、初期客戶' },
  { value: 'Pre-A', label: 'Pre-A / A', desc: '營收成長、規模化' },
  { value: 'Any', label: '不限階段', desc: '任何階段都願意看' },
]

const STEPS = ['歡迎', '投資偏好', '平台導覽', '完成']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<MemberProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state
  const [displayName, setDisplayName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [sectors, setSectors] = useState<string[]>([])
  const [ticketRange, setTicketRange] = useState('')
  const [stagePreference, setStagePreference] = useState('')

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/members')
      if (res.ok) {
        const data = await res.json()
        const m = data.member
        if (m) {
          setProfile(m)
          setDisplayName(m.display_name || '')
          setPhone(m.phone || '')
          setCompany(m.company || '')
          setTitle(m.title || '')
          setSectors(m.investment_preferences?.sectors || [])
          setTicketRange(m.investment_preferences?.ticket_range || '')
          setStagePreference(m.investment_preferences?.stage_preference || '')

          // If already completed onboarding, redirect
          if (m.onboarding_completed) {
            router.replace('/angel/portal')
            return
          }
        }
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [router])

  useEffect(() => { load() }, [load])

  async function saveAndNext() {
    setSaving(true)
    try {
      await fetch('/api/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: displayName,
          phone,
          company,
          title,
          investment_preferences: {
            sectors,
            ticket_range: ticketRange,
            stage_preference: stagePreference,
          },
        }),
      })
    } catch { /* save failed, proceed anyway */ }
    setSaving(false)
    setStep(prev => prev + 1)
  }

  async function completeOnboarding() {
    setSaving(true)
    try {
      await fetch('/api/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: displayName,
          phone,
          company,
          title,
          investment_preferences: {
            sectors,
            ticket_range: ticketRange,
            stage_preference: stagePreference,
          },
          onboarding_completed: true,
        }),
      })
    } catch { /* ignore */ }
    setSaving(false)
    router.push('/angel/portal')
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < step ? 'bg-green-500 text-white' :
                i === step ? 'bg-teal-600 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`hidden sm:block w-16 md:w-24 h-1 mx-1 rounded-full transition-colors ${
                  i < step ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          {STEPS.map((label, i) => (
            <span key={i} className={i === step ? 'text-teal-600 font-medium' : ''}>{label}</span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">👋</div>
              <h1 className="text-2xl font-bold mb-2">歡迎加入 NTUTEC ANGELS 臺大天使會</h1>
              <p className="text-gray-500">讓我們花 2 分鐘設定您的偏好，幫助我們推薦最合適的投資機會。</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="ob-name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input id="ob-name" value={displayName} onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="您的姓名" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ob-company" className="block text-sm font-medium text-gray-700 mb-1">公司/單位</label>
                  <input id="ob-company" value={company} onChange={e => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    placeholder="選填" />
                </div>
                <div>
                  <label htmlFor="ob-title" className="block text-sm font-medium text-gray-700 mb-1">職稱</label>
                  <input id="ob-title" value={title} onChange={e => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    placeholder="選填" />
                </div>
              </div>
              <div>
                <label htmlFor="ob-phone" className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                <input id="ob-phone" value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="09xx-xxx-xxx" />
              </div>
            </div>

            <button onClick={() => saveAndNext()} disabled={!displayName.trim() || saving}
              className="w-full py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors">
              {saving ? '儲存中...' : '下一步'}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-2">投資偏好設定</h2>
              <p className="text-gray-500">這些偏好會幫助我們為您推薦合適的新創，日後隨時可以調整。</p>
            </div>

            {/* Sectors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">感興趣的產業（可複選）</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SECTOR_OPTIONS.map(s => {
                  const selected = sectors.includes(s.value)
                  return (
                    <button
                      key={s.value}
                      onClick={() => setSectors(prev =>
                        selected ? prev.filter(x => x !== s.value) : [...prev, s.value]
                      )}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                        selected
                          ? 'bg-teal-50 border-2 border-teal-500 text-teal-700 font-medium'
                          : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Ticket range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">單筆投資金額偏好</label>
              <div className="space-y-2">
                {TICKET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setTicketRange(opt.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                      ticketRange === opt.value
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className={`font-medium ${ticketRange === opt.value ? 'text-green-700' : 'text-gray-900'}`}>{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                    {ticketRange === opt.value && <span className="text-green-500 text-xl">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">偏好投資階段</label>
              <div className="grid grid-cols-2 gap-2">
                {STAGE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setStagePreference(opt.value)}
                    className={`flex flex-col items-start px-4 py-3 rounded-lg text-left transition-all ${
                      stagePreference === opt.value
                        ? 'bg-teal-50 border-2 border-teal-500'
                        : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className={`font-medium ${stagePreference === opt.value ? 'text-teal-700' : 'text-gray-900'}`}>{opt.label}</div>
                    <div className="text-xs text-gray-500">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                上一步
              </button>
              <button onClick={() => saveAndNext()} disabled={saving}
                className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors">
                {saving ? '儲存中...' : '下一步'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-2xl font-bold mb-2">平台使用指南</h2>
              <p className="text-gray-500">以下是您可以在平台上做的事情</p>
            </div>

            <div className="space-y-4">
              <TourCard
                icon="📋" title="瀏覽候選新創"
                desc="每月月會前，我們會上架 3-5 家精選新創的六張資訊卡片。瀏覽後表達您的興趣偏好。"
              />
              <TourCard
                icon="🗳️" title="投資意向投票"
                desc="月會後，針對 Pitch 過的新創進行記名投票（願意投資 / 保留 / 不投資），並選擇投資金額範圍。"
              />
              <TourCard
                icon="📊" title="本月 Pipeline"
                desc="查看當月評估中的新創列表，了解篩選進度與案源品質。"
              />
              <TourCard
                icon="📚" title="學習中心"
                desc="天使投資入門、產業趨勢、盡職調查方法論等學習資源。"
              />
              <TourCard
                icon="🔔" title="即時通知"
                desc="重要事件（卡片上架、投票開放、月會提醒）會透過站內通知和 Email 提醒您。"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                上一步
              </button>
              <button onClick={() => setStep(3)}
                className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
                了解了！
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold">設定完成！</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              歡迎{displayName ? `，${displayName}` : ''}！您的偏好已儲存。
              現在可以開始瀏覽候選新創了。
            </p>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-sm">
              {sectors.length > 0 && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-20">產業偏好</span>
                  <span className="flex flex-wrap gap-1">
                    {sectors.slice(0, 4).map(s => (
                      <span key={s} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs">{s}</span>
                    ))}
                    {sectors.length > 4 && <span className="text-gray-400 text-xs">+{sectors.length - 4}</span>}
                  </span>
                </div>
              )}
              {ticketRange && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-20">投資金額</span>
                  <span>{TICKET_OPTIONS.find(t => t.value === ticketRange)?.label}</span>
                </div>
              )}
              {stagePreference && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-20">偏好階段</span>
                  <span>{STAGE_OPTIONS.find(s => s.value === stagePreference)?.label}</span>
                </div>
              )}
            </div>

            <button onClick={completeOnboarding} disabled={saving}
              className="w-full max-w-sm py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors text-lg">
              {saving ? '前往中...' : '進入平台 →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function TourCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
      <div className="text-2xl mt-0.5">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  )
}
