import type { Habit } from "../types";
import { getHabitStreak, isHabitDoneToday } from "../utils/habit-metrics";
import { StreakBadge } from "./StreakBadge";

interface HabitItemProps {
  habit: Habit;
  onToggleToday: (habitId: string) => void;
  onRemoveHabit: (habitId: string) => void;
}

export function HabitItem({
  habit,
  onToggleToday,
  onRemoveHabit
}: HabitItemProps) {
  const doneToday = isHabitDoneToday(habit);
  const streak = getHabitStreak(habit);

  return (
    <li className="habit-item">
      <label className="habit-check">
        <input
          type="checkbox"
          checked={doneToday}
          onChange={() => onToggleToday(habit.id)}
        />
        <span className="habit-name">{habit.name}</span>
      </label>
      <div className="habit-actions">
        <StreakBadge streak={streak} />
        <button
          className="remove-btn"
          type="button"
          onClick={() => onRemoveHabit(habit.id)}
          aria-label={`Remove ${habit.name}`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
