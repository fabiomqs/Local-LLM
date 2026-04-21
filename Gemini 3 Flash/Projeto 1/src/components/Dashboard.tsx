"use client";

import { useState } from 'react';
import { Plus, Flame, CheckCircle2, Trash2, Calendar } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import HabitCard from './HabitCard';
import ProgressChart from './ProgressChart';
import HabitForm from './HabitForm';

export default function Dashboard() {
  const { 
    habits, 
    isInitialized, 
    addHabit, 
    removeHabit, 
    toggleHabit, 
    calculateStreak,
    weeklyProgress 
  } = useHabits();

  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Habit Dashboard (Gemini 3)</h1>
          <p className="text-zinc-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Novo Hábito
        </button>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-6 rounded-2xl">
          <p className="text-zinc-400 text-sm font-medium mb-1">Hábitos Ativos</p>
          <p className="text-3xl font-bold">{totalHabits}</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-zinc-400 text-sm font-medium mb-1">Concluídos Hoje</p>
          <p className="text-3xl font-bold text-accent">{completedToday}</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-zinc-400 text-sm font-medium mb-1">Taxa de Sucesso</p>
          <p className="text-3xl font-bold">{completionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-6">Seus Hábitos</h2>
          {habits.length === 0 ? (
            <div className="glass p-12 rounded-3xl text-center">
              <p className="text-zinc-500">Nenhum hábito cadastrado ainda.</p>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="mt-4 text-primary hover:underline"
              >
                Comece agora
              </button>
            </div>
          ) : (
            habits.map(habit => (
              <HabitCard 
                key={habit.id}
                habit={habit}
                streak={calculateStreak(habit)}
                isCompleted={habit.completedDates.includes(today)}
                onToggle={() => toggleHabit(habit.id, today)}
                onDelete={() => removeHabit(habit.id)}
              />
            ))
          )}
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-6">Progresso Semanal</h2>
            <div className="glass p-6 rounded-3xl">
              <ProgressChart data={weeklyProgress} />
            </div>
          </div>
          
          <div className="glass p-6 rounded-3xl">
            <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Dica do Dia</h3>
            <p className="text-zinc-300 leading-relaxed italic">
              "Pequenas vitórias diárias levam a grandes conquistas a longo prazo."
            </p>
          </div>
        </div>
      </div>

      <HabitForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onAdd={addHabit} 
      />
    </div>
  );
}
