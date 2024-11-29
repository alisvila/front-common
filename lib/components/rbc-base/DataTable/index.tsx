import React, { useState, useMemo, useEffect } from "react";
import { TableProps } from "./types";
import { TableHeader } from "./TableHeader";
import { TableSearch } from "./TableSearch";
import { TablePagination } from "./TablePagination";
import { TableRow } from "./TableRow";
import LoadingSpinner from "./LoadingSpinner";
import AddNewButton from "./AddNewButton";
import EmptyState from "./EmptyState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TableComponent<T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 10,
  enableRowSelection = false,
  renderActionMenu,
  totalItems,
  onPageChange,
  onSort,
  onSearch,
  currentPage: controlledPage,
  searchTerm: controlledSearchTerm,
  sortConfig: controlledSortConfig,
  loading = false,
  expandableContent,
  onRowClick,
  onAddNew,
  selectedRows: controlledSelectedRows,
  setSelectedRows: setControlledSelectedRows,
  addNewButtonLabel = "افزودن",
  hideSearch = true,
  emptyStateMessage = "داده‌ای یافت نشد",
  emptyStateDescription = "هیچ داده‌ای برای نمایش وجود ندارد",
}: TableProps<T>) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [localSortConfig, setLocalSortConfig] = useState<{
    key: keyof T | string;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [localPage, setLocalPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [localSelectedRows, setLocalSelectedRows] = useState<Set<number>>(new Set());
  const [expandedContent, setExpandedContent] = useState<
    Record<number, React.ReactNode>
  >({});
  const [loadingRows, setLoadingRows] = useState<Set<number>>(new Set());

  console.log(data.length);
  const hasData = data.length > 0;
  const showPagination =
    !loading &&
    hasData &&
    (totalItems! > itemsPerPage || data.length > itemsPerPage);
  console.log(
    !loading,
    hasData,
    showPagination,
    data.length,
    itemsPerPage,
    totalItems! > itemsPerPage
  );

  const handleRowClick = async (row: T, index: number) => {
    if (onRowClick) {
      onRowClick(row);
    }

    if (expandableContent) {
      const newExpandedRows = new Set(expandedRows);

      if (expandedRows.has(index)) {
        newExpandedRows.delete(index);
        setExpandedRows(newExpandedRows);
        return;
      }

      setLoadingRows(new Set([...loadingRows, index]));

      try {
        const content = await expandableContent(row);
        setExpandedContent((prev) => ({
          ...prev,
          [index]: content,
        }));
        newExpandedRows.add(index);
        setExpandedRows(newExpandedRows);
      } catch (error) {
        console.error("Error loading expandable content:", error);
      } finally {
        setLoadingRows((prev) => {
          const newLoadingRows = new Set(prev);
          newLoadingRows.delete(index);
          return newLoadingRows;
        });
      }
    }
  };

  const isServerSide = {
    pagination: Boolean(onPageChange),
    sort: Boolean(onSort),
    search: Boolean(onSearch),
  };

  const selectedRows = controlledSelectedRows ?? localSelectedRows;
  const setSelectedRows = setControlledSelectedRows ?? setLocalSelectedRows;
  const searchTerm = controlledSearchTerm ?? localSearchTerm;
  const currentPage = controlledPage ?? localPage;
  const sortConfig = controlledSortConfig ?? localSortConfig;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isServerSide.search && onSearch) {
        onSearch(searchTerm);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, isServerSide.search, onSearch]);

  const processedData = useMemo(() => {
    if (isServerSide.search || isServerSide.sort) {
      return data;
    }

    let processed = [...data];

    if (!isServerSide.search && searchTerm) {
      processed = processed.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (!isServerSide.sort && sortConfig.key) {
      processed.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return processed;
  }, [data, searchTerm, sortConfig, isServerSide.search, isServerSide.sort]);

  const totalPages = Math.ceil(
    (totalItems ?? processedData.length) / itemsPerPage
  );

  const paginatedData = useMemo(() => {
    if (isServerSide.pagination) {
      return data;
    }
    const start = (currentPage - 1) * itemsPerPage;
    return processedData.slice(start, start + itemsPerPage);
  }, [processedData, currentPage, itemsPerPage, isServerSide.pagination, data]);

  const handleSort = (key: keyof T) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const newSortConfig: { key: keyof T; direction: "asc" | "desc" } = {
      key,
      direction: newDirection,
    };

    if (isServerSide.sort && onSort) {
      onSort(key, newDirection);
    } else {
      setLocalSortConfig(newSortConfig);
    }
  };

  const handlePageChange = (page: number) => {
    if (isServerSide.pagination && onPageChange) {
      onPageChange(page);
    } else {
      setLocalPage(page);
    }
  };

  function handleSelectAll(): void {
    if (selectedRows && selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, i) => i)));
    }
  }

  function handleSelectRow(index: number) {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedRows(newSelection);
  }

  return (
    <div dir="rtl" className="rbc-table-wrapper" style={{ backgroundColor: 'var(--rbc-bg-primary)' }}>

      {loading && <LoadingSpinner />}

      <div className="rbc-overflow-x-auto rbc-rounded-lg rbc-border rbc-border-gray-200" style={{ 
        borderColor: 'var(--rbc-table-border)',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}>
        <table className="rbc-min-w-full rbc-divide-y rbc-divide-gray-200">
          <TableHeader
            columns={columns}
            enableRowSelection={enableRowSelection}
            renderActionMenu={renderActionMenu}
            expandableContent={expandableContent}
            sortConfig={sortConfig}
            selectedRows={selectedRows}
            totalRows={paginatedData.length}
            onSort={handleSort}
            onSelectAll={handleSelectAll}
          />
          {!hasData ? (
            <tbody>
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (enableRowSelection ? 1 : 0) +
                    (renderActionMenu ? 1 : 0) +
                    (expandableContent ? 1 : 0)
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
            </tbody>
          ) : (
<tbody className="rbc-divide-y" style={{ 
              backgroundColor: 'var(--rbc-bg-primary)',
              borderColor: 'var(--rbc-table-border)' 
            }}>
              {paginatedData.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    item={item}
                    index={index}
                    columns={columns}
                    enableRowSelection={enableRowSelection}
                    renderActionMenu={renderActionMenu}
                    expandableContent={Boolean(expandableContent)}
                    isExpanded={expandedRows.has(index)}
                    isLoading={loadingRows.has(index)}
                    isSelected={selectedRows.has(index)}
                    onRowClick={() => handleRowClick(item, index)}
                    onSelectRow={() => handleSelectRow(index)}
                  />
                  {expandedRows.has(index) && (
                    <tr>
                      <td
                        colSpan={
                          columns.length +
                          (enableRowSelection ? 1 : 0) +
                          (renderActionMenu ? 1 : 0) +
                          (expandableContent ? 1 : 0)
                        }
                      >
                        <div className="rbc-p-4" style={{ 
                          backgroundColor: 'var(--rbc-bg-secondary)',
                          borderColor: 'var(--rbc-table-border)',
                          borderTopWidth: '1px'
                        }}>
                          {expandedContent[index]}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {showPagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
    // </div>
  );
}

export default TableComponent;
