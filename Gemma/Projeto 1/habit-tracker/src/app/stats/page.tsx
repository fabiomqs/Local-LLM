'use client';

import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Habit } from '@/types/habit';
import { 
  format, 
  parseISO, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay, 
  subWeeks,
  getDay,
  isBefore,
  startOfDay
} from 'date-fns';
import { ptBR as ptBRLocale } from 'date-fns/locale';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Trophy, 
  TrendingDown, 
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function StatsPage() {
  const [habits] = useLocalStorage<Habit[]>('habits', []);
  const [isMounted, setIsMounted] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 1. Calculation Helpers
  
  // Most Consistent Habit
  const getMostConsistentHabit = () => {
    if (habits.length === 0) return null;
    return habits.map(h => {
      const createdDate = new Date(h.createdAt);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - createdDate.getTime());
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      const rate = (h.completedDates.length / diffDays) * 100;
      return { name: h.name, rate };
    }).reduce((prev, curr) => (prev.rate > curr.rate ? prev : curr));
  };

  // Weekly Completion Rate for the current view week
  const getWeeklyData = () => {
    const start = startOfWeek(viewDate, { weekStartsOn: 1 });
    const end = endOfWeek(viewDate, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    return days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const completions = habits.filter(h => h.completedDates.includes(dayStr)).length;
      const totalHabits = habits.length;
      const percentage = totalHabits > 0 ? (completions / totalHabits) * 100 : 0;

      return {
        day: format(day, 'EEE', { locale: ptBRLocale }),
        percentage: Math.round(percentage),
        date: dayStr
      };
    });
  };

  // Day of Week Analysis (Overall)
  const getDayDistribution = () => {
    const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    const counts = new Array(7).fill(0);
    let totalCompletions = 0;

    habits.forEach(h => {
      h.completedDates.forEach(dateStr => {
        const dayIdx = getDay(parseISO(dateStr));
        counts[dayIdx]++;
        totalCompletions++;
      });
    });

    return days.map((dayName, index) => ({
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      count: counts[index],
      percentage: totalCompletions > 0 ? (counts[index] / totalCompletions) * 100 : 0
    }));
  };

  const mostConsistent = getMostConsistentHabit();
  const weeklyData = getWeeklyData();
  const dayDistribution = getDayDistribution();
  const bestDay = [...dayDistribution].sort((a, b) => b.count - a.count)[0];
  const worstDay = [...dayDistribution].sort((a, b) => a.count - b.count)[0];

  const handlePrevWeek = () => setViewDate(subWeeks(viewDate, 1));
  const handleNextWeek = () => setViewDate(subWeeks(viewDate, -1));

  return (
    <div className="text-slate-100 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Estatísticas</h1>
          <p className="text-slate-400 flex items-center gap-2">
            <Calendar size={16} />
            Semana de {format(startOfWeek(viewDate, { weekStartsOn: 1 }), 'dd/MM', { locale: ptBRLocale })} a {format(endOfWeek(viewDate, { weekStartsOn: 1 }), 'dd/MM', { locale: ptBRLocale })}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={handlePrevWeek}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNextWeek}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Trophy className="text-blue-500" size={24} />
            </div>
            <h3 className="text-sm font-medium text-slate-400">Mais Consistente</h3>
          </div>
          {mostConsistent ? (
            <div>
              <p className="text-2xl font-bold text-white">{mostConsistent.name}</p>
              <p className="text-sm text-blue-400 mt-1">{mostConsistent.rate.toFixed(1)}% de taxa</p>
            </div>
          ) : (
            <p className="text-slate-500">Sem dados disponíveis</p>
          )}
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <TrendingUp className="text-emerald-500" size={24} />
            </div>
            <h3 className="text-sm font-medium text-slate-400">Melhor Dia</h3>
          </div>
          {bestDay && bestDay.count > 0 ? (
            <div>
              <p className="text-2xl font-bold text-white">{bestDay.day}</p>
              <p className="text-sm text-emerald-400 mt-1">{bestDay.count} conclusões</p>
            </div>
          ) : (
            <p className="text-slate-500">Sem dados disponíveis</p>
          )}
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-rose-500/10 rounded-xl">
              <TrendingDown className="text-rose-500" size={24} />
            </div>
            <h3 className="text-sm font-medium text-slate-400">Pior Dia</h3>
          </div>
          {worstDay && worstDay.count > 0 ? (
            <div>
              <p className="text-2xl font-bold text-white">{worstDay.day}</p>
              <p className="text-sm text-rose-400 mt-1">{worstDay.count} conclusões</p>
            </div>
          ) : (
            <p className="text-slate-500">Sem dados disponíveis</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Activity className="text-indigo-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">Taxa de Conclusão Semanal</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorPerc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorPerc)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Calendar className="text-amber-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">Distribuição por Dia</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {dayDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.count > 0 ? '#f59e0b' : '#334155'} />
                    ))}
                  </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
