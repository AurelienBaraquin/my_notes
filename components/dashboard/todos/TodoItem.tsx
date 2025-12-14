"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { toggleTodo, deleteTodo } from "@/app/dashboard/todos/actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TodoItem({ todo }: { todo: Todo }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleToggle = async () => {
    setIsCompleted(!isCompleted);
    await toggleTodo(todo.id, !isCompleted);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <Checkbox 
          id={todo.id} 
          checked={isCompleted} 
          onCheckedChange={handleToggle}
          className="w-5 h-5"
        />
        
        <label 
          htmlFor={todo.id} 
          className={cn(
            "text-sm font-medium leading-none cursor-pointer transition-colors",
            isCompleted 
              ? "line-through text-muted-foreground" // Gris standard si fini
              : "text-foreground" // Couleur normale (Noir/Blanc) sinon
          )}
        >
          {todo.title}
        </label>
      </div>

      <form action={deleteTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <button type="submit" className="text-muted-foreground hover:text-destructive transition">
          <Trash2 size={18} />
        </button>
      </form>
    </div>
  );
}