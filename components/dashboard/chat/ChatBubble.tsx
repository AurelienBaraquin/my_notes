import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  content: string;
  isMe: boolean;
  username: string; // Nom de l'auteur (ou email)
  createdAt: Date;
}

export function ChatBubble({ content, isMe, username, createdAt }: ChatBubbleProps) {
  return (
    <div className={cn("flex flex-col mb-4", isMe ? "items-end" : "items-start")}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-muted-foreground font-medium">{username}</span>
        <span className="text-[10px] text-muted-foreground/60">
            {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div
        className={cn(
          "px-4 py-2 rounded-xl max-w-[80%] wrap-break-words shadow-sm text-sm",
          isMe
            ? "bg-primary text-primary-foreground rounded-tr-none" // Mes messages (Bleu/Noir)
            : "bg-muted text-foreground rounded-tl-none" // Messages des autres (Gris)
        )}
      >
        {content}
      </div>
    </div>
  );
}