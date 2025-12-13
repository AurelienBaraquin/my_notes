import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, ListTodo } from "lucide-react";

export default async function DashboardHome() {
  const user = await currentUser();
  if (!user) return null;

  // Synchronisation utilisateur (on la garde ici car c'est la page d'entrée)
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

  // Exemple de requête "statistique"
  const notesCount = await prisma.note.count({
    where: { userId: user.id }
  });

  const todosCount = await prisma.todo.count({
    where: { userId: user.id }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Bonjour, {user.firstName} 👋</h1>
      
      {/* Grille de cartes de statistiques / raccourcis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Carte Notes */}
        <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <FileText size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">Notes crées</p>
                <p className="text-2xl font-bold">{notesCount}</p>
            </div>
          </div>
          <Link href="/dashboard/notes">
            <Button variant="outline" className="w-full justify-between">
                Voir mes notes <ArrowRight size={16}/>
            </Button>
          </Link>
        </div>

        {/* Carte Todos (Vide pour l'instant) */}
        <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <ListTodo size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">Tâches en cours</p>
                <p className="text-2xl font-bold">{todosCount}</p>
            </div>
          </div>
           <Link href="/dashboard/todos">
            <Button variant="outline" className="w-full justify-between">
                Voir mes tâches <ArrowRight size={16}/>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}