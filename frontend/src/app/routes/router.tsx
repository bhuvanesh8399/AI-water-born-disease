import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../layout/AppShell'
import { AlertsPage, DashboardPage, HeatmapPage, LoginPage, SettingsPage, TrendsPage } from '../../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'heatmap', element: <HeatmapPage /> },
      { path: 'trends', element: <TrendsPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
