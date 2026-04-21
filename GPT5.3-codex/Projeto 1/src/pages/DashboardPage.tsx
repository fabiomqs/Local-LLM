import { HabitForm } from "../components/HabitForm";
import { HabitList } from "../components/HabitList";
import { WeeklyProgressChart } from "../components/WeeklyProgressChart";
import type { Habit } from "../types";

interface DashboardPageProps {
  habits: Habit[];
  doneTodayCount: number;
  onAddHabit: (name: string) => void;
  onToggleToday: (habitId: string) => void;
  onRemoveHabit: (habitId: string) => void;
}

export function DashboardPage({
  habits,
  doneTodayCount,
  onAddHabit,
  onToggleToday,
  onRemoveHabit
}: DashboardPageProps) {
  return (
    <main className="page">
      <section className="hero">
        <h1>Habit Dashboard</h1>
        <p className="subtitle">Track your consistency one day at a time.</p>
        <div className="today-chip">
          Today: {doneTodayCount}/{habits.length || 0} completed
        </div>
        <HabitForm onAddHabit={onAddHabit} />
      </section>
      <section className="grid">
        <HabitList habits={habits} onToggleToday={onToggleToday} onRemoveHabit={onRemoveHabit} />
        <WeeklyProgressChart habits={habits} />
      </section>
    </main>
  );
}
