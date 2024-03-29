import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (e) {
    console.error("ERROR CREATİNG TASK: ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    console.log("TASKS: ", tasks);
    return NextResponse.json(tasks);
  } catch (e) {
    console.error("ERROR GETTING TASKS: ", e);
    return NextResponse.json({ error: "Error getting task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { isCompleted, id } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (e) {
    console.error("ERROR UPDATING TASK: ", e);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

export async function DEL(req: Request) {
  try {
  } catch (e) {
    console.error("ERROR DELETING TASKS: ", e);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
