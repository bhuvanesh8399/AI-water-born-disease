import { useEffect, useState } from 'react'
import type { DashboardResponse } from '../../types/api'
import { dashboardApi } from './api'

export function useDashboardSummary() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void dashboardApi
      .getSummary()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
