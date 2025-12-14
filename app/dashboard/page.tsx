import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, ListTodo } from "lucide-react";
// 👇 Import de tes briques UI
import { DashboardShell, DashboardHeader, DashboardCard } from "@/components/dashboard/ui";

export default async function DashboardHome() {
  const user = await currentUser();
  if (!user) return null;

  let dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
      },
    });
  }

  const notesCount = await prisma.note.count({ where: { userId: user.id } });
  const todosCount = await prisma.todo.count({ where: { userId: user.id } });

  return (
    <DashboardShell>
      
      <DashboardHeader 
        heading={`Bonjour, ${user.firstName} 👋`} 
        text="Voici un aperçu de votre activité." // Tu peux ajouter ce prop optionnel si tu veux dans dashboard-ui.tsx
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARTE NOTES */}
        <DashboardCard className="flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-100 rounded-lg">
                <FileText size={24} />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Notes crées</p>
                <p className="text-2xl font-bold">{notesCount}</p>
            </div>
          </div>
          <Link href="/dashboard/notes" className="w-full">
            <Button variant="outline" className="w-full justify-between">
                Voir mes notes <ArrowRight size={16}/>
            </Button>
          </Link>
        </DashboardCard>

        {/* CARTE TODOS */}
        <DashboardCard className="flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100 rounded-lg">
                <ListTodo size={24} />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Tâches en cours</p>
                <p className="text-2xl font-bold">{todosCount}</p>
            </div>
          </div>
           <Link href="/dashboard/todos" className="w-full">
            <Button variant="outline" className="w-full justify-between">
                Voir mes tâches <ArrowRight size={16}/>
            </Button>
          </Link>
        </DashboardCard>

      </div>
    </DashboardShell>
  );
}