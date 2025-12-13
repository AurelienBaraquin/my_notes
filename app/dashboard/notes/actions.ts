// Fichier: src/app/dashboard/notes/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.note.create({
    data: { title, content, userId },
  });

  revalidatePath("/dashboard/notes");
}

export async function deleteNote(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const noteId = formData.get("id") as string;

  await prisma.note.delete({
    where: { id: noteId, userId },
  });

  revalidatePath("/dashboard/notes");
}