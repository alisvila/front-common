import { ChevronDown, ChevronUp } from "lucide-react";
import { Column, SortConfig } from "./types";

interface SortButtonProps<T> {
    column: Column<T>
    sortConfig: SortConfig<T>
    onSort: (key: keyof T | string) => void;
}

export default function SortButton<T>({column, sortConfig, onSort}: SortButtonProps<T>) {
  return (
    <button
      onClick={() => onSort(column.key)}
      className="focus:rbc-outline-none group"
    >
      <div className="rbc-flex rbc-flex-col">
        <ChevronUp
          size={14}
          className={`${
            sortConfig.key === column.key && sortConfig.direction === "asc"
              ? "rbc-text-blue-600"
              : "rbc-text-gray-400 group-hover:rbc-text-gray-600"
          }`}
        />
        <ChevronDown
          size={14}
          className={`${
            sortConfig.key === column.key && sortConfig.direction === "desc"
              ? "rbc-text-blue-600"
              : "rbc-text-gray-400 group-hover:rbc-text-gray-600"
          }`}
        />
      </div>
    </button>
  );
}
