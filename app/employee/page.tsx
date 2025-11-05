"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

// Mock employee stats
const employeeStats = {
  presentDays: 18,
  absentDays: 1,
  lateDays: 2,
  totalDays: 21,
  attendanceRate: 85.7,
  currentStatus: "present",
  checkInTime: "08:45",
}

const weeklyData = [
  { day: "Lun", hours: 8 },
  { day: "Mar", hours: 8.5 },
  { day: "Mer", hours: 7.5 },
  { day: "Jeu", hours: 9 },
  { day: "Ven", hours: 8 },
]

const upcomingEvents = [
  { title: "Réunion d'équipe", date: "2025-01-25", time: "10:00" },
  { title: "Formation", date: "2025-01-27", time: "14:00" },
  { title: "Entretien annuel", date: "2025-01-30", time: "15:30" },
]

const chartConfig = {
  hours: {
    label: "Heures",
    color: "hsl(var(--chart-1))",
  },
}

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bienvenue</h2>
          <p className="text-muted-foreground">Voici votre activité du mois</p>
        </div>
        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 text-base px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
          Présent aujourd'hui
        </Badge>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Pointage du jour</h3>
              <p className="text-sm text-muted-foreground">Arrivée: {employeeStats.checkInTime}</p>
            </div>
            <Button size="lg" className="gap-2">
              <Clock className="h-4 w-4" />
              Pointer la sortie
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jours présents</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{employeeStats.presentDays}</div>
            <p className="text-xs text-muted-foreground">Sur {employeeStats.totalDays} jours ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absences</CardTitle>
            <Calendar className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeStats.absentDays}</div>
            <p className="text-xs text-muted-foreground">Jour(s) d'absence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retards</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{employeeStats.lateDays}</div>
            <p className="text-xs text-muted-foreground">Arrivées tardives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{employeeStats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Performance mensuelle</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Hours Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Heures de travail</CardTitle>
            <CardDescription>Vos heures cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Événements à venir</CardTitle>
            <CardDescription>Vos prochains rendez-vous</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Card */}
      <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Excellente assiduité!</h3>
              <p className="text-sm text-muted-foreground">
                Vous avez maintenu un taux de présence de {employeeStats.attendanceRate}% ce mois-ci
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
