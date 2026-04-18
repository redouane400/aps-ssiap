import { createClient } from '@supabase/supabase-js'

export const getSupabaseAdmin = () => {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  // ❗ important : ne jamais créer le client si env absent
  if (!url || !key) return null

  return createClient(url, key)
}