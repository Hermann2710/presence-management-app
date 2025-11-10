// components/admin/admin-rapports-page.tsx
"use client";

import { useState } from "react";
import {
  useAdminStats,
  useAdminAttendances,
  useEmployees,
} from "@/hooks/use-attendance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Download,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Clock,
} from "lucide-react";

interface AdminRapportsPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface MonthlyStats {
  month: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

export function AdminRapportsPage({ user }: AdminRapportsPageProps) {
  const [periodFilter, setPeriodFilter] = useState("today");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const { data: statsData } = useAdminStats();
  const { data: employeesData } = useEmployees();

  // Données simulées pour les graphiques (à remplacer par tes vraies données)
  const monthlyStats: MonthlyStats[] = [
    { month: "Jan 2024", present: 420, absent: 35, late: 28, total: 483 },
    { month: "Fév 2024", present: 398, absent: 42, late: 31, total: 471 },
    { month: "Mar 2024", present: 445, absent: 28, late: 25, total: 498 },
    { month: "Avr 2024", present: 432, absent: 31, late: 29, total: 492 },
    { month: "Mai 2024", present: 458, absent: 25, late: 22, total: 505 },
    { month: "Juin 2024", present: 441, absent: 29, late: 26, total: 496 },
  ];

  const departmentStats = [
    { name: "Développement", value: 45, color: "bg-blue-500" },
    { name: "Design", value: 25, color: "bg-green-500" },
    { name: "Marketing", value: 15, color: "bg-yellow-500" },
    { name: "Commercial", value: 10, color: "bg-purple-500" },
    { name: "RH", value: 5, color: "bg-red-500" },
  ];

  const stats = statsData?.stats || {
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    departmentStats: [],
  };

  const employees = employeesData || [];

  // Calculer les statistiques avancées
  const advancedStats = {
    presenceRate:
      stats.totalEmployees > 0
        ? Math.round((stats.presentToday / stats.totalEmployees) * 100)
        : 0,
    absenceRate:
      stats.totalEmployees > 0
        ? Math.round((stats.absentToday / stats.totalEmployees) * 100)
        : 0,
    lateRate:
      stats.totalEmployees > 0
        ? Math.round((stats.lateToday / stats.totalEmployees) * 100)
        : 0,
    avgMonthlyPresence:
      monthlyStats.length > 0
        ? Math.round(
            monthlyStats.reduce((sum, month) => sum + month.present, 0) /
              monthlyStats.length
          )
        : 0,
    bestMonth: monthlyStats.reduce(
      (best, month) => (month.present > best.present ? month : best),
      monthlyStats[0]
    ),
    worstMonth: monthlyStats.reduce(
      (worst, month) => (month.absent > worst.absent ? month : worst),
      monthlyStats[0]
    ),
  };

  const exportReport = (type: "pdf" | "csv" | "excel") => {
    toast({
      title: `Export ${type.toUpperCase()} démarré`,
      description: `Votre rapport est en cours de génération...`,
      variant: "default",
    });
    // Ici tu intégreras la logique d'export réelle
  };

  const generateMonthlyReport = () => {
    toast({
      title: "Rapport mensuel généré",
      description: "Le rapport détaillé du mois a été créé",
      variant: "default",
    });
  };

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

          <div className="flex gap-2">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tous départements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous départements</SelectItem>
                <SelectItem value="development">Développement</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cartes de Statistiques Principales */}
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
            trend="down"
          />

          <StatCard
            title="Taux de Retard"
            value={`${advancedStats.lateRate}%`}
            description="Aujourd'hui"
            icon={AlertTriangle}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
            trend="neutral"
          />

          <StatCard
            title="Moyenne Mensuelle"
            value={advancedStats.avgMonthlyPresence.toString()}
            description="Présences/mois"
            icon={TrendingUp}
            color="text-blue-600"
            bgColor="bg-blue-50"
            trend="up"
          />
        </div>

        {/* Graphiques et Visualisations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution Mensuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Évolution des Présences
              </CardTitle>
              <CardDescription>
                Tendances sur les 6 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((month, index) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{month.month}</span>
                      <span className="font-medium">
                        {month.present} présences
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(month.present / month.total) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{month.absent} absences</span>
                      <span>{month.late} retards</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Répartition par Département */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Répartition par Département
              </CardTitle>
              <CardDescription>
                Effectif et présence par service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                      <span className="text-sm font-medium">{dept.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${dept.color} transition-all duration-500`}
                          style={{ width: `${dept.value}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">
                        {dept.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Indicateurs de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performances Mensuelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-green-800">
                      Meilleur mois
                    </div>
                    <div className="text-sm text-green-600">
                      {advancedStats.bestMonth?.month}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {advancedStats.bestMonth?.present} présences
                  </Badge>
                </div>

                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-red-800">
                      Moins bon mois
                    </div>
                    <div className="text-sm text-red-600">
                      {advancedStats.worstMonth?.month}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800"
                  >
                    {advancedStats.worstMonth?.absent} absences
                  </Badge>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-blue-800">
                      Moyenne générale
                    </div>
                    <div className="text-sm text-blue-600">Sur 6 mois</div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {advancedStats.avgMonthlyPresence} présences/mois
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Heures de Travail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">7h 48m</div>
                  <div className="text-sm text-gray-600">
                    Moyenne quotidienne
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-green-600">
                      89%
                    </div>
                    <div className="text-xs text-gray-600">
                      Heures productives
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-blue-600">
                      42h
                    </div>
                    <div className="text-xs text-gray-600">Semaine moyenne</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">
                    Distribution horaire
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>8h-10h : 18%</span>
                      <span>10h-12h : 24%</span>
                      <span>14h-16h : 22%</span>
                      <span>16h-18h : 36%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions d'Export */}
        <Card>
          <CardHeader>
            <CardTitle>Génération de Rapports</CardTitle>
            <CardDescription>
              Exportez vos données et générez des rapports détaillés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => exportReport("pdf")}
                variant="outline"
                className="h-20 flex flex-col gap-2"
              >
                <Download className="h-6 w-6" />
                <span>Rapport PDF</span>
                <span className="text-xs text-gray-500">
                  Synthèse détaillée
                </span>
              </Button>

              <Button
                onClick={() => exportReport("csv")}
                variant="outline"
                className="h-20 flex flex-col gap-2"
              >
                <BarChart3 className="h-6 w-6" />
                <span>Données CSV</span>
                <span className="text-xs text-gray-500">Export brut</span>
              </Button>

              <Button
                onClick={generateMonthlyReport}
                className="h-20 flex flex-col gap-2"
              >
                <Calendar className="h-6 w-6" />
                <span>Rapport Mensuel</span>
                <span className="text-xs">Générer automatiquement</span>
              </Button>
            </div>

            {/* Options avancées */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <div className="text-sm font-medium mb-3">Options Avancées</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="justify-start">
                  Rapport personnalisé
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  Analyse comparative
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  Tendances annuelles
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  Benchmark départemental
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résumé Exécutif */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Résumé Exécutif</CardTitle>
            <CardDescription className="text-blue-700">
              Points clés pour la direction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-900">Points Positifs</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Taux de présence stable à {advancedStats.presenceRate}%
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Amélioration continue sur 3 mois
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    Département Développement exemplaire (95% de présence)
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-blue-900">
                  Points d'Amélioration
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    {stats.lateToday} retards à investiguer
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Département Marketing : {Math.round(15)}% d'absence
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Optimisation des plages horaires possible
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Composant de carte de statistique avec trend
function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  bgColor,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  trend: "up" | "down" | "neutral";
}) {
  const trendConfig = {
    up: { icon: TrendingUp, color: "text-green-500" },
    down: {
      icon: TrendingUp,
      color: "text-red-500",
      transform: "rotate(180deg)",
    },
    neutral: { icon: Minus, color: "text-gray-500" },
  };

  const TrendIcon = trendConfig[trend].icon;

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
              className={`h-4 w-4 ${trendConfig[trend].color}`}
              style={{ transform: trendConfig[trend].transform }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Composant Minus pour la tendance neutre
function Minus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4"
      />
    </svg>
  );
}

function toast(arg0: { title: string; description: string; variant: string }) {
  // Implémentation de la fonction toast
  console.log(arg0);
}
