import { Line } from "react-chartjs-2";
import type { TrendPoint } from "../../types/domain";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function RiskTrendChart({ data }: { data: TrendPoint[] }) {
  const labels = data.map((d) => d.week);
  const chartData = {
    labels,
    datasets: [
      { label: "Risk Score", data: data.map((d) => d.riskScore), tension: 0.35 },
      { label: "Cases", data: data.map((d) => d.cases), tension: 0.35 },
      { label: "Rainfall", data: data.map((d) => d.rainfall), tension: 0.35 },
      { label: "Complaints", data: data.map((d) => d.complaints), tension: 0.35 },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "rgba(255,255,255,.75)" } } },
    scales: {
      x: { ticks: { color: "rgba(255,255,255,.6)" }, grid: { color: "rgba(255,255,255,.06)" } },
      y: { ticks: { color: "rgba(255,255,255,.6)" }, grid: { color: "rgba(255,255,255,.06)" } },
    },
  } as const;

  return (
    <div className="h-[320px]">
      <Line data={chartData} options={options} />
    </div>
  );
}
