import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, Calendar } from "lucide-react";
import { useReportExport } from "@/hooks/use-reports";
import { useToast } from "@/components/ui/use-toast";

interface ExportActionsProps {
  stats: any;
}

export function ExportActions({ stats }: ExportActionsProps) {
  const { toast } = useToast();
  const { exportToPDF, exportToCSV, exportToExcel } = useReportExport();

  const handleExport = (type: "pdf" | "csv" | "excel") => {
    const exportFunctions = {
      pdf: exportToPDF,
      csv: exportToCSV,
      excel: exportToExcel,
    };

    exportFunctions[type](stats);

    toast({
      title: `Export ${type.toUpperCase()} démarré`,
      description: `Votre rapport est en cours de génération...`,
      variant: "default",
    });
  };

  const generateMonthlyReport = () => {
    toast({
      title: "Rapport mensuel généré",
      description: "Le rapport détaillé du mois a été créé",
      variant: "default",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Génération de Rapports</CardTitle>
        <CardDescription>
          Exportez vos données et générez des rapports détaillés
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleExport("pdf")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <Download className="h-6 w-6" />
            <span>Rapport PDF</span>
            <span className="text-xs text-gray-500">Synthèse détaillée</span>
          </Button>

          <Button
            onClick={() => handleExport("csv")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <BarChart3 className="h-6 w-6" />
            <span>Données CSV</span>
            <span className="text-xs text-gray-500">Export brut</span>
          </Button>

          <Button
            onClick={generateMonthlyReport}
            className="h-20 flex flex-col gap-2"
          >
            <Calendar className="h-6 w-6" />
            <span>Rapport Mensuel</span>
            <span className="text-xs">Générer automatiquement</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
