// DataTable.tsx
import React, { useEffect } from "react";
import { useTableState } from "./TableStateManager";
import {
  useSelectedRows,
  useColumnVisibility,
  usePagination,
  useTableSearch,
  useTableSort,
} from "./hooks";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TablePagination } from "./TablePagination";
import { TableToolbar } from "./TableToolbar";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import { TableProps } from "./types";

export function DataTable<T>({
  data,
  columns,
  itemsPerPage = 10,
  enableRowSelection = false,
  renderActionMenu,
  totalItems,
  onPageChange,
  onSort,
  onSearch,
  loading: externalLoading,
  expandableContent,
  onRowClick,
  onAddNew,
  addNewButtonLabel = "افزودن",
  emptyStateMessage = "داده‌ای یافت نشد",
  emptyStateDescription = "هیچ داده‌ای برای نمایش وجود ندارد",
  bulkActions,
  onExport,
  renderExtraActions,
  hideToolbar = false,
}: TableProps<T>) {
  // Use our custom hooks
  const { loading: internalLoading, error } = useTableState();
  const { selectedRows, toggleRow, selectAll } = useSelectedRows();
  const { visibleColumns, toggleColumn } = useColumnVisibility();
  const { currentPage, setPage } = usePagination();
  const { searchTerm, setSearchTerm } = useTableSearch();
  const { sortConfig, setSort } = useTableSort<T>();
  useEffect(() => {
    console.log(bulkActions, 'outside bulk')
  }, [bulkActions])
  // Combine external and internal loading states
  const loading = externalLoading || internalLoading;

  // Filter visible columns
  const visibleColumnsData = columns.filter((col) =>
    visibleColumns.has(col.key.toString())
  );

  // Handle sort
  const handleSort = (key: keyof T) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const newConfig = { key, direction: newDirection };
    setSort(newConfig);
    if (onSort) {
      onSort(key, newDirection);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil((totalItems ?? data.length) / itemsPerPage);
  const paginatedData = React.useMemo(() => {
    if (onPageChange) return data; // Server-side pagination
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage, onPageChange]);

  if (error) {
    return (
      <div className="rbc-p-4 rbc-text-red-500">Error: {error.message}</div>
    );
  }



  return (
    <div className="rbc-space-y-4" dir="rtl">
      {/* Toolbar */}
      {!hideToolbar && (
        <TableToolbar
          columns={columns}
          bulkActions={bulkActions}
          onExport={onExport}
          renderExtraActions={renderExtraActions}
        />
      )}

      {/* Main Table */}
      <div className="rbc-relative rbc-border rbc-rounded-lg">
        {loading && <LoadingSpinner />}

        <table className="rbc-min-w-full rbc-divide-y rbc-divide-gray-200">
          <TableHeader
            columns={visibleColumnsData}
            enableRowSelection={enableRowSelection}
            totalRows={data.length}
          />

          <tbody className="rbc-divide-y rbc-divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    visibleColumnsData.length + (enableRowSelection ? 1 : 0)
                  }
                >
                  <EmptyState
                    message={emptyStateMessage}
                    description={emptyStateDescription}
                    onAddNew={onAddNew}
                    addNewButtonLabel={addNewButtonLabel}
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow
                  key={index}
                  item={item}
                  columns={visibleColumnsData}
                  index={index}
                  enableRowSelection={enableRowSelection}
                  renderActionMenu={renderActionMenu}
                  onRowClick={() => onRowClick?.(item)}
                  expandableContent={expandableContent}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
