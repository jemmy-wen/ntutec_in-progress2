'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ErrorState } from '@/components/shared/ErrorState'

/**
 * Admin Mentors CMS — Manage the public 業師陣容 page data.
 *
 * Features:
 *   - List all mentors (including hidden) with category/status filters
 *   - Toggle is_active / is_new_2026 inline
 *   - Inline sort_order editing
 *   - Add / Edit modal
 *   - Delete (hard delete)
 *   - Search by name/title
 *
 * API: /api/admin/mentors (GET, POST, PATCH, DELETE)
 */

type Category = 'vc' | 'founder' | 'exec' | 'expert'

interface MentorRow {
  id: string
  name: string
  title: string | null
  highlight: string | null
  category: Category
  photo_url: string | null
  social_url: string | null
  bio: string | null
  is_active: boolean
  is_new_2026: boolean
  sort_order: number
  slug: string | null
  extended_profile: Record<string, unknown>
  created_at: string
  updated_at: string
}

const CATEGORY_LABELS: Record<Category, string> = {
  vc: '投資人',
  founder: '創業家',
  exec: '企業高管',
  expert: '產業專家',
}

const CATEGORY_COLORS: Record<Category, string> = {
  vc:      'bg-blue-100 text-blue-700',
  founder: 'bg-orange-100 text-orange-700',
  exec:    'bg-purple-100 text-purple-700',
  expert:  'bg-teal-100 text-teal-700',
}

const EMPTY_FORM: Omit<MentorRow, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  title: null,
  highlight: null,
  category: 'expert',
  photo_url: null,
  social_url: null,
  bio: null,
  is_active: true,
  is_new_2026: false,
  sort_order: 0,
  slug: null,
  extended_profile: {},
}

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<MentorRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all')
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'hidden'>('all')

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingMentor, setEditingMentor] = useState<MentorRow | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({ ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Confirm delete
  const [deleteTarget, setDeleteTarget] = useState<MentorRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const loadMentors = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ limit: '500' })
      if (search) params.set('search', search)
      if (categoryFilter !== 'all') params.set('category', categoryFilter)
      const res = await fetch(`/api/admin/mentors?${params}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setMentors(json.mentors || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [search, categoryFilter])

  useEffect(() => {
    const timer = setTimeout(loadMentors, search ? 400 : 0)
    return () => clearTimeout(timer)
  }, [loadMentors, search])

  // Inline toggle for is_active / is_new_2026
  async function toggleField(mentor: MentorRow, field: 'is_active' | 'is_new_2026') {
    const updated = { id: mentor.id, [field]: !mentor[field] }
    // Optimistic update
    setMentors((prev) => prev.map((m) => m.id === mentor.id ? { ...m, [field]: !m[field] } : m))
    try {
      const res = await fetch('/api/admin/mentors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
    } catch {
      // Revert
      setMentors((prev) => prev.map((m) => m.id === mentor.id ? { ...m, [field]: mentor[field] } : m))
    }
  }

  // Inline sort_order update
  async function updateSortOrder(mentor: MentorRow, newOrder: number) {
    const updated = { id: mentor.id, sort_order: newOrder }
    setMentors((prev) => prev.map((m) => m.id === mentor.id ? { ...m, sort_order: newOrder } : m))
    try {
      await fetch('/api/admin/mentors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
    } catch {
      // silent
    }
  }

  function openAdd() {
    setEditingMentor(null)
    setFormData({ ...EMPTY_FORM })
    setSaveError(null)
    setShowModal(true)
  }

  function openEdit(mentor: MentorRow) {
    setEditingMentor(mentor)
    setFormData({
      name: mentor.name,
      title: mentor.title || '',
      highlight: mentor.highlight || '',
      category: mentor.category,
      photo_url: mentor.photo_url || '',
      social_url: mentor.social_url || '',
      bio: mentor.bio || '',
      is_active: mentor.is_active,
      is_new_2026: mentor.is_new_2026,
      sort_order: mentor.sort_order,
      slug: mentor.slug || '',
      extended_profile: mentor.extended_profile,
    })
    setSaveError(null)
    setShowModal(true)
  }

  async function handleSave() {
    if (!formData.name.trim()) {
      setSaveError('姓名不得為空')
      return
    }
    setSaving(true)
    setSaveError(null)

    const payload = {
      ...(editingMentor ? { id: editingMentor.id } : {}),
      name: formData.name.trim(),
      title: formData.title?.trim() || null,
      highlight: formData.highlight?.trim() || null,
      category: formData.category,
      photo_url: formData.photo_url?.trim() || null,
      social_url: formData.social_url?.trim() || null,
      bio: formData.bio?.trim() || null,
      is_active: formData.is_active,
      is_new_2026: formData.is_new_2026,
      sort_order: Number(formData.sort_order) || 0,
      slug: formData.slug?.trim() || null,
      extended_profile: formData.extended_profile || {},
    }

    try {
      const res = await fetch('/api/admin/mentors', {
        method: editingMentor ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
      setShowModal(false)
      await loadMentors()
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/mentors?id=${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setDeleteTarget(null)
      await loadMentors()
    } catch {
      // silent
    } finally {
      setDeleting(false)
    }
  }

  // Filtered display
  const displayed = mentors.filter((m) => {
    if (activeFilter === 'active' && !m.is_active) return false
    if (activeFilter === 'hidden' && m.is_active) return false
    return true
  })

  const stats = {
    total: mentors.length,
    active: mentors.filter((m) => m.is_active).length,
    hidden: mentors.filter((m) => !m.is_active).length,
    new2026: mentors.filter((m) => m.is_new_2026 && m.is_active).length,
  }

  if (error) return <ErrorState message={error} onRetry={loadMentors} />

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">業師管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理官網業師陣容頁面的顯示資料
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
          </svg>
          新增業師
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: '總計', value: stats.total, color: 'text-gray-900' },
          { label: '顯示中', value: stats.active, color: 'text-emerald-600' },
          { label: '已隱藏', value: stats.hidden, color: 'text-gray-500' },
          { label: '2026 新任', value: stats.new2026, color: 'text-teal-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="搜尋姓名 / 職稱..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">全部分類</option>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
          ))}
        </select>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
          {(['all', 'active', 'hidden'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 transition-colors ${
                activeFilter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? '全部' : f === 'active' ? '顯示中' : '已隱藏'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">載入中...</div>
        ) : displayed.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">沒有符合條件的業師</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-14 px-3 py-3 text-left text-xs font-medium text-gray-500">照片</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">姓名 / 職稱</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">分類</th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500">顯示</th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500">2026 新</th>
                  <th className="w-20 px-3 py-3 text-center text-xs font-medium text-gray-500">排序</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayed.map((mentor) => (
                  <tr key={mentor.id} className={mentor.is_active ? '' : 'opacity-50'}>
                    {/* Photo */}
                    <td className="px-3 py-2">
                      <div className="relative h-10 w-8 overflow-hidden rounded-md bg-gray-100">
                        {mentor.photo_url ? (
                          <Image
                            src={mentor.photo_url}
                            alt={mentor.name}
                            fill
                            sizes="32px"
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs font-bold text-gray-400">
                            {mentor.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Name / Title */}
                    <td className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{mentor.name}</p>
                      {(mentor.highlight || mentor.title) && (
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {mentor.highlight || mentor.title}
                        </p>
                      )}
                      {mentor.slug && (
                        <p className="text-xs text-teal-600">/mentors/{mentor.slug}</p>
                      )}
                    </td>
                    {/* Category */}
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[mentor.category]}`}>
                        {CATEGORY_LABELS[mentor.category]}
                      </span>
                    </td>
                    {/* is_active toggle */}
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => toggleField(mentor, 'is_active')}
                        aria-label={mentor.is_active ? '隱藏業師' : '顯示業師'}
                        className={`inline-flex h-6 w-10 items-center rounded-full transition-colors ${
                          mentor.is_active ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          mentor.is_active ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </button>
                    </td>
                    {/* is_new_2026 toggle */}
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => toggleField(mentor, 'is_new_2026')}
                        aria-label={mentor.is_new_2026 ? '取消 2026 新任' : '標記為 2026 新任'}
                        className={`inline-flex h-6 w-10 items-center rounded-full transition-colors ${
                          mentor.is_new_2026 ? 'bg-teal-500' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          mentor.is_new_2026 ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </button>
                    </td>
                    {/* Sort order */}
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={mentor.sort_order}
                        onChange={(e) => updateSortOrder(mentor, parseInt(e.target.value) || 0)}
                        className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    {/* Actions */}
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(mentor)}
                          className="rounded-md px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => setDeleteTarget(mentor)}
                          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingMentor ? `編輯：${editingMentor.name}` : '新增業師'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100"
                aria-label="關閉"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              {saveError && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{saveError}</div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">姓名 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="王小明"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">分類 *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, category: e.target.value as Category }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                    <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">完整職稱</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="XX 公司 總經理"
                />
              </div>

              {/* Highlight */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">卡片顯示標題（優先於職稱）</label>
                <input
                  type="text"
                  value={formData.highlight || ''}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, highlight: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="前 XXX CTO；現任 YYY 總裁"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">照片 URL</label>
                <input
                  type="text"
                  value={formData.photo_url || ''}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, photo_url: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="/mentors/wang-xiaoming.jpg"
                />
              </div>

              {/* Social URL */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn / Facebook URL</label>
                <input
                  type="url"
                  value={formData.social_url || ''}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, social_url: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="https://www.linkedin.com/in/..."
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">URL Slug（個人頁網址）</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData((p: typeof formData) => ({
                    ...p,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                  }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="wang-xiaoming"
                />
                {formData.slug && (
                  <p className="mt-1 text-xs text-teal-600">/mentors/{formData.slug}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">詳細介紹（個人頁顯示）</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, bio: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="業師的詳細背景介紹..."
                />
              </div>

              {/* Toggles row */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData((p: typeof formData) => ({ ...p, is_active: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">顯示於官網</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_new_2026}
                    onChange={(e) => setFormData((p: typeof formData) => ({ ...p, is_new_2026: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">2026 新任業師</span>
                </label>
              </div>

              {/* Sort order */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">排序權重（小值 = 靠前）</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData((p: typeof formData) => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
              >
                {saving ? '儲存中...' : (editingMentor ? '儲存修改' : '新增業師')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-base font-semibold text-gray-900">確認刪除</h2>
            <p className="mt-2 text-sm text-gray-500">
              確定要刪除業師「<strong>{deleteTarget.name}</strong>」嗎？此操作無法復原。
              <br />
              若只是要隱藏，請使用「顯示」開關。
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? '刪除中...' : '確認刪除'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
