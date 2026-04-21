'use client';

import { useHabits } from '@/hooks/useHabits';
import { StatsGrid } from '@/components/StatsGrid';
import { getLast7Days, calculateStreak } from '@/lib/utils';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

function calculateStats(habits: any[], getStreak: (h: any) => number) {
  if (habits.length === 0) {
    return {
      mostConsistent: null,
      currentStreak: 0,
      weeklyCompletionRate: 0,
      bestDay: { day: '-', rate: 0 },
      worstDay: { day: '-', rate: 0 },
      weeklyData: [],
    };
  }

  const last7Days = getLast7Days();
  const weeklyData = last7Days.map((day) => {
    const date = new Date(day + 'T00:00:00');
    const label = date.toLocaleDateString('en-US', { weekday: 'short' });
    const completed = habits.filter((h) => h.completedDates.includes(day)).length;
    const rate = Math.round((completed / habits.length) * 100);
    return { day, label, completed, total: habits.length, rate };
  });

  const totalRate = weeklyData.reduce((sum, d) => sum + d.rate, 0);
  const weeklyCompletionRate = Math.round(totalRate / 7);

  const best = weeklyData.reduce((best, d) => (d.rate > best.rate ? d : best), weeklyData[0]);
  const worst = weeklyData.reduce((worst, d) => (d.rate < worst.rate ? d : worst), weeklyData[0]);

  const habitStreaks = habits.map((h) => ({
    habit: h,
    streak: getStreak(h),
  }));
  const mostConsistent = habitStreaks.reduce((max, h) =>
    h.streak > max.streak ? h : max,
    habitStreaks[0]
  );

  return {
    mostConsistent: mostConsistent.habit,
    currentStreak: mostConsistent.streak,
    weeklyCompletionRate,
    bestDay: { day: best.label, rate: best.rate },
    worstDay: { day: worst.label, rate: worst.rate },
    weeklyData,
  };
}

export default function StatsPage() {
  const { habits, isLoaded, getHabitStreak } = useHabits();

  if (!isLoaded) {
    return null;
  }

  const stats = calculateStats(habits, getHabitStreak);

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-400" />
            Statistics
          </h1>
        </header>

        <StatsGrid stats={stats} />

        {stats.weeklyData.length > 0 && (
          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Weekly Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.weeklyData}>
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                    itemStyle={{ color: '#94a3b8' }}
                    formatter={(value) => [`${value}%`, 'Completion']}
                  />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {stats.weeklyData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          entry.rate === stats.bestDay.rate
                            ? '#22c55e'
                            : entry.rate === stats.worstDay.rate && stats.bestDay.rate !== stats.worstDay.rate
                            ? '#ef4444'
                            : '#6366f1'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}