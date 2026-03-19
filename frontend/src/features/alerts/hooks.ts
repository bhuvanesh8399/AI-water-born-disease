import { useEffect, useState } from 'react'
import type { AlertItem } from '../../types/api'
import { alertsApi } from './api'

export function useAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void alertsApi
      .list()
      .then((response) => setAlerts(response.items))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function updateStatus(id: number, status: string) {
    const updated = await alertsApi.update(id, status)
    setAlerts((current) => current.map((item) => (item.id === id ? { ...item, ...updated } : item)))
  }

  return { alerts, loading, error, updateStatus }
}
