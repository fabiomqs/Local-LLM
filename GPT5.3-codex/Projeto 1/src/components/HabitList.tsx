import type { Habit } from "../types";
import { HabitItem } from "./HabitItem";

interface HabitListProps {
  habits: Habit[];
  onToggleToday: (habitId: string) => void;
  onRemoveHabit: (habitId: string) => void;
}

export function HabitList({
  habits,
  onToggleToday,
  onRemoveHabit
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <section className="card">
        <h2>Today&apos;s Habits</h2>
        <p className="empty-state">No habits yet. Add one to start your streak.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Today&apos;s Habits</h2>
      <ul className="habit-list">
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onToggleToday={onToggleToday}
            onRemoveHabit={onRemoveHabit}
          />
        ))}
      </ul>
    </section>
  );
}
