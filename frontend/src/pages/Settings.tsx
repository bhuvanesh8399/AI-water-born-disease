import { ConfigForm } from '../components/settings/ConfigForm'
import { useSettings } from '../features/settings/hooks'

export function SettingsPage() {
  const { data, loading, error, save } = useSettings()

  if (loading) return <div className="glass-card">Loading settings…</div>
  if (error || !data) return <div className="glass-card">{error ?? 'No settings found'}</div>

  return (
    <div className="page-grid">
      <ConfigForm initialValues={data.values} onSave={save} />
    </div>
  )
}
