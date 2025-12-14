"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, ListTodo, Notebook, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Vue d'ensemble", href: "/dashboard", icon: Home },
    { name: "Mes Notes", href: "/dashboard/notes", icon: Notebook },
    { name: "Tâches", href: "/dashboard/todos", icon: ListTodo },
    { name: "Chat", href: "/dashboard/chat", icon: MessageSquareText },
    { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    // 1. CHANGEMENT : h-screen (fixe) et overflow-hidden (bloque le body)
    <div className="flex h-screen w-full bg-secondary/20 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      {/* On peut aussi mettre overflow-y-auto ici si ton menu devient très long un jour */}
      <aside className="w-64 bg-card border-r hidden md:block overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">My Notes</h2>
        </div>
        
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-md transition-colors font-medium text-sm",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header : shrink-0 empêche le header de s'écraser */}
        <header className="h-16 border-b bg-card flex items-center justify-end px-8 shrink-0">
           <UserButton />
        </header>

        {/* 2. CHANGEMENT : overflow-y-auto sur le main */}
        {/* C'est ICI que le scroll va se produire maintenant */}
        <main className="flex-1 overflow-y-auto p-8">
            {children}
        </main>
      </div>
    </div>
  );
}