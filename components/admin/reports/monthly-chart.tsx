import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { MonthlyStats } from "@/types/dashboard";

interface MonthlyChartProps {
  monthlyStats: MonthlyStats[];
}

export function MonthlyChart({ monthlyStats }: MonthlyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Évolution des Présences
        </CardTitle>
        <CardDescription>Tendances sur les 6 derniers mois</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyStats.map((month: MonthlyStats) => (
            <div key={month.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{month.month}</span>
                <span className="font-medium">{month.present} présences</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(month.present / month.total) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{month.absent} absences</span>
                <span>{month.late} retards</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
