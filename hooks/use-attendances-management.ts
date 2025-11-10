import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  useAdminAttendances,
  useUpdateAttendance,
  useEmployees,
} from "./use-attendance";
import { Employee } from "./use-employees";
import { Attendance } from "@/lib/types";

// Hook pour la gestion des présences
export function useAttendancesManagement() {
  const [dateFilter, setDateFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const { toast } = useToast();

  // Filtres pour l'API
  const filters = {
    ...(dateFilter && { date: dateFilter }),
    ...(departmentFilter !== "all" && { department: departmentFilter }),
    ...(employeeFilter !== "all" && { userId: employeeFilter }),
    ...(statusFilter !== "all" && { status: statusFilter }),
  };

  const { data: attendancesData, isLoading } = useAdminAttendances(filters);
  const { data: employeesData } = useEmployees();
  const updateAttendanceMutation = useUpdateAttendance();

  const attendances: any[] = attendancesData || [];
  const employees: Employee[] = employeesData || [];

  // Départements uniques
  const departments = Array.from(
    new Set(employees.map((emp) => emp.department).filter(Boolean))
  ) as string[];

  // Gestion des actions
  const handleSave = (attendanceId: string) => {
    updateAttendanceMutation.mutate(
      { id: attendanceId, data: editData },
      {
        onSuccess: () => {
          toast({
            title: "Présence mise à jour",
            description: "Les modifications ont été enregistrées",
            variant: "default",
          });
          setEditingRow(null);
          setEditData({});
        },
        onError: (error: any) => {
          toast({
            title: "Erreur",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleEdit = (attendance: Attendance) => {
    setEditingRow(attendance.id);
    setEditData({
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      status: attendance.status,
      notes: attendance.notes,
    });
  };

  const handleResetFilters = () => {
    setDateFilter("");
    setDepartmentFilter("all");
    setEmployeeFilter("all");
    setStatusFilter("all");
    setGlobalFilter("");
  };

  const exportToCSV = () => {
    const headers = [
      "Employé",
      "Département",
      "Date",
      "Arrivée",
      "Départ",
      "Statut",
      "Notes",
    ];
    const csvData = attendances.map((attendance) => [
      attendance.user.name,
      attendance.user.department || "",
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
    a.download = `presences-admin-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi",
      description: "Les données ont été exportées en CSV",
    });
  };

  return {
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
    isUpdating: updateAttendanceMutation.isPending,
  };
}

// Fonctions utilitaires (à déplacer depuis utils si nécessaire)
function formatDateSafe(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("fr-FR");
  } catch {
    return "Date invalide";
  }
}

function formatTimeSafe(timeString: string | null): string {
  if (!timeString) return "--:--";
  try {
    return new Date(timeString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--:--";
  }
}
