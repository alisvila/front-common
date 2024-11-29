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
  const headerStyles = {
    backgroundColor: 'var(--rbc-table-header-bg)',
    borderBottom: '1px solid var(--rbc-table-border)',
    color: 'var(--rbc-text-secondary)',
  };

  const cellStyles = {
    padding: '1rem 1.5rem',
    textAlign: 'left' as const,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--rbc-table-border)',
  };

  const checkboxStyles = {
    width: '1rem',
    height: '1rem',
    borderRadius: '0.25rem',
    borderColor: 'var(--rbc-border-color)',
    color: 'var(--rbc-primary)',
  };

  return (
    <thead>
      <tr style={headerStyles}>
        {enableRowSelection && (
          <th style={{ ...cellStyles, padding: '1rem' }}>
            <div className="rbc-flex rbc-items-center rbc-gap-2">
              <input
                type="checkbox"
                checked={selectedRows.size === totalRows}
                onChange={() => onSelectAll(selectedRows.size !== totalRows)}
                className="rbc-rounded focus:rbc-ring-2 focus:rbc-ring-offset-2"
                style={checkboxStyles}
              />
            </div>
          </th>
        )}
        
        {columns.map((column) => (
          <th
            key={column.key.toString()}
            style={cellStyles}
          >
            <div className="rbc-flex rbc-items-center rbc-gap-2">
              {column.sortable && (
                <SortButton
                  column={column}
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              )}
              <span>{column.header}</span>
            </div>
          </th>
        ))}

        {renderActionMenu && (
          <th style={cellStyles}>
            <div className="rbc-flex rbc-items-center rbc-gap-2">
              عملیات
            </div>
          </th>
        )}

        {expandableContent && (
          <th style={cellStyles}>
            <div className="rbc-flex rbc-items-center rbc-gap-2" />
          </th>
        )}
      </tr>
    </thead>
  );
}