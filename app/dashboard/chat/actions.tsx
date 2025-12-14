"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function sendMessage(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const content = formData.get("content") as string;
  if (!content || content.trim() === "") return;

  // 1. Sauvegarde en BDD
  const message = await prisma.chatMessage.create({
    data: {
      content,
      userId,
    },
    include: {
      user: true, // On a besoin du nom de l'utilisateur pour l'afficher
    },
  });

  // 2. Diffusion temps réel
  // Canal : "global-chat"
  // Événement : "new-message"
  await pusherServer.trigger("global-chat", "new-message", message);
}