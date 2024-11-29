import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface AdvancedSearchProps<T> {
  columns: {
    key: keyof T | string;
    header: string;
    type?: 'text' | 'number' | 'select' | 'date';
    options?: { label: string; value: string | number }[];
  }[];
  onSearch: (filters: Record<string, any>) => void;
  onReset?: () => void;
}

export default function AdvancedSearch<T>({ columns, onSearch, onReset }: AdvancedSearchProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleInputChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({});
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="rbc-mb-2 rbc-bg-white rbc-rounded-lg rbc-border rbc-border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="rbc-w-full rbc-flex rbc-items-center rbc-justify-between rbc-px-4 rbc-py-3 rbc-text-gray-700 hover:rbc-bg-gray-50"
      >
        <div className="rbc-flex rbc-items-center rbc-gap-2">
          <Search size={20} className="rbc-text-gray-500" />
          <span className="rbc-font-medium">جستجوی پیشرفته</span>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="rbc-text-gray-500" />
        ) : (
          <ChevronDown size={20} className="rbc-text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="rbc-p-4 rbc-border-t rbc-border-gray-200">
          <form onSubmit={handleSubmit} className="rbc-space-y-4">
            <div className="rbc-grid rbc-grid-cols-1 md:rbc-grid-cols-2 lg:rbc-grid-cols-3 rbc-gap-4">
              {columns.map(column => (
                <div key={column.key.toString()} className="rbc-space-y-2">
                  <label className="rbc-block rbc-text-sm rbc-font-medium rbc-text-gray-700">
                    {column.header}
                  </label>
                  {column.type === 'select' && column.options ? (
                    <select
                      value={filters[column.key.toString()] || ''}
                      onChange={(e) => handleInputChange(column.key.toString(), e.target.value)}
                      className="rbc-w-full rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent"
                    >
                      <option value="">همه</option>
                      {column.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : column.type === 'date' ? (
                    <input
                      type="date"
                      value={filters[column.key.toString()] || ''}
                      onChange={(e) => handleInputChange(column.key.toString(), e.target.value)}
                      className="rbc-w-full rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent"
                    />
                  ) : column.type === 'number' ? (
                    <input
                      type="number"
                      value={filters[column.key.toString()] || ''}
                      onChange={(e) => handleInputChange(column.key.toString(), e.target.value)}
                      className="rbc-w-full rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent"
                    />
                  ) : (
                    <input
                      type="text"
                      value={filters[column.key.toString()] || ''}
                      onChange={(e) => handleInputChange(column.key.toString(), e.target.value)}
                      className="rbc-w-full rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="rbc-flex rbc-justify-end rbc-gap-3 rbc-pt-4 rbc-border-t rbc-border-gray-200">
              <button
                type="button"
                onClick={handleReset}
                className="rbc-px-4 rbc-py-2 rbc-text-gray-700 rbc-bg-gray-100 rbc-rounded-lg hover:rbc-bg-gray-200 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-gray-500"
              >
                پاک کردن
              </button>
              <button
                type="submit"
                className="rbc-px-4 rbc-py-2 rbc-text-white rbc-bg-blue-600 rbc-rounded-lg hover:rbc-bg-blue-700 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500"
              >
                اعمال فیلتر
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}