"use client";

import { BarChart, XAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface CompletionHistory {
	name: string;
	completed: boolean;
	staked: number;
	date: string;
}

export const Chart = ({
	completionHistory,
	WEEK_DAYS,
}: {
	completionHistory: CompletionHistory[];
	WEEK_DAYS: { name: string; data: number }[];
}) => {
	const data = completionHistory.map((day) => ({
		...day,
		days: WEEK_DAYS[day.data].data,
	}));

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<BarChart
				data={data as any}
				index={0}
				layout="horizontal"
				margin={{ left: 20, right: 5, top: 5, bottom: 5 }}
			>
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tick={false}
					interval={0}
				/>
				<Tooltip
					cursor={{ fill: "transparent" }}
					contentStyle={{
						background: "#111111",
						border: "1px solid #27272a",
						color: "#f9fafb",
					}}
					formatter={(value) => [`Dia ${value}`, value === 5000 ? "✔" : "✖"]}
				/>
			</BarChart>
		</motion.div>
	);
};
