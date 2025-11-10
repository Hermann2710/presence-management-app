import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

interface RecentAttendancesProps {
  recentData: any[];
  isLoading: boolean;
}

export function RecentAttendances({
  recentData,
  isLoading,
}: RecentAttendancesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Derniers Pointages
        </CardTitle>
        <CardDescription>Les 5 derniers pointages enregistrés</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : recentData.length > 0 ? (
          <div className="space-y-3">
            {recentData.map((attendance: any) => (
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
                  <div>
                    <p className="font-medium">{attendance.user.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(attendance.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="capitalize">
                    {attendance.status?.toLowerCase()}
                  </Badge>
                  <div className="text-sm text-gray-600 text-right">
                    <div>
                      {attendance.checkIn
                        ? new Date(attendance.checkIn).toLocaleTimeString(
                            "fr-FR"
                          )
                        : "--:--"}
                    </div>
                    {attendance.checkOut && (
                      <div>
                        {new Date(attendance.checkOut).toLocaleTimeString(
                          "fr-FR"
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun pointage aujourd'hui</p>
          </div>
        )}

        {recentData.length > 0 && (
          <div className="mt-4 text-center">
            <Link href="/admin/attendances">
              <Button variant="outline">Voir tous les pointages</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
