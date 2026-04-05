// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/angel/portfolio
 *
 * F-016: Returns the authenticated angel member's investment portfolio.
 * Reads from v_my_portfolio view (investments JOIN startups).
 */
export async function GET(_req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Resolve angel_member_id from auth user
    const { data: member } = await supabase
      .from('angel_members')
      .select('id, display_name')
      .eq('auth_user_id', user.id)
      .single()

    if (!member) return NextResponse.json({ error: 'Angel member not found' }, { status: 404 })

    // Fetch portfolio from view
    const { data: portfolio, error } = await supabase
      .from('v_my_portfolio')
      .select('*')
      .eq('angel_member_id', member.id)
      .order('investment_date', { ascending: false })

    if (error) {
      console.error('Portfolio fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
    }

    // Aggregate summary
    const items = portfolio || []
    const summary = {
      total_investments: items.length,
      active_count: items.filter(i => i.status === 'active').length,
      exited_count: items.filter(i => i.status === 'exited').length,
      total_deployed_twd: items
        .filter(i => i.status !== 'written_off')
        .reduce((sum, i) => sum + (i.amount_twd || 0), 0),
      total_exit_twd: items
        .filter(i => i.status === 'exited')
        .reduce((sum, i) => sum + (i.exit_amount_twd || 0), 0),
    }

    return NextResponse.json({ summary, portfolio: items })
  } catch (e) {
    console.error('Portfolio API error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
