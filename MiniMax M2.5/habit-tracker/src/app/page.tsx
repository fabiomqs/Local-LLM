"use client";

import { useHabits } from "@/hooks/useHabits";
import { HabitItem } from "@/components/HabitItem";
import { AddHabitForm } from "@/components/AddHabitForm";
import { WeeklyChart } from "@/components/WeeklyChart";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export default function Home() {
  const {
    habits,
    isLoaded,
    addHabit,
    removeHabit,
    toggleCompletion,
    calculateStreak,
    getWeeklyProgress,
  } = useHabits();

  const today = getTodayDate();
  const weeklyData = getWeeklyProgress();
  const todayCompleted = habits.filter((h) => h.completedDates.includes(today)).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-[#9E9E9E]">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8 flex items-start justify-center pt-28">
      <div className="max-w-2xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#E0E0E0] mb-2">Habit Tracker (MiniMax M2.5)</h1>
          <p className="text-[#9E9E9E]">
            {todayCompleted} de {habits.length} hábitos concluídos hoje
          </p>
        </header>

        <AddHabitForm onAdd={addHabit} />

        <div className="space-y-3 mb-8">
          {habits.length === 0 ? (
            <div className="text-center py-12 text-[#6B7280]">
              Nenhum hábito ainda. Adicione seu primeiro hábito acima!
            </div>
          ) : (
            habits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                isCompletedToday={habit.completedDates.includes(today)}
                streak={calculateStreak(habit)}
                onToggle={() => toggleCompletion(habit.id, today)}
                onRemove={() => removeHabit(habit.id)}
              />
            ))
          )}
        </div>

        {habits.length > 0 && (
          <WeeklyChart data={weeklyData} totalHabits={habits.length} />
        )}
      </div>
    </div>
  );
}