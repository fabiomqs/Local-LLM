'use client';

import { Habit } from '@/types/habit';
import { HabitItem } from './HabitItem';

interface HabitListProps {
  habits: Habit[];
  getStreak: (habit: Habit) => number;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function HabitList({ habits, getStreak, onToggle, onRemove }: HabitListProps) {
  const today = new Date().toISOString().split('T')[0];

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No habits yet. Add your first habit above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          streak={getStreak(habit)}
          isCompletedToday={habit.completedDates.includes(today)}
          onToggle={() => onToggle(habit.id)}
          onRemove={() => onRemove(habit.id)}
        />
      ))}
    </div>
  );
}