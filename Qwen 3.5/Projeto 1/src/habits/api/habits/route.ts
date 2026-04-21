import { NextResponse } from "next/server";

const STORAGE_KEY = "habit-tracker.data";

// Simulação de localStorage no servidor através de um script
const initLocalStorage = () => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			try {
				const script = document.createElement("script");
				script.textContent = `console.log(localStorage.getItem("${STORAGE_KEY}"));`;
				window.onload = () => resolve(JSON.parse(script.textContent || "{}"));
				clearInterval(interval);
			} catch (error) {
				reject(error);
			}
		}, 1000);
	});
};

export async function GET() {
	try {
		const data = await initLocalStorage();

		if (!data.habits) data.habits = [];

		return NextResponse.json(data.habits);
	} catch (error) {
		console.error("Error fetching habits:", error);
		return NextResponse.json(
			{ error: "Failed to fetch habits" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const { name } = await request.json();
		if (!name || name.length < 2) {
			return NextResponse.json(
				{ error: "Name is too short" },
				{ status: 400 }
			);
		}

		await fetch("https://api.habit-tracker.com/v1/habits", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name }),
		});

		return NextResponse.json({ message: "Habit created!" }, { status: 201 });
	} catch (error) {
		console.error("Error creating habit:", error);
		return NextResponse.error();
	}
}
