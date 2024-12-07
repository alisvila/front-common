import React, { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@lib/components/rbc-base/Button";
import AdvancedFilter from "../../rbc-system/Table/AdvanceFilter";
import { TableAdapter } from "./TableAdaprot";

interface DataTableAltProps<T> {
  title?: string;
  description?: string;
  itemsPerPage?: number;
  enableRowSelection?: boolean;
  renderActionMenu?: (row: T) => React.ReactNode;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
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
  emptyStateMessage?: string;
  emptyStateDescription?: string;
  className?: string;
  filterOptions?: any;
  DetailComponent?: any;
  dataHook?: any;
  objectID?: any;
  headers: any;
}

export function TableWithAdvanceSearch<T extends Record<string, any>>({
  title,
  description,
  className = "",
  filterOptions,
  DetailComponent,
  onAddNew,
  dataHook,
  objectID,
  headers,
  addNewButtonLabel = "افزودن",
}: DataTableAltProps<T>) {
  const [queryParams, setQueryParams] = useState({});

  return (
    <div
      className={`rbc-bg-white rbc-rounded-lg rbc-border rbc-border-gray-200 ${className}`}
      dir="rtl"
    >
      {/* Header Section */}
      <div className="rbc-flex rbc-justify-between rbc-p-6 rbc-border-b rbc-border-gray-200">
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

      {/* Table Section */}
      <div className="rbc-p-2">
        <AdvancedFilter
          setQueryParamsCallable={setQueryParams}
          filterOptions={filterOptions}
          AddParamsToRoute={true}
          className="my-custom-class"
        />
        <TableAdapter
          DetailComponent={DetailComponent}
          dataHook={dataHook}
          dataHookProps={queryParams}
          objectID={objectID}
          headers={headers}
        />
      </div>
    </div>
  );
}
