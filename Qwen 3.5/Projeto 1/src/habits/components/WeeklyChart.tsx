"use client";

import { BarChart, XAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const WEEK_DAYS = [
	{ name: "Domingo", data: 0 },
	{ name: "Segunda", data: 1 },
	{ name: "Terça", data: 2 },
	{ name: "Quarta", data: 3 },
	{ name: "Quinta", data: 4 },
	{ name: "Sexta", data: 5 },
	{ name: "Sábado", data: 6 },
];

export const WeeklyChart = () => {
	const completionHistory = WEEK_DAYS.map((day) => {
		const date = new Date();
		date.setDate(date.getDate() - day.data);
		return {
			name: day.name,
			completed: true, // Mock data - would come from API
			staked: 0,
			date: date.toISOString().split("T")[0],
		};
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			className="bg-card rounded-xl p-5 border border-card-border shadow-lg"
		>
			<div className="flex items-center space-x-2 mb-3">
				<CalendarDays className="w-5 h-5 text-primary" />
				<h2 className="text-lg font-semibold">Progresso Semanal</h2>
			</div>
			<div className="flex justify-center">
				<Chart {...{ completionHistory, WEEK_DAYS }} />
			</div>
			<p className="text-center text-secondary text-sm mt-3">
				Mantenha a consistência para construir hábito!
			</p>
		</motion.div>
	);
};
