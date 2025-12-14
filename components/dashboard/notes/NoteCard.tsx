"use client";

import { Button } from "@/components/ui/button";
import { deleteNote } from "@/app/dashboard/notes/actions";
import { Note } from "@prisma/client";

export function NoteCard({ note }: { note: Note }) {
  return (
    <div className="border bg-card text-card-foreground p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-lg mb-2">{note.title}</h3>
        <p className="text-muted-foreground text-sm whitespace-pre-wrap mb-4">
          {note.content}
        </p>
      </div>

      <div className="flex justify-between items-center mt-2 border-t pt-2">
        <p className="text-xs text-muted-foreground">
          {note.createdAt.toLocaleDateString()}
        </p>
        <form action={deleteNote}>
            <input type="hidden" name="id" value={note.id} />
            <Button variant="destructive" size="sm">Supprimer</Button>
        </form>
      </div>
    </div>
  );
}