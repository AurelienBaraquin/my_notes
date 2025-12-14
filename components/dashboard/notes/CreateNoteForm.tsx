"use client";

import { createNote } from "@/app/dashboard/notes/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRef } from "react";

export function CreateNoteForm() {
  // On utilise une ref pour vider le formulaire après envoi
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const promise = createNote(formData);
    
    toast.promise(promise, {
      loading: 'Création en cours...',
      success: () => {
        formRef.current?.reset(); // Vide les champs
        return 'Note créée avec succès ! 📝';
      },
      error: 'Erreur lors de la création',
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <Input name="title" placeholder="Titre de la note..." required />
      <Textarea name="content" placeholder="Contenu..." required />
      <div className="flex justify-end">
        <Button type="submit">Ajouter</Button>
      </div>
    </form>
  );
}