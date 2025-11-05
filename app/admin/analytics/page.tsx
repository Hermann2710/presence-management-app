"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

// Mock analytics data
const monthlyData = [
  { month: "Jan", present: 920, absent: 80, late: 45 },
  { month: "Fév", present: 880, absent: 120, late: 52 },
  { month: "Mar", present: 950, absent: 50, late: 38 },
  { month: "Avr", present: 910, absent: 90, late: 48 },
  { month: "Mai", present: 940, absent: 60, late: 42 },
  { month: "Juin", present: 900, absent: 100, late: 55 },
]

const departmentData = [
  { name: "Développement", value: 15, color: "hsl(var(--chart-1))" },
  { name: "Marketing", value: 10, color: "hsl(var(--chart-2))" },
  { name: "RH", value: 8, color: "hsl(var(--chart-3))" },
  { name: "Ventes", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Support", value: 3, color: "hsl(var(--chart-5))" },
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
  late: {
    label: "Retards",
    color: "hsl(var(--chart-2))",
  },
}

export default function AnalyticsPage() {
  const totalPresent = monthlyData.reduce((sum, item) => sum + item.present, 0)
  const totalAbsent = monthlyData.reduce((sum, item) => sum + item.absent, 0)
  const attendanceRate = ((totalPresent / (totalPresent + totalAbsent)) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analyses</h2>
        <p className="text-muted-foreground">Statistiques et tendances de présence</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">+2.5% par rapport au mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absences totales</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAbsent}</div>
            <p className="text-xs text-muted-foreground">Sur les 6 derniers mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retards moyens</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(monthlyData.reduce((sum, item) => sum + item.late, 0) / monthlyData.length).toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">Par mois</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendance mensuelle</CardTitle>
            <CardDescription>Évolution des présences sur 6 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="present" stroke="var(--color-present)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="absent" stroke="var(--color-absent)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par département</CardTitle>
            <CardDescription>Nombre d'employés par département</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Detailed Monthly Stats */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Statistiques détaillées</CardTitle>
            <CardDescription>Comparaison mensuelle des présences, absences et retards</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="present" fill="var(--color-present)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="var(--color-absent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" fill="var(--color-late)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
