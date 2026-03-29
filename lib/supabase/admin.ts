import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Service role client — bypasses RLS.
// Use ONLY for:
//   1. Invitation redemption (new users have no role yet)
//   2. System-level operations (cron jobs, webhooks, bulk notifications)
//   3. Admin summary views that aggregate across all users
// Never expose to the browser.
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
