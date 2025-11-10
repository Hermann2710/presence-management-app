import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface CheckinSectionProps {
  todayAttendance: any;
  canCheckIn: boolean;
  canCheckOut: boolean;
  isPending: boolean;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function CheckinSection({
  todayAttendance,
  canCheckIn,
  canCheckOut,
  isPending,
  onCheckIn,
  onCheckOut,
}: CheckinSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pointage du jour
        </CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Informations de pointage */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Check-in:</span>
                <span className="font-medium">
                  {todayAttendance?.checkIn
                    ? new Date(todayAttendance.checkIn).toLocaleTimeString(
                        "fr-FR"
                      )
                    : "--:--"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span>Check-out:</span>
                <span className="font-medium">
                  {todayAttendance?.checkOut
                    ? new Date(todayAttendance.checkOut).toLocaleTimeString(
                        "fr-FR"
                      )
                    : "--:--"}
                </span>
              </div>
            </div>
          </div>

          {/* Boutons de pointage */}
          <div className="flex gap-3">
            <Button
              onClick={onCheckIn}
              disabled={!canCheckIn || isPending}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              {isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                "Check-in"
              )}
            </Button>

            <Button
              onClick={onCheckOut}
              disabled={!canCheckOut || isPending}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2"
            >
              {isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
              ) : (
                "Check-out"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
