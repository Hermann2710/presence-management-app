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

import { useAttendancesManagement } from "@/hooks/use-attendances-management";

// Composants
import { AttendancesHeader } from "./attendances/header";
import { LoadingState } from "./attendances/loading-state";
import { AttendanceFilters } from "@/components/admin/attendances/attendance-filters";
import { AttendanceTable } from "./attendances/attendance-table";
import { createAttendanceColumns } from "./attendances/columns";

interface AdminPresencesPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminPresencesPage({ user }: AdminPresencesPageProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    // État
    dateFilter,
    setDateFilter,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    employeeFilter,
    setEmployeeFilter,
    globalFilter,
    setGlobalFilter,
    editingRow,
    setEditingRow,
    editData,
    setEditData,

    // Données
    attendances,
    employees,
    departments,
    isLoading,

    // Actions
    handleSave,
    handleCancel,
    handleEdit,
    handleResetFilters,
    exportToCSV,

    // États de chargement
    isUpdating,
  } = useAttendancesManagement();

  // Configuration des colonnes
  const columns = createAttendanceColumns({
    editingRow,
    editData,
    setEditData,
    dateFilter,
    onSave: handleSave,
    onCancel: handleCancel,
    onEdit: handleEdit as any,
    isUpdating,
  });

  // Configuration de la table
  const table = useReactTable({
    data: attendances,
    columns,
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

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto max-w-8xl">
      <div className="space-y-6">
        {/* Header */}
        <AttendancesHeader onExport={exportToCSV} />

        {/* Filtres */}
        <AttendanceFilters
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          employeeFilter={employeeFilter}
          onEmployeeFilterChange={setEmployeeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          departments={departments}
          employees={employees as any[]}
          onReset={handleResetFilters}
        />

        {/* Tableau */}
        <AttendanceTable table={table} columns={columns} />
      </div>
    </div>
  );
}
