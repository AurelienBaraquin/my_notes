"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, ListTodo, Notebook, Menu } from "lucide-react"; // 👈 Ajout de Menu
import { cn } from "@/lib/utils";
// 👇 Imports Shadcn
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Pour fermer le menu mobile quand on clique sur un lien
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Vue d'ensemble", href: "/dashboard", icon: Home },
    { name: "Mes Notes", href: "/dashboard/notes", icon: Notebook },
    { name: "Tâches", href: "/dashboard/todos", icon: ListTodo },
    { name: "Chat Général", href: "/dashboard/chat", icon: Menu }, // Tu peux changer l'icône ici
    { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
  ];

  // --- COMPOSANT INTERNE POUR LES LIENS (DRY) ---
  // On le définit ici pour avoir accès à navItems et pathname sans tout repasser en props
  const NavLinks = () => (
    <nav className="flex flex-col gap-2 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            // On ferme le menu au clic (utile uniquement sur mobile, mais sans effet sur desktop)
            onClick={() => setIsMobileMenuOpen(false)} 
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
  );

  return (
    <div className="flex h-screen w-full bg-secondary/20 overflow-hidden">
      
      {/* --- SIDEBAR DESKTOP (Cachée sur Mobile) --- */}
      <aside className="w-64 bg-card border-r hidden md:block overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">My Notes</h2>
        </div>
        {/* On utilise notre composant réutilisable */}
        <NavLinks />
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* HEADER */}
        {/* justify-between permet d'écarter le Menu (gauche) et le User (droite) */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-8 shrink-0">
           
           {/* --- MENU MOBILE (Sheet) --- */}
           {/* md:hidden = Visible seulement sur mobile */}
           <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
               <SheetTrigger asChild>
                 <Button variant="ghost" size="icon">
                   <Menu size={24} />
                 </Button>
               </SheetTrigger>
               
              <SheetContent side="left" className="w-[80%] sm:w-75 p-0">
                <div className="p-6">
                  <SheetTitle className="text-2xl font-bold tracking-tight mb-8">
                      My Notes
                  </SheetTitle>

                  <SheetDescription className="sr-only">
                    Menu de navigation principal pour accéder aux notes, tâches et paramètres.
                  </SheetDescription>
                  
                  <div className="mt-6"> {/* Petit espace avant les liens */}
                      <NavLinks />
                  </div>
                </div>
              </SheetContent>
             </Sheet>
           </div>

           <div className="hidden md:block" />

           <UserButton />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}