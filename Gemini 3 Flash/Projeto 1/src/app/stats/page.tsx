"use client";

import { useHabits } from '@/hooks/useHabits';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { ArrowLeft, Trophy, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function StatsPage() {
  const { stats, isInitialized, habits } = useHabits();

  if (!isInitialized) return null;

  if (!stats) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Estatísticas</h1>
        <div className="glass p-12 rounded-3xl">
          <p className="text-zinc-500 mb-6">Adicione hábitos para ver suas estatísticas aqui.</p>
          <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl">
            Voltar para o Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Insights de Hábitos</h1>
        <p className="text-zinc-400 mt-2">Analise sua consistência e tendências</p>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Trophy className="w-24 h-24 text-yellow-500" />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            Mais Consistente
          </p>
          <h3 className="text-2xl font-bold text-white mb-1">
            {stats.mostConsistent.name}
          </h3>
          <p className="text-zinc-500 text-sm">
            {stats.mostConsistent.completedDates.length} conclusões totais
          </p>
        </div>

        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp className="w-24 h-24 text-accent" />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            Melhor Dia
          </p>
          <h3 className="text-2xl font-bold text-white mb-1">
            {stats.bestDay.name}
          </h3>
          <p className="text-zinc-500 text-sm">
            Seu dia de maior produtividade
          </p>
        </div>

        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <TrendingDown className="w-24 h-24 text-red-500" />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            Pior Dia
          </p>
          <h3 className="text-2xl font-bold text-white mb-1">
            {stats.worstDay.name}
          </h3>
          <p className="text-zinc-500 text-sm">
            Oportunidade de foco
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Completion Rate Chart */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Taxa de Conclusão Semanal (%)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a' }} 
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  cursor={{ fill: 'white', opacity: 0.05 }}
                />
                <Bar 
                  dataKey="rate" 
                  fill="#8b5cf6" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Day of Week Distribution */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Distribuição por Dia da Semana
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.dayStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a' }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#18181b' }}
                  activeDot={{ r: 8 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
