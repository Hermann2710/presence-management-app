import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface AttendanceDetailsProps {
  monthlyData: any;
  monthlyLoading: boolean;
}

export function AttendanceDetails({
  monthlyData,
  monthlyLoading,
}: AttendanceDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Détail de vos présences</CardTitle>
        <CardDescription>
          Vue d'ensemble de votre activité sur le mois en cours
        </CardDescription>
      </CardHeader>
      <CardContent>
        {monthlyLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : monthlyData?.attendances?.length > 0 ? (
          <div className="space-y-3">
            {monthlyData.attendances.slice(0, 10).map((attendance: any) => (
              <div
                key={attendance.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      attendance.status === "PRESENT"
                        ? "bg-green-500"
                        : attendance.status === "LATE"
                        ? "bg-yellow-500"
                        : attendance.status === "ABSENT"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <span className="font-medium">
                    {new Date(attendance.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span>
                    {attendance.checkIn
                      ? new Date(attendance.checkIn).toLocaleTimeString("fr-FR")
                      : "--:--"}
                  </span>
                  <span>
                    {attendance.checkOut
                      ? new Date(attendance.checkOut).toLocaleTimeString(
                          "fr-FR"
                        )
                      : "--:--"}
                  </span>
                  <Badge variant="secondary" className="capitalize">
                    {attendance.status?.toLowerCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune présence enregistrée ce mois-ci</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
