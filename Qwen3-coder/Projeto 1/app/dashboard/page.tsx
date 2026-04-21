'use client';

import { useState, useEffect } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import WeeklyProgressChart from './components/WeeklyProgressChart';
import { loadHabits } from './utils/storage';
import { Habit } from './types/habit';

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = () => {
      const loadedHabits = loadHabits();
      setHabits(loadedHabits.filter(habit => !habit.isDeleted && !habit.isArchived));
      setLoading(false);
    };

    fetchHabits();
  }, []);

  const handleHabitUpdate = () => {
    const loadedHabits = loadHabits();
    setHabits(loadedHabits.filter(habit => !habit.isDeleted && !habit.isArchived));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Dashboard de Hábitos</h1>
          <p className="text-gray-400">Monitore seus hábitos e construa sequências</p>
        </header>

        <HabitForm onAddHabit={handleHabitUpdate} />

        <WeeklyProgressChart habits={habits} />

        <div>
          <h2 className="text-xl font-semibold mb-4">Seus Hábitos</h2>
          <HabitList onHabitUpdate={handleHabitUpdate} />
        </div>

        {habits.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Adicione seu primeiro hábito para começar!</p>
          </div>
        )}
      </div>
    </div>
  );
}