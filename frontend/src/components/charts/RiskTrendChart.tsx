import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { TrendPoint } from '../../types/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

interface RiskTrendChartProps {
  points: TrendPoint[]
}

export function RiskTrendChart({ points }: RiskTrendChartProps) {
  const data = {
    labels: points.map((point) => point.date),
    datasets: [
      {
        label: 'Risk score',
        data: points.map((point) => point.risk_score),
        borderColor: '#6fa7ff',
        backgroundColor: 'rgba(111, 167, 255, 0.2)',
        tension: 0.35,
      },
    ],
  }

  return <Line data={data} />
}
