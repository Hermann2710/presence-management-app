"use client";

import { useEmployeeDashboard } from "@/hooks/use-employee-dashboard";

// Composants
import { LoadingState } from "./dashboard/loading-state";
import { HeaderSection } from "./dashboard/header-section";
import { CheckinSection } from "./dashboard/checkin-section";
import { MonthlyStats } from "./dashboard/monthly-stats";
import { AttendanceDetails } from "./dashboard/attendance-details";

export function EmployeeDashboard() {
  const {
    // Données
    todayAttendance,
    monthlyData,
    stats,
    presenceRate,
    currentStatus,
    statusConfig,

    // États de chargement
    todayLoading,
    monthlyLoading,
    isPending,

    // Actions
    handleCheckIn,
    handleCheckOut,
    canCheckIn,
    canCheckOut,
  } = useEmployeeDashboard();

  if (todayLoading) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-8xl mx-auto space-y-6">
      {/* Header avec bienvenue et statut */}
      <HeaderSection
        currentStatus={currentStatus}
        statusConfig={statusConfig}
        todayAttendance={todayAttendance}
      />

      {/* Section Pointage */}
      <CheckinSection
        todayAttendance={todayAttendance}
        canCheckIn={canCheckIn}
        canCheckOut={canCheckOut}
        isPending={isPending}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />

      {/* Section Votre activité du mois */}
      <MonthlyStats stats={stats} presenceRate={presenceRate} />

      {/* Section détaillée des présences du mois */}
      <AttendanceDetails
        monthlyData={monthlyData}
        monthlyLoading={monthlyLoading}
      />
    </div>
  );
}
