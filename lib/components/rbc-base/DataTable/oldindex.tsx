import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight, FileX } from 'lucide-react';

interface TableProps<T> {
  data: T[];
  columns: {
    key: string | keyof T;
    header: string;
    sortable?: boolean;
  }[];
  itemsPerPage?: number;
  enableRowSelection?: boolean; // New prop to enable/disable row selection
  renderActionMenu?: (row: T) => React.ReactNode; // New prop for action menu
  totalItems?: number; // Total items for server-side pagination
  onPageChange?: (page: number) => void;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  onSearch?: (term: string) => void;
  currentPage?: number;
  searchTerm?: string;
  sortConfig?: {
    key: keyof T | null;
    direction: 'asc' | 'desc';
  };
  loading?: boolean;
  expandableContent?: (row: T) => Promise<React.ReactNode>;
  onRowClick?: (row: T) => void;
  onAddNew?: () => void;
  addNewButtonLabel?: string;
  hideSearch?: boolean;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableComponent = <T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 10,
  enableRowSelection = false, // Default: row selection disabled
  renderActionMenu, // Action menu, optional
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
  addNewButtonLabel = 'افزودن',
  hideSearch = false,
  emptyStateMessage = 'داده‌ای یافت نشد',
  emptyStateDescription = 'هیچ داده‌ای برای نمایش وجود ندارد',
}: TableProps<T>) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [localSortConfig, setLocalSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [localPage, setLocalPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [expandedContent, setExpandedContent] = useState<Record<number, React.ReactNode>>({});
  const [loadingRows, setLoadingRows] = useState<Set<number>>(new Set());

  console.log(data.length)
  const hasData = data.length > 0;
  const showPagination = !loading && hasData && (totalItems! > itemsPerPage || data.length > itemsPerPage);
  console.log(!loading, hasData, showPagination, data.length , itemsPerPage , totalItems! > itemsPerPage)

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
        console.error('Error loading expandable content:', error);
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
          return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === 'asc' ? 1 : -1;
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

  const handleSearch = (term: string) => {
    setLocalSearchTerm(term);
    if (isServerSide.pagination) {
      setLocalPage(1);
    }
  };

  const handleSort = (key: keyof T) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const newSortConfig: {key: keyof T, direction: "asc" | "desc"} = { key, direction: newDirection };

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

  const renderEmptyState = () => (
    <div className="rbc-flex rbc-flex-col rbc-items-center rbc-justify-center rbc-py-12 rbc-px-4">
      <div className="rbc-bg-gray-50 rbc-rounded-full rbc-p-4 rbc-mb-4">
        <FileX className="rbc-w-12 rbc-h-12 rbc-text-gray-400" />
      </div>
      <h3 className="rbc-text-lg rbc-font-medium rbc-text-gray-900 rbc-mb-1">
        {emptyStateMessage}
      </h3>
      <p className="rbc-text-sm rbc-text-gray-500 rbc-text-center rbc-max-w-sm">
        {emptyStateDescription}
      </p>
      {onAddNew && (
        <button
          onClick={onAddNew}
          className="rbc-mt-4 rbc-px-4 rbc-py-2 rbc-bg-blue-600 rbc-text-white rbc-rounded-lg hover:rbc-bg-blue-700 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-ring-offset-2 rbc-transition-all rbc-duration-200"
        >
          {addNewButtonLabel}
        </button>
      )}
    </div>
  );
  
  return (
    <div className="rbc-w-full rbc-bg-white rbc-rounded-lg rbc-shadow-lg rbc-p-6" dir="rtl">
      <div className="rbc-flex rbc-justify-between rbc-items-center rbc-mb-6 rbc-gap-4">
        {!hideSearch && (
          <div className="rbc-relative rbc-flex-1">
            <Search className="rbc-absolute rbc-right-4 rbc-top-3.5 rbc-text-gray-400" size={20} />
            <input
              type="text"
              placeholder="جستجو ..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="rbc-w-full rbc-p-3 rbc-pr-12 rbc-bg-gray-50 rbc-border rbc-border-gray-200 rbc-rounded-lg focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent rbc-transition-all rbc-duration-200"
            />
          </div>
        )}
        
        {onAddNew && (
          <button
            onClick={onAddNew}
            className="rbc-px-4 rbc-py-2 rbc-bg-blue-600 rbc-text-white rbc-rounded-lg hover:rbc-bg-blue-700 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-ring-offset-2 rbc-transition-all rbc-duration-200"
          >
            {addNewButtonLabel}
          </button>
        )}
      </div>

      {loading && (
        <div className="rbc-flex rbc-justify-center rbc-items-center rbc-py-4">
          <div className="rbc-animate-spin rbc-rounded-full rbc-h-8 rbc-w-8 rbc-border-4 rbc-border-blue-500 rbc-border-t-transparent"></div>
        </div>
      )}

      <div className="rbc-overflow-x-auto rbc-rounded-lg rbc-border rbc-border-gray-200">
        <table className="rbc-min-w-full rbc-divide-y rbc-divide-gray-200">
          <thead>
            <tr className="rbc-bg-gray-50">
              {enableRowSelection && (
                <th className="rbc-p-4 rbc-border-b">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length}
                    onChange={() => {
                      if (selectedRows.size === paginatedData.length) {
                        setSelectedRows(new Set());
                      } else {
                        setSelectedRows(new Set(paginatedData.map((_, i) => i)));
                      }
                    }}
                    className="rbc-w-4 rbc-h-4 rbc-rounded rbc-border-gray-300 rbc-text-blue-600 focus:rbc-ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  className="rbc-px-6 rbc-py-4 rbc-text-left rbc-text-xs rbc-font-semibold rbc-text-gray-600 rbc-uppercase rbc-tracking-wider rbc-border-b"
                >
                  <div className="rbc-flex rbc-items-center rbc-gap-2">
                    {column.header}
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="focus:rbc-outline-none group"
                      >
                        <div className="rbc-flex rbc-flex-col">
                          <ChevronUp
                            size={14}
                            className={`${
                              sortConfig.key === column.key &&
                              sortConfig.direction === 'asc'
                                ? 'rbc-text-blue-600'
                                : 'rbc-text-gray-400 group-hover:rbc-text-gray-600'
                            }`}
                          />
                          <ChevronDown
                            size={14}
                            className={`${
                              sortConfig.key === column.key &&
                              sortConfig.direction === 'desc'
                                ? 'rbc-text-blue-600'
                                : 'rbc-text-gray-400 group-hover:rbc-text-gray-600'
                            }`}
                          />
                        </div>
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {renderActionMenu && (
                <th className="rbc-px-6 rbc-py-4 rbc-text-left rbc-text-xs rbc-font-semibold rbc-text-gray-600 rbc-uppercase rbc-tracking-wider rbc-border-b">
                  عملیات
                </th>
              )}
              {expandableContent && (
                <th className="rbc-px-6 rbc-py-4 rbc-text-left rbc-text-xs rbc-font-semibold rbc-text-gray-600 rbc-uppercase rbc-tracking-wider rbc-border-b">
                  
                </th>
              )}
            </tr>
          </thead>
          {!hasData ? (
              <tbody>
              <tr>
                <td colSpan={columns.length + (enableRowSelection ? 1 : 0) + (renderActionMenu ? 1 : 0) + (expandableContent ? 1 : 0)}>
                  {renderEmptyState()}
                </td>
              </tr>
            </tbody>
            ) : (
          <tbody className="rbc-bg-white rbc-divide-y rbc-divide-gray-200">
            {paginatedData.map((item, index) => (
              <>
              <tr
                onClick={() => handleRowClick(item, index)}
                className={`${
                  index % 2 === 0 ? 'rbc-bg-gray-50' : 'rbc-bg-white'
                } ${expandableContent ? 'hover:rbc-bg-gray-100 rbc-cursor-pointer' : ''}`}
              >
                {enableRowSelection && (
                  <td className="rbc-p-4 rbc-border-b">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(index)}
                      onChange={() => {
                        const newSelection = new Set(selectedRows);
                        if (newSelection.has(index)) {
                          newSelection.delete(index);
                        } else {
                          newSelection.add(index);
                        }
                        setSelectedRows(newSelection);
                      }}
                      className="rbc-w-4 rbc-h-4 rbc-rounded rbc-border-gray-300 rbc-text-blue-600 focus:rbc-ring-blue-500"
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <td
                    key={column.key.toString()}
                    className="rbc-px-6 rbc-py-4 rbc-text-sm rbc-text-gray-700 rbc-border-b"
                  >
                    {item[column.key]}
                  </td>
                ))}

                {renderActionMenu && (
                  <td className="rbc-px-6 rbc-py-4 rbc-text-sm rbc-text-gray-700 rbc-border-b">
                    {renderActionMenu(item)}
                  </td>
                )}

                {expandableContent && (
                  <td className="rbc-px-6 rbc-py-4 rbc-w-8">
                    {loadingRows.has(index) ? (
                      <div className="rbc-animate-spin rbc-h-5 rbc-w-5 rbc-border-2 rbc-border-blue-500 rbc-border-t-transparent rbc-rounded-full" />
                    ) : (
                      <ChevronDown
                        size={20}
                        className={`rbc-transition-transform ${
                          expandedRows.has(index) ? 'rbc-rotate-180' : ''
                        }`}
                      />
                    )}
                  </td>
                )}
              </tr>
              {expandedRows.has(index) && (
                <tr>
                  <td colSpan={columns.length + (enableRowSelection ? 1 : 0) + (renderActionMenu ? 1 : 0) + (expandableContent ? 1 : 0)}>
                    <div className="rbc-p-4 rbc-bg-gray-50 rbc-border-t rbc-border-gray-200">
                      {expandedContent[index]}
                    </div>
                  </td>
                </tr>
              )}
            </>
            ))}
          </tbody>
          )}
        </table>
      </div>
      {showPagination && (
      <div className="rbc-flex rbc-justify-between rbc-items-center rbc-mt-4">
        <div className="rbc-flex rbc-items-center rbc-gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="rbc-p-2 rbc-border rbc-border-gray-300 rbc-rounded rbc-bg-white hover:rbc-bg-gray-50 disabled:rbc-opacity-50"
          >
            <ChevronRight size={20} />
          </button>
          <div className="rbc-flex rbc-items-center rbc-gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="rbc-px-2">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`rbc-w-8 rbc-h-8 rbc-rounded-lg rbc-text-sm rbc-font-medium ${
                      currentPage === page
                        ? 'rbc-bg-blue-600 rbc-text-white'
                        : 'rbc-text-gray-700 hover:rbc-bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="rbc-p-2 rbc-border rbc-border-gray-300 rbc-rounded rbc-bg-white hover:rbc-bg-gray-50 disabled:rbc-opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div>
          صفحه {currentPage} از {totalPages}
        </div>
      </div>
      )}
    </div>
  );
};

// export default TableComponent;
