import { SortableHeaderItem } from "./TableAdaprot";

export function ConvertHeaders<T>(headers: SortableHeaderItem[]) {
  return headers.map((header) => ({
    key: header.accessor || String(header.id),
    header: header.columnName,
    sortable: Boolean(header.sortableFieldName),
    // Add custom cell renderer if component exists
    render: header.component
      ? (row: T) => header.component!(row)
      : (row: T) => row[header.accessor as keyof T],
  }));
}
