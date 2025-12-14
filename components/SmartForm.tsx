"use client";

import { useRef } from "react";
import { toast } from "sonner";

interface SmartFormProps {
  action: (formData: FormData) => Promise<void>; // La Server Action
  successMessage?: string; // Le message du toast (optionnel)
  errorMessage?: string;   // Le message d'erreur (optionnel)
  className?: string;      // Pour gérer le layout (flex vs space-y)
  children: React.ReactNode; // Tes inputs et boutons
}

export function SmartForm({ 
  action, 
  successMessage = "Opération réussie !", 
  errorMessage = "Une erreur est survenue",
  className, 
  children 
}: SmartFormProps) {
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    // On appelle l'action passée en paramètre
    const promise = action(formData);

    toast.promise(promise, {
      loading: 'Chargement...',
      success: () => {
        formRef.current?.reset(); // La magie du reset est centralisée ici
        return successMessage;
      },
      error: errorMessage,
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className={className}>
      {children}
    </form>
  );
}