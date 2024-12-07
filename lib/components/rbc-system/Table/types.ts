import { ReactNode } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
}

export interface SortConfig<T> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}

export interface TableProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  enableRowSelection?: boolean;
  renderActionMenu?: (row: T) => ReactNode;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  onSearch?: (term: string) => void;
  currentPage?: number;
  searchTerm?: string;
  sortConfig?: SortConfig<T>;
  loading?: boolean;
  expandableContent?: (row: T) => Promise<ReactNode>;
  onRowClick?: (row: T) => void;
  onAddNew?: () => void;
  addNewButtonLabel?: string;
  hideSearch?: boolean;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
  onExport?: () => void;
  selectedRows?: Set<number>;  // Optional controlled selectedRows state
  setSelectedRows?: (rows: Set<number>) => void; 
  bulkActions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'danger';
  }[];
  hideToolbar: boolean;
  renderExtraActions?: () => React.ReactNode;
}