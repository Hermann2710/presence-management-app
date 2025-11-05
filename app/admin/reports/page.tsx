"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Users, TrendingUp, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock report data
const reportTemplates = [
  {
    id: "1",
    name: "Rapport mensuel de présence",
    description: "Vue d'ensemble des présences du mois",
    icon: Calendar,
    category: "attendance",
  },
  {
    id: "2",
    name: "Rapport par employé",
    description: "Statistiques détaillées par employé",
    icon: Users,
    category: "employee",
  },
  {
    id: "3",
    name: "Rapport de performance",
    description: "Analyse des tendances et performances",
    icon: TrendingUp,
    category: "analytics",
  },
  {
    id: "4",
    name: "Rapport d'absences",
    description: "Liste des absences et congés",
    icon: FileText,
    category: "attendance",
  },
]

const recentReports = [
  {
    id: "1",
    name: "Rapport mensuel - Janvier 2025",
    type: "Présence",
    date: "2025-01-24",
    status: "completed",
  },
  {
    id: "2",
    name: "Analyse des retards - Q1",
    type: "Performance",
    date: "2025-01-20",
    status: "completed",
  },
  {
    id: "3",
    name: "Rapport par département",
    type: "Employé",
    date: "2025-01-15",
    status: "completed",
  },
]

const departmentStats = [
  { department: "Développement", employees: 15, present: 14, absent: 1, rate: 93.3 },
  { department: "Marketing", employees: 10, present: 9, absent: 1, rate: 90.0 },
  { department: "RH", employees: 8, present: 8, absent: 0, rate: 100.0 },
  { department: "Ventes", employees: 12, present: 10, absent: 2, rate: 83.3 },
  { department: "Support", employees: 3, present: 3, absent: 0, rate: 100.0 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTemplates =
    selectedCategory === "all"
      ? reportTemplates
      : reportTemplates.filter((template) => template.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rapports</h2>
          <p className="text-muted-foreground">Générez et consultez vos rapports</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Modèles de rapports</TabsTrigger>
          <TabsTrigger value="recent">Rapports récents</TabsTrigger>
          <TabsTrigger value="custom">Rapport personnalisé</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="attendance">Présence</SelectItem>
                <SelectItem value="employee">Employé</SelectItem>
                <SelectItem value="analytics">Analyses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <template.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {template.category === "attendance"
                        ? "Présence"
                        : template.category === "employee"
                          ? "Employé"
                          : "Analyses"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Générer le rapport
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rapports récents</CardTitle>
              <CardDescription>Vos derniers rapports générés</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du rapport</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date de génération</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.type}</Badge>
                      </TableCell>
                      <TableCell>{new Date(report.date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Terminé</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rapport par département</CardTitle>
              <CardDescription>Statistiques de présence par département pour aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Département</TableHead>
                    <TableHead>Total employés</TableHead>
                    <TableHead>Présents</TableHead>
                    <TableHead>Absents</TableHead>
                    <TableHead>Taux de présence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentStats.map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{dept.employees}</TableCell>
                      <TableCell>
                        <span className="text-green-500 font-medium">{dept.present}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-500 font-medium">{dept.absent}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${dept.rate}%` }} />
                          </div>
                          <span className="text-sm font-medium w-12">{dept.rate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Aperçu
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exporter en PDF
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
