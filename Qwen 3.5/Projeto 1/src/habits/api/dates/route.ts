import { NextResponse } from "next/server";

export async function GET() {
	const res = await fetch("https://api.habit-tracker.com/v1/habits");
	if (!res.ok) throw new Error("Failed to fetch habits");
	return NextResponse.json(await res.json(), { status: res.status });
}

export async function POST(request: Request) {
	const { habits } = await request.json();
	await fetch("https://api.habit-tracker.com/v1/habits", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(habits),
	});
	return NextResponse.json(await res.json(), { status: res.status });
}
