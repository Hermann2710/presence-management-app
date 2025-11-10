import { CheckCircle, XCircle } from "lucide-react";

interface TimeDisplayProps {
  todayAttendance: any;
}

export function TimeDisplay({ todayAttendance }: TimeDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="text-center p-4 border rounded-lg">
        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
        <h3 className="font-semibold">Check-in</h3>
        <p className="text-2xl font-bold mt-2">
          {todayAttendance?.checkIn
            ? new Date(todayAttendance.checkIn).toLocaleTimeString("fr-FR")
            : "--:--"}
        </p>
      </div>

      <div className="text-center p-4 border rounded-lg">
        <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <h3 className="font-semibold">Check-out</h3>
        <p className="text-2xl font-bold mt-2">
          {todayAttendance?.checkOut
            ? new Date(todayAttendance.checkOut).toLocaleTimeString("fr-FR")
            : "--:--"}
        </p>
      </div>
    </div>
  );
}
