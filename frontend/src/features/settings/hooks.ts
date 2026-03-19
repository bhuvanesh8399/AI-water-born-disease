import { useEffect, useState } from 'react'
import type { SettingsResponse } from '../../types/api'
import { settingsApi } from './api'

export function useSettings() {
  const [data, setData] = useState<SettingsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void settingsApi
      .get()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function save(values: Record<string, string>) {
    const next = await settingsApi.save(values)
    setData(next)
  }

  return { data, loading, error, save }
}
