import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTodo } from "./actions";
import { TodoList } from "@/components/dashboard/todos/TodoList"
import { DashboardShell, DashboardHeader, DashboardCard } from "@/components/dashboard/ui";
import { SmartForm } from "@/components/SmartForm";
import { Plus } from "lucide-react";

export default async function TodosPage() {
  const user = await currentUser();
  if (!user) return null;

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell className="max-w-2xl"> {/* On peut surcharger la largeur ici ! */}
      
      <DashboardHeader heading="Mes Tâches" count={todos.length} />

      <DashboardCard className="mb-8">
        <SmartForm 
          action={createTodo} 
          successMessage="Tâche créée avec succès ! 🎉"
          className="flex gap-2" // On définit le layout horizontal ici
        >
          <Input 
            name="title" 
            placeholder="Ajouter une nouvelle tâche..." 
            className="flex-1"
            required 
            autoComplete="off"
          />
          <Button type="submit">
            <Plus size={18} className="mr-2" /> Ajouter
          </Button>
        </SmartForm>
      </DashboardCard>

      <TodoList todos={todos} />

    </DashboardShell>
  );
}