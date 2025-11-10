// components/employees/employees-stats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmployeesStatsProps {
  stats: {
    total: number;
    active: number;
    withDepartment: number;
    averageAttendances: number;
  };
}

export function EmployeesStats({ stats }: EmployeesStatsProps) {
  const statCards = [
    {
      label: "Total Employés",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Actifs",
      value: stats.active,
      icon: Badge,
      color: "text-green-600",
      badge: true,
    },
    {
      label: "Avec Département",
      value: stats.withDepartment,
      icon: Building,
      color: "text-blue-600",
    },
    {
      label: "Moyenne Pointages",
      value: stats.averageAttendances,
      icon: Briefcase,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              {stat.badge ? (
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              ) : (
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
