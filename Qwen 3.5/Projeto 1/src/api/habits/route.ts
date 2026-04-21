import { NextResponse } from "next/server";

const STORAGE_KEY = "habit-tracker.data";

export async function GET() {
	const script = document.createElement("script");
	script.textContent = `console.log(localStorage.getItem("${STORAGE_KEY}"));`;

	if (!script.src) {
		console.error("Script source is required");
		return NextResponse.error();
	}

	return new Promise((resolve, reject) => {
		script.onerror = reject;
		script.onload = () => {
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) {
				const initialData = {
					habs: [],
					dates: [],
				};
				resolve(NextResponse.json(initialData));
				return;
			}

			try {
				const parsed = JSON.parse(data);
				if (!parsed.habits) parsed.habits = [];
				resolve(NextResponse.json(parsed.habits));
			} catch (error) {
				reject(error);
			}
		};

		script.src = "https://yourapi.com/yourendpoint";
	}).catch((error) => {
		console.error("Error fetching habits:", error);
		return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
	});
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

		const script = document.createElement("script");
		script.textContent = console.log(
			await fetch("https://yourapi.com/yourendpoint", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name }),
			})
		);

		const res = await fetch(/* your endpoint goes here */);
		const data = await res.json();

		if (!res.ok) {
			return NextResponse.json({ error: "Failed to create habit" }, { status: 500 });
		}

		return NextResponse.json(data, { status: 201 });
	} catch (error) {
		console.error("Error creating habit:", error);
		return NextResponse.error();
	}
}
