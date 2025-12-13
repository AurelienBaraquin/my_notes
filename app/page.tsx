import { Button } from "@/components/ui/button";
// On importe les composants de Clerk
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; 
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Mon SaaS de Notes</h1>
      
      {/* Ce bloc ne s'affiche que si l'utilisateur est DECONNECTÉ */}
      <SignedOut>
        <p className="text-xl">Connectez-vous pour commencer à prendre des notes.</p>
        <SignInButton mode="modal">
          <Button>Se connecter</Button>
        </SignInButton>
      </SignedOut>

      {/* Ce bloc ne s'affiche que si l'utilisateur est CONNECTÉ */}
      <SignedIn>
        <p className="text-xl">Heureux de vous revoir !</p>
        <div className="flex gap-4 items-center">
            <Link href="/dashboard">
              <Button>Accéder à mon Dashboard</Button>
            </Link>
            {/* Le petit rond avec l'avatar de l'utilisateur */}
            <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </main>
  );
}