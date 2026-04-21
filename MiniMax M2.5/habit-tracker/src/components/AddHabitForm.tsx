"use client";

import { useState, FormEvent } from "react";

interface AddHabitFormProps {
  onAdd: (name: string) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Novo hábito..."
        className="flex-1 p-3 rounded-lg bg-[#1E1E1E] border border-[#2D2D2D] text-[#E0E0E0] placeholder-[#6B7280] focus:outline-none focus:border-[#4B5563] transition-colors"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="px-6 py-3 bg-[#374151] hover:bg-[#4B5563] disabled:opacity-50 disabled:cursor-not-allowed text-[#E0E0E0] rounded-lg transition-colors font-medium"
      >
        Adicionar
      </button>
    </form>
  );
}