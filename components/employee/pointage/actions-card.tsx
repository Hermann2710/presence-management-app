import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActionsCardProps {
  children: React.ReactNode;
}

export function ActionsCard({ children }: ActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions de Pointage</CardTitle>
        <CardDescription>Pointage d'entrée et de sortie</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
