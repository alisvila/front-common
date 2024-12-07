import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Accordion } from '../Accordion';
import Button from '@lib/components/rbc-base/Button';
import { useSearchParams, usePathname } from 'next/navigation';
import useSearchParamsWrapper from '@lib/components/rbc-react/hooks/useSearchParamsWrapper';
import JalaliDatePicker from '@lib/components/rbc-base/DatePicker';

interface FilterSchema {
  type: string;
  format?: string;
  enum?: Array<any>;
  items?: {
    type: string;
    enum?: Array<any>;
  };
}

interface FilterOption {
  in: string;
  name: string;
  schema: FilterSchema;
  description: string;
  style?: string;
  explode?: boolean;
}

interface FilterOptionsByDescriptionType {
  description: string;
  name: string;
  nameWithSuffix: string;
  in: string;
  schema: FilterSchema;
  items: FilterOption[];
}

interface AdvancedFilterProps {
  setQueryParamsCallable: React.Dispatch<React.SetStateAction<Object>>;
  filterOptions?: FilterOption[];
  AddParamsToRoute?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdvancedFilter({
  setQueryParamsCallable,
  filterOptions = [],
  AddParamsToRoute = false,
  className = '',
  style: propStyle
}: AdvancedFilterProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { getAll, setObject, resetRoute } = useSearchParamsWrapper();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterOptionsGroupedByDescription, setFilterOptionsGroupedByDescription] = 
    useState<FilterOptionsByDescriptionType[]>();

  const filterOptionsSuffix = [
    "__exclude",
    "__contains",
    "__startswith",
    "__endswith",
    "__gte",
    "__lt",
    "__icontains",
    "__istartswith",
    "__iendswith",
  ];

  const shouldNotBeInFilters = ["pre_request_id", "page", "search", "ordering"];

  const baseStyle = {
    '--rbc-search-bg': 'var(--rbc-bg-primary, #FFFFFF)',
    '--rbc-search-border': 'var(--rbc-border-color, #E5E7EB)',
    '--rbc-search-text': 'var(--rbc-text-primary, #111827)',
    '--rbc-search-label': 'var(--rbc-text-secondary, #6B7280)',
    '--rbc-search-input-bg': 'var(--rbc-bg-primary, #FFFFFF)',
    '--rbc-search-input-border': 'var(--rbc-border-color, #E5E7EB)',
    '--rbc-search-input-focus': 'var(--rbc-primary, #3B82F6)',
    '--rbc-search-divider': 'var(--rbc-border-color, #E5E7EB)',
    ...propStyle,
  } as React.CSSProperties;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalFilterOptions: any = {};
    Object.keys(filters).forEach(firstKey => {
      if (firstKey.startsWith('filters_for_')) {
        const baseKey = firstKey.replace('filters_for_', '');
        if (filters[baseKey]) {
          finalFilterOptions[filters[firstKey]] = filters[baseKey];
        }
      } else {
        filterOptionsGroupedByDescription?.forEach(opt => {
          if (opt.items.length === 1 && opt.name === firstKey && filters[firstKey]) {
            finalFilterOptions[opt.nameWithSuffix] = filters[firstKey];
          }
        });
      }
    });

    const parsedFinalFilterOptions: any = Object.fromEntries(
      Object.entries(finalFilterOptions).filter(([_, v]) => v != null && v !== '')
    );

    setQueryParamsCallable(parsedFinalFilterOptions);
    if (AddParamsToRoute) {
      setObject(parsedFinalFilterOptions);
    }
  };

  const handleReset = () => {
    setFilters({});
    resetRoute(getAll());
  };

  const handleInputChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const separateFilters = (filterName: string) => {
    const indexOfLast__ = filterName.lastIndexOf("__");
    const filterOption = filterName.slice(indexOfLast__);
    if (filterOptionsSuffix.includes(filterOption) && indexOfLast__ > 0) {
      return {keyWithoutSuffix: filterName.slice(0, indexOfLast__), suffix: filterOption};
    }
    return {keyWithoutSuffix: filterName.trim(), suffix: ""};
  };

  const generateFilterField = (opt: FilterOptionsByDescriptionType) => {
    const commonProps = {
      value: filters[opt.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleInputChange(opt.name, e.target.value)
      console.log(e, 'eveeeent!')},
      className: "rbc-w-full rbc-rounded-lg rbc-border rbc-p-2 focus:rbc-ring-2 focus:rbc-outline-none focus:rbc-border-transparent"
    };

    const label = (
      <label className="rbc-block rbc-text-sm rbc-font-medium rbc-mb-1">
        {opt.description}
      </label>
    );

    if (opt.schema.hasOwnProperty("format")) {
      // Date input
      return (
        <>
          {label}
          <JalaliDatePicker {...commonProps} />
        </>
      );
    } else if (opt.schema.hasOwnProperty("enum") || opt.schema.hasOwnProperty("items")) {
      // Select input
      const splitLabel = opt.description.split("\n\n");
      const createArray = splitLabel.length > 1 ? splitLabel[1].split("\n") : []
      const options = {array: createArray, label: splitLabel[0]}
      // const options = opt.schema.enum || (opt.schema.items && opt.schema.items.enum) || [];
      return (
        <>
          {options.label}
          <select {...commonProps}>
            <option value="">همه</option>
            {options.array.map((option: any) => {
              const split = option.split("-")
              return (
                <option key={split[0]} value={split[0].replace(/\*/g,'').replace(/\`/g,'').trim()}>
                  {split[1]}
                </option>
              );
            })}
          </select>
        </>
      );
    } else if (opt.schema.type === "boolean") {
      // Checkbox input
      return (
        <label className="rbc-flex rbc-items-center rbc-gap-2">
          <input
            type="checkbox"
            checked={!!filters[opt.name]}
            onChange={e => handleInputChange(opt.name, e.target.checked)}
            className="rbc-rounded"
          />
          <span className="rbc-text-sm rbc-font-medium">{opt.description}</span>
        </label>
      );
    } else if (opt?.items.length > 1) {
      // Input with filter type selection
      const filterKey = `filters_for_${opt.name}`;
      return (
        <div className="rbc-space-y-2">
          {label}
          <div className="rbc-flex rbc-gap-2">
            <input {...commonProps} />
            <select
              value={filters[filterKey] || opt.nameWithSuffix}
              onChange={e => handleInputChange(filterKey, e.target.value)}
              className="rbc-rounded-lg rbc-border rbc-p-2 focus:rbc-ring-2 focus:rbc-outline-none"
            >
              {opt.items.map(item => (
                <option key={item.name} value={item.name}>
                  {item.name.split('__').pop()}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    } else {
      // Simple text input
      return (
        <>
          {label}
          <input type="text" {...commonProps} />
        </>
      );
    }
  };

  const parseOptionsForFilter = () => {
    return filterOptions.reduce((acc, item) => {
      if (item.in === "query" && !shouldNotBeInFilters.includes(item.name)) {
        const description = item?.description && item?.description.trim();

        if (!acc[description]) {
          acc[description] = {
            description,
            name: item.name,
            nameWithSuffix: item.name,
            in: item.in,
            schema: item.schema,
            items: [],
          };
        }
        acc[description].items.push(item);
      }
      return acc;
    }, {} as { [key: string]: FilterOptionsByDescriptionType });
  };

  useEffect(() => {
    if (filterOptions?.length > 0) {
      const groupedByDescription = parseOptionsForFilter();
      setFilterOptionsGroupedByDescription(Object.values(groupedByDescription));
    }
  }, [filterOptions]);

  useEffect(() => {
    const queryParams = getAll();
    const initialFilters: Record<string, any> = {};
    
    filterOptionsGroupedByDescription?.forEach(opt => {
      const { keyWithoutSuffix } = separateFilters(opt.nameWithSuffix);
      
      for (const [key, value] of Object.entries(queryParams)) {
        if (key === opt.name || key.startsWith(keyWithoutSuffix + '__')) {
          initialFilters[opt.name] = value;
          if (opt.items.length > 1) {
            initialFilters[`filters_for_${keyWithoutSuffix}`] = key;
          }
        }
      }
    });

    setFilters(initialFilters);
  }, [searchParams, pathName, filterOptionsGroupedByDescription]);

  const filterContent = (
    <form onSubmit={handleSubmit} className="rbc-space-y-4" style={baseStyle}>
      <div className="rbc-grid rbc-grid-cols-1 md:rbc-grid-cols-2 lg:rbc-grid-cols-3 rbc-gap-4">
        {filterOptionsGroupedByDescription?.map((opt, idx) => (
          <div key={idx} className="rbc-space-y-2">
            {generateFilterField(opt)}
          </div>
        ))}
      </div>
      <div className="rbc-flex rbc-justify-end rbc-gap-3 rbc-pt-4 rbc-border-t">
        <Button 
          variant="secondary" 
          onClick={handleReset}
          type="button"
        >
          پاک کردن
        </Button>
        <Button variant="primary" type="submit">
          اعمال فیلتر
        </Button>
      </div>
    </form>
  );

  const accordionItems = [{
    id: 'advanced-search',
    title: (
      <div className="rbc-flex rbc-items-center rbc-gap-2">
        <Search size={20} style={{ color: 'var(--rbc-search-icon-color)' }} />
        <span className="rbc-font-medium" style={{ color: 'var(--rbc-search-text)' }}>
          جستجوی پیشرفته
        </span>
      </div>
    ),
    content: filterContent
  }];

  return (
    <div className={`rbc-mb-2 ${className}`}>
      <Accordion items={accordionItems} variant="bordered" size="md" />
    </div>
  );
}