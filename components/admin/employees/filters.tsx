import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface EmployeesFiltersProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  departments: string[];
  onReset: () => void;
}

export function EmployeesFilters({
  globalFilter,
  onGlobalFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  statusFilter,
  onStatusFilterChange,
  departments,
  onReset,
}: EmployeesFiltersProps) {
  const hasActiveFilters =
    departmentFilter !== "all" || statusFilter !== "all" || globalFilter;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtres
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Recherche globale */}
          <div>
            <label className="text-sm font-medium mb-2 block">Recherche</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un employé..."
                value={globalFilter}
                onChange={(e) => onGlobalFilterChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Filtre par département */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Département
            </label>
            <Select
              value={departmentFilter}
              onValueChange={onDepartmentFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les départements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtre par statut */}
          <div>
            <label className="text-sm font-medium mb-2 block">Statut</label>
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="ACTIVE">Actif</SelectItem>
                <SelectItem value="INACTIVE">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset filters */}
          <div className="flex items-end">
            {hasActiveFilters && (
              <Button variant="outline" onClick={onReset} className="w-full">
                Réinitialiser
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
