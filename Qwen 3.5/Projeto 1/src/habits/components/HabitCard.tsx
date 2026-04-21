"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Flame } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type Habit = {
	id: string;
	name: string;
	completed: boolean[];
	streak: number;
	maxStreak: number;
	createdAt?: number;
};

const useHabits = () => {
	const { data: habits } = useQuery(["habits"], async () => {
		const res = await fetch("/api/habits");
		return res.json();
	});

	return habits;
};

export const HabitCard = ({ habit }: { habit: Habit }) => {
	const [isCompleted, setIsCompleted] = useState(
		habit.completed.length > 0 ? habit.completed.at(-1) : false
	);

	const toggleComplete = async () => {
		const newStatus = !isCompleted;
		setIsCompleted(newStatus);

		try {
			const res = await fetch(`/api/dates`);
			const date = (await res.json()).date;

			await fetch(`/api/habits/${habit.id}/complete`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ date, completed: newStatus }),
			});
		} catch (error) {
			console.error("Error toggling habit:", error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
			whileHover={{ scale: 1.01 }}
			whileTap={{ scale: 0.99 }}
			className="bg-card rounded-xl p-5 border border-card-border shadow-lg hover:shadow-primary/10 transition-shadow group"
		>
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<p className="text-xl font-semibold text-foreground truncate">
						{habit.name}
					</p>
				</div>
				<div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
					{habit.streak > 0 && (
						<div className="flex items-center space-x-1 text-primary-muted">
							<Flame className="w-5 h-5 text-primary animate-pulse" />
							<span className="text-primary font-medium">{habit.streak}</span>
						</div>
					)}
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={isCompleted}
							aria-label="Toggle habit completion"
							aria-describedby="status-description"
							className="sr-only"
						/>
						<div
							className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
								isCompleted ? "bg-success border-success" : "bg-card-border border-card-border"
							}`}
						>
							{isCompleted && (
								<svg
									className="w-6 h-6 text-white"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<polyline
										points="20 6 9 17 4 12"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)}
						</div>
					</label>
					<button
						aria-label="Delete habit"
						type="button"
						aria-pressed={false}
						className="text-foreground/50 hover:text-red-400 transition-colors"
					>
						<Trash2 className="w-5 h-5 hover:rotate-90 transition-transform" />
					</button>
				</div>
			</div>
		</motion.div>
	);
};
