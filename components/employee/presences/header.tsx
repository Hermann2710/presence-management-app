import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PresencesHeaderProps {
  onExport: () => void;
}

export function PresencesHeader({ onExport }: PresencesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Mes Présences</h1>
        <p className="text-gray-600 mt-1">
          Historique complet de vos pointages
        </p>
      </div>

      <Button onClick={onExport} className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        Exporter CSV
      </Button>
    </div>
  );
}
