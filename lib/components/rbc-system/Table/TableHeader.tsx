import { ReactNode } from 'react';
import { Column, SortConfig } from './types';
import SortButton from './SortButton';
import { useTableState } from './TableStateManager';

interface TableHeaderProps<T> {
  columns: Column<T>[];
  enableRowSelection: boolean;
  renderActionMenu?: (row: T) => ReactNode;
  expandableContent?: (row: T) => Promise<ReactNode>;
  totalRows: number;
}

export function TableHeader<T>({
  columns,
  enableRowSelection,
  renderActionMenu,
  expandableContent,
  totalRows
}: TableHeaderProps<T>) {
  const { 
    selectedRows, 
    sortConfig, 
    dispatch 
  } = useTableState<T>();

  const handleSort = (key: keyof T) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    dispatch({ 
      type: 'SET_SORT_CONFIG', 
      payload: { key, direction: newDirection } 
    });
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows: Set<number> = checked 
      ? new Set(Array.from({ length: totalRows }, (_, i) => i)) 
      : new Set();
    
    dispatch({ 
      type: 'SET_SELECTED_ROWS', 
      payload: newSelectedRows 
    });
  };

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
                onChange={(e) => handleSelectAll(e.target.checked)}
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
                  onSort={handleSort}
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