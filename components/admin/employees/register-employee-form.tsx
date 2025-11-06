"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form/form-input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterEmployeeMutation } from "@/hooks/employee";
import {
  RegisterEmployeeSchema,
  RegisterEmployeeSchemaType,
} from "@/schemas/employee-schema";
import { User } from "@prisma/client";
import { ShowEmployeeDialog } from "./employee-dialog";

export function RegisterEmployeeForm() {
  const mutation = useRegisterEmployeeMutation();
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [employeeData, setEmployeeData] = useState<{
    employee: User;
    password: string;
  } | null>(null);

  const form = useForm<RegisterEmployeeSchemaType>({
    resolver: zodResolver(RegisterEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
    },
  });

  const handleRegister = async (data: RegisterEmployeeSchemaType) => {
    try {
      const { employee, password } = await mutation.mutateAsync(data);

      // ✅ Mémoriser les données pour le dialogue
      setEmployeeData({ employee, password });

      // ✅ Fermer le Sheet
      setOpenSheet(false);

      // ✅ Ouvrir le Dialog
      setOpenDialog(true);

      // ✅ Reset du formulaire
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Sheet d’ajout */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button>Ajouter</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ajouter un nouvel employé</SheetTitle>
            <SheetDescription>
              Remplissez le formulaire pour ajouter un nouvel employé.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              className="space-y-4 max-w-sm px-4"
              onSubmit={form.handleSubmit(handleRegister)}
            >
              <FormInput name="name" label="Nom" />
              <FormInput name="email" label="Email" />
              <FormInput name="phone" label="Numéro de téléphone" />
              <FormInput name="department" label="Département" />
              <FormInput name="position" label="Poste" />
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? "Enregistrement..." : "Ajouter"}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      {/* Dialogue de confirmation */}
      {employeeData && (
        <ShowEmployeeDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          employee={employeeData.employee}
          password={employeeData.password}
        />
      )}
    </>
  );
}
