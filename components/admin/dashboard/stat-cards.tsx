import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  bgColor,
}: StatCardProps) {
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

interface StatCardsProps {
  stats: {
    totalEmployees: number;
    presentToday: number;
    absentToday: number;
    lateToday: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Employés"
        value={stats.totalEmployees}
        description="Effectif total"
        icon={Users}
        color="text-blue-600"
        bgColor="bg-blue-50"
      />

      <StatCard
        title="Présents aujourd'hui"
        value={stats.presentToday}
        description="Sur le site"
        icon={CheckCircle}
        color="text-green-600"
        bgColor="bg-green-50"
      />

      <StatCard
        title="Absents aujourd'hui"
        value={stats.absentToday}
        description="Non pointés"
        icon={XCircle}
        color="text-red-600"
        bgColor="bg-red-50"
      />

      <StatCard
        title="En retard"
        value={stats.lateToday}
        description="Pointage après 9h"
        icon={AlertTriangle}
        color="text-yellow-600"
        bgColor="bg-yellow-50"
      />
    </div>
  );
}
