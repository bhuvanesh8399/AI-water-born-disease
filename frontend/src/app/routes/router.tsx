import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../layout/AppShell";
import { DashboardPage } from "../../pages/Dashboard/DashboardPage";
import { HeatmapPage } from "../../pages/Heatmap/HeatmapPage";
import { TrendsPage } from "../../pages/Trends/TrendsPage";
import { AlertsPage } from "../../pages/Alerts/AlertsPage";
import { SettingsPage } from "../../pages/Settings/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppShell>
        <DashboardPage />
      </AppShell>
    ),
  },
  {
    path: "/heatmap",
    element: (
      <AppShell>
        <HeatmapPage />
      </AppShell>
    ),
  },
  {
    path: "/trends",
    element: (
      <AppShell>
        <TrendsPage />
      </AppShell>
    ),
  },
  {
    path: "/alerts",
    element: (
      <AppShell>
        <AlertsPage />
      </AppShell>
    ),
  },
  {
    path: "/settings",
    element: (
      <AppShell>
        <SettingsPage />
      </AppShell>
    ),
  },
]);
