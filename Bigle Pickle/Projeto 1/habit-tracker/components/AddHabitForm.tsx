'use client';

import { useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface AddHabitFormProps {
  onAdd: (name: string) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a new habit..."
          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="px-4 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
