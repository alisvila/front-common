import { ReactNode, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { useTableState } from "./TableStateManager";

interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface TableRowProps<T> {
  item: T;
  index: number;
  columns: Column<T>[];
  enableRowSelection: boolean;
  expandableContent?: (row: T) => Promise<ReactNode>;
  renderActionMenu?: (row: T) => ReactNode;
  onRowClick?: (row: T) => void;
}

export function TableRow<T>({
  item,
  index,
  columns,
  enableRowSelection,
  expandableContent,
  renderActionMenu,
  onRowClick,
}: TableRowProps<T>) {
  const { selectedRows, expandedRows, dispatch } = useTableState<T>();
  const [expandedContent, setExpandedContent] = useState<ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSelected = selectedRows.has(index);
  const isExpanded = expandedRows.has(index);

  useEffect(() => {
    async function loadExpandedContent() {
      if (isExpanded && expandableContent) {
        setIsLoading(true);
        try {
          const content = await expandableContent(item);
          setExpandedContent(content);
        } catch (error) {
          console.error('Error loading expanded content:', error);
          setExpandedContent(<div className="rbc-text-red-500">Error loading content</div>);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (isExpanded) {
      loadExpandedContent();
    } else {
      setExpandedContent(null);
    }
  }, [isExpanded, item, expandableContent]);

  const handleSelectRow = (checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(index);
    } else {
      newSelectedRows.delete(index);
    }
    dispatch({
      type: "SET_SELECTED_ROWS",
      payload: newSelectedRows,
    });
  };

  const handleExpand = () => {
    dispatch({
      type: "TOGGLE_EXPANDED_ROW",
      payload: index,
    });
  };

  const handleRowClick = () => {
    if (!expandableContent) return;
    handleExpand();
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const baseStyles = {
    backgroundColor:
      index % 2 === 0 ? "var(--rbc-table-stripe)" : "var(--rbc-bg-primary)",
    color: "var(--rbc-text-primary)",
    borderBottom: "1px solid var(--rbc-table-border)",
  };
  
  const hoverStyles =
    expandableContent || onRowClick
      ? "hover:rbc-bg-gray-100 rbc-cursor-pointer"
      : "";

  return (
    <>
      <tr
        onClick={handleRowClick}
        style={baseStyles}
        className={`rbc-transition-colors ${hoverStyles}`}
      >
        {enableRowSelection && (
          <td
            className="rbc-p-4"
            style={{ borderColor: "var(--rbc-table-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => handleSelectRow(e.target.checked)}
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
            onClick={(e) => e.stopPropagation()}
          >
            {renderActionMenu(item)}
          </td>
        )}
        
        {expandableContent && (
          <td className="rbc-px-6 rbc-py-4 rbc-w-8">
            <ChevronDown
              size={20}
              style={{ color: "var(--rbc-text-secondary)" }}
              className={`rbc-transition-transform ${
                isExpanded ? "rbc-rotate-180" : ""
              }`}
            />
          </td>
        )}
      </tr>
      
      {expandableContent && isExpanded && (
        <tr>
          <td
            colSpan={
              columns.length +
              (enableRowSelection ? 1 : 0) +
              (renderActionMenu ? 1 : 0) +
              1
            }
            className="rbc-bg-gray-50 rbc-px-6 rbc-py-4"
            style={{ borderColor: "var(--rbc-table-border)" }}
          >
            {isLoading ? <LoadingSpinner /> : expandedContent}
          </td>
        </tr>
      )}
    </>
  );
}