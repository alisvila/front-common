import { TableProvider } from "./TableStateManager";
import { DataTable } from "./DataTable";

export function TableComponent({ columns, data, ...props }) {
  return (
    <TableProvider initialColumns={columns}>
      <DataTable data={data} columns={columns} {...props} />
    </TableProvider>
  );
}

