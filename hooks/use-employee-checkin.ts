import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTodayAttendance, useCheckInOut } from "./use-attendance";

// Hook pour la gestion du pointage employé
export function useEmployeeCheckin() {
  const { data: todayAttendance, isLoading: todayLoading } =
    useTodayAttendance();
  const { mutate: checkInOut, isPending } = useCheckInOut();
  const { toast } = useToast();

  const [notes, setNotes] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Calculs des états
  const canCheckIn = !todayAttendance?.checkIn;
  const canCheckOut = todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Vérifier si l'utilisateur est en retard (après 9h00)
  const checkIfLate = () => {
    const now = new Date();
    const lateTime = new Date();
    lateTime.setHours(9, 0, 0, 0);
    return now > lateTime;
  };

  // Gestion des actions
  const handleCheckIn = () => {
    const isLate = checkIfLate();

    if (isLate) {
      setIsAddingNote(true);
      return;
    }

    checkInOut("checkin", {
      onSuccess: () => {
        toast({
          title: "Check-in enregistré !",
          description: "Bonne journée de travail",
        });
      },
      onError: (err: any) =>
        toast({
          title: "Erreur",
          description: err.message,
          variant: "destructive",
        }),
    });
  };

  const handleCheckInWithNote = () => {
    checkInOut("checkin", {
      onSuccess: () => {
        toast({
          title: "Check-in enregistré !",
          description: "Pointage avec note enregistré",
        });
        setNotes("");
        setIsAddingNote(false);
      },
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
          description: "Bonne fin de journée",
        }),
      onError: (err: any) =>
        toast({
          title: "Erreur",
          description: err.message,
          variant: "destructive",
        }),
    });
  };

  const cancelNote = () => {
    setIsAddingNote(false);
    setNotes("");
  };

  return {
    // Données
    todayAttendance,

    // États
    notes,
    setNotes,
    isAddingNote,
    setIsAddingNote,

    // États de chargement
    todayLoading,
    isPending,

    // Actions
    handleCheckIn,
    handleCheckInWithNote,
    handleCheckOut,
    cancelNote,
    canCheckIn,
    canCheckOut,
    checkIfLate,
  };
}
