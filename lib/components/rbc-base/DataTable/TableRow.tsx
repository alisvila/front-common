import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
// import { Column } from "./types";
import LoadingSpinner from "./LoadingSpinner";

// Update the Column type in types.ts to include render
interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode; // Add this line
}

interface TableRowProps<T> {
  item: T;
  index: number;
  columns: Column<T>[];
  enableRowSelection: boolean;
  renderActionMenu?: (row: T) => ReactNode;
  expandableContent?: boolean;
  isExpanded: boolean;
  isLoading: boolean;
  isSelected: boolean;
  onRowClick: () => void;
  onSelectRow: (selected: boolean) => void;
}

export function TableRow<T>({
  item,
  index,
  columns,
  enableRowSelection,
  renderActionMenu,
  expandableContent,
  isExpanded,
  isLoading,
  isSelected,
  onRowClick,
  onSelectRow,
}: TableRowProps<T>) {
  const baseStyles = {
    backgroundColor:
      index % 2 === 0 ? "var(--rbc-table-stripe)" : "var(--rbc-bg-primary)",
    color: "var(--rbc-text-primary)",
    borderBottom: "1px solid var(--rbc-table-border)",
  };

  const hoverStyles = expandableContent
    ? {
        cursor: "pointer",
        ":hover": {
          backgroundColor: "var(--rbc-table-row-hover)",
        },
      }
    : {};

  return (
    <tr
      onClick={onRowClick}
      style={{
        ...baseStyles,
        ...hoverStyles,
      }}
      className="hover:rbc-bg-gray-100"
    >
      {enableRowSelection && (
        <td
          className="rbc-p-4"
          style={{ borderColor: "var(--rbc-table-border)" }}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectRow(e.target.checked)}
            className="rbc-w-4 rbc-h-4 rbc-rounded rbc-border-gray-300 rbc-text-blue-600 focus:rbc-ring-blue-500"
          />
        </td>
      )}

      {columns.map((column) => (
        <td
          key={column.key.toString()}
          className="rbc-px-6 rbc-py-4 rbc-text-sm"
          style={{
            borderColor: "var(--rbc-table-border)",
            color: "var(--rbc-text-primary)",
          }}
        >
          {/* Use render function if provided, otherwise fall back to default value access */}
          {column.render
            ? column.render(item)
            : item[column.key] != null
            ? String(item[column.key])
            : ""}
        </td>
      ))}

      {renderActionMenu && (
        <td
          className="rbc-px-6 rbc-py-4 rbc-text-sm"
          style={{
            borderColor: "var(--rbc-table-border)",
            color: "var(--rbc-text-primary)",
          }}
        >
          {renderActionMenu(item)}
        </td>
      )}

      {expandableContent && (
        <td className="rbc-px-6 rbc-py-4 rbc-w-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ChevronDown
              size={20}
              style={{ color: "var(--rbc-text-secondary)" }}
              className={`rbc-transition-transform ${
                isExpanded ? "rbc-rotate-180" : ""
              }`}
            />
          )}
        </td>
      )}
    </tr>
  );
}
