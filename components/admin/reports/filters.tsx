import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DepartmentChartData } from "@/types/dashboard";

interface FiltersProps {
  periodFilter: string;
  setPeriodFilter: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  departmentStats: DepartmentChartData[];
}

export function Filters({
  periodFilter,
  setPeriodFilter,
  departmentFilter,
  setDepartmentFilter,
  departmentStats,
}: FiltersProps) {
  return (
    <div className="flex gap-2">
      <Select value={periodFilter} onValueChange={setPeriodFilter}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Aujourd'hui</SelectItem>
          <SelectItem value="week">Cette semaine</SelectItem>
          <SelectItem value="month">Ce mois</SelectItem>
          <SelectItem value="quarter">Ce trimestre</SelectItem>
          <SelectItem value="year">Cette année</SelectItem>
        </SelectContent>
      </Select>

      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Tous départements" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous départements</SelectItem>
          {departmentStats.map((dept: DepartmentChartData) => (
            <SelectItem key={dept.name} value={dept.name.toLowerCase()}>
              {dept.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
