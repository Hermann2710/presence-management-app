// components/admin/admin-presences-page.tsx
"use client";

import { useState } from "react";
import {
  useAdminAttendances,
  useUpdateAttendance,
  useEmployees,
} from "@/hooks/use-attendance";
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
import { Download } from "lucide-react";

// Composants réutilisables
import { AttendanceFilters } from "@/components/attendances/attendance-filters";
import { AttendanceTable } from "@/components/attendances/attendance-table";
import { createAttendanceColumns } from "@/components/attendances/columns";
import { Attendance, Employee } from "@/components/attendances/types";
import { formatDateSafe, formatTimeSafe } from "@/components/attendances/utils";

interface AdminPresencesPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminPresencesPage({ user }: AdminPresencesPageProps) {
  const [dateFilter, setDateFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const { toast } = useToast();

  // Filtres pour l'API
  const filters: { date?: string; department?: string; userId?: string } = {};

  if (dateFilter) filters.date = dateFilter;
  if (departmentFilter && departmentFilter !== "all")
    filters.department = departmentFilter;
  if (employeeFilter && employeeFilter !== "all")
    filters.userId = employeeFilter;

  const { data: attendancesData, isLoading } = useAdminAttendances(filters);
  const { data: employeesData } = useEmployees();
  const updateAttendanceMutation = useUpdateAttendance();

  const attendances: Attendance[] = attendancesData || [];
  const employees: Employee[] = employeesData || [];

  // Départements uniques
  const departments = Array.from(
    new Set(employees.map((emp) => emp.department).filter(Boolean))
  );

  // Gestionnaires d'événements
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
        onError: (error) => {
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

  const columns = createAttendanceColumns({
    editingRow,
    editData,
    setEditData,
    dateFilter,
    onSave: handleSave,
    onCancel: handleCancel,
    onEdit: handleEdit,
    isUpdating: updateAttendanceMutation.isPending,
  });

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
  };

  const handleResetFilters = () => {
    setDateFilter("");
    setDepartmentFilter("all");
    setEmployeeFilter("all");
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
            <h1 className="text-3xl font-bold">Gestion des Présences</h1>
            <p className="text-gray-600 mt-1">
              Administration complète des pointages
            </p>
          </div>

          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter CSV
          </Button>
        </div>

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
          employees={employees}
          onReset={handleResetFilters}
        />

        {/* Tableau */}
        <AttendanceTable table={table} columns={columns} />
      </div>
    </div>
  );
}
