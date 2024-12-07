import { ChevronDown, ChevronUp } from "lucide-react";
import { Column, SortConfig } from "./types";
import Button from "@lib/components/rbc-base/Button";

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

  const SortIcon = () => (
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
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onSort(column.key)}
      icon={<SortIcon />}
      className="!rbc-p-1" // Smaller padding for sort button
    />
  );
}