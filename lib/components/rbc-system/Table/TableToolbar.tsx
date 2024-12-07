import React from "react";
import { Download, MoreHorizontal } from "lucide-react";
import FilterPanel from "./FilterPanel";
import ColumnVisibilityPanel from "./ColumnVisibilityPanel";
import Button from "@lib/components/rbc-base/Button";
import { useTableState } from "./TableStateManager";

interface TableToolbarProps<T> {
  title?: string;
  onExport?: () => void;
  onAddNew?: () => void;
  addNewButtonLabel?: string;
  renderExtraActions?: () => React.ReactNode;
  bulkActions?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
  }[];
  columns: {
    key: keyof T | string;
    header: string;
    type?: "text" | "number" | "select" | "date";
    options?: { label: string; value: string | number }[];
  }[];
}

export function TableToolbar<T>({
  onExport,
  renderExtraActions,
  bulkActions = [],
  columns,
}: TableToolbarProps<T>) {
  const [showBulkActions, setShowBulkActions] = React.useState(false);
  const bulkActionsRef = React.useRef<HTMLDivElement>(null);

  const {
    selectedRows,
    visibleColumns,
    searchTerm,
    dispatch
  } = useTableState<T>();

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

  React.useEffect(() => {
    console.log(bulkActions, "")
  }, [bulkActions])
  

  const handleColumnToggle = (columnKey: string) => {
    dispatch({
      type: 'TOGGLE_COLUMN_VISIBILITY',
      payload: columnKey
    });
  };

  const handleApplyFilters = (newFilters: any[]) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: newFilters
    });
  };

  const handleSearch = (term: string) => {
    dispatch({
      type: 'SET_SEARCH_TERM',
      payload: term
    });
  };

  return (
    <div className="rbc-bg-white" dir="rtl">
      {/* Top Section with Title and Primary Actions */}
      <div className="rbc-p-2">
        <div className="rbc-flex rbc-items-center rbc-justify-between">
          <div className="rbc-flex rbc-items-center rbc-gap-4">
            <FilterPanel 
              columns={columns} 
            />
            <ColumnVisibilityPanel
              columns={columns}
              visibleColumns={visibleColumns}
              onColumnToggle={handleColumnToggle}
            />

            {/* Search Input */}
            <div className="rbc-relative rbc-flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="جستجو..."
                className="rbc-w-full rbc-px-4 rbc-py-2 rbc-border rbc-rounded-lg focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500"
              />
            </div>
          </div>

          <div className="rbc-flex rbc-items-center rbc-gap-3">
            {selectedRows.size > 0 && (
              <div className="rbc-relative" ref={bulkActionsRef}>
                <Button
                  variant="outline"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  icon={<MoreHorizontal size={18} />}
                  iconPosition="right"
                >
                  {selectedRows.size} مورد انتخاب شده
                </Button>

                {showBulkActions && bulkActions.length > 0 && (
                  <div className="rbc-absolute rbc-left-0 rbc-mt-1 rbc-w-48 rbc-bg-white rbc-rounded-lg rbc-shadow-lg rbc-border rbc-border-gray-200 rbc-z-50">
                    <div className="rbc-py-1">
                      {bulkActions.map((action, index) => {
                        console.log(action, "bulkActions")
                        return (
                        <Button
                          key={index}
                          variant="ghost"
                          onClick={() => {
                            action.onClick();
                            setShowBulkActions(false);
                          }}
                          className={`rbc-w-full rbc-justify-start ${
                            action.variant === "danger"
                              ? "rbc-text-red-600"
                              : "rbc-text-gray-700"
                          }`}
                        >
                          {action.label}
                        </Button>
                      )})}
                    </div>
                  </div>
                )}
              </div>
            )}

            {onExport && (
              <Button
                variant="outline"
                onClick={onExport}
                icon={<Download size={18} />}
                iconPosition="left"
              >
                خروجی
              </Button>
            )}

            {renderExtraActions?.()}
          </div>
        </div>
      </div>
    </div>
  );
}