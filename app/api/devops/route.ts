import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'
import { runHealthChecks } from '@/lib/devops/checks/health/check'

// ✅ GET = health check
export async function GET() {
  return Response.json({ status: "ok" })
}

// ✅ POST = logs / agent
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { data, error } = await supabaseAdmin.from('devops_runs').insert([
      {
        project_key: 'aps-ssiap',
        environment: 'dev',
        mode: 'manual',
        status: 'success',
        summary: 'Agent run',
        payload: body
      }
    ])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}