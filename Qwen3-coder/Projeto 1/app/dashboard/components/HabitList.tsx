'use client';

import { useState, useEffect } from 'react';
import { loadHabits, completeHabit } from '../utils/storage';
import HabitItem from './HabitItem';
import { Habit } from '../types/habit';

interface HabitListProps {
  onHabitUpdate: () => void;
}

export default function HabitList({ onHabitUpdate }: HabitListProps) {
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
    onHabitUpdate();
  };

  if (loading) {
    return <div className="p-4 text-white">Carregando hábitos...</div>;
  }

  if (habits.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        Nenhum hábito cadastrado. Adicione seu primeiro hábito!
      </div>
    );
  }

  return (
    <div>
      {habits.map((habit) => (
        <HabitItem 
          key={habit.id} 
          habit={habit} 
          onHabitUpdate={handleHabitUpdate} 
        />
      ))}
    </div>
  );
}