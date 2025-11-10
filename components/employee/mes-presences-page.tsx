// components/employee/mes-presences-page.tsx
"use client";

import { useState } from "react";
import { useEmployeeAttendances } from "@/hooks/use-attendance";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MesPresencesPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface Attendance {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  notes?: string;
  user: {
    name: string;
    email: string;
  };
}

export function MesPresencesPage({ user }: MesPresencesPageProps) {
  const [dateFilter, setDateFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");

  // Construire les filtres pour l'API - VERSION CORRIGÉE
  const filters: { startDate?: string; endDate?: string } = {};

  if (dateFilter) {
    filters.startDate = dateFilter;
    filters.endDate = dateFilter;
  } else if (monthFilter && monthFilter !== "all") {
    const [year, month] = monthFilter.split("-");
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 0);

    // Vérifier que les dates sont valides avant de les utiliser
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      filters.startDate = startDate.toISOString();
      filters.endDate = endDate.toISOString();
    }
  }

  const { data: attendancesData, isLoading } = useEmployeeAttendances(filters);

  const attendances: Attendance[] = attendancesData || [];

  // Fonction utilitaire pour formater les dates en toute sécurité
  const formatDateSafe = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Date invalide"
      : date.toLocaleDateString("fr-FR");
  };

  const formatTimeSafe = (timeString: string | null) => {
    if (!timeString) return "--:--";
    const time = new Date(timeString);
    return isNaN(time.getTime())
      ? "--:--"
      : time.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  // Colonnes de la table - VERSION CORRIGÉE
  const columns: ColumnDef<Attendance>[] = [
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

  // Générer les options de mois (12 derniers mois) - VERSION CORRIGÉE
  const getMonthOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      // Vérifier que la date est valide
      if (!isNaN(date.getTime())) {
        const value = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        const label = date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
        });
        options.push({ value, label });
      }
    }

    return options;
  };

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Heure Arrivée",
      "Heure Départ",
      "Statut",
      "Notes",
    ];
    const csvData = attendances.map((attendance) => [
      formatDateSafe(attendance.date),
      formatTimeSafe(attendance.checkIn),
      formatTimeSafe(attendance.checkOut),
      attendance.status,
      attendance.notes || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((field) => `"${field}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mes-presences-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
            <h1 className="text-3xl font-bold">Mes Présences</h1>
            <p className="text-gray-600 mt-1">
              Historique complet de vos pointages
            </p>
          </div>

          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter CSV
          </Button>
        </div>

        {/* Filtres */}
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
                <label className="text-sm font-medium mb-2 block">
                  Recherche
                </label>
                <Input
                  placeholder="Rechercher..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
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
                    setDateFilter(e.target.value);
                    setMonthFilter("all");
                  }}
                />
              </div>

              {/* Filtre par mois */}
              <div>
                <label className="text-sm font-medium mb-2 block">Mois</label>
                <Select
                  value={monthFilter}
                  onValueChange={(value) => {
                    setMonthFilter(value);
                    setDateFilter("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un mois" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les mois</SelectItem>
                    {getMonthOptions().map((option) => (
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
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
            {(dateFilter ||
              monthFilter !== "all" ||
              statusFilter !== "all" ||
              globalFilter) && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDateFilter("");
                    setMonthFilter("all");
                    setStatusFilter("all");
                    setGlobalFilter("");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tableau */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des présences</CardTitle>
            <CardDescription>
              {attendances.length} présence(s) trouvée(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="border-b bg-muted/50">
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="text-left p-3 font-semibold"
                            style={{ width: header.getSize() }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="p-3">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="p-8 text-center text-gray-500"
                        >
                          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>Aucune présence trouvée</p>
                          <p className="text-sm mt-1">
                            Ajustez vos filtres ou vérifiez vos pointages
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {table.getPageCount() > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Page {table.getState().pagination.pageIndex + 1} sur{" "}
                  {table.getPageCount()}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistiques rapides */}
        {attendances.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {attendances.filter((a) => a.status === "PRESENT").length}
                  </div>
                  <div className="text-sm text-gray-600">Présences</div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {attendances.filter((a) => a.status === "LATE").length}
                  </div>
                  <div className="text-sm text-gray-600">Retards</div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {attendances.filter((a) => a.status === "ABSENT").length}
                  </div>
                  <div className="text-sm text-gray-600">Absences</div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {attendances.filter((a) => a.checkIn && a.checkOut).length}
                  </div>
                  <div className="text-sm text-gray-600">Jours complets</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
