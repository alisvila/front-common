import { useTableState } from "../TableStateManager";
import { SortConfig } from "../types";

export function useColumnVisibility() {
  const { visibleColumns, dispatch } = useTableState();

  const toggleColumn = (columnKey: string) => {
    dispatch({ type: "TOGGLE_COLUMN_VISIBILITY", payload: columnKey });
  };

  return { visibleColumns, toggleColumn };
}

export function usePagination() {
  const { currentPage, dispatch } = useTableState();

  const setPage = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  return { currentPage, setPage };
}

export function useTableSearch() {
  const { searchTerm, dispatch } = useTableState();

  const setSearchTerm = (term: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  return { searchTerm, setSearchTerm };
}

export function useTableSort<T>() {
  const { sortConfig, dispatch } = useTableState<T>();

  const setSort = (config: SortConfig<T>) => {
    dispatch({ type: "SET_SORT_CONFIG", payload: config });
  };

  return { sortConfig, setSort };
}

// Specialized hooks for specific state slices
export function useSelectedRows() {
  const { selectedRows, dispatch } = useTableState();

  const setSelectedRows = (rows: Set<number>) => {
    dispatch({ type: "SET_SELECTED_ROWS", payload: rows });
  };

  const toggleRow = (index: number) => {
    const newRows = new Set(selectedRows);
    if (newRows.has(index)) {
      newRows.delete(index);
    } else {
      newRows.add(index);
    }
    setSelectedRows(newRows);
  };

  const selectAll = (indices: number[]) => {
    setSelectedRows(new Set(indices));
  };

  const clearSelection = () => {
    setSelectedRows(new Set());
  };

  return { selectedRows, toggleRow, selectAll, clearSelection };
}
