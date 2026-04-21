"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

type Habit = {
	id: string;
	name: string;
	completed: Record<string, boolean>;
	streak: number;
	maxStreak: number;
};

const useHabitsApi = () => {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [currentDate, setCurrentDate] = useState<string>("");

	const getHabits = async () => {
		const res = await fetch("/api/habits");
		if (!res.ok) return [];
		return res.json();
	};

	const getCurrentDate = async () => {
		const res = await fetch("/api/dates");
		if (!res.ok) return "";
		return res.json();
	};

	const setMutation = useMutation({
		mutationFn: async (body: { date: string }) => {
			const res = await fetch("/api/dates", {
				method: "POST",
				body: JSON.stringify(body),
			});
			return res.json();
		},
		onSuccess: (data) => setCurrentDate(data.date),
	});

	return {
		habits,
		setCurrentDate,
		getHabits,
		currentDate,
		setMutation,
	};
};

export const AddHabitModal = () => {
	const habitsApi = useHabitsApi();
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const mutation = useMutation({
		mutationFn: async (body: { name: string }) => {
			const res = await fetch("/api/habits", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			return res.json();
		},
		onSuccess: () => {
			setName("");
			setError("");
			setIsOpen(false);
			habitsApi.getHabits();
		},
	});

	const loadHabits = async () => {
		const data = await habitsApi.getHabits();
		setHabits(data);
	};

	return (
		<>
			<button
				onClick={() => {
					setIsOpen(true);
					loadHabits();
				}}
				className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/50 transition-all hover:scale-110"
			>
				<Plus className="w-7 h-7 text-white" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						aria-label="Modal para adicionar hábito"
						className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
						onClick={() => setIsOpen(false)}
					>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							aria-label="Novo hábito"
							className="bg-card border border-card-border rounded-xl p-6 w-96 relative max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold text-foreground">Novo Hábito</h2>
								<button
									onClick={() => setIsOpen(false)}
									aria-label="Fechar modal"
									className="text-foreground/50 hover:text-white transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							<input
								type="text"
								placeholder="Ex: Beber água"
								id="habit-input"
								value={name}
								onChange={(e) => setName(e.target.value)}
								onInput={() =>
									!!name && name.length >= 2 && setError("") && setName("")
								}
								className={`w-full bg-black text-foreground px-4 py-3 rounded-lg border-2 outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
									error
										? "border-red-500"
										: habitsApi.currentDate === name
											? "border-primary/50"
											: "border-card-border"
								} disabled:opacity-50`}
								disabled={!!habitsApi.mutation.isPending}
								onKeyDown={(e) =>
									e.key === "Enter" &&
									!error &&
									name.length >= 2 &&
									mutation.mutate({ name })
								}
							/>
							{error && (
								<p className="text-red-500 text-sm mt-2">{error}</p>
							)}

							<button
								onClick={() => {
									if (!name || name.length < 2) {
										setError("Minimum 2 characters");
										return;
									}
									mutation.mutate({ name });
								}}
								disabled={!name || mutation.isPending || name.length < 2}
								aria-label="Adicionar hábito"
								className="w-full mt-4 bg-primary/20 hover:bg-primary/30 text-primary font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
							>
								{mutation.isPending ? "Criando..." : "Adicionar"}
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
