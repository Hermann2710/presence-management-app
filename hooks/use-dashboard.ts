import { useAdminStats, useAdminAttendances } from "./use-attendance";

// Hook pour les données du dashboard
export function useDashboardData() {
  const { data: statsData, isLoading: statsLoading } = useAdminStats(
    new Date().toISOString().split("T")[0]
  );

  const { data: recentAttendances, isLoading: attendancesLoading } =
    useAdminAttendances({
      limit: 5,
    });

  const stats = statsData || {
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    departmentStats: [],
  };

  const recentData = recentAttendances || [];

  // Calculer le taux de présence
  const attendanceRate =
    stats.totalEmployees > 0
      ? Math.round((stats.presentToday / stats.totalEmployees) * 100)
      : 0;

  return {
    stats,
    recentData,
    attendanceRate,
    isLoading: statsLoading || attendancesLoading,
  };
}

// Hook pour les alertes du jour
export function useDailyAlerts(stats: any) {
  const alerts = [];

  if (stats.absentToday > 0) {
    alerts.push({
      type: "absence" as const,
      message: `${stats.absentToday} absence(s) non justifiée(s)`,
      color: "text-red-600",
      icon: "XCircle" as const,
    });
  }

  if (stats.lateToday > 0) {
    alerts.push({
      type: "late" as const,
      message: `${stats.lateToday} retard(s) ce matin`,
      color: "text-yellow-600",
      icon: "AlertTriangle" as const,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: "allGood" as const,
      message: "Aucune alerte aujourd'hui",
      color: "text-green-600",
      icon: "CheckCircle" as const,
    });
  }

  return { alerts };
}
