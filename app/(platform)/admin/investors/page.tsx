'use client'

import { useState, useEffect } from 'react'

interface MemberRow {
  id: string
  display_name: string
  email: string | null
  company: string | null
  tier: string | null
  status: string
  card_response_rate?: number
  vote_participation_rate?: number
  articles_read?: number
  engagement_level?: string
}

export default function InvestorsAdminPage() {
  const [members, setMembers] = useState<MemberRow[]>([])
  const [engagement, setEngagement] = useState<Map<string, MemberRow>>(new Map())
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [membersRes, engagementRes] = await Promise.all([
        fetch('/api/members'),
        fetch('/api/engagement'),
      ])

      if (membersRes.ok) {
        const data = await membersRes.json()
        setMembers(data.members || [])
      }
      if (engagementRes.ok) {
        const data = await engagementRes.json()
        const map = new Map<string, MemberRow>()
        for (const m of (data.members || [])) {
          map.set(m.id, m)
        }
        setEngagement(map)
      }
      setLoading(false)
    }
    load()
  }, [])

  // Merge engagement data into members
  const enriched = members.map(m => ({
    ...m,
    ...(engagement.get(m.id) || {}),
  }))

  const filtered = filter === 'all'
    ? enriched
    : enriched.filter(m => m.engagement_level === filter)

  if (loading) return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">投資人管理</h1>
        <span className="text-sm text-gray-500">{members.length} 位天使會員</span>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: '全部' },
          { key: 'active', label: '活躍', color: 'text-green-600' },
          { key: 'moderate', label: '中度', color: 'text-yellow-600' },
          { key: 'low', label: '低參與', color: 'text-red-600' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">姓名</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">公司</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">等級</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">卡片回應率</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">投票參與率</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">文章閱讀</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">活躍度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{m.display_name}</td>
                  <td className="px-4 py-3 text-gray-500">{m.company || '-'}</td>
                  <td className="px-4 py-3">
                    {m.tier && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        m.tier === 'founding' ? 'bg-purple-100 text-purple-700' :
                        m.tier === 'regular' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {m.tier}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">{m.card_response_rate != null ? `${m.card_response_rate}%` : '-'}</td>
                  <td className="px-4 py-3 text-center">{m.vote_participation_rate != null ? `${m.vote_participation_rate}%` : '-'}</td>
                  <td className="px-4 py-3 text-center">{m.articles_read ?? '-'}</td>
                  <td className="px-4 py-3 text-center">
                    {m.engagement_level && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        m.engagement_level === 'active' ? 'bg-green-100 text-green-700' :
                        m.engagement_level === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {m.engagement_level === 'active' ? '活躍' : m.engagement_level === 'moderate' ? '中度' : '低'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
