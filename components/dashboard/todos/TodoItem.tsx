"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { toggleTodo, deleteTodo } from "@/app/dashboard/todos/actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function TodoItem({ todo }: { todo: Todo }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleToggle = async () => {
    // Optimistic Update (on change l'UI tout de suite)
    const newState = !isCompleted;
    setIsCompleted(newState);
    
    // On lance la requête sans bloquer l'UI, mais on peut notifier si on veut
    // Pour le toggle, souvent on ne met pas de notif car c'est une action très fréquente,
    // mais on peut mettre un petit son ou un toast discret si tu veux.
    try {
        await toggleTodo(todo.id, newState);
    } catch {
        // Si ça plante, on remet l'état d'avant et on prévient
        setIsCompleted(!newState);
        toast.error("Erreur de connexion");
    }
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("id", todo.id);
    
    toast.promise(deleteTodo(formData), {
        loading: 'Suppression...',
        success: 'Tâche terminée ! 🎉',
        error: 'Erreur lors de la suppression'
    });
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm"
    >
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

      <button 
        onClick={handleDelete}
        className="text-muted-foreground hover:text-destructive transition"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}