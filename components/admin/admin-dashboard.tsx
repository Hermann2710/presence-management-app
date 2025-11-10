// components/admin/admin-dashboard.tsx
"use client";

import { useAdminStats, useAdminAttendances } from "@/hooks/use-attendance";
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
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Building,
} from "lucide-react";
import Link from "next/link";

interface AdminDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const { data: statsData, isLoading: statsLoading } = useAdminStats(
    new Date().toISOString().split("T")[0]
  );
  const { data: recentAttendances, isLoading: attendancesLoading } =
    useAdminAttendances({
      limit: 5,
    });

  const stats = statsData;

  const recentData = recentAttendances || [];

  if (statsLoading) {
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
            <h1 className="text-3xl font-bold">Tableau de Bord Admin</h1>
            <p className="text-gray-600 mt-1">
              Vue d'ensemble de l'entreprise -{" "}
              {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Connecté en tant que</span>
            <Badge variant="secondary">{user.name}</Badge>
          </div>
        </div>

        {/* Cartes de Statistiques Principales */}
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

        {/* Section Départements */}
        {stats.departmentStats && stats.departmentStats.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Répartition par Département
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.departmentStats.map((dept: any) => (
                  <div
                    key={dept.department}
                    className="text-center p-4 border rounded-lg"
                  >
                    <div className="text-2xl font-bold text-blue-600">
                      {dept._count}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {dept.department || "Non assigné"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section Actions Rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>
              Accès direct aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/presences">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Gérer les Présences</span>
                </Button>
              </Link>

              <Link href="/admin/employes">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2"
                >
                  <Users className="h-6 w-6" />
                  <span>Gérer les Employés</span>
                </Button>
              </Link>

              <Link href="/admin/rapports">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2"
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>Voir les Rapports</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2"
              >
                <Clock className="h-6 w-6" />
                <span>Pointages du Jour</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dernières Présences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Derniers Pointages
            </CardTitle>
            <CardDescription>
              Les 5 derniers pointages enregistrés
            </CardDescription>
          </CardHeader>
          <CardContent>
            {attendancesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : recentData.length > 0 ? (
              <div className="space-y-3">
                {recentData.map((attendance: any) => (
                  <div
                    key={attendance.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          attendance.status === "PRESENT"
                            ? "bg-green-500"
                            : attendance.status === "LATE"
                            ? "bg-yellow-500"
                            : attendance.status === "ABSENT"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{attendance.user.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(attendance.date).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="capitalize">
                        {attendance.status?.toLowerCase()}
                      </Badge>
                      <div className="text-sm text-gray-600 text-right">
                        <div>
                          {attendance.checkIn
                            ? new Date(attendance.checkIn).toLocaleTimeString(
                                "fr-FR"
                              )
                            : "--:--"}
                        </div>
                        {attendance.checkOut && (
                          <div>
                            {new Date(attendance.checkOut).toLocaleTimeString(
                              "fr-FR"
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun pointage aujourd'hui</p>
              </div>
            )}

            {recentData.length > 0 && (
              <div className="mt-4 text-center">
                <Link href="/admin/presences">
                  <Button variant="outline">Voir tous les pointages</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Indicateurs de Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Taux de Présence Aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stats.totalEmployees > 0
                    ? Math.round(
                        (stats.presentToday / stats.totalEmployees) * 100
                      )
                    : 0}
                  %
                </div>
                <p className="text-gray-600">
                  {stats.presentToday} / {stats.totalEmployees} employés
                  présents
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alertes du Jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.absentToday > 0 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-4 w-4" />
                    <span>{stats.absentToday} absence(s) non justifiée(s)</span>
                  </div>
                )}
                {stats.lateToday > 0 && (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{stats.lateToday} retard(s) ce matin</span>
                  </div>
                )}
                {stats.absentToday === 0 && stats.lateToday === 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Aucune alerte aujourd'hui</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Composant de carte de statistique
function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: number;
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
