"use server"; // 👈 Cette ligne est MAGIQUE. Elle dit à Next.js : "Tout ce qui est ici reste sur le serveur"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db"; // Oups, on n'a pas encore créé ce fichier, on le fait juste après !
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  // 1. On récupère l'utilisateur connecté via Clerk
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Vous devez être connecté");
  }

  // 2. On récupère les données du formulaire HTML
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // 3. On parle à la base de données via Prisma
  await prisma.note.create({
    data: {
      title: title,
      content: content,
      userId: userId, // On lie la note à l'ID de Clerk
    },
  });

  // 4. On rafraîchit la page pour afficher la nouvelle note instantanément
  revalidatePath("/dashboard");
}

export async function deleteNote(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Vous devez être connecté");
  }

  const noteId = formData.get("id") as string;

  // Suppression sécurisée : On vérifie l'ID ET le propriétaire
  await prisma.note.delete({
    where: {
      id: noteId,
      userId: userId, // 👈 C'est cette ligne qui sécurise tout
    },
  });

  revalidatePath("/dashboard");
}
