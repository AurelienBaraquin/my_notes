"use client"; // Important car on a de l'interactivité (le bouton)

import { Button } from "@/components/ui/button";
// On va devoir passer l'action deleteNote en prop ou l'importer si c'est une server action
// Pour faire simple et propre, on va garder l'action dans le formulaire ici
import { deleteNote } from "@/app/dashboard/notes/actions";; 
import { Note } from "@prisma/client"; // Le type généré automatiquement par Prisma !

export function NoteCard({ note }: { note: Note }) {
  return (
    <div className="border bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-lg mb-2">{note.title}</h3>
        <p className="text-gray-600 text-sm whitespace-pre-wrap mb-4">
          {note.content}
        </p>
      </div>

      <div className="flex justify-between items-center mt-2 border-t pt-2">
        <p className="text-xs text-gray-400">
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