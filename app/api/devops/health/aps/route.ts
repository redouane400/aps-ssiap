import { NextResponse } from 'next/server'
import { runHealthChecks } from '@/lib/devops/checks/health/check'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

  const results = await runHealthChecks(baseUrl)

  const { error } = await supabaseAdmin.from('devops_health_checks').insert(
    results.map(r => ({
      project_key: 'aps-ssiap',
      environment: 'dev',
      endpoint: r.endpoint,
      response_code: r.responseCode ?? null,
      status: r.status,
      message: r.message
    }))
  )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ results })
}