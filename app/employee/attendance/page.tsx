"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock personal attendance data
const myAttendance = [
  {
    id: "1",
    date: "2025-01-24",
    checkIn: "08:45",
    checkOut: "17:30",
    status: "present",
    hours: "8h 45m",
  },
  {
    id: "2",
    date: "2025-01-23",
    checkIn: "09:15",
    checkOut: "18:00",
    status: "late",
    hours: "8h 45m",
  },
  {
    id: "3",
    date: "2025-01-22",
    checkIn: "08:30",
    checkOut: "17:15",
    status: "present",
    hours: "8h 45m",
  },
  {
    id: "4",
    date: "2025-01-21",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    hours: "-",
    notes: "Congé maladie",
  },
  {
    id: "5",
    date: "2025-01-20",
    checkIn: "08:50",
    checkOut: "17:45",
    status: "present",
    hours: "8h 55m",
  },
]

export default function EmployeeAttendancePage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Présent</Badge>
      case "late":
        return <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">Retard</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mes présences</h2>
          <p className="text-muted-foreground">Historique de vos présences</p>
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Ce mois
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique de présence</CardTitle>
          <CardDescription>Vos enregistrements de présence récents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Heures travaillées</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {new Date(record.date).toLocaleDateString("fr-FR", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>{record.hours}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{record.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
