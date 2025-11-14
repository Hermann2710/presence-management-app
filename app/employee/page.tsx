import { EmployeeDashboard } from "@/components/employee/employee-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Accueil de l'employé",
};

export default function EmployeePage() {
  return <EmployeeDashboard />;
}
