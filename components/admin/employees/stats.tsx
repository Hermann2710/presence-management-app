import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserCheck, Building, Calendar } from "lucide-react";

interface EmployeesStatsProps {
  stats: {
    total: number;
    active: number;
    withDepartment: number;
    averageAttendances: number;
  };
}

export function EmployeesStats({ stats }: EmployeesStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Employés
              </p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">Effectif total</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Employés Actifs
              </p>
              <p className="text-2xl font-bold mt-1">{stats.active}</p>
              <p className="text-xs text-gray-500 mt-1">En activité</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avec Département
              </p>
              <p className="text-2xl font-bold mt-1">{stats.withDepartment}</p>
              <p className="text-xs text-gray-500 mt-1">Assignés</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Moy. Pointages
              </p>
              <p className="text-2xl font-bold mt-1">
                {stats.averageAttendances}
              </p>
              <p className="text-xs text-gray-500 mt-1">Par employé</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
