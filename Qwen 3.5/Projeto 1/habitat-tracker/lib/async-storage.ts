import { NextResponse } from "next/server";
import { getLocalStorage } from "@/lib/async-storage";

export async function GET() {
	try {
		const res = await fetch("https://api.habit-tracker.com/v1/habits", {
			next: { revalidate: 60 },
		});
		if (!res.ok) throw new Error("Failed to fetch habits");
		return NextResponse.json(await res.json(), { status: res.status });
	} catch (error) {
		console.error("Error fetching habits:", error);
		return NextResponse.json(
			{ error: "Failed to load habits" },
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
