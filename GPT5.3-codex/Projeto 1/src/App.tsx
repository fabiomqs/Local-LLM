import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import { DashboardPage } from "./pages/DashboardPage";
import { StatsPage } from "./pages/StatsPage";
import type { Habit } from "./types";
import { todayLocalDate } from "./utils/date-utils";
import { loadHabits, saveHabits } from "./utils/storage";

function createHabitId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function sortHabitsByCreationDate(habits: Habit[]): Habit[] {
  return [...habits].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(() => sortHabitsByCreationDate(loadHabits()));

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const doneTodayCount = useMemo(() => {
    const today = todayLocalDate();
    return habits.reduce(
      (count, habit) => (habit.completedDates.includes(today) ? count + 1 : count),
      0
    );
  }, [habits]);

  const addHabit = (name: string) => {
    const nextHabit: Habit = {
      id: createHabitId(),
      name,
      createdAt: new Date().toISOString(),
      completedDates: []
    };
    setHabits((current) => sortHabitsByCreationDate([...current, nextHabit]));
  };

  const removeHabit = (habitId: string) => {
    setHabits((current) => current.filter((habit) => habit.id !== habitId));
  };

  const toggleHabitToday = (habitId: string) => {
    const today = todayLocalDate();
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }

        const doneToday = habit.completedDates.includes(today);
        if (doneToday) {
          return {
            ...habit,
            completedDates: habit.completedDates.filter((date) => date !== today)
          };
        }

        return {
          ...habit,
          completedDates: [...habit.completedDates, today]
        };
      })
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <DashboardPage
              habits={habits}
              doneTodayCount={doneTodayCount}
              onAddHabit={addHabit}
              onToggleToday={toggleHabitToday}
              onRemoveHabit={removeHabit}
            />
          }
        />
        <Route path="stats" element={<StatsPage habits={habits} />} />
      </Route>
    </Routes>
  );
}
