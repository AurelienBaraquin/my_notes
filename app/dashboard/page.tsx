import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Si tu ne l'as pas : npx shadcn@latest add input
import { Textarea } from "@/components/ui/textarea"; // Si tu ne l'as pas : npx shadcn@latest add textarea
import { createNote, deleteNote } from "../actions";

export default async function Dashboard() {
  // 1. Récupérer l'utilisateur Clerk
  const user = await currentUser();

  if (!user) return <div>Non connecté</div>;

  // 2. SYNC : On vérifie si l'utilisateur existe dans NOTRE base de données
  // Si il n'existe pas, on le crée. C'est le lien magique Clerk <-> Prisma.
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id, // On utilise l'ID de Clerk comme ID Prisma !
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
      },
    });
  }

  // 3. Récupérer les notes de cet utilisateur
  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }, // Les plus récentes en haut
  });

  return (
    <main className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Mes Notes</h1>
        {/* Petit compteur de notes */}
        <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
          {notes.length} notes
        </span>
      </div>

      {/* 4. Le Formulaire d'ajout (Server Action) */}
      <form action={createNote} className="space-y-4 border p-6 rounded-lg bg-slate-50 mb-10">
        <h2 className="font-semibold text-lg">Nouvelle note</h2>
        <Input name="title" placeholder="Titre de la note..." required />
        <Textarea name="content" placeholder="Contenu..." required />
        <Button type="submit">Ajouter la note</Button>
      </form>

{/* 5. La Liste des notes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between">
            {/* Contenu de la note */}
            <div>
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-wrap mb-4">
                {note.content}
              </p>
            </div>

            {/* Pied de la note avec date et bouton supprimer */}
            <div className="flex justify-between items-center mt-2 border-t pt-2">
              <p className="text-xs text-gray-400">
                {note.createdAt.toLocaleDateString()}
              </p>

              {/* Formulaire de suppression */}
              {/* On importe l'action deleteNote qu'on vient de créer (n'oublie pas l'import en haut du fichier !) */}
              <form action={deleteNote}>
                <input type="hidden" name="id" value={note.id} />
                <Button variant="destructive" size="sm">
                   Supprimer
                </Button>
              </form>
            </div>
          </div>
        ))}
        
        {notes.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-10">
                Aucune note pour le moment. Créez-en une !
            </p>
        )}
      </div>
    </main>
  );
}