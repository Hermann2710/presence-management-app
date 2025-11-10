import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface PerformanceMetricsProps {
  stats: {
    totalEmployees: number;
    presentToday: number;
    absentToday: number;
    lateToday: number;
  };
  attendanceRate: number;
}

export function PerformanceMetrics({
  stats,
  attendanceRate,
}: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Taux de Présence Aujourd'hui</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {attendanceRate}%
            </div>
            <p className="text-gray-600">
              {stats.presentToday} / {stats.totalEmployees} employés présents
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alertes du Jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.absentToday > 0 && (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="h-4 w-4" />
                <span>{stats.absentToday} absence(s) non justifiée(s)</span>
              </div>
            )}
            {stats.lateToday > 0 && (
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertTriangle className="h-4 w-4" />
                <span>{stats.lateToday} retard(s) ce matin</span>
              </div>
            )}
            {stats.absentToday === 0 && stats.lateToday === 0 && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Aucune alerte aujourd'hui</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
