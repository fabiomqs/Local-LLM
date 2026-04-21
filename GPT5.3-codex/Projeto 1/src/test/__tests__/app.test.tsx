import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../App";

function renderDashboard(): void {
  render(
    <MemoryRouter
      initialEntries={["/"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </MemoryRouter>
  );
}

describe("Habit Dashboard", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds and removes a habit", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const habitInput = screen.getByPlaceholderText("Add a new habit...");
    await user.type(habitInput, "Read 10 pages");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Read 10 pages")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove Read 10 pages" }));

    expect(screen.queryByText("Read 10 pages")).not.toBeInTheDocument();
  });

  it("marks a habit as done for today", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const habitInput = screen.getByPlaceholderText("Add a new habit...");
    await user.type(habitInput, "Workout");
    await user.click(screen.getByRole("button", { name: "Add" }));

    const habitCheckbox = screen.getByRole("checkbox");
    expect(habitCheckbox).not.toBeChecked();

    await user.click(habitCheckbox);

    expect(habitCheckbox).toBeChecked();
    expect(screen.getByText("Today: 1/1 completed")).toBeInTheDocument();
  });
});
