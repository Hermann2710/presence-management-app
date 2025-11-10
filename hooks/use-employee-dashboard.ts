import { useToast } from "@/components/ui/use-toast";
import {
  useTodayAttendance,
  useCheckInOut,
  useMonthlyAttendance,
} from "./use-attendance";

// Hook pour le dashboard employé
export function useEmployeeDashboard() {
  const { data: todayAttendance, isLoading: todayLoading } =
    useTodayAttendance();
  const { data: monthlyData, isLoading: monthlyLoading } =
    useMonthlyAttendance();
  const { mutate: checkInOut, isPending } = useCheckInOut();
  const { toast } = useToast();

  // Calculs des états
  const canCheckIn = !todayAttendance?.checkIn;
  const canCheckOut = todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Gestion des actions
  const handleCheckIn = () => {
    checkInOut("checkin", {
      onSuccess: () =>
        toast({
          title: "Check-in enregistré !",
          description: "Bonne journée de travail 🚀",
          variant: "default",
        }),
      onError: (err: any) =>
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
      onError: (err: any) =>
        toast({
          title: "Erreur",
          description: err.message,
          variant: "destructive",
        }),
    });
  };

  // Statistiques mensuelles
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

  // Configuration du statut actuel
  const currentStatus = todayAttendance?.status || "ABSENT";
  const statusConfig = {
    PRESENT: {
      label: "Présent",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: "CheckCircle",
    },
    ABSENT: {
      label: "Absent",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: "XCircle",
    },
    LATE: {
      label: "En retard",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: "AlertTriangle",
    },
    SICK_LEAVE: {
      label: "Maladie",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "Clock",
    },
    VACATION: {
      label: "Congés",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: "Calendar",
    },
  };

  return {
    // Données
    todayAttendance,
    monthlyData,
    stats,
    presenceRate,
    currentStatus,
    statusConfig:
      statusConfig[currentStatus as keyof typeof statusConfig] ||
      statusConfig.ABSENT,

    // États de chargement
    todayLoading,
    monthlyLoading,
    isPending,

    // Actions
    handleCheckIn,
    handleCheckOut,
    canCheckIn,
    canCheckOut,
  };
}
