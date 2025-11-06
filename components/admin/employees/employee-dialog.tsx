"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@prisma/client";

interface ShowEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: User;
  password: string;
}

export function ShowEmployeeDialog({
  open,
  onOpenChange,
  employee,
  password,
}: ShowEmployeeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Détails de l’enregistrement</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              <strong>Nom:</strong> {employee.name}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {employee.phone}
            </p>
            <p>
              <strong>Département:</strong> {employee.department}
            </p>
            <p>
              <strong>Poste:</strong> {employee.position}
            </p>
            <p className="font-medium text-red-500">
              <strong>Mot de passe:</strong> {password}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fermer</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
