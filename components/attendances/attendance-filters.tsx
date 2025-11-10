// components/attendances/attendance-filters.tsx
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
import { Employee } from "./types";

interface AttendanceFiltersProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (value: string) => void;
  employeeFilter: string;
  onEmployeeFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  departments: string[];
  employees: Employee[];
  onReset: () => void;
}

export function AttendanceFilters({
  globalFilter,
  onGlobalFilterChange,
  dateFilter,
  onDateFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  employeeFilter,
  onEmployeeFilterChange,
  statusFilter,
  onStatusFilterChange,
  departments,
  employees,
  onReset,
}: AttendanceFiltersProps) {
  const hasActiveFilters =
    dateFilter ||
    departmentFilter !== "all" ||
    employeeFilter !== "all" ||
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Recherche globale */}
          <div>
            <label className="text-sm font-medium mb-2 block">Recherche</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={globalFilter}
                onChange={(e) => onGlobalFilterChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Filtre par date */}
          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
            />
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

          {/* Filtre par employé */}
          <div>
            <label className="text-sm font-medium mb-2 block">Employé</label>
            <Select
              value={employeeFilter}
              onValueChange={onEmployeeFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les employés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les employés</SelectItem>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
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
