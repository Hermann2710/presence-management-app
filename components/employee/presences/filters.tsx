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
import { Filter } from "lucide-react";

interface PresencesFiltersProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  monthFilter: string;
  onMonthFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  monthOptions: { value: string; label: string }[];
  onReset: () => void;
}

export function PresencesFilters({
  globalFilter,
  onGlobalFilterChange,
  dateFilter,
  onDateFilterChange,
  monthFilter,
  onMonthFilterChange,
  statusFilter,
  onStatusFilterChange,
  monthOptions,
  onReset,
}: PresencesFiltersProps) {
  const hasActiveFilters =
    dateFilter ||
    monthFilter !== "all" ||
    statusFilter !== "all" ||
    globalFilter;

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
            <Input
              placeholder="Rechercher..."
              value={globalFilter}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
            />
          </div>

          {/* Filtre par date spécifique */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Date spécifique
            </label>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                onDateFilterChange(e.target.value);
                onMonthFilterChange("all");
              }}
            />
          </div>

          {/* Filtre par mois */}
          <div>
            <label className="text-sm font-medium mb-2 block">Mois</label>
            <Select
              value={monthFilter}
              onValueChange={(value) => {
                onMonthFilterChange(value);
                onDateFilterChange("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un mois" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les mois</SelectItem>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
                <SelectItem value="PRESENT">Présent</SelectItem>
                <SelectItem value="LATE">En retard</SelectItem>
                <SelectItem value="ABSENT">Absent</SelectItem>
                <SelectItem value="SICK_LEAVE">Maladie</SelectItem>
                <SelectItem value="VACATION">Congés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset filters */}
        {hasActiveFilters && (
          <div className="mt-4">
            <Button variant="outline" onClick={onReset}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
