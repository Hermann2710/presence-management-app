import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart } from "lucide-react";
import { DepartmentChartData } from "@/types/dashboard";

interface DepartmentChartProps {
  departmentStats: DepartmentChartData[];
}

export function DepartmentChart({ departmentStats }: DepartmentChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Répartition par Département
        </CardTitle>
        <CardDescription>Effectif et présence par service</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departmentStats.map((dept: DepartmentChartData) => (
            <div key={dept.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                <span className="text-sm font-medium">{dept.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right text-sm">
                  <div className="font-medium">
                    {dept.present}/{dept.total}
                  </div>
                  <div className="text-gray-500">{dept.value}%</div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${dept.color} transition-all duration-500`}
                    style={{ width: `${dept.value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
