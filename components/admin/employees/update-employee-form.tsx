"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form/form-input";
import FormSelect from "@/components/ui/form/form-select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUpdateEmployeeMutation } from "@/hooks/employee";
import {
  UpdateEmployeeSchema,
  UpdateEmployeeSchemaType,
} from "@/schemas/employee-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Props {
  employee: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateEmployeeForm({ employee, open, setOpen }: Props) {
  const mutation = useUpdateEmployeeMutation();
  const form = useForm<UpdateEmployeeSchemaType>({
    resolver: zodResolver(UpdateEmployeeSchema),
    defaultValues: {
      id: employee.id,
      role: employee.role,
      status: employee.status,
      department: employee.department || "",
      position: employee.position || "",
    },
  });

  const handleUpdate = async (data: UpdateEmployeeSchemaType) => {
    await mutation.mutateAsync(data);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier un employé</SheetTitle>
          <SheetDescription>
            Remplissez ce formulaire pour modifier un employé
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="px-4 space-y-4"
            onSubmit={form.handleSubmit(handleUpdate)}
          >
            <FormInput label="Département" name="department" />
            <FormInput label="Position" name="position" />
            <FormSelect
              options={[
                {
                  label: "Administrateur",
                  value: "admin",
                },
                {
                  label: "Employé",
                  value: "employee",
                },
              ]}
              name="role"
              label="Role"
              className="w-full"
            />
            <FormSelect
              options={[
                {
                  label: "Actif",
                  value: "active",
                },
                {
                  label: "Inactif",
                  value: "inactive",
                },
              ]}
              name="status"
              label="Status"
              className="w-full"
            />
            <Button className="w-full">Modifier</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
