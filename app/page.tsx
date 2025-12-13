import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Mon SaaS de Notes</h1>
      <Button>Clique-moi (Je suis un bouton Shadcn)</Button>
    </main>
  );
}