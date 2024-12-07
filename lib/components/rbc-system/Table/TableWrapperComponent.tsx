import React from "react";
import {TableComponent} from ".";
import {TableToolbar} from "./TableToolbar";
import { Plus } from "lucide-react";
import Button from "@lib/components/rbc-base/Button";
import { TableProvider } from "./TableStateManager";

interface DataTableProps<T> {
  title?: string;
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
  hideInnerToolbar?: boolean; // New prop to control toolbar visibility
}

export default function DataTable<T extends Record<string, any>>({
  title,
  description,
  className = "",
  onAddNew,
  addNewButtonLabel = "افزودن",
  columns,
  hideInnerToolbar = false, // Default to showing inner toolbar
  ...props
}: DataTableProps<T>) {
  return (
    <TableProvider initialColumns={columns}>
      <div
        className={`rbc-bg-white rbc-rounded-lg rbc-border rbc-border-gray-200 ${className}`}
        dir="rtl"
      >
        {/* Header Section */}
        <div className="rbc-flex rbc-justify-between rbc-px-4 rbc-py-6 rbc-border-b rbc-border-gray-200">
          {title && (
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
          )}

          <div>
            {onAddNew && (
              <Button
                variant="primary"
                onClick={onAddNew}
                icon={<Plus size={18} />}
                iconPosition="left"
              >
                {addNewButtonLabel}
              </Button>
            )}
          </div>
        </div>

        {/* Wrapper Toolbar Section - Only shown when inner toolbar is hidden */}
        {hideInnerToolbar && (
          <div className="rbc-border-b rbc-border-gray-200">
            <TableToolbar
              columns={columns}
              onExport={props.onExport}
              renderExtraActions={props.renderExtraActions}
              bulkActions={props.bulkActions}
            />
          </div>
        )}

        {/* Table Section */}
        <div className="rbc-p-2">
          <TableComponent
            columns={columns}
            {...props}
            hideToolbar={hideInnerToolbar} // Pass hideToolbar prop to TableComponent
          />
        </div>
      </div>
    </TableProvider>
  );
}