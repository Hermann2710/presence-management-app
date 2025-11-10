import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";

interface EmployeesHeaderProps {
  onExport: () => void;
  onCreateEmployee: () => void;
}

export function EmployeesHeader({
  onExport,
  onCreateEmployee,
}: EmployeesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Gestion des Employés</h1>
        <p className="text-gray-600 mt-1">
          Administration du personnel de l'entreprise
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onExport}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
        <Button onClick={onCreateEmployee} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Nouvel Employé
        </Button>
      </div>
    </div>
  );
}
