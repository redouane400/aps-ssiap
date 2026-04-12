export async function runHealthChecks(baseUrl: string) {
  const endpoints = [
    "/api/devops",
    "/"
  ]

  const results = []

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`)

      results.push({
        endpoint,
        status: res.ok ? "ready" : "blocked",
        responseCode: res.status,
        message: res.ok ? "OK" : "Erreur API"
      })
    } catch {
      results.push({
        endpoint,
        status: "blocked",
        message: "Erreur réseau"
      })
    }
  }

  return results
}