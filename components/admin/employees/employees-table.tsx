// components/employee/employees-table.tsx
import { flexRender, Table } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Employee } from "@/types/employee";

interface EmployeesTableProps {
  table: Table<Employee>;
  columns: any[];
}

export function EmployeesTable({ table, columns }: EmployeesTableProps) {
  // Ajouter les meta actions au tableau
  const tableWithMeta = {
    ...table,
    options: {
      ...table.options,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Employés</CardTitle>
        <CardDescription>
          {table.getFilteredRowModel().rows.length} employé(s) au total -{" "}
          {
            table
              .getFilteredRowModel()
              .rows.filter((row) => row.original.status === "ACTIVE").length
          }{" "}
          actif(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {tableWithMeta.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b bg-muted/50">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left p-3 font-semibold"
                        style={{ width: header.getSize() }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {tableWithMeta.getRowModel().rows.length > 0 ? (
                  tableWithMeta.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="p-8 text-center text-gray-500"
                    >
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Aucun employé trouvé</p>
                      <p className="text-sm mt-1">
                        Ajustez vos filtres ou ajoutez des employés
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {tableWithMeta.getPageCount() > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Page {tableWithMeta.getState().pagination.pageIndex + 1} sur{" "}
              {tableWithMeta.getPageCount()} -{" "}
              {tableWithMeta.getFilteredRowModel().rows.length} employé(s)
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => tableWithMeta.previousPage()}
                disabled={!tableWithMeta.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => tableWithMeta.nextPage()}
                disabled={!tableWithMeta.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
