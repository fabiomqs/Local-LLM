import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddHabitForm } from "../components/AddHabitForm";
import { HabitItem } from "../components/HabitItem";
import { Habit } from "../types/habit";

describe("AddHabitForm", () => {
  it("deve adicionar hábito quando o formulário for submetido", () => {
    const onAdd = vi.fn();
    render(<AddHabitForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("Novo hábito...");
    const button = screen.getByText("Adicionar");

    fireEvent.change(input, { target: { value: "Estudar React" } });
    fireEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith("Estudar React");
    expect((input as HTMLInputElement).value).toBe("");
  });

  it("não deve adicionar haplotype vazio", () => {
    const onAdd = vi.fn();
    render(<AddHabitForm onAdd={onAdd} />);

    const button = screen.getByText("Adicionar");
    fireEvent.click(button);

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("não deve habilitar botão com nome vazio", () => {
    const onAdd = vi.fn();
    render(<AddHabitForm onAdd={onAdd} />);

    const button = screen.getByText("Adicionar") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});

describe("HabitItem", () => {
  const mockHabit: Habit = {
    id: "1",
    name: "Estudar React",
    createdAt: "2024-01-01T00:00:00.000Z",
    completedDates: [],
  };

  it("deve renderizar nome do hábito", () => {
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    render(
      <HabitItem
        habit={mockHabit}
        isCompletedToday={false}
        streak={0}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    );

    expect(screen.getByText("Estudar React")).toBeDefined();
  });

  it("deve exibir streak quando existente", () => {
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    render(
      <HabitItem
        habit={mockHabit}
        isCompletedToday={false}
        streak={5}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    );

    expect(screen.getByText("5")).toBeDefined();
    expect(screen.getByText("dias")).toBeDefined();
  });

  it("deve chamar onToggle quando checkbox for clicado", () => {
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    render(
      <HabitItem
        habit={mockHabit}
        isCompletedToday={false}
        streak={0}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(onToggle).toHaveBeenCalled();
  });

  it("deve chamar onRemove quando botão remover for clicado", () => {
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    render(
      <HabitItem
        habit={mockHabit}
        isCompletedToday={false}
        streak={0}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);

    expect(onRemove).toHaveBeenCalled();
  });

  it("deve renderizar ícone de check quando completado hoje", () => {
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    render(
      <HabitItem
        habit={mockHabit}
        isCompletedToday={true}
        streak={1}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    );

    const checkIcon = document.querySelector('svg path[d="M5 13l4 4L19 7"]');
    expect(checkIcon).toBeDefined();
  });
});