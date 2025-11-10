import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, TrendingUp } from "lucide-react";

interface MonthlyStatsProps {
  stats: {
    presentDays: number;
    absentDays: number;
    lateDays: number;
  };
  presenceRate: number;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MonthlyStats({ stats, presenceRate }: MonthlyStatsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Votre activité du mois
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Jours présents"
          value={stats.presentDays}
          description="Ce mois"
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-green-50"
        />

        <StatCard
          title="Jours d'absence"
          value={stats.absentDays}
          description="Ce mois"
          icon={XCircle}
          color="text-red-600"
          bgColor="bg-red-50"
        />

        <StatCard
          title="Retards"
          value={stats.lateDays}
          description="Ce mois"
          icon={AlertTriangle}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
        />

        <StatCard
          title="Taux de présence"
          value={`${presenceRate}%`}
          description="Ce mois"
          icon={TrendingUp}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
      </div>
    </div>
  );
}
