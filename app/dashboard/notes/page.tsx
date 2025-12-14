import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from "./actions"; // Utilise @/app/actions
import { NoteCard } from "@/components/NoteCard";

export default async function NotesPage() {
  const user = await currentUser();
  if (!user) return null;

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Mes Notes</h1>
        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">
          {notes.length} notes
        </span>
      </div>

      <form action={createNote} className="space-y-4 border p-6 rounded-lg bg-card text-card-foreground shadow-sm mb-10">
        <h2 className="font-semibold text-lg">Nouvelle note</h2>
        <Input name="title" placeholder="Titre de la note..." required />
        <Textarea name="content" placeholder="Contenu..." required />
        <div className="flex justify-end">
            <Button type="submit">Ajouter</Button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}