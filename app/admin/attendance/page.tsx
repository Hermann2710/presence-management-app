"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Filter } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock attendance data
const mockAttendance = [
  {
    id: "1",
    employeeName: "Marie Dubois",
    date: "2025-01-24",
    checkIn: "08:45",
    checkOut: "17:30",
    status: "present",
  },
  {
    id: "2",
    employeeName: "Jean Martin",
    date: "2025-01-24",
    checkIn: "09:15",
    checkOut: "18:00",
    status: "late",
  },
  {
    id: "3",
    employeeName: "Sophie Bernard",
    date: "2025-01-24",
    checkIn: "08:30",
    checkOut: "17:15",
    status: "present",
  },
  {
    id: "4",
    employeeName: "Pierre Petit",
    date: "2025-01-24",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    notes: "Congé maladie",
  },
  {
    id: "5",
    employeeName: "Claire Moreau",
    date: "2025-01-24",
    checkIn: "08:50",
    checkOut: "17:45",
    status: "present",
  },
]

export default function AttendancePage() {
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredAttendance =
    filterStatus === "all" ? mockAttendance : mockAttendance.filter((record) => record.status === filterStatus)

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
          <h2 className="text-3xl font-bold tracking-tight">Présences</h2>
          <p className="text-muted-foreground">Suivi des présences et absences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Aujourd'hui
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registre de présence</CardTitle>
              <CardDescription>{filteredAttendance.length} enregistrements pour aujourd'hui</CardDescription>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="present">Présents</SelectItem>
                <SelectItem value="late">Retards</SelectItem>
                <SelectItem value="absent">Absents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {record.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{record.employeeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
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
