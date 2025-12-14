import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardHeader, DashboardShell } from "@/components/dashboard/ui";
import { ChatInterface } from "@/components/dashboard/chat/ChatInterface";

export default async function ChatPage() {
  const user = await currentUser();
  if (!user) return null; // Le middleware protège déjà, mais sécurité type

  // 1. Charger les 50 derniers messages
  const initialMessages = await prisma.chatMessage.findMany({
    orderBy: { createdAt: "asc" },
    take: 50,
    include: {
      user: true, // Important pour afficher le nom
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Chat Général" 
        text="Discutez en temps réel avec les autres membres."
      />
      
      {/* On passe les données initiales au client */}
      <ChatInterface 
        initialMessages={initialMessages} 
        currentUserId={user.id} 
      />
    </DashboardShell>
  );
}