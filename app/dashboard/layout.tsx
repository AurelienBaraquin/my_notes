"use client"; // 👈 Indispensable maintenant car on utilise usePathname (interactivité)

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook pour savoir sur quelle page on est
import { Home, Settings, ListTodo, Notebook } from "lucide-react";
import { cn } from "@/lib/utils"; // Utilitaire Shadcn pour gérer les classes conditionnelles

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // ex: "/dashboard/notes"

  // 1. On définit nos données ici.
  // Si demain tu veux changer l'ordre ou l'icône, tu touches juste à ce tableau.
  const navItems = [
    { name: "Vue d'ensemble", href: "/dashboard", icon: Home },
    { name: "Mes Notes", href: "/dashboard/notes", icon: Notebook },
    { name: "Tâches", href: "/dashboard/todos", icon: ListTodo },
    { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-card border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">My Notes</h2>
        </div>
        
        <nav className="flex flex-col gap-2 px-4">
          {/* 2. On boucle (map) sur le tableau */}
          {navItems.map((item) => {
            // On vérifie si le lien est actif
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  // Classes de base (Communes)
                  "flex items-center gap-3 px-4 py-2 rounded-md transition-colors font-medium text-sm",
                  
                  // Classes conditionnelles (Active vs Inactive)
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" // Style si actif (foncé)
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground" // Style si inactif (gris)
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center justify-end px-8">
           <UserButton />
        </header>

        <main className="flex-1 p-8">
            {children}
        </main>
      </div>
    </div>
  );
}