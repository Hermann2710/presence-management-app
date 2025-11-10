import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

interface LateNoteFormProps {
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  notes: string;
  onNotesChange: (value: string) => void;
}

export function LateNoteForm({
  isPending,
  onConfirm,
  onCancel,
  notes,
  onNotesChange,
}: LateNoteFormProps) {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-yellow-50">
      <div className="flex items-center gap-2 text-yellow-800">
        <AlertTriangle className="h-5 w-5" />
        <h3 className="font-semibold">Vous êtes en retard</h3>
      </div>

      <p className="text-yellow-700 text-sm">
        Il est {new Date().toLocaleTimeString("fr-FR")}. Veuillez justifier
        votre retard.
      </p>

      <Textarea
        placeholder="Raison du retard (transport, problème personnel, etc.)..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="min-h-[100px]"
      />

      <div className="flex gap-3 justify-end">
        <Button onClick={onCancel} variant="outline">
          Annuler
        </Button>

        <Button
          onClick={onConfirm}
          disabled={isPending || !notes.trim()}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isPending ? "Enregistrement..." : "Confirmer le pointage"}
        </Button>
      </div>
    </div>
  );
}
