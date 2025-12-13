// Fichier: src/app/dashboard/todos/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;

  await prisma.todo.create({
    data: { title, userId },
  });

  revalidatePath("/dashboard/todos");
}

export async function deleteTodo(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const todoId = formData.get("id") as string;

  await prisma.todo.delete({
    where: { id: todoId, userId },
  });

  revalidatePath("/dashboard/todos");
}

export async function toggleTodo(id: string, isCompleted: boolean) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.todo.update({
    where: { id, userId },
    data: { isCompleted },
  });

  revalidatePath("/dashboard/todos");
}