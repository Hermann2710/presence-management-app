import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  user: {
    name: string;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Tableau de Bord Admin</h1>
        <p className="text-gray-600 mt-1">
          Vue d'ensemble de l'entreprise -{" "}
          {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Connecté en tant que</span>
        <Badge variant="secondary">{user.name}</Badge>
      </div>
    </div>
  );
}
