'use client';

import { useState, useEffect, useCallback } from 'react';
import { Habit } from '@/types/habit';
import { generateId, getToday, calculateStreak } from '@/lib/utils';

const STORAGE_KEY = 'habits-data';

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits }));
    }
  }, [habits, isLoaded]);

  const addHabit = useCallback((name: string) => {
    if (!name.trim()) return;
    const newHabit: Habit = {
      id: generateId(),
      name: name.trim(),
      createdAt: getToday(),
      completedDates: [],
    };
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const removeHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, []);

  const toggleHabit = useCallback((id: string) => {
    const today = getToday();
    setHabits(prev => prev.map(habit => {
      if (habit.id !== id) return habit;
      const isCompleted = habit.completedDates.includes(today);
      return {
        ...habit,
        completedDates: isCompleted
          ? habit.completedDates.filter(d => d !== today)
          : [...habit.completedDates, today]
      };
    }));
  }, []);

  const getHabitStreak = useCallback((habit: Habit): number => {
    return calculateStreak(habit.completedDates);
  }, []);

  const getWeeklyProgress = useCallback((): { labels: string[]; data: number[] } => {
    const last7Days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }

    const labels = last7Days.map(d => {
      const date = new Date(d + 'T00:00:00');
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const data = last7Days.map(day => {
      if (habits.length === 0) return 0;
      const completedCount = habits.filter(h => h.completedDates.includes(day)).length;
      return Math.round((completedCount / habits.length) * 100);
    });

    return { labels, data };
  }, [habits]);

  return {
    habits,
    isLoaded,
    addHabit,
    removeHabit,
    toggleHabit,
    getHabitStreak,
    getWeeklyProgress,
  };
}
