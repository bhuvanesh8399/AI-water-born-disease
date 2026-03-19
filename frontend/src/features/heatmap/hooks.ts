import { useEffect, useState } from 'react'
import type { HeatmapResponse } from '../../types/api'
import { heatmapApi } from './api'

export function useHeatmap() {
  const [data, setData] = useState<HeatmapResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void heatmapApi
      .get()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
