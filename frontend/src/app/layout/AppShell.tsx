import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/heatmap', label: 'Heatmap' },
  { to: '/trends', label: 'Trends' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/settings', label: 'Settings' },
]

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/dashboard" className="brand">
          <span className="brand-badge">EWS</span>
          <div>
            <strong>AI Early Warning</strong>
            <small>Decision-support dashboard</small>
          </div>
        </Link>

        <nav className="nav-list">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Operational Overview</h1>
            <p>Real-time district risk visibility, alerts, and trend analysis.</p>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
