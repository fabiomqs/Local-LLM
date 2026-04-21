'use client';

import { useState } from 'react';
import { completeHabit, removeHabit } from '../utils/storage';
import { Habit } from '../types/habit';

interface HabitItemProps {
  habit: Habit;
  onHabitUpdate: () => void;
}

export default function HabitItem({ habit, onHabitUpdate }: HabitItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleCompletion = () => {
    const today = new Date();
    completeHabit(habit.id, today);
    onHabitUpdate();
  };

  const deleteHabit = () => {
    if (window.confirm('Tem certeza que deseja remover este hábito?')) {
      removeHabit(habit.id);
      onHabitUpdate();
    }
  };

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(todayString);

  return (
    <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isCompletedToday}
            onChange={toggleCompletion}
            className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <div>
            <h3 className="text-lg font-medium text-white">{habit.name}</h3>
            {habit.description && (
              <p className="text-gray-400 text-sm mt-1">{habit.description}</p>
            )}
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">🔥</span>
                <span className="text-gray-300 text-sm">Sequência: {habit.streak}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-400 mr-1">🏆</span>
                <span className="text-gray-300 text-sm">Máxima: {habit.longestStreak}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={deleteHabit}
          className="text-gray-400 hover:text-red-500 transition duration-200"
          aria-label="Remover hábito"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}