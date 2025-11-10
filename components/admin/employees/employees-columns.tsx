// components/admin/employees-columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Phone,
  Building,
  Briefcase,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Employee } from "@/types/employee";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: (info) => {
      const employee = info.row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{employee.name}</div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Mail className="h-3 w-3" />
              {employee.email}
            </div>
          </div>
        </div>
      );
    },
    size: 250,
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
    size: 150,
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
    size: 180,
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
        <span className="text-gray-400">-</span>
      );
    },
    size: 140,
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
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
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
          <div className="font-semibold text-gray-900">{count}</div>
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
          <div className="text-gray-900">
            {date.toLocaleDateString("fr-FR")}
          </div>
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
  {
    id: "actions",
    header: "Actions",
    cell: (info) => {
      const employee = info.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => info.table.options.meta?.onEdit?.(employee)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => info.table.options.meta?.onDelete?.(employee)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 80,
  },
];
