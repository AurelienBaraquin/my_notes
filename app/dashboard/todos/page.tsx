import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTodo } from "./actions";
import { TodoList } from "@/components/dashboard/todos/TodoList"
import { CreateTodoForm } from "@/components/dashboard/todos/CreateTodoForm";
import { DashboardShell, DashboardHeader, DashboardCard } from "@/components/dashboard/ui";

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
        <CreateTodoForm />
      </DashboardCard>

      <div className="space-y-3">
        {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Rien à faire... Profites-en ! 😎</p>
        ) : (
            <TodoList todos={todos} />
        )}
      </div>

    </DashboardShell>
  );
}