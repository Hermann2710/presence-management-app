"use client";

import { useEmployeeCheckin } from "@/hooks/use-employee-checkin";

// Composants
import { LoadingState } from "./pointage/loading-state";
import { PointageHeader } from "./pointage/header";
import { StatusCard } from "./pointage/status-card";
import { ActionsCard } from "./pointage/actions-card";
import { TimeDisplay } from "./pointage/time-display";
import { ActionButtons } from "./pointage/action-buttons";
import { LateNoteForm } from "./pointage/late-note-form";
import { NotesCard } from "./pointage/notes-card";

interface PointagePageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function PointagePage({ user }: PointagePageProps) {
  const {
    // Données
    todayAttendance,

    // États
    notes,
    setNotes,
    isAddingNote,

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
  } = useEmployeeCheckin();

  if (todayLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PointageHeader />

      {/* Statut Actuel */}
      <StatusCard todayAttendance={todayAttendance} />

      {/* Pointage */}
      <ActionsCard>
        {/* Affichage des heures */}
        <TimeDisplay todayAttendance={todayAttendance} />

        {/* Boutons d'action ou formulaire de note */}
        {!isAddingNote ? (
          <ActionButtons
            canCheckIn={canCheckIn}
            canCheckOut={canCheckOut}
            isPending={isPending}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        ) : (
          <LateNoteForm
            isPending={isPending}
            onConfirm={handleCheckInWithNote}
            onCancel={cancelNote}
            notes={notes}
            onNotesChange={setNotes}
          />
        )}
      </ActionsCard>

      {/* Notes existantes */}
      <NotesCard todayAttendance={todayAttendance} />
    </div>
  );
}
