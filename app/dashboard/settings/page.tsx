import { UserProfile } from "@clerk/nextjs"; 
// Clerk possède un composant géant pour gérer le profil, 
// mais souvent on préfère faire nos propres cartes pour l'intégration UX.
// Ici, on va faire un mix : des cartes custom qui ouvrent les modals Clerk.

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"; // npx shadcn@latest add label
import { Input } from "@/components/ui/input";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export default async function SettingsPage() {
  const user = await currentUser();
  if(!user) return null;

  // On récupère aussi l'info de la DB pour montrer qu'on est synchro
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Paramètres</h1>

      {/* SECTION 1 : APPARENCE */}
      <Card>
        <CardHeader>
          <CardTitle>Apparence</CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
                <Label>Thème de l'interface</Label>
                <p className="text-sm text-gray-500">
                    Choisissez entre le mode clair et sombre.
                </p>
            </div>
            <ModeToggle />
        </CardContent>
      </Card>

      {/* SECTION 2 : MON COMPTE (Info Clerk) */}
      <Card>
        <CardHeader>
          <CardTitle>Mon Compte</CardTitle>
          <CardDescription>
            Informations gérées par Clerk (votre fournisseur d'authentification).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={user.emailAddresses[0].emailAddress} disabled className="bg-slate-100" />
            </div>
            <div className="grid gap-2">
                <Label>Nom complet</Label>
                <Input value={user.fullName || ""} disabled className="bg-slate-100" />
            </div>
            <div className="grid gap-2">
                <Label>ID Utilisateur (Interne)</Label>
                <Input value={user.id} disabled className="bg-slate-100 font-mono text-xs" />
            </div>
        </CardContent>
        <CardFooter>
            {/* Ce bouton redirige vers la page de profil hébergée par Clerk */}
            <a href={process.env.NEXT_PUBLIC_CLERK_USER_PROFILE_URL || "https://accounts.clerk.com/user"} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Gérer mon profil Clerk (Avatar, Mot de passe...)</Button>
            </a>
        </CardFooter>
      </Card>

      {/* SECTION 3 : DANGER ZONE */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Zone de Danger</CardTitle>
          <CardDescription>
            Attention, ces actions sont irréversibles.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
                <p className="font-medium">Supprimer mon compte</p>
                <p className="text-sm text-gray-500">
                    Cela supprimera toutes vos notes et tâches définitivement.
                </p>
            </div>
            <Button variant="destructive">Supprimer mon compte</Button>
        </CardContent>
      </Card>

    </div>
  );
}