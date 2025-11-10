import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Minus } from "./minus-icon";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  trend: "up" | "down" | "neutral";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  bgColor,
  trend,
}: StatCardProps) {
  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: "text-green-500",
      transform: "rotate(0deg)",
    },
    down: {
      icon: TrendingUp,
      color: "text-red-500",
      transform: "rotate(180deg)",
    },
    neutral: { icon: Minus, color: "text-gray-500", transform: "rotate(0deg)" },
  };

  const config = trendConfig[trend];
  const TrendIcon = config.icon;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-3 rounded-full ${bgColor}`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
            <TrendIcon
              className={`h-4 w-4 ${config.color}`}
              style={{ transform: config.transform }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatCardsProps {
  stats: {
    totalEmployees: number;
    presentToday: number;
    absentToday: number;
    lateToday: number;
    attendanceRate: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  const advancedStats = {
    presenceRate: stats.attendanceRate || 0,
    absenceRate:
      stats.totalEmployees > 0
        ? Math.round((stats.absentToday / stats.totalEmployees) * 100)
        : 0,
    lateRate:
      stats.totalEmployees > 0
        ? Math.round((stats.lateToday / stats.totalEmployees) * 100)
        : 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Taux de Présence"
        value={`${advancedStats.presenceRate}%`}
        description="Aujourd'hui"
        icon={CheckCircle}
        color="text-green-600"
        bgColor="bg-green-50"
        trend="up"
      />

      <StatCard
        title="Taux d'Absence"
        value={`${advancedStats.absenceRate}%`}
        description="Aujourd'hui"
        icon={XCircle}
        color="text-red-600"
        bgColor="bg-red-50"
        trend={advancedStats.absenceRate > 10 ? "up" : "down"}
      />

      <StatCard
        title="Taux de Retard"
        value={`${advancedStats.lateRate}%`}
        description="Aujourd'hui"
        icon={AlertTriangle}
        color="text-yellow-600"
        bgColor="bg-yellow-50"
        trend={advancedStats.lateRate > 5 ? "up" : "down"}
      />

      <StatCard
        title="Employés Actifs"
        value={stats.totalEmployees.toString()}
        description="Total"
        icon={Users}
        color="text-blue-600"
        bgColor="bg-blue-50"
        trend="neutral"
      />
    </div>
  );
}
