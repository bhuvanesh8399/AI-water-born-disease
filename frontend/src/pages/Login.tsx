import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { STORAGE_KEYS } from '../lib/constants'
import { endpoints } from '../services/endpoints'
import { httpPost } from '../services/http'
import { Button } from '../components/ui/Button'

interface LoginResponse {
  access_token: string
  role: string
  full_name: string
  email: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Admin@123')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    try {
      const response = await httpPost<LoginResponse>(endpoints.authLogin, { email, password })
      localStorage.setItem(STORAGE_KEYS.token, response.access_token)
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response))
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: 420 }}>
        <div className="section-title">Sign in</div>
        <div className="form-grid">
          <label>
            <div className="muted">Email</div>
            <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            <div className="muted">Password</div>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <div>{error}</div> : null}
          <Button variant="primary" onClick={() => void handleLogin()}>
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
