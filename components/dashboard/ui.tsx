import { cn } from "@/lib/utils";

// 1. LE CONTENEUR PRINCIPAL
export function DashboardShell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      {children}
    </div>
  );
}

// 2. L'EN-TÊTE (TITRE + BADGE)
export function DashboardHeader({
  heading,
  text,
  count,
  children
}: {
  heading: string;
  text?: string;
  count?: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>

      {count !== undefined && (
        <span className="bg-secondary text-primary font-bold px-3 py-1 rounded-full text-sm">
          {count} {count > 1 ? "éléments" : "élément"}
        </span>
      )}
      
      {children}
    </div>
  );
}

// 3. LA CARTE DE CONTENU
export function DashboardCard({
  children,
  title,
  className
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("border p-6 rounded-xl bg-card text-card-foreground shadow-sm", className)}>
      {title && <h2 className="font-semibold text-lg mb-4">{title}</h2>}
      {children}
    </div>
  );
}