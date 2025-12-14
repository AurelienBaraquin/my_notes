"use client"; // 👈 Obligatoire pour utiliser onClick ou onChange

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { toggleTodo, deleteTodo } from "@/app/dashboard/todos/actions";
import { Trash2 } from "lucide-react"; // npm install lucide-react si pas installé
import { useState } from "react";

// Si tu n'as pas le composant Checkbox : npx shadcn@latest add checkbox

export function TodoItem({ todo }: { todo: Todo }) {
  // On utilise un état local pour que l'interface réagisse IMMÉDIATEMENT (Optimistic UI)
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleToggle = async () => {
    // 1. On change visuellement tout de suite (super rapide pour l'user)
    setIsCompleted(!isCompleted);
    // 2. On envoie la requête au serveur en arrière-plan
    await toggleTodo(todo.id, !isCompleted);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        {/* Checkbox Shadcn */}
        <Checkbox 
          id={todo.id} 
          checked={isCompleted} 
          onCheckedChange={handleToggle}
          className="w-5 h-5"
        />
        
        <label 
          htmlFor={todo.id} 
          // Pour le texte : dark:text-gray-100 si non complété
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${
            isCompleted 
            ? "line-through text-gray-400" 
            : "text-slate-700 dark:text-gray-100" 
          }`}
        >
          {todo.title}
        </label>
      </div>

      <form action={deleteTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <button type="submit" className="text-gray-400 hover:text-red-500 transition">
          <Trash2 size={18} />
        </button>
      </form>
    </div>
  );
}