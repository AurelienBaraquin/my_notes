"use client";

import { createTodo } from "@/app/dashboard/todos/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";

export function CreateTodoForm() {
  // On utilise une ref pour vider le formulaire après envoi
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const promise = createTodo(formData);
    
    toast.promise(promise, {
      loading: 'Création en cours...',
      success: () => {
        formRef.current?.reset(); // Vide les champs
        return 'Tâche créée avec succès ! 🎉';
      },
      error: 'Erreur lors de la création',
    });
  };

  return (
        <form action={handleSubmit} className="flex gap-2">
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
  );
}