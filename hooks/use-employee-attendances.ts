import { useState } from "react";
import { useEmployeeAttendances } from "./use-attendance";

// Hook pour la gestion des présences employé
export function useEmployeeAttendancesManagement() {
  const [dateFilter, setDateFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");

  // Construire les filtres pour l'API
  const filters: { startDate?: string; endDate?: string } = {};

  if (dateFilter) {
    filters.startDate = dateFilter;
    filters.endDate = dateFilter;
  } else if (monthFilter && monthFilter !== "all") {
    const [year, month] = monthFilter.split("-");
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 0);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      filters.startDate = startDate.toISOString();
      filters.endDate = endDate.toISOString();
    }
  }

  const { data: attendancesData, isLoading } = useEmployeeAttendances(filters);

  const attendances = attendancesData || [];

  // Générer les options de mois (12 derniers mois)
  const getMonthOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
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

  // Fonctions utilitaires
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

  // Export CSV
  const exportToCSV = () => {
    const headers = [
      "Date",
      "Heure Arrivée",
      "Heure Départ",
      "Statut",
      "Notes",
    ];
    const csvData = attendances.map((attendance: any) => [
      formatDateSafe(attendance.date),
      formatTimeSafe(attendance.checkIn),
      formatTimeSafe(attendance.checkOut),
      attendance.status,
      attendance.notes || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row: any) =>
        row.map((field: any) => `"${field}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mes-presences-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset des filtres
  const handleResetFilters = () => {
    setDateFilter("");
    setMonthFilter("all");
    setStatusFilter("all");
    setGlobalFilter("");
  };

  // Statistiques
  const stats = {
    total: attendances.length,
    present: attendances.filter((a: any) => a.status === "PRESENT").length,
    late: attendances.filter((a: any) => a.status === "LATE").length,
    absent: attendances.filter((a: any) => a.status === "ABSENT").length,
    completeDays: attendances.filter((a: any) => a.checkIn && a.checkOut)
      .length,
  };

  return {
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
  };
}
