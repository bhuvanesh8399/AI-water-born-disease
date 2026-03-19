import { useEffect, useState } from 'react'
import type { TrendsResponse } from '../../types/api'
import { trendsApi } from './api'

export function useTrends(district: string, days: number) {
  const [data, setData] = useState<TrendsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    void trendsApi
      .get(district, days)
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [district, days])

  return { data, loading, error }
}
