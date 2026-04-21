'use client';

import { Trash2, Flame } from 'lucide-react';
import { Habit } from '@/types/habit';
import { getToday } from '@/lib/utils';

interface HabitItemProps {
  habit: Habit;
  streak: number;
  isCompletedToday: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

export function HabitItem({
  habit,
  streak,
  isCompletedToday,
  onToggle,
  onRemove,
}: HabitItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          isCompletedToday
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-slate-600 hover:border-indigo-500'
        }`}
      >
        {isCompletedToday && (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-lg ${isCompletedToday ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
        {habit.name}
      </span>

      <div className="flex items-center gap-1 text-orange-400">
        <Flame className="w-4 h-4" />
        <span className="text-sm font-medium">{streak}</span>
      </div>

      <button
        onClick={onRemove}
        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
