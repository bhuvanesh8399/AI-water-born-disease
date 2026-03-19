import { useState } from 'react'
import type { SettingsResponse } from '../../types/api'
import { Button } from '../ui/Button'

interface ConfigFormProps {
  initialValues: SettingsResponse['values']
  onSave: (values: Record<string, string>) => Promise<void>
}

export function ConfigForm({ initialValues, onSave }: ConfigFormProps) {
  const [values, setValues] = useState(initialValues)

  return (
    <div className="glass-card">
      <div className="section-title">Configuration</div>
      <div className="form-grid">
        {Object.entries(values).map(([key, value]) => (
          <label key={key}>
            <div className="muted">{key}</div>
            <input
              className="input"
              value={value}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  [key]: event.target.value,
                }))
              }
            />
          </label>
        ))}
        <Button variant="primary" onClick={() => void onSave(values)}>
          Save settings
        </Button>
      </div>
    </div>
  )
}
