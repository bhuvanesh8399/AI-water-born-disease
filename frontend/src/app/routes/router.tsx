<<<<<<< HEAD
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppShell } from "../layout/AppShell";

import { DashboardPage } from "../../pages/Dashboard/DashboardPage";
import { HeatmapPage } from "../../pages/Heatmap/HeatmapPage";
import { TrendsPage } from "../../pages/Trends/TrendsPage";
import { AlertsPage } from "../../pages/Alerts/AlertsPage";
import { SettingsPage } from "../../pages/Settings/SettingsPage";

// NEW premium pages (we’ll add below)
import { ReportsPage } from "../../pages/Reports/ReportsPage";
import { DataIngestPage } from "../../pages/DataIngest/DataIngestPage";
import { HelpPage } from "../../pages/Help/HelpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppShell>
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "heatmap", element: <HeatmapPage /> },
      { path: "trends", element: <TrendsPage /> },
      { path: "alerts", element: <AlertsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "data", element: <DataIngestPage /> },
      { path: "help", element: <HelpPage /> },
      { path: "settings", element: <SettingsPage /> },
=======
import { createBrowserRouter } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Dashboard from "../../pages/Dashboard";
import Heatmap from "../../pages/Heatmap";
import Trends from "../../pages/Trends";
import Alerts from "../../pages/Alerts";
import Settings from "../../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "heatmap", element: <Heatmap /> },
      { path: "trends", element: <Trends /> },
      { path: "alerts", element: <Alerts /> },
      { path: "settings", element: <Settings /> },
>>>>>>> 32c72f5 (fetch: update)
    ],
  },
]);

export default router;
