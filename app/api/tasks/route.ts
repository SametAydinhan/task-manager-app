import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
  } catch (e) {
    console.error("ERROR CREATİNG TASK: ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
  } catch (e) {
    console.error("ERROR GETTING TASKS: ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  } catch (e) {
    console.error("ERROR UPDATING TASK: ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function DEL(req: Request) {
  try {
  } catch (e) {
    console.error("ERROR DELETING TASKS: ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}
