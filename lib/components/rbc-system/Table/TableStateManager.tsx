// TableContext.tsx
import React, { createContext, useContext, useReducer, useMemo } from "react";
import { Column, SortConfig } from "./types";

// State interface
export interface TableState<T> {
  selectedRows: Set<number>;
  visibleColumns: Set<string>;
  sortConfig: SortConfig<T>;
  currentPage: number;
  searchTerm: string;
  filters: any[];
  expandedRows: Set<number>;
  loading: boolean;
  error: Error | null;
}

// Action types
type TableAction<T> =
  | { type: "SET_SELECTED_ROWS"; payload: Set<number> }
  | { type: "TOGGLE_COLUMN_VISIBILITY"; payload: string }
  | { type: "SET_SORT_CONFIG"; payload: SortConfig<T> }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_FILTERS"; payload: any[] }
  | { type: "TOGGLE_EXPANDED_ROW"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error | null };

// Context interface
interface TableContextValue<T> extends TableState<T> {
  dispatch: React.Dispatch<TableAction<T>>;
}

// Create context
const TableContext = createContext<TableContextValue<any> | undefined>(
  undefined
);

// Reducer function
function tableReducer<T>(
  state: TableState<T>,
  action: TableAction<T>
): TableState<T> {
  switch (action.type) {
    case "SET_SELECTED_ROWS":{
      console.log(state, 'state')
      return { ...state, selectedRows: action.payload };
    }

    case "TOGGLE_COLUMN_VISIBILITY": {
      const newVisibleColumns = new Set(state.visibleColumns);
      if (newVisibleColumns.has(action.payload)) {
        newVisibleColumns.delete(action.payload);
      } else {
        newVisibleColumns.add(action.payload);
      }
      return { ...state, visibleColumns: newVisibleColumns };
    }

    case "SET_SORT_CONFIG":
      return { ...state, sortConfig: action.payload };

    case "SET_PAGE":
      return { ...state, currentPage: action.payload };

    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };

    case "SET_FILTERS":
      return { ...state, filters: action.payload };

    case "TOGGLE_EXPANDED_ROW": {
      const newExpandedRows = new Set(state.expandedRows);
      if (newExpandedRows.has(action.payload)) {
        newExpandedRows.delete(action.payload);
      } else {
        newExpandedRows.add(action.payload);
      }
      return { ...state, expandedRows: newExpandedRows };
    }

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Provider component
interface TableProviderProps<T> {
  children: React.ReactNode;
  initialColumns: Column<T>[];
}

export function TableProvider<T>({
  children,
  initialColumns,
}: TableProviderProps<T>) {
  const initialState: TableState<T> = {
    selectedRows: new Set(),
    visibleColumns: new Set(initialColumns.map((col) => col.key.toString())),
    sortConfig: { key: null, direction: "asc" },
    currentPage: 1,
    searchTerm: "",
    filters: [],
    expandedRows: new Set(),
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(tableReducer<T>, initialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

// Custom hooks for consuming the context
export function useTableState<T>() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableState must be used within a TableProvider");
  }
  return context;
}
