"use client";

import { useDashboardData } from "@/hooks/use-dashboard";

import { DashboardHeader } from "./dashboard/header";
import { StatCards } from "./dashboard/stat-cards";
import { DepartmentStats } from "./dashboard/department-stats";
import { QuickActions } from "./dashboard/quick-actions";
import { RecentAttendances } from "./dashboard/recent-attendances";
import { PerformanceMetrics } from "./dashboard/performance-metrics";

interface AdminDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const { stats, recentData, attendanceRate, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-8xl">
      <div className="space-y-6">
        {/* Header */}
        <DashboardHeader user={user} />

        {/* Cartes de Statistiques Principales */}
        <StatCards stats={stats} />

        {/* Section Départements */}
        <DepartmentStats departmentStats={stats.departmentStats} />

        {/* Section Actions Rapides */}
        <QuickActions />

        {/* Dernières Présences */}
        <RecentAttendances recentData={recentData} isLoading={isLoading} />

        {/* Indicateurs de Performance */}
        <PerformanceMetrics stats={stats} attendanceRate={attendanceRate} />
      </div>
    </div>
  );
}
