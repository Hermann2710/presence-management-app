"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, LogIn, LogOut, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TimeTrackingPage() {
  const [isCheckedIn, setIsCheckedIn] = useState(true)
  const [checkInTime] = useState("08:45")
  const currentTime = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    // In a real app, this would call an API
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    // In a real app, this would call an API
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pointage</h2>
        <p className="text-muted-foreground">Enregistrez vos heures d'arrivée et de départ</p>
      </div>

      {/* Current Status */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Heure actuelle</span>
              </div>
              <p className="text-4xl font-bold">{currentTime}</p>
              <div className="flex items-center gap-2 mt-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <Badge
              className={
                isCheckedIn
                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 text-base px-4 py-2"
                  : "bg-muted text-muted-foreground text-base px-4 py-2"
              }
            >
              <div
                className={`h-2 w-2 rounded-full mr-2 ${isCheckedIn ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`}
              />
              {isCheckedIn ? "Présent" : "Non pointé"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Check In/Out Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5 text-green-500" />
              Pointer l'arrivée
            </CardTitle>
            <CardDescription>Enregistrez votre heure d'arrivée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isCheckedIn ? (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-500">Déjà pointé aujourd'hui</p>
                <p className="text-sm text-muted-foreground mt-1">Arrivée: {checkInTime}</p>
              </div>
            ) : (
              <Button onClick={handleCheckIn} className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                Pointer l'arrivée
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-red-500" />
              Pointer le départ
            </CardTitle>
            <CardDescription>Enregistrez votre heure de départ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isCheckedIn ? (
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium text-muted-foreground">Déjà pointé le départ</p>
                <p className="text-sm text-muted-foreground mt-1">Bonne soirée!</p>
              </div>
            ) : (
              <Button onClick={handleCheckOut} variant="destructive" className="w-full" size="lg">
                <LogOut className="mr-2 h-4 w-4" />
                Pointer le départ
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Today's Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé du jour</CardTitle>
          <CardDescription>Vos heures de travail aujourd'hui</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-medium text-muted-foreground mb-1">Arrivée</p>
              <p className="text-2xl font-bold">{isCheckedIn ? checkInTime : "-"}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-medium text-muted-foreground mb-1">Départ</p>
              <p className="text-2xl font-bold">{!isCheckedIn ? currentTime : "-"}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-medium text-muted-foreground mb-1">Temps travaillé</p>
              <p className="text-2xl font-bold">{isCheckedIn ? "En cours..." : "8h 45m"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
