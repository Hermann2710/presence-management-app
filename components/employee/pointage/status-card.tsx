import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface StatusCardProps {
  todayAttendance: any;
}

export function StatusCard({ todayAttendance }: StatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Statut Actuel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-4 h-4 rounded-full ${
                todayAttendance?.checkIn ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="font-medium">
              {todayAttendance?.checkIn
                ? "Pointé ce jour"
                : "Non pointé aujourd'hui"}
            </span>
          </div>

          {todayAttendance?.status && (
            <Badge
              variant="secondary"
              className={
                todayAttendance.status === "PRESENT"
                  ? "bg-green-100 text-green-800"
                  : todayAttendance.status === "LATE"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {todayAttendance.status === "PRESENT"
                ? "À l'heure"
                : todayAttendance.status === "LATE"
                ? "En retard"
                : todayAttendance.status}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
