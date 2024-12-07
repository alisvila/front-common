import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, X, Search } from "lucide-react";

interface Option {
  id: number;
  label: string;
}

interface SelectProps {
  loadOptions: (page: number, searchQuery: string) => Promise<Option[]>;
  multiple?: boolean;
  searchable?: boolean;
  value?: Option | Option[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  loadOptions,
  multiple = false,
  searchable = false,
  value,
  placeholder = "Select...",
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(Array.isArray(value) ? value : value ? [value] : []);


  // Load options on component mount and when search query changes
  useEffect(() => {
    setLoading(true);
    setPage(1);
    setOptions([]);
    loadOptions(1, searchQuery).then((newOptions) => {
      setOptions(newOptions);
      setLoading(false);
    });
  }, [searchQuery]);

  // Load more options when page changes
  useEffect(() => {
    if (page === 1) return;
    setLoading(true);
    loadOptions(page, searchQuery).then((newOptions) => {
      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
      setLoading(false);
    });
  }, [page]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") setDropdownOpen(false);
    // Implement ArrowUp, ArrowDown, and Enter logic here.
  };

  useEffect(() => {
    if (isDropdownOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDropdownOpen, searchable]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Infinite scroll - Observer to load more when reaching end of dropdown
  const observer = useRef<IntersectionObserver | null>(null);
  const lastOptionRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const toggleOption = (option: Option) => {
    if (multiple) {
      setSelectedOptions((prevSelected) => {
        if (prevSelected.some((selected) => selected.id === option.id)) {
          return prevSelected.filter((selected) => selected.id !== option.id); // Remove if already selected
        }
        return [...prevSelected, option]; // Add if not selected
      });
    } else {
      setSelectedOptions([option]); // Replace selection
      setDropdownOpen(false); // Close dropdown after selecting
    }
  };

  const removeSelectedOption = (option: Option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((selected) => selected.id !== option.id)
    );
  };

  return (
    <div className="rbc-relative" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Select Input */}
      <div
        className={`rbc-w-full rbc-px-4 rbc-py-2 rbc-bg-white rbc-border rbc-border-gray-300 rbc-rounded-lg rbc-shadow-sm focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent ${
          isDropdownOpen ? "rbc-ring-2 rbc-ring-blue-500 rbc-border-transparent" : ""
        }`}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <div className="rbc-flex rbc-items-center rbc-gap-2">
          {selectedOptions.length > 0 ? (
            <div className="rbc-flex rbc-items-center rbc-gap-2 rbc-flex-wrap">
              {selectedOptions.map((option) => (
                <div
                  key={option.id}
                  className="rbc-flex rbc-items-center rbc-gap-1 rbc-px-2 rbc-py-1 rbc-bg-gray-100 rbc-rounded-full rbc-text-sm"
                >
                  {option.label}
                  <button
                    className="rbc-text-gray-500 hover:rbc-text-gray-700 focus:rbc-outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedOption(option);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rbc-text-gray-400">{placeholder}</div>
          )}
          <ChevronDown className="rbc-w-4 rbc-h-4 rbc-ml-auto rbc-text-gray-500" />
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="rbc-absolute rbc-z-10 rbc-mt-1 rbc-w-full rbc-bg-white rbc-border rbc-border-gray-300 rbc-rounded-lg rbc-shadow-lg rbc-overflow-hidden"
        >
          {searchable && (
            <div className="rbc-px-4 rbc-py-2 rbc-border-b rbc-border-gray-300">
              <div className="rbc-relative">
                <Search className="rbc-absolute rbc-left-3 rbc-top-1/2 rbc--translate-y-1/2 rbc-text-gray-400" />
                <input
                  type="text"
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="rbc-w-full rbc-pl-10 rbc-pr-4 rbc-py-2 rbc-bg-gray-50 rbc-border rbc-border-gray-300 rbc-rounded-lg focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent"
                />
              </div>
            </div>
          )}
          <div className="rbc-max-h-60 rbc-overflow-y-auto">
            {options.map((option, index) => (
              <div
                key={option.id}
                ref={index === options.length - 1 ? lastOptionRef : null}
                className={`rbc-px-4 rbc-py-2 hover:rbc-bg-gray-100 rbc-cursor-pointer ${
                  selectedOptions.some((selected) => selected.id === option.id)
                    ? "rbc-bg-blue-50 rbc-text-blue-600"
                    : ""
                }`}
                onClick={() => toggleOption(option)}
              >
                {option.label}
              </div>
            ))}
            {isLoading && (
              <div className="rbc-px-4 rbc-py-2 rbc-text-center rbc-text-gray-500">
                Loading...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;