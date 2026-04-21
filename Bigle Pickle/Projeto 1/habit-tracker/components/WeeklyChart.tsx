'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface WeeklyChartProps {
  labels: string[];
  data: number[];
}

export function WeeklyChart({ labels, data }: WeeklyChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Completion %',
        data,
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.raw}% completed`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' },
      },
      y: {
        max: 100,
        grid: { color: '#334155' },
        ticks: {
          color: '#64748b',
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
      <h3 className="text-sm font-medium text-slate-400 mb-4">Weekly Progress</h3>
      <div className="h-40">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}