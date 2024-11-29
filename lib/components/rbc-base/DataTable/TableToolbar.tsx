import React from "react";
import { Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import FilterPanel from "./FilterPanel";
import ColumnVisibilityPanel from "./ColumnVisibilityPanel";

interface TableToolbarProps<T> {
  title?: string;
  hideSearch?: boolean;
  searchTerm?: string;
  onSearch?: (term: string) => void;
  onExport?: () => void;
  onAddNew?: () => void;
  addNewButtonLabel?: string;
  renderExtraActions?: () => React.ReactNode;
  selectedRows?: number;
  visibleColumns: Set<string>;
  onColumnToggle: (columnKey: string) => void;
  bulkActions?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
  }[];
  // Filter props
  columns: {
    key: keyof T | string;
    header: string;
    type?: "text" | "number" | "select" | "date";
    options?: { label: string; value: string | number }[];
  }[];
  onApplyFilters: (filters: any) => void;
}

export default function TableToolbar<T>({
  onExport,
  renderExtraActions,
  selectedRows = 0,
  bulkActions = [],
  columns,
  visibleColumns,
  onColumnToggle,
  onApplyFilters,
}: TableToolbarProps<T>) {
  const [showBulkActions, setShowBulkActions] = React.useState(false);
  const bulkActionsRef = React.useRef<HTMLDivElement>(null);

  // Close bulk actions dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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
    <div className="rbc-bg-white" dir="rtl">
      {/* Top Section with Title and Primary Actions */}
      <div className="rbc-p-2">
        <div className="rbc-flex rbc-items-center rbc-justify-between">
          <div className="rbc-flex rbc-items-center rbc-gap-4">
            <FilterPanel columns={columns} onApplyFilters={onApplyFilters} />
            <ColumnVisibilityPanel
              columns={columns}
              visibleColumns={visibleColumns}
              onColumnToggle={onColumnToggle}
            />
          </div>
          <div className="rbc-flex rbc-items-center rbc-gap-3">
            {selectedRows > 0 && (
              <div className="rbc-relative" ref={bulkActionsRef}>
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="rbc-inline-flex rbc-items-center rbc-gap-2 rbc-px-3 rbc-py-2 rbc-bg-white rbc-text-gray-700 rbc-border rbc-border-gray-300 rbc-rounded-lg hover:rbc-bg-gray-50"
                >
                  <span>{selectedRows} مورد انتخاب شده</span>
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

            {onExport && (
              <button
                onClick={onExport}
                className="rbc-inline-flex rbc-items-center rbc-gap-2 rbc-px-3 rbc-py-2 rbc-bg-white rbc-text-gray-700 rbc-border rbc-border-gray-300 rbc-rounded-lg hover:rbc-bg-gray-50"
              >
                <Download size={18} />
                <span>خروجی</span>
              </button>
            )}

            {renderExtraActions?.()}
          </div>
        </div>
      </div>
    </div>
  );
}
