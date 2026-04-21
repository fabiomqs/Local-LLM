'use client';

import { Flame } from 'lucide-react';

interface HeaderProps {
  totalHabits: number;
}

export function Header({ totalHabits }: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-500/20 rounded-xl">
          <Flame className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-100">Habit Tracker (Big Pickle)</h1>
      </div>
      <p className="text-slate-400">
        {totalHabits === 0
          ? 'Start building better habits today'
          : `${totalHabits} habit${totalHabits > 1 ? 's' : ''} to track`}
      </p>
    </header>
  );
}