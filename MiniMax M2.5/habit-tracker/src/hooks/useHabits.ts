"use client";

import { useState, useEffect, useCallback } from "react";
import { Habit } from "@/types/habit";

const STORAGE_KEY = "habit-tracker-data";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setHabits(data.habits || []);
      } catch {
        setHabits([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          habits,
          lastUpdated: new Date().toISOString(),
        })
      );
    }
  }, [habits, isLoaded]);

  const addHabit = useCallback((name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  }, []);

  const removeHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const toggleCompletion = useCallback((habitId: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const isCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date],
        };
      })
    );
  }, []);

  const calculateStreak = useCallback((habit: Habit): number => {
    if (habit.completedDates.length === 0) return 0;

    const sortedDates = [...habit.completedDates].sort().reverse();
    const today = getTodayDate();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (!sortedDates.includes(today) && !sortedDates.includes(yesterday)) {
      return 0;
    }

    let streak = 0;
    let currentDate = sortedDates.includes(today) ? today : yesterday;

    for (let i = 0; i < 365; i++) {
      if (sortedDates.includes(currentDate)) {
        streak++;
        const prevDate = new Date(new Date(currentDate).getTime() - 86400000);
        currentDate = prevDate.toISOString().split("T")[0];
      } else {
        break;
      }
    }

    return streak;
  }, []);

  const getWeeklyProgress = useCallback(() => {
    const days: { date: string; label: string; count: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const dateStr = date.toISOString().split("T")[0];
      const dayLabel = date.toLocaleDateString("pt-BR", { weekday: "short" });

      const count = habits.filter((h) => h.completedDates.includes(dateStr)).length;
      days.push({ date: dateStr, label: dayLabel, count });
    }

    return days;
  }, [habits]);

  return {
    habits,
    isLoaded,
    addHabit,
    removeHabit,
    toggleCompletion,
    calculateStreak,
    getWeeklyProgress,
  };
}