import React, { useState } from 'react';
import { Columns } from 'lucide-react';

interface ColumnVisibilityPanelProps<T> {
  columns: {
    key: keyof T | string;
    header: string;
  }[];
  visibleColumns: Set<string>;
  onColumnToggle: (columnKey: string) => void;
}

export default function ColumnVisibilityPanel<T>({
  columns,
  visibleColumns,
  onColumnToggle,
}: ColumnVisibilityPanelProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rbc-relative" dir="rtl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rbc-inline-flex rbc-items-center rbc-gap-2 rbc-px-4 rbc-py-2 rbc-bg-white rbc-text-gray-700 rbc-border rbc-border-gray-300 rbc-rounded-lg hover:rbc-bg-gray-50 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500"
      >
        <Columns size={18} />
        <span>ستون‌ها</span>
      </button>

      {isOpen && (
        <div className="rbc-absolute rbc-right-0 rbc-mt-2 rbc-w-64 rbc-bg-white rbc-rounded-lg rbc-shadow-xl rbc-border rbc-border-gray-200 rbc-z-50">
          <div className="rbc-p-4">
            <div className="rbc-space-y-2">
              {columns.map((column) => (
                <label
                  key={column.key.toString()}
                  className="rbc-flex rbc-items-center rbc-gap-2 rbc-p-2 hover:rbc-bg-gray-50 rbc-rounded-lg rbc-cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.has(column.key.toString())}
                    onChange={() => onColumnToggle(column.key.toString())}
                    className="rbc-h-4 rbc-w-4 rbc-rounded rbc-border-gray-300 rbc-text-blue-600 focus:rbc-ring-blue-500"
                  />
                  <span className="rbc-text-sm rbc-text-gray-700">
                    {column.header}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}