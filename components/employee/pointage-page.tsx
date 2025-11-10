// components/employee/pointage-page.tsx
"use client";

import { useState } from "react";
import { useTodayAttendance, useCheckInOut } from "@/hooks/use-attendance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface PointagePageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function PointagePage({ user }: PointagePageProps) {
  const { data: todayAttendance, isLoading: todayLoading } =
    useTodayAttendance();
  const { mutate: checkInOut, isPending } = useCheckInOut();
  const { toast } = useToast();

  const [notes, setNotes] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const canCheckIn = !todayAttendance?.checkIn;
  const canCheckOut = todayAttendance?.checkIn && !todayAttendance?.checkOut;

  // Vérifier si l'utilisateur est en retard (après 9h00)
  const checkIfLate = () => {
    const now = new Date();
    const lateTime = new Date();
    lateTime.setHours(9, 0, 0, 0);
    return now > lateTime;
  };

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
      onError: (err) =>
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
          description: "Bonne fin de journée",
        }),
      onError: (err) =>
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

  if (todayLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Pointage du Jour</h1>
        <p className="text-lg text-gray-600">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Statut Actuel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Statut Actuel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-4 h-4 rounded-full ${
                  todayAttendance?.checkIn ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span className="font-medium">
                {todayAttendance?.checkIn
                  ? "Pointé ce jour"
                  : "Non pointé aujourd'hui"}
              </span>
            </div>

            {todayAttendance?.status && (
              <Badge
                variant="secondary"
                className={
                  todayAttendance.status === "PRESENT"
                    ? "bg-green-100 text-green-800"
                    : todayAttendance.status === "LATE"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {todayAttendance.status === "PRESENT"
                  ? "À l'heure"
                  : todayAttendance.status === "LATE"
                  ? "En retard"
                  : todayAttendance.status}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pointage */}
      <Card>
        <CardHeader>
          <CardTitle>Actions de Pointage</CardTitle>
          <CardDescription>Pointage d'entrée et de sortie</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Affichage des heures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold">Check-in</h3>
              <p className="text-2xl font-bold mt-2">
                {todayAttendance?.checkIn
                  ? new Date(todayAttendance.checkIn).toLocaleTimeString(
                      "fr-FR"
                    )
                  : "--:--"}
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-semibold">Check-out</h3>
              <p className="text-2xl font-bold mt-2">
                {todayAttendance?.checkOut
                  ? new Date(todayAttendance.checkOut).toLocaleTimeString(
                      "fr-FR"
                    )
                  : "--:--"}
              </p>
            </div>
          </div>

          {/* Boutons d'action */}
          {!isAddingNote ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCheckIn}
                disabled={!canCheckIn || isPending}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                {isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Check-in
                  </>
                )}
              </Button>

              <Button
                onClick={handleCheckOut}
                disabled={!canCheckOut || isPending}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3"
              >
                {isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 mr-2" />
                    Check-out
                  </>
                )}
              </Button>
            </div>
          ) : (
            /* Formulaire de note pour retard */
            <div className="space-y-4 p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-semibold">Vous êtes en retard</h3>
              </div>

              <p className="text-yellow-700 text-sm">
                Il est {new Date().toLocaleTimeString("fr-FR")}. Veuillez
                justifier votre retard.
              </p>

              <Textarea
                placeholder="Raison du retard (transport, problème personnel, etc.)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />

              <div className="flex gap-3 justify-end">
                <Button onClick={cancelNote} variant="outline">
                  Annuler
                </Button>

                <Button
                  onClick={handleCheckInWithNote}
                  disabled={isPending || !notes.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isPending ? "Enregistrement..." : "Confirmer le pointage"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes existantes */}
      {todayAttendance?.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Note du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-700">{todayAttendance.notes}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
