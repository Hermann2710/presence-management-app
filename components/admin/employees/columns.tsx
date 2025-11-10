// components/employees/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Users, Building, Briefcase, Phone } from "lucide-react";
import { User } from "@prisma/client";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: (info) => {
      const employee = info.row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-gray-500">{employee.email}</div>
          </div>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "department",
    header: "Département",
    cell: (info) => {
      const department = info.getValue() as string;
      return department ? (
        <Badge variant="outline" className="capitalize">
          <Building className="h-3 w-3 mr-1" />
          {department}
        </Badge>
      ) : (
        <span className="text-gray-400">Non assigné</span>
      );
    },
    size: 120,
  },
  {
    accessorKey: "position",
    header: "Poste",
    cell: (info) => {
      const position = info.getValue() as string;
      return position ? (
        <div className="flex items-center gap-1">
          <Briefcase className="h-3 w-3 text-gray-400" />
          <span>{position}</span>
        </div>
      ) : (
        <span className="text-gray-400">Non défini</span>
      );
    },
    size: 150,
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
    cell: (info) => {
      const phone = info.getValue() as string;
      return phone ? (
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3 text-gray-400" />
          <span>{phone}</span>
        </div>
      ) : (
        <span className="text-gray-400">Non renseigné</span>
      );
    },
    size: 130,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: (info) => {
      const status = info.getValue() as string;
      return (
        <Badge
          variant="secondary"
          className={
            status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {status === "ACTIVE" ? "Actif" : "Inactif"}
        </Badge>
      );
    },
    size: 100,
  },
  {
    accessorKey: "_count.attendances",
    header: "Pointages",
    cell: (info) => {
      const count = info.getValue() as number;
      return (
        <div className="text-center">
          <div className="font-semibold">{count}</div>
          <div className="text-xs text-gray-500">enregistrements</div>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: "createdAt",
    header: "Date d'ajout",
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString("fr-FR")}</div>
          <div className="text-gray-500">
            {date.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      );
    },
    size: 120,
  },
];
