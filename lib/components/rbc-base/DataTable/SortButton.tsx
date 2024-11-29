import { ChevronDown, ChevronUp } from "lucide-react";
import { Column, SortConfig } from "./types";

interface SortButtonProps<T> {
  column: Column<T>;
  sortConfig: SortConfig<T>;
  onSort: (key: keyof T | string) => void;
}

export default function SortButton<T>({
  column,
  sortConfig,
  onSort
}: SortButtonProps<T>) {
  const activeIconStyle = {
    color: 'var(--rbc-primary)',
  };

  const inactiveIconStyle = {
    color: 'var(--rbc-text-secondary)',
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    ':focus': {
      outline: 'none',
    },
  };

  return (
    <button
      onClick={() => onSort(column.key)}
      className="focus:rbc-outline-none group"
      style={buttonStyle}
    >
      <div className="rbc-flex rbc-flex-col">
        <ChevronUp
          size={14}
          style={
            sortConfig.key === column.key && sortConfig.direction === "asc"
              ? activeIconStyle
              : inactiveIconStyle
          }
          className="group-hover:rbc-text-gray-600"
        />
        <ChevronDown
          size={14}
          style={
            sortConfig.key === column.key && sortConfig.direction === "desc"
              ? activeIconStyle
              : inactiveIconStyle
          }
          className="group-hover:rbc-text-gray-600"
        />
      </div>
    </button>
  );
}