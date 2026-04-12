import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ROLE_LABELS, type PlatformRole } from '@/lib/utils/roles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的頁面',
}

function getRoleDisplayName(roles: string[]): string {
  if (roles.includes('admin') || roles.includes('staff_admin')) return '管理員'
  if (roles.includes('staff_accelerator')) return '加速器專員'
  if (roles.includes('angel_member')) return '天使會員'
  if (roles.includes('mentor')) return '業師'
  if (roles.includes('startup_incubated')) return '育成新創'
  if (roles.includes('startup_fundraising')) return '募資新創'
  if (roles.includes('team')) return '新創團隊'
  if (roles.includes('vc_partner')) return '創投夥伴'
  return '訪客'
}

interface FormSubmission {
  id: string
  type: string
  status: string
  name: string | null
  email: string | null
  created_at: string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new:      { label: '已收到', color: 'text-blue-600 bg-blue-50' },
  read:     { label: '審查中', color: 'text-yellow-600 bg-yellow-50' },
  replied:  { label: '已回覆', color: 'text-teal-700 bg-teal-50' },
  archived: { label: '已結案', color: 'text-gray-500 bg-gray-100' },
}

const TYPE_LABELS: Record<string, string> = {
  angel_apply:  '天使會申請',
  pitch:        '新創投遞',
  apply:        '加速器申請',
  contact:      '一般聯繫',
  consulting:   '諮詢服務',
}

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const admin = createAdminClient()

  // Fetch roles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: roleRows } = await (admin.from('module_roles') as any)
    .select('role')
    .eq('user_id', user.id)
    .eq('is_active', true)
  const roles: string[] = (roleRows || []).map((r: { role: string }) => r.role)

  // Fetch profile
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profileData } = await (admin.from('profiles') as any)
    .select('display_name, avatar_url')
    .eq('id', user.id)
    .single()
  const profile = profileData as { display_name: string | null; avatar_url: string | null } | null

  const displayName = profile?.display_name
    || user.user_metadata?.full_name
    || user.user_metadata?.name
    || user.email?.split('@')[0]
    || '使用者'

  // Fetch form submissions for this user's email
  let submissions: FormSubmission[] = []
  if (user.email) {
    const { data } = await admin
      .from('form_submissions')
      .select('id, type, status, name, email, created_at')
      .or(`email.eq.${user.email},submitter_email.eq.${user.email}`)
      .order('created_at', { ascending: false })
      .limit(10)
    submissions = (data || []) as FormSubmission[]
  }

  const isAdmin = roles.includes('admin') || roles.includes('staff_admin') || roles.includes('staff_accelerator')
  const isAngel = roles.includes('angel_member') || roles.includes('visitor')
  const isMentor = roles.includes('mentor')
  const isStartup = roles.includes('startup_incubated') || roles.includes('startup_fundraising') || roles.includes('team')

  const roleLabel = getRoleDisplayName(roles)
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {profile?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold">
            {initial}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">嗨，{displayName}！</h1>
          <p className="text-sm text-gray-500">{user.email} · {roleLabel}</p>
        </div>
      </div>

      {/* Quick links by role */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">快速導覽</h2>
        <div className="grid grid-cols-2 gap-3">
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">🖥️</span>
              <div>
                <p className="font-medium text-gray-900">管理後台</p>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>
          )}
          {isAngel && (
            <Link
              href="/angel/portal/upcoming"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">👼</span>
              <div>
                <p className="font-medium text-gray-900">天使專區</p>
                <p className="text-xs text-gray-500">Angel Portal</p>
              </div>
            </Link>
          )}
          {isMentor && (
            <Link
              href="/mentors"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">🎓</span>
              <div>
                <p className="font-medium text-gray-900">業師資訊</p>
                <p className="text-xs text-gray-500">Mentor Profile</p>
              </div>
            </Link>
          )}
          {isStartup && (
            <Link
              href="/pitch"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-medium text-gray-900">新創投遞</p>
                <p className="text-xs text-gray-500">Startup Pitch</p>
              </div>
            </Link>
          )}
          {/* Universal links */}
          <Link
            href="/programs"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-medium text-gray-900">計畫方案</p>
              <p className="text-xs text-gray-500">Programs</p>
            </div>
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-medium text-gray-900">活動資訊</p>
              <p className="text-xs text-gray-500">Events</p>
            </div>
          </Link>
        </div>
      </section>

      {/* My Submissions */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">我的申請</h2>
        {submissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-400 text-sm mb-4">尚無申請紀錄</p>
            <div className="flex justify-center gap-3">
              <Link href="/apply" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                申請加速器 →
              </Link>
              <Link href="/pitch" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                新創投遞 →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => {
              const statusInfo = STATUS_LABELS[sub.status] || { label: sub.status, color: 'text-gray-500 bg-gray-100' }
              const typeLabel = TYPE_LABELS[sub.type] || sub.type
              const date = new Date(sub.created_at).toLocaleDateString('zh-TW', {
                year: 'numeric', month: 'long', day: 'numeric'
              })

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">{typeLabel}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{date}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
              )
            })}

            {/* Simple status legend */}
            <div className="mt-3 flex gap-4 text-xs text-gray-400 px-1">
              {Object.entries(STATUS_LABELS).map(([, { label, color }]) => (
                <span key={label} className={`px-2 py-0.5 rounded-full ${color}`}>{label}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Role badge */}
      {roles.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">我的身份</h2>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <span key={r} className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full border border-teal-200">
                {ROLE_LABELS[r as PlatformRole] || r}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Sign out */}
      <div className="border-t border-gray-200 pt-6">
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            登出帳號
          </button>
        </form>
      </div>
    </div>
  )
}
