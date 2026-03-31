import { useState } from 'react'
import { login } from '../services/dataSource'

export function LoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Admin@123')
  const [message, setMessage] = useState<string>('Demo mode is read-only. Browse the app without authentication.')

  async function handleLogin() {
    try {
      const response = await login(email, password)
      setMessage(`Token issued for ${response.email}. Write endpoints remain blocked in demo mode.`)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Login</h1>
        <p>This MVP runs in demo mode. Login exists for parity, but write operations remain disabled.</p>
      </div>
      <div className="card form-card">
        <label>
          <span className="muted">Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          <span className="muted">Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button onClick={() => void handleLogin()}>Request Demo Token</button>
        <p>{message}</p>
      </div>
    </div>
  )
}
