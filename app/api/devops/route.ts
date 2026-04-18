export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// ✅ GET
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}

// ✅ POST
export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      )
    }

    const body = await req.json()

    const { data, error } = await supabaseAdmin
      .from('devops_runs')
      .insert([
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
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}