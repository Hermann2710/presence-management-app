// components/employee/employee-dashboard.tsx
"use client";

import {
  useTodayAttendance,
  useCheckInOut,
  useMonthlyAttendance,
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
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export function EmployeeDashboard() {
  const { data: todayAttendance, isLoading: todayLoading } =
    useTodayAttendance();
  const { data: monthlyData, isLoading: monthlyLoading } =
    useMonthlyAttendance();
  const { mutate: checkInOut, isPending } = useCheckInOut();
  const { toast } = useToast();

  const canCheckIn = !todayAttendance?.checkIn;
  const canCheckOut = todayAttendance?.checkIn && !todayAttendance?.checkOut;

  const handleCheckIn = () => {
    checkInOut("checkin", {
      onSuccess: () =>
        toast({
          title: "Check-in enregistré !",
          description: "Bonne journée de travail 🚀",
          variant: "default",
        }),
      onError: (err) =>
        toast({
          title: "Erreur",
          description: err.message,
          variant: "destructive",
        }),
    });
  };

  const handleCheckOut = () => {
    checkInOut("checkout", {
      onSuccess: () =>
        toast({
          title: "Check-out enregistré !",
          description: "Bonne fin de journée 🌅",
          variant: "default",
        }),
      onError: (err) =>
        toast({
          title: "Erreur",
          description: err.message,
          variant: "destructive",
        }),
    });
  };

  const stats = monthlyData?.stats || {
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
    totalDays: 0,
  };

  const presenceRate =
    stats.totalDays > 0
      ? Math.round((stats.presentDays / stats.totalDays) * 100)
      : 0;

  const currentStatus = todayAttendance?.status || "ABSENT";
  const statusConfig: Record<
    string,
    { label: string; color: string; icon: any }
  > = {
    PRESENT: {
      label: "Présent",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
    },
    ABSENT: {
      label: "Absent",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircle,
    },
    LATE: {
      label: "En retard",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: AlertTriangle,
    },
    SICK_LEAVE: {
      label: "Maladie",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Clock,
    },
    VACATION: {
      label: "Congés",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: Calendar,
    },
  };

  const StatusIcon = statusConfig[currentStatus]?.icon || Clock;

  if (todayLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto space-y-6">
      {/* Header avec bienvenue et statut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message de bienvenue */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Bonjour ! 👋
            </CardTitle>
            <CardDescription className="text-lg">
              Bienvenue sur votre espace personnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Gérez facilement votre pointage et consultez vos statistiques.
            </p>
          </CardContent>
        </Card>

        {/* Statut du jour */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StatusIcon className="h-5 w-5" />
              Statut aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant="secondary"
              className={`${statusConfig[currentStatus]?.color} text-sm font-medium py-1 px-3`}
            >
              {statusConfig[currentStatus]?.label}
            </Badge>
            {todayAttendance?.checkIn && (
              <p className="text-sm text-gray-600 mt-2">
                Arrivé à{" "}
                {new Date(todayAttendance.checkIn).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section Pointage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pointage du jour
          </CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Informations de pointage */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Check-in:</span>
                  <span className="font-medium">
                    {todayAttendance?.checkIn
                      ? new Date(todayAttendance.checkIn).toLocaleTimeString(
                          "fr-FR"
                        )
                      : "--:--"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span>Check-out:</span>
                  <span className="font-medium">
                    {todayAttendance?.checkOut
                      ? new Date(todayAttendance.checkOut).toLocaleTimeString(
                          "fr-FR"
                        )
                      : "--:--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons de pointage */}
            <div className="flex gap-3">
              <Button
                onClick={handleCheckIn}
                disabled={!canCheckIn || isPending}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                {isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "Check-in"
                )}
              </Button>

              <Button
                onClick={handleCheckOut}
                disabled={!canCheckOut || isPending}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2"
              >
                {isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                ) : (
                  "Check-out"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Votre activité du mois */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Votre activité du mois
        </h2>

        {/* Cartes de statistiques */}
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

      {/* Section détaillée des présences du mois */}
      <Card>
        <CardHeader>
          <CardTitle>Détail de vos présences</CardTitle>
          <CardDescription>
            Vue d'ensemble de votre activité sur le mois en cours
          </CardDescription>
        </CardHeader>
        <CardContent>
          {monthlyLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : monthlyData?.attendances?.length > 0 ? (
            <div className="space-y-3">
              {monthlyData.attendances.slice(0, 10).map((attendance: any) => (
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
                    <span className="font-medium">
                      {new Date(attendance.date).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>
                      {attendance.checkIn
                        ? new Date(attendance.checkIn).toLocaleTimeString(
                            "fr-FR"
                          )
                        : "--:--"}
                    </span>
                    <span>
                      {attendance.checkOut
                        ? new Date(attendance.checkOut).toLocaleTimeString(
                            "fr-FR"
                          )
                        : "--:--"}
                    </span>
                    <Badge variant="secondary" className="capitalize">
                      {attendance.status?.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune présence enregistrée ce mois-ci</p>
            </div>
          )}
        </CardContent>
      </Card>
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
