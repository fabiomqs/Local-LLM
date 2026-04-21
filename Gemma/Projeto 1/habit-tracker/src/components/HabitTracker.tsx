'use client';

import React, { useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Plus, Trash2, CheckCircle2, Circle, Flame, TrendingUp, Calendar } from 'lucide-react';
import {
  format,
  isSameDay,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { ptBR as ptBRLocale } from 'date-fns/locale';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function HabitTracker() {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);
  const [newHabitName, setNewHabitName] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newHabitName.trim();
    if (!name) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };

    setHabits((prev) => [...prev, newHabit]);
    setNewHabitName('');
  };

  const removeHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const toggleHabit = (id: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const isCompleted = h.completedDates.includes(dateStr);
          return {
            ...h,
            completedDates: isCompleted
              ? h.completedDates.filter((d) => d !== dateStr)
              : [...h.completedDates, dateStr],
          };
        }
        return h;
      })
    );
  };

  const calculateStreak = (completedDates: string[]) => {
    if (completedDates.length === 0) return 0;

    const sorted = [...completedDates]
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    const today = new Date();
    const yesterday = subDays(today, 1);

    const latest = sorted[0];
    if (!isSameDay(latest, today) && !isSameDay(latest, yesterday)) {
      return 0;
    }

    let streak = 0;
    let currentCheck = latest;

    for (let i = 0; i < sorted.length; i++) {
      if (isSameDay(sorted[i], currentCheck)) {
        streak++;
        currentCheck = subDays(currentCheck, 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getWeeklyStats = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    return days.map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const completions = habits.filter((h) => h.completedDates.includes(dayStr)).length;
      const totalHabits = habits.length;
      const percentage = totalHabits > 0 ? (completions / totalHabits) * 100 : 0;

      return {
        day: format(day, 'EEE', { locale: ptBRLocale }),
        percentage: parseFloat(percentage.toFixed(0)),
      };
    });
  };

  if (!isMounted) return null;

  const weeklyData = getWeeklyStats();
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="space-y-8 text-slate-100">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Meus Hábitos</h1>
          <p className="text-slate-400">
            {format(new Date(), 'EEEE, dd \"de\" MMMM', { locale: ptBRLocale })}
          </p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <Calendar className="text-blue-400" size={24} />
        </div>
      </header>

      <section className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-400" />
          Progresso Semanal
        </h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                cursor={{ fill: '#1e293b' }}
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.percentage === 100 ? '#60a5fa' : '#334155'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-4">
        <form onSubmit={addHabit} className="flex gap-2">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Novo hábito..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-2xl transition-colors shadow-lg shadow-blue-600/20"
          >
            <Plus size={24} />
          </button>
        </form>

        <div className="space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
              Nenhum hábito cadastrado. Comece agora!
            </div>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="group bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleHabit(habit.id, new Date())}
                    className="transition-transform active:scale-90"
                  >
                    {habit.completedDates.includes(todayStr) ? (
                      <CheckCircle2 className="text-blue-550" size={28} />
                    ) : (
                      <Circle className="text-slate-600" size={28} />
                    )}
                  </button>
                  <div className="space-y-1">
                    <h3 className={`font-medium ${habit.completedDates.includes(todayStr) ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {habit.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-orange-500">
                      <Flame size={14} />
                      <span className="font-bold">{calculateStreak(habit.completedDates)} dias</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeHabit(habit.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
