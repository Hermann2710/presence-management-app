// components/employees/bulk-actions.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Download, Users } from "lucide-react";

export function BulkActions() {
  const actions = [
    {
      label: "Envoyer un email groupé",
      icon: Mail,
      variant: "outline" as const,
    },
    {
      label: "Exporter les contacts",
      icon: Download,
      variant: "outline" as const,
    },
    {
      label: "Générer un rapport complet",
      icon: Users,
      variant: "outline" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions de Masse</CardTitle>
        <CardDescription>Gestion groupée des employés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="flex items-center gap-2"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
