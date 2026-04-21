import { FormEvent, useState } from "react";

interface HabitFormProps {
  onAddHabit: (name: string) => void;
}

export function HabitForm({ onAddHabit }: HabitFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    onAddHabit(trimmed);
    setName("");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <label htmlFor="habit-name" className="visually-hidden">
        New habit
      </label>
      <input
        id="habit-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Add a new habit..."
        maxLength={60}
      />
      <button type="submit">Add</button>
    </form>
  );
}
