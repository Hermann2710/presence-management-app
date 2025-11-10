import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotesCardProps {
  todayAttendance: any;
}

export function NotesCard({ todayAttendance }: NotesCardProps) {
  if (!todayAttendance?.notes) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Note du jour</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-3 bg-gray-50 rounded-lg border">
          <p className="text-gray-700">{todayAttendance.notes}</p>
        </div>
      </CardContent>
    </Card>
  );
}
