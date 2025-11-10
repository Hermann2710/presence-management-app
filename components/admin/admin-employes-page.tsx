// components/admin/admin-employes-page.tsx
"use client";

import { useState } from "react";
import { useEmployees } from "@/hooks/use-attendance";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";

// Composants réutilisables
import { EmployeesStats } from "@/components/employee/employees-stats";
import { EmployeesFilters } from "@/components/employee/employees-filters";
import { EmployeesTable } from "@/components/employee/employees-table";
import { BulkActions } from "@/components/employee/bulk-actions";
import { columns } from "@/components/employee/columns";

import { Employee, EmployeesStats as StatsType } from "@/types/employee";

interface AdminEmployesPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminEmployesPage({ user }: AdminEmployesPageProps) {
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: employeesData, isLoading } = useEmployees();
  const { toast } = useToast();

  const employees: Employee[] = employeesData || [];
  const departments = Array.from(
    new Set(employees.map((emp) => emp.department).filter(Boolean))
  ) as string[];

  const table = useReactTable({
    data: employees,
    columns: columns as any,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const exportToCSV = () => {
    // Logique d'export inchangée
    const headers = [
      "Nom",
      "Email",
      "Département",
      "Poste",
      "Téléphone",
      "Statut",
      "Pointages",
      "Date d'ajout",
    ];
    const csvData = employees.map((employee) => [
      employee.name,
      employee.email,
      employee.department || "",
      employee.position || "",
      employee.phone || "",
      employee.status === "ACTIVE" ? "Actif" : "Inactif",
      employee._count.attendances.toString(),
      new Date(employee.createdAt).toLocaleDateString("fr-FR"),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((field) => `"${field}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `employes-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats: StatsType = {
    total: employees.length,
    active: employees.filter((emp) => emp.status === "ACTIVE").length,
    inactive: employees.filter((emp) => emp.status === "INACTIVE").length,
    withDepartment: employees.filter((emp) => emp.department).length,
    withoutDepartment: employees.filter((emp) => !emp.department).length,
  };

  const handleResetFilters = () => {
    setDepartmentFilter("all");
    setStatusFilter("all");
    setGlobalFilter("");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-8xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Employés</h1>
            <p className="text-gray-600 mt-1">
              Administration du personnel de l'entreprise
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exporter CSV
            </Button>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Nouvel Employé
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <EmployeesStats
          stats={{
            total: stats.total,
            active: stats.active,
            withDepartment: stats.withDepartment,
            averageAttendances:
              stats.total > 0
                ? Math.round(
                    employees.reduce(
                      (sum, emp) => sum + emp._count.attendances,
                      0
                    ) / stats.total
                  )
                : 0,
          }}
        />

        {/* Filtres */}
        <EmployeesFilters
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          departments={departments}
          onReset={handleResetFilters}
        />

        {/* Tableau */}
        <EmployeesTable table={table} columns={columns} />

        {/* Actions de Masse */}
        <BulkActions />
      </div>
    </div>
  );
}
