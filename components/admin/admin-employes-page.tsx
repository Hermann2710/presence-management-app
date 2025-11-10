"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import { useEmployeesManagement } from "@/hooks/use-employees-management";

// Composants
import { EmployeesHeader } from "./employees/header";
import { EmployeesStats } from "./employees/stats";
import { EmployeesFilters } from "./employees/filters";
import { BulkActions } from "./employees/bulk-actions";
import { EmployeeForm } from "@/components/admin/employees/employee-form";
import { EmployeesTable } from "@/components/admin/employees/employees-table";

// Colonnes
import { columns } from "./employees/employees-columns";

interface AdminEmployesPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminEmployesPage({ user }: AdminEmployesPageProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    // État
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    globalFilter,
    setGlobalFilter,
    formOpen,
    setFormOpen,
    selectedEmployee,

    // Données
    employees,
    isLoading,
    stats,
    departments,

    // Actions
    handleEditEmployee,
    handleDeleteEmployee,
    handleFormSubmit,
    handleCreateEmployee,
    handleResetFilters,
    exportToCSV,

    // États de chargement
    isCreating,
    isUpdating,
  } = useEmployeesManagement();

  // Configuration de la table
  const table = useReactTable({
    data: employees,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    meta: {
      onEdit: handleEditEmployee as any,
      onDelete: handleDeleteEmployee as any,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

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
        <EmployeesHeader
          onExport={exportToCSV}
          onCreateEmployee={handleCreateEmployee}
        />

        {/* Statistiques */}
        <EmployeesStats stats={stats} />

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

        {/* Modal de formulaire */}
        <EmployeeForm
          open={formOpen}
          onOpenChange={setFormOpen}
          employee={selectedEmployee}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </div>
    </div>
  );
}
