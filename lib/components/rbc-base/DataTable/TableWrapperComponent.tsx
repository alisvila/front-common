import React, { useState } from "react";
import TableComponent from "./index";
import TableToolbar from "./TableToolbar";
import { Plus } from "lucide-react";

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: {
    key: keyof T | string;
    header: string;
    type?: "text" | "number" | "select" | "date";
    options?: { label: string; value: string | number }[];
    sortable?: boolean;
  }[];
  itemsPerPage?: number;
  enableRowSelection?: boolean;
  renderActionMenu?: (row: T) => React.ReactNode;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  onSearch?: (term: string) => void;
  currentPage?: number;
  searchTerm?: string;
  sortConfig?: {
    key: keyof T | null;
    direction: "asc" | "desc";
  };
  loading?: boolean;
  expandableContent?: (row: T) => Promise<React.ReactNode>;
  onRowClick?: (row: T) => void;
  onAddNew?: () => void;
  addNewButtonLabel?: string;
  hideSearch?: boolean;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
  onExport?: () => void;
  bulkActions?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
  }[];
  renderExtraActions?: () => React.ReactNode;
  className?: string;
}

export default function DataTable<T extends Record<string, any>>({
  title,
  description,
  className = "",
  onAddNew,
  addNewButtonLabel = "افزودن",
  columns,
  ...props
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [activeFilters, setActiveFilters] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map(col => col.key.toString()))
  );

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
    // You might want to handle the filtering logic here or pass it up
  };

  const handleColumnToggle = (columnKey: string) => {
    setVisibleColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(columnKey)) {
        newSet.delete(columnKey);
      } else {
        newSet.add(columnKey);
      }
      return newSet;
    });
  };

  return (
    <div
      className={`rbc-bg-white rbc-rounded-lg rbc-border rbc-border-gray-200 ${className}`}
      dir="rtl"
    >
      {/* Header Section */}
      {/* Header Section */}
      <div className="rbc-flex rbc-justify-between rbc-px-4 rbc-py-6 rbc-border-b rbc-border-gray-200">
        <div>
          <h2 className="rbc-text-xl rbc-font-semibold rbc-text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="rbc-mt-1 rbc-text-sm rbc-text-gray-500">
              {description}
            </p>
          )}
        </div>

        <div>
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="rbc-inline-flex rbc-items-center rbc-gap-2 rbc-px-4 rbc-py-2 rbc-bg-blue-600 rbc-text-white rbc-rounded-lg hover:rbc-bg-blue-700 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500"
            >
              <Plus size={18} />
              <span>{addNewButtonLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="rbc-border-b rbc-border-gray-200">
        <TableToolbar
          columns={columns}
          hideSearch={props.hideSearch}
          searchTerm={props.searchTerm}
          onSearch={props.onSearch}
          onExport={props.onExport}
          renderExtraActions={props.renderExtraActions}
          selectedRows={selectedRows.size}
          bulkActions={props.bulkActions}
          onApplyFilters={handleApplyFilters}
          visibleColumns={visibleColumns}
          onColumnToggle={handleColumnToggle}
        />
      </div>

      {/* Table Section */}
      <div className="rbc-p-2">
        <TableComponent
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
          columns={columns.filter((col) =>
            visibleColumns.has(col.key.toString())
          )}
          {...props}
        />
      </div>
    </div>
  );
}
