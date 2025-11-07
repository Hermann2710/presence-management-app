"use client";

import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteEmployeeMutation, useFetchEmployees } from "@/hooks/employee";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Mail, MoreVertical } from "lucide-react";
import { useState } from "react";
import UpdateEmployeeForm from "./update-employee-form";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Employé",
    cell: ({ row }) => {
      const e = row.original;
      const initials = e
        .name!.split(" ")
        .map((n: any) => n[0])
        .join("");
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={e.image!} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{e.name}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" /> {e.email}
            </p>
          </div>
        </div>
      );
    },
  },
  { accessorKey: "department", header: "Département" },
  { accessorKey: "position", header: "Poste" },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const s = row.getValue("status");
      return (
        <Badge variant={s === "active" ? "default" : "secondary"}>
          {s === "active" ? "Actif" : "Inactif"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const mutation = useDeleteEmployeeMutation();

      const handleDelete = async () => {
        console.log("suppression");
        await mutation.mutateAsync(row.original.id);
      };

      const [open, setOpen] = useState<boolean>(false);

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {row.original.role !== "admin" && (
                <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive"
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpdateEmployeeForm
            employee={row.original}
            open={open}
            setOpen={setOpen}
          />
        </div>
      );
    },
  },
];

export default function EmployeeList() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    skip: 0,
    search: "",
  });

  const { data, isLoading } = useFetchEmployees(queryParams);
  return (
    <>
      <DataTable
        data={isLoading ? [] : data.employees}
        title="Liste des employes"
        columns={columns}
        isLoading={isLoading}
        searchableKey="name"
        searchPlaceholder="Entrez un nom pour rechercher"
      />

      {!isLoading && data.meta && (
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-muted-foreground">
            Page {data.meta.page} sur {data.meta.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={queryParams.page === 1}
              onClick={() =>
                setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }))
              }
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              disabled={queryParams.page === data.meta.totalPages}
              onClick={() =>
                setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
