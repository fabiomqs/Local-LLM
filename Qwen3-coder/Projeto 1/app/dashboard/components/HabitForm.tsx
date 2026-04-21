'use client';

import { useState } from 'react';
import { addHabit } from '../utils/storage';
import { Habit } from '../types/habit';

interface HabitFormProps {
  onAddHabit: () => void;
}

export default function HabitForm({ onAddHabit }: HabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      description: description.trim(),
      frequency,
      createdAt: new Date().toISOString(),
      completedDates: [],
      streak: 0,
      longestStreak: 0,
      goal: 0,
      unit: '',
      color,
      category: 'General',
      isArchived: false,
      isDeleted: false
    };
    
    if (addHabit(newHabit)) {
      setName('');
      setDescription('');
      setFrequency('daily');
      onAddHabit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-white">Adicionar Novo Hábito</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome do Hábito</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Ficar hidratado"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Frequência</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as any)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Diário</option>
            <option value="weekly">Semanal</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descrição do hábito (opcional)"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Cor</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
      >
        Adicionar Hábito
      </button>
    </form>
  );
}