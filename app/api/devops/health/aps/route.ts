export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { runHealthChecks } from '@/lib/devops/checks/health/check'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''

    const results = await runHealthChecks(baseUrl)

    const { error } = await supabaseAdmin
      .from('devops_health_checks')
      .insert(
        results.map((r) => ({
          project_key: 'aps-ssiap',
          environment: 'dev',
          endpoint: r.endpoint,
          response_code: r.responseCode ?? null,
          status: r.status,
          message: r.message
        }))
      )

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ results })
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}