import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from "./actions";
import { NotesGrid } from "@/components/dashboard/notes/NotesGrid";
import { DashboardShell, DashboardHeader, DashboardCard } from "@/components/dashboard/ui";
import { SmartForm } from "@/components/SmartForm";
import { Plus } from "lucide-react";

export default async function NotesPage() {
  const user = await currentUser();
  if (!user) return null;

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell>
      
      <DashboardHeader heading="Mes Notes" count={notes.length} />

      <DashboardCard title="Nouvelle note" className="mb-10">
        <SmartForm 
          action={createNote} 
          successMessage="Note ajoutée au carnet ! 📝"
          className="space-y-4" // Layout vertical
          >
          <Input name="title" placeholder="Titre de la note..." required />
          <Textarea name="content" placeholder="Contenu..." required />
          <div className="flex justify-end">
            <Button type="submit">
              <Plus size={18} className="mr-2" /> Ajouter
            </Button>
          </div>
        </SmartForm>
      </DashboardCard>

      <NotesGrid notes={notes} />

    </DashboardShell>
  );
}