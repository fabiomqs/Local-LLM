"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Habit, WeeklyProgress } from '@/types/habit';

const STORAGE_KEY = 'habit_tracker_data';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load habits from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHabits(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse habits', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save habits to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, isInitialized]);

  const addHabit = (name: string, color: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: Date.now(),
      completedDates: [],
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const removeHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const toggleHabit = (id: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter(d => d !== date)
            : [...habit.completedDates, date],
        };
      }
      return habit;
    }));
  };

  const calculateStreak = useCallback((habit: Habit) => {
    if (habit.completedDates.length === 0) return 0;
    
    const dates = [...habit.completedDates].sort((a, b) => b.localeCompare(a));
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    let streak = 0;
    let currentDate = dates.includes(today) ? today : yesterday;
    
    if (!dates.includes(today) && !dates.includes(yesterday)) return 0;

    while (dates.includes(currentDate)) {
      streak++;
      const nextDateObj = new Date(currentDate);
      nextDateObj.setDate(nextDateObj.getDate() - 1);
      currentDate = nextDateObj.toISOString().split('T')[0];
    }
    
    return streak;
  }, []);

  const weeklyProgress = useMemo(() => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      
      const completedCount = habits.filter(h => h.completedDates.includes(dateStr)).length;
      const totalHabits = habits.length;
      
      days.push({
        day: dayName,
        count: completedCount,
        percentage: totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0
      });
    }
    return days;
  }, [habits]);

  const stats = useMemo(() => {
    if (habits.length === 0) return null;

    // 1. Most consistent habit (Total completions)
    const mostConsistent = [...habits].sort((a, b) => b.completedDates.length - a.completedDates.length)[0];

    // 2. Day of week analysis
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayStats = dayNames.map(name => ({ name, count: 0 }));

    habits.forEach(habit => {
      habit.completedDates.forEach(dateStr => {
        const date = new Date(dateStr + 'T12:00:00'); // Use noon to avoid TZ issues
        const dayIdx = date.getDay();
        dayStats[dayIdx].count++;
      });
    });

    const sortedDays = [...dayStats].sort((a, b) => b.count - a.count);
    const bestDay = sortedDays[0];
    const worstDay = sortedDays[sortedDays.length - 1];

    // 3. Weekly Trends (Last 4 weeks)
    const weeklyTrends = [];
    for (let i = 3; i >= 0; i--) {
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate() - (i * 7));
      const startOfWeek = new Date(endOfWeek);
      startOfWeek.setDate(startOfWeek.getDate() - 6);
      
      let weekCompletions = 0;
      habits.forEach(h => {
        h.completedDates.forEach(d => {
          const date = new Date(d);
          if (date >= startOfWeek && date <= endOfWeek) weekCompletions++;
        });
      });
      
      weeklyTrends.push({
        week: i === 0 ? 'Esta Semana' : `${i} sem. atrás`,
        count: weekCompletions,
        rate: habits.length > 0 ? Math.round((weekCompletions / (habits.length * 7)) * 100) : 0
      });
    }

    return {
      mostConsistent,
      bestDay,
      worstDay,
      dayStats,
      weeklyTrends
    };
  }, [habits]);

  return {
    habits,
    isInitialized,
    addHabit,
    removeHabit,
    toggleHabit,
    calculateStreak,
    weeklyProgress,
    stats
  };
}
