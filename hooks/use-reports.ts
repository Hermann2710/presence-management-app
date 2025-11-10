import { useQuery } from "@tanstack/react-query";
import {
  DepartmentChartData,
  MonthlyStats,
  DepartmentStat,
} from "@/types/dashboard";

// Hook pour les données de rapports mensuels
export function useMonthlyReports() {
  return useQuery({
    queryKey: ["reports", "monthly"],
    queryFn: async (): Promise<MonthlyStats[]> => {
      // Pour l'instant, retourne des données simulées
      // Plus tard, vous pourrez connecter à votre API
      return [
        { month: "Jan 2024", present: 420, absent: 35, late: 28, total: 483 },
        { month: "Fév 2024", present: 398, absent: 42, late: 31, total: 471 },
        { month: "Mar 2024", present: 445, absent: 28, late: 25, total: 498 },
        { month: "Avr 2024", present: 432, absent: 31, late: 29, total: 492 },
        { month: "Mai 2024", present: 458, absent: 25, late: 22, total: 505 },
        { month: "Juin 2024", present: 441, absent: 29, late: 26, total: 496 },
      ];
    },
  });
}

// Hook pour exporter les rapports
export function useReportExport() {
  return {
    exportToPDF: (data: any) => {
      console.log("Export PDF:", data);
      // Implémentez l'export PDF ici
    },
    exportToCSV: (data: any) => {
      console.log("Export CSV:", data);
      // Implémentez l'export CSV ici
    },
    exportToExcel: (data: any) => {
      console.log("Export Excel:", data);
      // Implémentez l'export Excel ici
    },
  };
}

// Hook pour les données de graphiques par département
export function useDepartmentCharts(stats: any) {
  const departmentStats: DepartmentChartData[] =
    stats?.departmentStats?.map((dept: DepartmentStat, index: number) => {
      const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-red-500",
      ];
      return {
        name: dept.department || "Non assigné",
        value:
          dept.total > 0
            ? Math.round(((dept.present || 0) / dept.total) * 100)
            : 0,
        color: colors[index % colors.length],
        total: dept.total,
        present: dept.present || 0,
      };
    }) || [];

  return { departmentStats };
}

// Hook principal pour les rapports
export function useReports(statsData: any) {
  const { data: monthlyStats = [] } = useMonthlyReports();
  const { departmentStats } = useDepartmentCharts(statsData);

  const stats = statsData || {
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    noAttendance: 0,
    attendanceRate: 0,
    departmentStats: [],
    date: "",
  };

  return {
    stats,
    monthlyStats,
    departmentStats,
  };
}
