import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Home, Settings, ListTodo, Notebook } from "lucide-react"; // Des icônes gratuites

// Si tu n'as pas lucide-react (souvent installé par défaut avec shadcn), sinon : npm install lucide-react

export default function DashboardLayout({
  children, // C'est ici que s'affichera ta page.tsx
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* --- SIDEBAR (Partie Gauche) --- */}
      <aside className="w-64 bg-background border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">My Notes</h2>
        </div>
        
        <nav className="flex flex-col gap-2 px-4">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition font-medium"> 
            <Home size={20} />
            Vue d'ensemble
        </Link>
        <Link href="/dashboard/notes" className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition font-medium"> 
            <Notebook size={20} />
            Mes Notes
        </Link>
        <Link href="/dashboard/todos" className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition font-medium">
            <ListTodo size={20} />
            Tâches
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition font-medium">
            <Settings size={20} />
            Paramètres
        </Link>
        </nav>
      </aside>

      {/* --- MAIN CONTENT (Partie Droite) --- */}
      <div className="flex-1 flex flex-col">
        {/* Header du haut */}
        <header className="h-16 border-b bg-background flex items-center justify-end px-8">
           <UserButton />
        </header>

        {/* Le contenu de la page changeante */}
        <main className="flex-1 p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
