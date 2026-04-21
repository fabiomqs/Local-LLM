'use client';

import { useHabits } from '@/hooks/useHabits';
import { Header } from '@/components/Header';
import { AddHabitForm } from '@/components/AddHabitForm';
import { HabitList } from '@/components/HabitList';
import { WeeklyChart } from '@/components/WeeklyChart';

export default function Home() {
  const {
    habits,
    isLoaded,
    addHabit,
    removeHabit,
    toggleHabit,
    getHabitStreak,
    getWeeklyProgress,
  } = useHabits();

  if (!isLoaded) {
    return null;
  }

  const weeklyProgress = getWeeklyProgress();

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Header totalHabits={habits.length} />

        <AddHabitForm onAdd={addHabit} />

        <HabitList
          habits={habits}
          getStreak={getHabitStreak}
          onToggle={toggleHabit}
          onRemove={removeHabit}
        />

        {habits.length > 0 && (
          <div className="mt-8">
            <WeeklyChart labels={weeklyProgress.labels} data={weeklyProgress.data} />
          </div>
        )}
      </main>
    </div>
  );
}