import EmployeeList from "@/components/admin/employees/employee-list";
import { RegisterEmployeeForm } from "@/components/admin/employees/register-employee-form";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employés</h2>
          <p className="text-muted-foreground">
            Gérer les employés de l'entreprise
          </p>
        </div>
        <RegisterEmployeeForm />
      </div>
      <EmployeeList />
    </div>
  );
}
