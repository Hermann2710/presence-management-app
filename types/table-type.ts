import { TableMeta, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onEdit?: (employee: TData) => void;
    onDelete?: (employee: TData) => void;
  }
}
