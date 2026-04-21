"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

interface HabitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

const COLORS = [
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Cyan', value: '#06b6d4' },
];

export default function HabitForm({ isOpen, onClose, onAdd }: HabitFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0].value);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), color);
      setName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="glass bg-zinc-900 w-full max-w-md rounded-3xl p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-8">Novo Hábito</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Nome do Hábito
            </label>
            <input 
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Meditar, Beber Água..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-4">
              Cor de Identificação
            </label>
            <div className="flex flex-wrap gap-4">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-10 h-10 rounded-full transition-all transform hover:scale-110 active:scale-95 ${
                    color === c.value ? 'ring-4 ring-white/20 scale-110' : ''
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 mt-4"
          >
            Criar Hábito
          </button>
        </form>
      </div>
    </div>
  );
}
