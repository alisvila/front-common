import { ReactNode } from 'react';
import { Column, SortConfig } from './types';
import SortButton from './SortButton';

interface TableHeaderProps<T> {
  columns: Column<T>[];
  enableRowSelection: boolean;
  renderActionMenu?: (row: T) => ReactNode;
  expandableContent?: (row: T) => Promise<ReactNode>;
  sortConfig: SortConfig<T>;
  selectedRows: Set<number>;
  totalRows: number;
  onSort: (key: keyof T) => void;
  onSelectAll: (selected: boolean) => void;
}

export function TableHeader<T>({
  columns,
  enableRowSelection,
  renderActionMenu,
  expandableContent,
  sortConfig,
  selectedRows,
  totalRows,
  onSort,
  onSelectAll,
}: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className="rbc-bg-gray-50">
        {enableRowSelection && (
          <th style={{background: "#e9f1f9"}} className="rbc-p-4 rbc-border-b">
            <div className="rbc-flex rbc-items-center rbc-gap-2">
              <input
                type="checkbox"
                checked={selectedRows.size === totalRows}
                onChange={() => onSelectAll(selectedRows.size !== totalRows)}
                className="rbc-w-4 rbc-h-4 rbc-rounded rbc-border-gray-300 rbc-text-blue-600 focus:rbc-ring-blue-500"
              />
            </div>
          </th>
        )}
        {columns.map((column) => (
          // TODO: change color to tailwind color!!
          <th
            key={column.key.toString()}
            style={{background: "#e9f1f9"}}
            className="rbc-px-6 rbc-py-4 rbc-text-left rbc-text-xs rbc-font-semibold rbc-text-gray-600 rbc-uppercase rbc-tracking-wider rbc-border-b"
          >
            <div className="rbc-flex rbc-items-center rbc-gap-2">
              {column.sortable && (
                <SortButton
                  column={column}
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              )}
              {column.header}
            </div>
          </th>
        ))}
        {renderActionMenu && (
          <th style={{background: "#e9f1f9"}} className="rbc-px-6 rbc-py-4 rbc-text-left rbc-text-xs rbc-font-semibold rbc-text-gray-600 rbc-uppercase rbc-tracking-wider rbc-border-b">
            <div className="rbc-flex rbc-items-center rbc-gap-2">
              عملیات
            </div>
          </th>
        )}
        {expandableContent && (
          <th style={{background: "#e9f1f9"}} className="rbc-px-6 rbc-py-4 rbc-text-left rbc-text-xs rbc-font-semibold rbc-text-gray-600 rbc-uppercase rbc-tracking-wider rbc-border-b" />
        )}
      </tr>
    </thead>
  );
}