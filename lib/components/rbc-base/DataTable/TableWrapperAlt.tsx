import React, { useState } from "react";
import { Download, MoreHorizontal, Plus, Search } from "lucide-react";
import TableComponent from "./index";
import AdvanceFilter from "./AdvanceFilter";

interface DataTableAltProps<T> {
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

export default function DataTableAlt<T extends Record<string, any>>({
  title,
  description,
  className = "",
  data,
  columns,
  hideSearch,
  searchTerm = "",
  onSearch,
  onExport,
  onAddNew,
  addNewButtonLabel = "افزودن",
  renderExtraActions,
  bulkActions = [],
  ...props
}: DataTableAltProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = React.useState(false);
  const bulkActionsRef = React.useRef<HTMLDivElement>(null);

  // Close bulk actions dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        bulkActionsRef.current &&
        !bulkActionsRef.current.contains(event.target as Node)
      ) {
        setShowBulkActions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`rbc-bg-white rbc-rounded-lg rbc-border rbc-border-gray-200 ${className}`}
      dir="rtl"
    >
      {/* Header Section */}
      <div className="rbc-flex rbc-justify-between rbc-p-6 rbc-border-b rbc-border-gray-200">
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

      {/* Advanced Search & Toolbar */}
      {/* <div className="rbc-border-b rbc-border-gray-200"> */}
      <div className="rbc-px-2">
        <div className="rbc-flex rbc-items-center rbc-justify-between">
          {/* Search Box */}
          {/* {!hideSearch && (
              <div className="rbc-relative rbc-flex-1 rbc-max-w-sm">
                <Search className="rbc-absolute rbc-right-3 rbc-top-2.5 rbc-text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="جستجو ..."
                  value={searchTerm}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="rbc-w-full rbc-pl-4 rbc-pr-10 rbc-py-2 rbc-bg-gray-50 rbc-border rbc-border-gray-200 rbc-rounded-lg focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500"
                />
              </div>
            )} */}

          {/* Action Buttons */}
          <div className="rbc-flex rbc-items-center rbc-gap-3">
            {selectedRows.size > 0 && (
              <div className="rbc-relative" ref={bulkActionsRef}>
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="rbc-inline-flex rbc-items-center rbc-gap-2 rbc-px-3 rbc-py-2 rbc-bg-white rbc-text-gray-700 rbc-border rbc-border-gray-300 rbc-rounded-lg hover:rbc-bg-gray-50"
                >
                  <span>{selectedRows.size} مورد انتخاب شده</span>
                  <MoreHorizontal size={18} />
                </button>

                {showBulkActions && bulkActions.length > 0 && (
                  <div className="rbc-absolute rbc-left-0 rbc-mt-1 rbc-w-48 rbc-bg-white rbc-rounded-lg rbc-shadow-lg rbc-border rbc-border-gray-200 rbc-z-50">
                    <div className="rbc-py-1">
                      {bulkActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            action.onClick();
                            setShowBulkActions(false);
                          }}
                          className={`rbc-w-full rbc-text-right rbc-px-4 rbc-py-2 hover:rbc-bg-gray-50 ${
                            action.variant === "danger"
                              ? "rbc-text-red-600"
                              : "rbc-text-gray-700"
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* {onExport && (
              <button
                onClick={onExport}
                className="rbc-inline-flex rbc-items-center rbc-gap-2 rbc-px-3 rbc-py-2 rbc-bg-white rbc-text-gray-700 rbc-border rbc-border-gray-300 rbc-rounded-lg hover:rbc-bg-gray-50"
              >
                <Download size={18} />
                <span>خروجی</span>
              </button>
            )} */}

            {renderExtraActions?.()}
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* Table Section */}
      <div className="rbc-p-2">
        <AdvanceFilter
          columns={columns}
          onSearch={(filters) => {
            // Handle advanced search filters
            console.log("Advanced filters:", filters);
          }}
        />
        <TableComponent data={data} columns={columns} {...props} />
      </div>
    </div>
  );
}
