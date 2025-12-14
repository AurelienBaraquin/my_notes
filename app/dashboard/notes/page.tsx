import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from "./actions";
import { NotesGrid } from "@/components/dashboard/notes/NotesGrid";
import  { CreateNoteForm } from "@/components/dashboard/notes/CreateNoteForm";
import { DashboardShell, DashboardHeader, DashboardCard } from "@/components/dashboard/ui";

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
        <CreateNoteForm />
      </DashboardCard>

      <NotesGrid notes={notes} />

    </DashboardShell>
  );
}