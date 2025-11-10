import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

interface DepartmentStatsProps {
  departmentStats: any[];
}

export function DepartmentStats({ departmentStats }: DepartmentStatsProps) {
  if (!departmentStats || departmentStats.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Répartition par Département
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentStats.map((dept: any) => (
            <div
              key={dept.department}
              className="text-center p-4 border rounded-lg"
            >
              <div className="text-2xl font-bold text-blue-600">
                {dept._count}
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {dept.department || "Non assigné"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
