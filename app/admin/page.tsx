"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Clock } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"

// Mock data for dashboard
const stats = {
  totalEmployees: 48,
  presentToday: 42,
  absentToday: 4,
  lateToday: 2,
}

const weeklyData = [
  { day: "Lun", present: 45, absent: 3 },
  { day: "Mar", present: 46, absent: 2 },
  { day: "Mer", present: 44, absent: 4 },
  { day: "Jeu", present: 47, absent: 1 },
  { day: "Ven", present: 42, absent: 6 },
]

const recentActivity = [
  { name: "Marie Dubois", action: "Arrivée", time: "08:45", status: "present" },
  { name: "Jean Martin", action: "Arrivée", time: "09:15", status: "late" },
  { name: "Sophie Bernard", action: "Départ", time: "17:30", status: "present" },
  { name: "Pierre Petit", action: "Absence", time: "Toute la journée", status: "absent" },
]

const chartConfig = {
  present: {
    label: "Présents",
    color: "hsl(var(--chart-4))",
  },
  absent: {
    label: "Absents",
    color: "hsl(var(--chart-5))",
  },
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-muted-foreground">Vue d'ensemble de la présence des employés</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Actifs dans l'entreprise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Présents Aujourd'hui</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.presentToday}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.presentToday / stats.totalEmployees) * 100).toFixed(0)}% du personnel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absents</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.absentToday}</div>
            <p className="text-xs text-muted-foreground">Non présents aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retards</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.lateToday}</div>
            <p className="text-xs text-muted-foreground">Arrivées tardives</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Présences de la semaine</CardTitle>
            <CardDescription>Évolution quotidienne des présences</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="present" fill="var(--color-present)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="var(--color-absent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Derniers événements de présence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <span className="text-xs font-medium">
                        {activity.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.time}</p>
                    <Badge
                      variant={
                        activity.status === "present"
                          ? "default"
                          : activity.status === "late"
                            ? "secondary"
                            : "destructive"
                      }
                      className="mt-1"
                    >
                      {activity.status === "present" ? "Présent" : activity.status === "late" ? "Retard" : "Absent"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
