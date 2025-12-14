import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from "./actions";
import { NotesGrid } from "@/components/dashboard/notes/NotesGrid";
import { DashboardShell, DashboardHeader, DashboardCard } from "@/components/dashboard/ui";

export default async function NotesPage() {
  const user = await currentUser();
  if (!user) return null;

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    // Plus de classes CSS ici ! Juste de la structure sémantique.
    <DashboardShell>
      
      <DashboardHeader heading="Mes Notes" count={notes.length} />

      <DashboardCard title="Nouvelle note" className="mb-10">
        <form action={createNote} className="space-y-4">
          <Input name="title" placeholder="Titre de la note..." required />
          <Textarea name="content" placeholder="Contenu..." required />
          <div className="flex justify-end">
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DashboardCard>

      <NotesGrid notes={notes} />

    </DashboardShell>
  );
}