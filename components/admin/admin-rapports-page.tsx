"use client";

import { useState } from "react";
import { useAdminStats, useEmployees } from "@/hooks/use-attendance";
import { useReports } from "@/hooks/use-reports";
import { Badge } from "@/components/ui/badge";

// Import des composants séparés
import { Filters } from "./reports/filters";
import { StatCards } from "./reports/stat-cards";
import { MonthlyChart } from "./reports/monthly-chart";
import { DepartmentChart } from "./reports/department-chart";
import { DetailedStats } from "./reports/detailed-stats";
import { ExportActions } from "./reports/export-actions";
import { ExecutiveSummary } from "./reports/executive-summary";

interface AdminRapportsPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminRapportsPage({ user }: AdminRapportsPageProps) {
  const [periodFilter, setPeriodFilter] = useState("today");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: employeesData, isLoading: employeesLoading } = useEmployees();

  // Utilisation du hook useReports pour centraliser la logique
  const { stats, monthlyStats, departmentStats } = useReports(statsData);

  const employees = employeesData || [];

  if (statsLoading || employeesLoading) {
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Rapports & Analytics</h1>
            <p className="text-gray-600 mt-1">
              Analyses détaillées et statistiques de présence
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* 
            <Filters
              periodFilter={periodFilter}
              setPeriodFilter={setPeriodFilter}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              departmentStats={departmentStats}
            /> 
            */}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Connecté en tant que</span>
              <Badge variant="secondary">{user.name}</Badge>
            </div>
          </div>
        </div>

        {/* Cartes de Statistiques Principales */}
        <StatCards stats={stats} />

        {/* Graphiques et Visualisations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <MonthlyChart monthlyStats={monthlyStats} /> */}
          <DepartmentChart departmentStats={departmentStats} />
        </div>

        {/* Statistiques Détaillées */}
        <DetailedStats stats={stats} />

        {/* Actions d'Export */}
        {/* <ExportActions stats={stats} /> */}

        {/* Résumé Exécutif */}
        <ExecutiveSummary stats={stats} />
      </div>
    </div>
  );
}
