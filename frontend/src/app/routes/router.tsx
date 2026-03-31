import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../layout/AppShell'
import { AlertsPage, DashboardPage, HeatmapPage, LoginPage, SettingsPage, TrendsPage } from '../../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'heatmap', element: <HeatmapPage /> },
      { path: 'trends', element: <TrendsPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
])
