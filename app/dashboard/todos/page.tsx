import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTodo } from "./actions";
import { TodoItem } from "@/components/TodoItem";
import { Plus } from "lucide-react";

export default async function TodosPage() {
  const user = await currentUser();
  if (!user) return null;

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Mes Tâches</h1>

      {/* Formulaire d'ajout rapide */}
      <div className="bg-white p-4 rounded-xl border shadow-sm mb-8">
        <form action={createTodo} className="flex gap-2">
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
        </form>
      </div>

      {/* Liste des tâches */}
      <div className="space-y-3">
        {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Rien à faire... Profites-en ! 😎</p>
        ) : (
            todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))
        )}
      </div>
    </div>
  );
}