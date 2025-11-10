"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import { useEmployeeAttendancesManagement } from "@/hooks/use-employee-attendances";

// Composants
import { LoadingState } from "./presences/loading-state";
import { PresencesHeader } from "./presences/header";
import { PresencesFilters } from "./presences/filters";
import { PresencesTable } from "./presences/table";
import { PresencesStats } from "./presences/stats";
import { Badge } from "../ui/badge";

interface MesPresencesPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function MesPresencesPage({ user }: MesPresencesPageProps) {
  const {
    // État
    dateFilter,
    setDateFilter,
    monthFilter,
    setMonthFilter,
    statusFilter,
    setStatusFilter,
    globalFilter,
    setGlobalFilter,

    // Données
    attendances,
    isLoading,
    stats,

    // Utilitaires
    getMonthOptions,
    formatDateSafe,
    formatTimeSafe,

    // Actions
    exportToCSV,
    handleResetFilters,
  } = useEmployeeAttendancesManagement();

  // Configuration des colonnes
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => formatDateSafe(info.getValue() as string),
      size: 120,
    },
    {
      accessorKey: "checkIn",
      header: "Heure d'arrivée",
      cell: (info) => formatTimeSafe(info.getValue() as string | null),
      size: 120,
    },
    {
      accessorKey: "checkOut",
      header: "Heure de départ",
      cell: (info) => formatTimeSafe(info.getValue() as string | null),
      size: 120,
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <Badge
            variant="secondary"
            className={
              status === "PRESENT"
                ? "bg-green-100 text-green-800"
                : status === "LATE"
                ? "bg-yellow-100 text-yellow-800"
                : status === "ABSENT"
                ? "bg-red-100 text-red-800"
                : status === "SICK_LEAVE"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {status === "PRESENT"
              ? "Présent"
              : status === "LATE"
              ? "En retard"
              : status === "ABSENT"
              ? "Absent"
              : status === "SICK_LEAVE"
              ? "Maladie"
              : "Congés"}
          </Badge>
        );
      },
      size: 120,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: (info) => (info.getValue() as string) || "-",
      size: 200,
    },
  ];

  // Configuration de la table
  const table = useReactTable({
    data: attendances,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto max-w-8xl">
      <div className="space-y-6">
        {/* Header */}
        <PresencesHeader onExport={exportToCSV} />

        {/* Filtres */}
        <PresencesFilters
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          monthFilter={monthFilter}
          onMonthFilterChange={setMonthFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          monthOptions={getMonthOptions()}
          onReset={handleResetFilters}
        />

        {/* Tableau */}
        <PresencesTable
          table={table}
          columns={columns}
          totalCount={attendances.length}
        />

        {/* Statistiques */}
        <PresencesStats stats={stats} />
      </div>
    </div>
  );
}
