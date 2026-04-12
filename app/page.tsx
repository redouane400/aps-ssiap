'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('profiles').select('*')
      setData(data)
      setError(error)
    }

    fetchData()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Connexion Supabase OK ✅</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {error && <p>Erreur: {error.message}</p>}
    </div>
  )
}