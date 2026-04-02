// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/admin/report/ceo — CEO Dashboard Report (JSON or HTML)
 *
 * Query params:
 *   ?format=html  → styled HTML page (printable to PDF via browser)
 *   ?format=json  → raw JSON data
 *
 * Requires: admin or staff_admin role
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: roles } = await supabase
      .from('module_roles')
      .select('role')
      .eq('user_id', user.id)

    const userRoles = (roles || []).map((r: { role: string }) => r.role)
    const metadataRole = user.app_metadata?.platform_role
    const isAdmin = userRoles.some(r => ['admin', 'staff_admin'].includes(r)) || metadataRole === 'admin'
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const format = req.nextUrl.searchParams.get('format') || 'html'

    // --- Parallel data fetch ---
    const [pipelineRes, meetingsRes, ogsmRes, ceoQueueRes, projectsRes, pitchesRes] = await Promise.all([
      supabase.from('pip_startups').select('id, pipeline_stage, current_gate, tier, status, observation_pool'),
      supabase.from('pip_meetings').select('*').order('id', { ascending: false }).limit(3),
      supabase.from('sys_ogsm_measures').select('*').order('id'),
      supabase.from('sys_ceo_decisions').select('*').eq('status', 'pending').order('deadline'),
      supabase.from('sys_projects').select('*').in('status', ['active', 'paused']).order('code'),
      supabase.from('pip_meeting_pitches').select('startup_id, startup_name_zh, tier, sector'),
    ])

    const startups = pipelineRes.data || []
    const meetings = meetingsRes.data || []
    const measures = ogsmRes.data || []
    const decisions = ceoQueueRes.data || []
    const projects = projectsRes.data || []
    const pitches = pitchesRes.data || []

    // --- Pipeline stats ---
    const total = startups.length
    const stages: Record<string, number> = { radar: 0, gate0: 0, gate1: 0, gate2: 0, pitch_ready: 0, invested: 0 }
    for (const s of startups) {
      if (s.status === 'invested') stages.invested++
      else if (s.current_gate === 'gate0') stages.gate0++
      else if (s.current_gate === 'gate1') stages.gate1++
      else if (s.current_gate === 'gate2' || s.current_gate === 'screening') stages.gate2++
      else if (s.current_gate === 'pitch' || s.current_gate === 'monthly_pitch') stages.pitch_ready++
      else stages.radar++
    }

    const activeMeeting = meetings.find(m => m.status !== 'closed')
    const now = new Date()
    let countdown: number | null = null
    if (activeMeeting?.meeting_date) {
      countdown = Math.ceil((new Date(activeMeeting.meeting_date).getTime() - now.getTime()) / 86400000)
    }

    const reportData = {
      generated: now.toISOString(),
      pipeline: { total, stages },
      meeting: activeMeeting ? { id: activeMeeting.id, date: activeMeeting.meeting_date, countdown, pitches } : null,
      measures,
      decisions,
      projects,
    }

    if (format === 'json') {
      return NextResponse.json(reportData)
    }

    // --- Render HTML report (printable) ---
    const today = now.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })

    const measuresHtml = measures.map(m => {
      const barColor = m.pct >= 70 ? '#22C55E' : m.pct >= 40 ? '#F59E0B' : '#EF4444'
      return `<tr>
        <td style="font-weight:700;color:#0D9488">${m.id}</td>
        <td>${m.name}</td>
        <td><div style="background:#E5E7EB;border-radius:4px;height:8px;width:100px"><div style="background:${barColor};height:8px;border-radius:4px;width:${m.pct}%"></div></div></td>
        <td style="text-align:right">${m.pct}%</td>
        <td>${m.current_value || '—'}</td>
      </tr>`
    }).join('')

    const decisionsHtml = decisions.length > 0
      ? decisions.map(d => `<tr>
          <td style="font-weight:700;color:#DC2626">${d.id}</td>
          <td>${d.subject}</td>
          <td>${d.deadline ? new Date(d.deadline).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }) : '—'}</td>
          <td><span style="background:#FEF3C7;color:#92400E;padding:2px 8px;border-radius:4px;font-size:11px">${d.priority}</span></td>
        </tr>`).join('')
      : '<tr><td colspan="4" style="text-align:center;color:#9CA3AF">目前無待決策事項</td></tr>'

    const projectsHtml = projects.map(p => {
      const barColor = p.progress >= 80 ? '#22C55E' : p.progress >= 40 ? '#F59E0B' : '#9CA3AF'
      return `<tr>
        <td style="font-weight:600">${p.code}</td>
        <td>${p.name}</td>
        <td><div style="display:flex;align-items:center;gap:8px"><div style="background:#E5E7EB;border-radius:4px;height:6px;width:60px;flex-shrink:0"><div style="background:${barColor};height:6px;border-radius:4px;width:${p.progress}%"></div></div><span style="font-size:11px">${p.progress}%</span></div></td>
        <td style="font-size:12px;color:#6B7280">${p.next_action || '—'}</td>
      </tr>`
    }).join('')

    const meetingSection = reportData.meeting
      ? `<div style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border:1px solid #F59E0B;border-radius:12px;padding:20px;margin:20px 0">
          <div style="display:flex;align-items:center;gap:16px">
            <div style="font-size:36px;font-weight:800;color:#92400E">D${countdown !== null ? (countdown > 0 ? `-${countdown}` : countdown === 0 ? '-Day' : `+${Math.abs(countdown)}`) : '?'}</div>
            <div><div style="font-weight:700">${reportData.meeting.id} 天使例會</div><div style="font-size:13px;color:#78350F">${reportData.meeting.date}</div></div>
          </div>
          ${pitches.length > 0 ? `<div style="margin-top:12px;font-size:13px"><strong>Pitch 名單：</strong>${pitches.map(p => p.startup_name_zh).join(' / ')}</div>` : ''}
        </div>`
      : ''

    const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>NTUTEC CEO Report — ${today}</title>
<style>
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  body { font-family: -apple-system, 'Noto Sans TC', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1E293B; }
  h1 { font-size: 22px; border-bottom: 3px solid #0D9488; padding-bottom: 8px; }
  h2 { font-size: 16px; color: #0D9488; margin: 24px 0 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #E5E7EB; }
  th { background: #F8FAFC; font-size: 11px; text-transform: uppercase; color: #64748B; }
  .kpi-bar { display: flex; gap: 12px; margin: 16px 0; }
  .kpi { background: #F8FAFC; border-radius: 10px; padding: 14px 18px; flex: 1; text-align: center; border-top: 3px solid #0D9488; }
  .kpi .num { font-size: 28px; font-weight: 800; color: #0D9488; }
  .kpi .label { font-size: 11px; color: #64748B; margin-top: 2px; }
  .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #94A3B8; }
</style>
</head>
<body>
<h1>NTUTEC 營運報告</h1>
<p style="color:#64748B;font-size:13px">報告日期：${today}　｜　自動產生自 NTUTEC Platform</p>

<div class="kpi-bar">
  <div class="kpi"><div class="num">${total}</div><div class="label">案源總池</div></div>
  <div class="kpi"><div class="num">${stages.gate0 + stages.gate1 + stages.gate2 + stages.pitch_ready + stages.invested}</div><div class="label">Gate 0+</div></div>
  <div class="kpi"><div class="num">${stages.gate1}</div><div class="label">Gate 1</div></div>
  <div class="kpi"><div class="num">${stages.pitch_ready}</div><div class="label">Pitch Ready</div></div>
  <div class="kpi"><div class="num">${stages.invested}</div><div class="label">已投資</div></div>
</div>

${meetingSection}

<h2>OGSM Measures 進度</h2>
<table><thead><tr><th>ID</th><th>指標</th><th>進度</th><th>%</th><th>現況</th></tr></thead><tbody>${measuresHtml}</tbody></table>

${decisions.length > 0 ? `<h2 style="color:#DC2626">待決策事項（${decisions.length} 項）</h2>
<table><thead><tr><th>ID</th><th>決策項</th><th>截止</th><th>優先</th></tr></thead><tbody>${decisionsHtml}</tbody></table>` : ''}

<h2>專案進度</h2>
<table><thead><tr><th>代號</th><th>名稱</th><th>進度</th><th>下一步</th></tr></thead><tbody>${projectsHtml}</tbody></table>

<div class="footer">NTUTEC Command Center — Auto-generated Report<br>ntutec-platform.vercel.app/admin/dashboard</div>
</body></html>`

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (err) {
    console.error('CEO report error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
