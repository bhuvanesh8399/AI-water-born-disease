import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/heatmap', label: 'Heatmap' },
  { to: '/trends', label: 'Trends' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/settings', label: 'Settings' },
  { to: '/login', label: 'Login' },
]

export function AppShell() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <strong>AI EWS</strong>
          <span>CSV-backed district risk demo</span>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
