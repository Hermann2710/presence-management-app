import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Users } from "lucide-react";

export function BulkActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions de Masse</CardTitle>
        <CardDescription>
          Actions groupées sur les employés sélectionnés
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Mail className="h-6 w-6" />
            <span>Envoyer un Email</span>
            <span className="text-xs text-gray-500">Communication</span>
          </Button>

          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Download className="h-6 w-6" />
            <span>Exporter la Sélection</span>
            <span className="text-xs text-gray-500">Données ciblées</span>
          </Button>

          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Users className="h-6 w-6" />
            <span>Modifier en Masse</span>
            <span className="text-xs text-gray-500">
              Statut, département...
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
