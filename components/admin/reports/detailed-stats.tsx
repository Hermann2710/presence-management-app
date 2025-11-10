import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, AlertTriangle } from "lucide-react";

interface DetailedStatsProps {
  stats: {
    totalEmployees: number;
    presentToday: number;
    lateToday: number;
    noAttendance: number;
  };
}

export function DetailedStats({ stats }: DetailedStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            Effectif Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalEmployees}
          </div>
          <p className="text-sm text-gray-600 mt-1">Employés actifs</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4" />
            Présents Aujourd'hui
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {stats.presentToday}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {stats.noAttendance > 0 && `${stats.noAttendance} sans pointage`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4" />
            Retards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-600">
            {stats.lateToday}
          </div>
          <p className="text-sm text-gray-600 mt-1">Ce jour</p>
        </CardContent>
      </Card>
    </div>
  );
}
