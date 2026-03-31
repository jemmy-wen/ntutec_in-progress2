// @ts-nocheck
/**
 * GET /api/admin/pipeline/[id]/bp — Generate signed URL for BP file download
 * Requires admin role. Returns a temporary signed URL (1 hour expiry).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: startupId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check admin role
  const { data: roles } = await supabase
    .from('module_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('module', 'angel_club')
    .eq('is_active', true)

  const isAdmin = roles?.some(r => r.role === 'admin' || r.role === 'staff_admin')
  if (!isAdmin) {
    return NextResponse.json({ error: '需要管理員權限' }, { status: 403 })
  }

  const admin = createAdminClient()

  // Look up bp_storage_path from the startup record
  const { data: startup, error: fetchErr } = await admin
    .from('pip_startups')
    .select('bp_storage_path, name_zh')
    .eq('id', startupId)
    .single()

  if (fetchErr || !startup) {
    return NextResponse.json({ error: '找不到新創資料' }, { status: 404 })
  }

  if (!startup.bp_storage_path) {
    return NextResponse.json({ error: '尚未上傳 BP 檔案' }, { status: 404 })
  }

  // Generate signed URL (expires in 1 hour)
  const { data: signedUrl, error: signErr } = await admin.storage
    .from('bp-files')
    .createSignedUrl(startup.bp_storage_path, 3600)

  if (signErr || !signedUrl) {
    return NextResponse.json({ error: '無法產生下載連結' }, { status: 500 })
  }

  return NextResponse.json({
    url: signedUrl.signedUrl,
    filename: startup.bp_storage_path.split('/').pop(),
    startup_name: startup.name_zh,
    expires_in: 3600,
  })
}
