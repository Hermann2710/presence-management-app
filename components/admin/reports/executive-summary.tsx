import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Users,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

interface ExecutiveSummaryProps {
  stats: {
    presentToday: number;
    absentToday: number;
    lateToday: number;
    noAttendance: number;
    attendanceRate: number;
  };
}

export function ExecutiveSummary({ stats }: ExecutiveSummaryProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-900">Résumé Exécutif</CardTitle>
        <CardDescription className="text-blue-700">
          Aperçu des performances - {new Date().toLocaleDateString("fr-FR")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-900">Points Positifs</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Taux de présence : {stats.attendanceRate}%
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                {stats.presentToday} employés présents aujourd'hui
              </li>
              {stats.lateToday === 0 && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Aucun retard enregistré
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-blue-900">
              Points d'Amélioration
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              {stats.absentToday > 0 && (
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  {stats.absentToday} absence(s) aujourd'hui
                </li>
              )}
              {stats.lateToday > 0 && (
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  {stats.lateToday} retard(s) à investiguer
                </li>
              )}
              {stats.noAttendance > 0 && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  {stats.noAttendance} employé(s) sans pointage
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
