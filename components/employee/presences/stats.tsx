import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PresencesStatsProps {
  stats: {
    total: number;
    present: number;
    late: number;
    absent: number;
    completeDays: number;
  };
}

export function PresencesStats({ stats }: PresencesStatsProps) {
  if (stats.total === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Résumé</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {stats.present}
            </div>
            <div className="text-sm text-gray-600">Présences</div>
          </div>

          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.late}
            </div>
            <div className="text-sm text-gray-600">Retards</div>
          </div>

          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {stats.absent}
            </div>
            <div className="text-sm text-gray-600">Absences</div>
          </div>

          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {stats.completeDays}
            </div>
            <div className="text-sm text-gray-600">Jours complets</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
