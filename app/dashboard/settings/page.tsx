import { ModeToggle } from "@/components/dashboard/settings/ModeToggle"; // Vérifie bien le chemin d'import !
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
// 👇 Import UI
import { DashboardShell, DashboardHeader } from "@/components/dashboard/ui";

export default async function SettingsPage() {
  const user = await currentUser();
  if(!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  return (
    <DashboardShell>
      
      <DashboardHeader heading="Paramètres" />

      <div className="space-y-8">
        
        {/* SECTION 1 : APPARENCE */}
        <Card>
            <CardHeader>
            <CardTitle>Apparence</CardTitle>
            <CardDescription>Personnalisez l'apparence de l'interface.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="space-y-1">
                    <Label>Thème de l'interface</Label>
                    <p className="text-sm text-muted-foreground">
                        Choisissez entre le mode clair et sombre.
                    </p>
                </div>
                <ModeToggle />
            </CardContent>
        </Card>

        {/* SECTION 2 : MON COMPTE */}
        <Card>
            <CardHeader>
            <CardTitle>Mon Compte</CardTitle>
            <CardDescription>Informations gérées par Clerk.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label>Email</Label>
                    {/* Correction Darkmode : bg-muted au lieu de bg-slate-100 */}
                    <Input value={user.emailAddresses[0].emailAddress} disabled className="bg-muted" />
                </div>
                <div className="grid gap-2">
                    <Label>Nom complet</Label>
                    <Input value={user.fullName || ""} disabled className="bg-muted" />
                </div>
                <div className="grid gap-2">
                    <Label>ID Utilisateur</Label>
                    <Input value={user.id} disabled className="bg-muted font-mono text-xs" />
                </div>
            </CardContent>
            <CardFooter>
                <a href={process.env.NEXT_PUBLIC_CLERK_USER_PROFILE_URL || "https://accounts.clerk.com/user"} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">Gérer mon profil Clerk</Button>
                </a>
            </CardFooter>
        </Card>

        {/* SECTION 3 : DANGER ZONE */}
        <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Zone de Danger</CardTitle>
            <CardDescription>Attention, ces actions sont irréversibles.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="font-medium">Supprimer mon compte</p>
                    <p className="text-sm text-muted-foreground">
                        Cela supprimera toutes vos données définitivement.
                    </p>
                </div>
                <Button variant="destructive">Supprimer mon compte</Button>
            </CardContent>
        </Card>

      </div>
    </DashboardShell>
  );
}