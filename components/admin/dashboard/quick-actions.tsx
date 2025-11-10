import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
        <CardDescription>
          Accès direct aux fonctionnalités principales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/attendances">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col gap-2"
            >
              <Calendar className="h-6 w-6" />
              <span>Gérer les Présences</span>
            </Button>
          </Link>

          <Link href="/admin/employees">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col gap-2"
            >
              <Users className="h-6 w-6" />
              <span>Gérer les Employés</span>
            </Button>
          </Link>

          <Link href="/admin/reports">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col gap-2"
            >
              <TrendingUp className="h-6 w-6" />
              <span>Voir les Rapports</span>
            </Button>
          </Link>

          <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
            <Clock className="h-6 w-6" />
            <span>Pointages du Jour</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
