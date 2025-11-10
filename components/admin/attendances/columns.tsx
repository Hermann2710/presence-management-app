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
import { useRef, useEffect } from "react";

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

// Composant pour l'input des notes avec gestion du focus
const NotesInput = ({
  value,
  onChange,
  onSave,
  onCancel,
}: {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus automatique quand le composant est monté
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Notes..."
      className="w-48 min-w-[120px]"
    />
  );
};

// Composant pour l'input de temps
const TimeInput = ({
  value,
  onChange,
  date,
}: {
  value: string;
  onChange: (value: string) => void;
  date: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const timeValue = value ? new Date(value).toTimeString().slice(0, 5) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (time) {
      const newDateTime = `${date}T${time}`;
      onChange(newDateTime);
    } else {
      onChange("");
    }
  };

  return (
    <Input
      ref={inputRef}
      type="time"
      value={timeValue}
      onChange={handleChange}
      onFocus={(e) => e.target.select()}
      className="w-24"
      step="300"
    />
  );
};

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
    cell: (info) => {
      const department = info.getValue() as string;
      return department || <span className="text-gray-400">Non assigné</span>;
    },
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
          <TimeInput
            value={editData.checkIn || ""}
            onChange={(value) => setEditData({ ...editData, checkIn: value })}
            date={dateFilter || attendance.date.split("T")[0]}
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
          <TimeInput
            value={editData.checkOut || ""}
            onChange={(value) => setEditData({ ...editData, checkOut: value })}
            date={dateFilter || attendance.date.split("T")[0]}
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
          <NotesInput
            value={editData.notes ?? notes ?? ""}
            onChange={(value) => setEditData({ ...editData, notes: value })}
            onSave={() => onSave(attendance.id)}
            onCancel={onCancel}
          />
        );
      }

      return notes || <span className="text-gray-400">-</span>;
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
              className="h-8 w-8 p-0"
            >
              {isUpdating ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              ) : (
                <Save className="h-3 w-3" />
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
              className="h-8 w-8 p-0"
              disabled={isUpdating}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        );
      }

      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(attendance)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-3 w-3" />
        </Button>
      );
    },
    size: 100,
  },
];
