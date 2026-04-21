"use client";

import { Flame, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  streak: number;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function HabitCard({ habit, streak, isCompleted, onToggle, onDelete }: HabitCardProps) {
  return (
    <div className="glass glass-hover p-5 rounded-2xl flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggle}
          className={`transition-all duration-300 transform active:scale-90 ${
            isCompleted ? 'text-accent' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-8 h-8 fill-accent/10" />
          ) : (
            <Circle className="w-8 h-8" />
          )}
        </button>
        
        <div>
          <h3 className={`text-lg font-medium transition-all ${isCompleted ? 'text-zinc-500 line-through' : 'text-white'}`}>
            {habit.name}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold">
              <Flame className={`w-4 h-4 ${streak > 0 ? 'animate-pulse' : ''}`} />
              <span>{streak} dias de streak</span>
            </div>
            <span className="text-zinc-600">•</span>
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: habit.color }}
            />
          </div>
        </div>
      </div>

      <button 
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
        title="Remover hábito"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
