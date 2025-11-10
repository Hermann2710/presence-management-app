// components/attendances/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { Attendance } from "./types";
import { formatDateSafe, formatTimeSafe } from "./utils";

interface AttendanceColumnsProps {
  editingRow: string | null;
  editData: any;
  setEditData: (data: any) => void;
  dateFilter: string;
  onSave: (id: string) => void;
  onCancel: () => void;
  onEdit: (attendance: Attendance) => void;
  isUpdating: boolean;
}

export const createAttendanceColumns = ({
  editingRow,
  editData,
  setEditData,
  dateFilter,
  onSave,
  onCancel,
  onEdit,
  isUpdating,
}: AttendanceColumnsProps): ColumnDef<Attendance>[] => [
  {
    accessorKey: "user.name",
    header: "Employé",
    cell: (info) => info.getValue() as string,
    size: 150,
  },
  {
    accessorKey: "user.department",
    header: "Département",
    cell: (info) => (info.getValue() as string) || "Non assigné",
    size: 120,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => formatDateSafe(info.getValue() as string),
    size: 100,
  },
  {
    accessorKey: "checkIn",
    header: "Arrivée",
    cell: (info) => {
      const attendance = info.row.original;
      if (editingRow === attendance.id) {
        return (
          <Input
            type="time"
            value={editData.checkIn?.slice(0, 5) || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                checkIn: e.target.value
                  ? `${dateFilter}T${e.target.value}:00`
                  : null,
              })
            }
            className="w-24"
          />
        );
      }
      return formatTimeSafe(info.getValue() as string | null);
    },
    size: 100,
  },
  {
    accessorKey: "checkOut",
    header: "Départ",
    cell: (info) => {
      const attendance = info.row.original;
      if (editingRow === attendance.id) {
        return (
          <Input
            type="time"
            value={editData.checkOut?.slice(0, 5) || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                checkOut: e.target.value
                  ? `${dateFilter}T${e.target.value}:00`
                  : null,
              })
            }
            className="w-24"
          />
        );
      }
      return formatTimeSafe(info.getValue() as string | null);
    },
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: (info) => {
      const attendance = info.row.original;
      const status = info.getValue() as string;

      if (editingRow === attendance.id) {
        return (
          <Select
            value={editData.status || status}
            onValueChange={(value) =>
              setEditData({ ...editData, status: value })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PRESENT">Présent</SelectItem>
              <SelectItem value="LATE">En retard</SelectItem>
              <SelectItem value="ABSENT">Absent</SelectItem>
              <SelectItem value="SICK_LEAVE">Maladie</SelectItem>
              <SelectItem value="VACATION">Congés</SelectItem>
            </SelectContent>
          </Select>
        );
      }

      const statusConfig = {
        PRESENT: { label: "Présent", class: "bg-green-100 text-green-800" },
        LATE: { label: "En retard", class: "bg-yellow-100 text-yellow-800" },
        ABSENT: { label: "Absent", class: "bg-red-100 text-red-800" },
        SICK_LEAVE: { label: "Maladie", class: "bg-blue-100 text-blue-800" },
        VACATION: { label: "Congés", class: "bg-purple-100 text-purple-800" },
      };

      const config = statusConfig[status as keyof typeof statusConfig] || {
        label: status,
        class: "bg-gray-100 text-gray-800",
      };

      return (
        <Badge variant="secondary" className={config.class}>
          {config.label}
        </Badge>
      );
    },
    size: 120,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (info) => {
      const attendance = info.row.original;
      const notes = info.getValue() as string;

      if (editingRow === attendance.id) {
        return (
          <Input
            value={editData.notes || notes || ""}
            onChange={(e) =>
              setEditData({ ...editData, notes: e.target.value })
            }
            placeholder="Notes..."
            className="w-48"
          />
        );
      }

      return notes || "-";
    },
    size: 200,
  },
  {
    id: "actions",
    header: "Actions",
    cell: (info) => {
      const attendance = info.row.original;

      if (editingRow === attendance.id) {
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onSave(attendance.id)}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      }

      return (
        <Button size="sm" variant="outline" onClick={() => onEdit(attendance)}>
          <Edit className="h-4 w-4" />
        </Button>
      );
    },
    size: 100,
  },
];
