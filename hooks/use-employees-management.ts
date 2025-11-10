import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  useEmployees,
  useDeleteEmployee,
  useCreateEmployee,
  useUpdateEmployee,
  Employee,
} from "./use-employees";

// Hook pour la gestion des employés
export function useEmployeesManagement() {
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const { toast } = useToast();

  const {
    data: employeesData,
    isLoading,
    refetch,
  } = useEmployees({
    department: departmentFilter !== "all" ? departmentFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const deleteEmployee = useDeleteEmployee();
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();

  const employees: Employee[] = employeesData || [];

  // Calcul des statistiques
  const stats = {
    total: employees.length,
    active: employees.filter((emp) => emp.status === "ACTIVE").length,
    withDepartment: employees.filter((emp) => emp.department).length,
    averageAttendances:
      employees.length > 0
        ? Math.round(
            employees.reduce((sum, emp) => sum + emp._count.attendances, 0) /
              employees.length
          )
        : 0,
  };

  // Départements uniques
  const departments = Array.from(
    new Set(employees.map((emp) => emp.department).filter(Boolean))
  ) as string[];

  // Gestion des actions
  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  const handleDeleteEmployee = async (employee: Employee) => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer ${employee.name} ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    try {
      await deleteEmployee.mutateAsync(employee.id);
      toast({
        title: "Employé supprimé",
        description: `${employee.name} a été supprimé avec succès`,
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (selectedEmployee) {
        // Édition
        await updateEmployee.mutateAsync({
          id: selectedEmployee.id,
          data,
        });
        toast({
          title: "Employé modifié",
          description: "Les modifications ont été enregistrées",
        });
      } else {
        // Création
        await createEmployee.mutateAsync(data);
        toast({
          title: "Employé créé",
          description: "Le nouvel employé a été ajouté avec succès",
        });
      }

      setFormOpen(false);
      setSelectedEmployee(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateEmployee = () => {
    setSelectedEmployee(null);
    setFormOpen(true);
  };

  const handleResetFilters = () => {
    setDepartmentFilter("all");
    setStatusFilter("all");
    setGlobalFilter("");
  };

  const exportToCSV = () => {
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

    toast({
      title: "Export réussi",
      description: "Les données ont été exportées en CSV",
    });
  };

  return {
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
    setSelectedEmployee,

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
    isCreating: createEmployee.isPending,
    isUpdating: updateEmployee.isPending,
    isDeleting: deleteEmployee.isPending,
  };
}
