import { useEffect, useState } from 'react'
import { getSettings } from '../services/dataSource'
import type { SettingsState } from '../types/domain'

export function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    void getSettings()
      .then(setSettings)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error) {
    return <div>Failed to load settings: {error}</div>
  }

  if (!settings) {
    return <div>Loading settings...</div>
  }

  return (
    <div>
      <h1>Settings</h1>
      <p>Low threshold: {settings.risk_low_threshold}</p>
      <p>High threshold: {settings.risk_high_threshold}</p>
      <p>Alerting enabled: {settings.alerting_enabled ? 'Yes' : 'No'}</p>
      <p>Updated at: {new Date(settings.updated_at).toLocaleString()}</p>
    </div>
  )
}

export default SettingsPage
