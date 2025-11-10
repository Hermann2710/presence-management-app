import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
} from "lucide-react";

interface HeaderSectionProps {
  currentStatus: string;
  statusConfig: {
    label: string;
    color: string;
    icon: string;
  };
  todayAttendance: any;
}

const iconMap = {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
};

export function HeaderSection({
  currentStatus,
  statusConfig,
  todayAttendance,
}: HeaderSectionProps) {
  const StatusIcon =
    iconMap[statusConfig.icon as keyof typeof iconMap] || Clock;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Message de bienvenue */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Bonjour ! 👋
          </CardTitle>
          <CardDescription className="text-lg">
            Bienvenue sur votre espace personnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Gérez facilement votre pointage et consultez vos statistiques.
          </p>
        </CardContent>
      </Card>

      {/* Statut du jour */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className="h-5 w-5" />
            Statut aujourd'hui
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge
            variant="secondary"
            className={`${statusConfig.color} text-sm font-medium py-1 px-3`}
          >
            {statusConfig.label}
          </Badge>
          {todayAttendance?.checkIn && (
            <p className="text-sm text-gray-600 mt-2">
              Arrivé à{" "}
              {new Date(todayAttendance.checkIn).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
