"use client";

import { useEffect, useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { WeeklyProgress } from '@/types/habit';

interface ProgressChartProps {
  data: WeeklyProgress[];
}

export default function ProgressChart({ data }: ProgressChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[250px] w-full bg-white/[0.02] rounded-xl animate-pulse" />;
  }

  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            hide
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#18181b', 
              border: '1px solid #27272a',
              borderRadius: '12px',
              color: '#f4f4f5'
            }}
            itemStyle={{ color: '#8b5cf6' }}
            cursor={{ stroke: '#3f3f46', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="percentage" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPercentage)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
