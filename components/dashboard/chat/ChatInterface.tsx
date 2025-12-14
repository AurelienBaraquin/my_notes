"use client";

import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { sendMessage } from "@/app/dashboard/chat/actions"; // Server Action
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ChatBubble } from "./ChatBubble";

// On définit un type pour le message complet avec l'user
type MessageWithUser = {
  id: string;
  content: string;
  createdAt: Date | string; // Prisma renvoie Date, Pusher renvoie string (JSON)
  userId: string;
  user: { name: string | null; email: string };
};

interface ChatInterfaceProps {
  initialMessages: MessageWithUser[]; // Historique chargé par le serveur
  currentUserId: string;
}

export function ChatInterface({ initialMessages, currentUserId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<MessageWithUser[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null); // Pour le scroll automatique

  useEffect(() => {
    // 1. S'abonner au canal
    const channel = pusherClient.subscribe("global-chat");

    // 2. Écouter les nouveaux messages
    channel.bind("new-message", (data: MessageWithUser) => {
      // Astuce : On évite les doublons si on reçoit notre propre message trop vite
      setMessages((prev) => {
        if (prev.find((m) => m.id === data.id)) return prev;
        return [...prev, data];
      });
    });

    // 3. Nettoyage quand on quitte la page
    return () => {
      pusherClient.unsubscribe("global-chat");
    };
  }, []);

  // Scroll automatique vers le bas quand un message arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] border rounded-xl bg-card overflow-hidden shadow-sm">
      {/* ZONE DE MESSAGES (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 bg-secondary/10">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            content={msg.content}
            isMe={msg.userId === currentUserId}
            username={msg.user.name || msg.user.email}
            createdAt={new Date(msg.createdAt)}
          />
        ))}
        <div ref={bottomRef} /> {/* Ancre invisible pour le scroll */}
      </div>

      {/* ZONE DE SAISIE (Fixe en bas) */}
      <div className="p-4 bg-background border-t">
        <form
          action={async (formData) => {
            // Optimistic UI : On pourrait ajouter le message tout de suite ici,
            // mais Pusher est tellement rapide (<100ms) qu'on va laisser Pusher faire le retour.
            await sendMessage(formData);
            // On vide l'input manuellement via ref si besoin, ou via form reset
            // (ici méthode simple : HTMLFormElement.reset())
            (document.getElementById("chat-form") as HTMLFormElement).reset();
          }}
          id="chat-form"
          className="flex gap-2"
        >
          <Input 
            name="content" 
            placeholder="Écrivez un message..." 
            className="flex-1" 
            autoComplete="off"
          />
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}