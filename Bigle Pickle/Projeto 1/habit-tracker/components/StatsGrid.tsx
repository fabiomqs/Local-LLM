'use client';

import { Trophy, TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { HabitStats } from '@/types/stats';

interface StatsGridProps {
  stats: HabitStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  if (!stats.mostConsistent) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No habits to analyze yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-sm text-slate-400">Most Consistent</span>
        </div>
        <p className="text-xl font-semibold text-slate-100">{stats.mostConsistent.name}</p>
        <p className="text-sm text-slate-500">{stats.currentStreak} day streak</p>
      </div>

      <div className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-sm text-slate-400">Weekly Completion</span>
        </div>
        <p className="text-xl font-semibold text-slate-100">{stats.weeklyCompletionRate}%</p>
        <p className="text-sm text-slate-500">Last 7 days average</p>
      </div>

      <div className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="text-sm text-slate-400">Best Day</span>
        </div>
        <p className="text-xl font-semibold text-slate-100">{stats.bestDay.day}</p>
        <p className="text-sm text-slate-500">{stats.bestDay.rate}% completion</p>
      </div>

      <div className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <TrendingDown className="w-5 h-5 text-red-400" />
          <span className="text-sm text-slate-400">Worst Day</span>
        </div>
        <p className="text-xl font-semibold text-slate-100">{stats.worstDay.day}</p>
        <p className="text-sm text-slate-500">{stats.worstDay.rate}% completion</p>
      </div>
    </div>
  );
}