import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  notificationIcon?: React.ReactNode;
  notificationCount?: number;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  variant?: 'default' | 'separated' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  defaultExpanded?: string[];
  onChange?: (expandedIds: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'default',
  size = 'md',
  defaultExpanded = [],
  onChange,
  className = '',
  style,
}) => {
  const [expandedIds, setExpandedIds] = React.useState<string[]>(defaultExpanded);

  const handleItemClick = (id: string) => {
    let newExpandedIds: string[];

    if (allowMultiple) {
      newExpandedIds = expandedIds.includes(id)
        ? expandedIds.filter(itemId => itemId !== id)
        : [...expandedIds, id];
    } else {
      newExpandedIds = expandedIds.includes(id) ? [] : [id];
    }

    setExpandedIds(newExpandedIds);
    onChange?.(newExpandedIds);
  };

  const containerClasses = [
    'rbc-w-full rbc-transition-colors rbc-duration-200',
    variant === 'bordered' && 'rbc-border rbc-rounded-lg',
    variant === 'separated' && 'rbc-space-y-2',
    className,
  ].filter(Boolean).join(' ');

  const getItemClasses = (item: AccordionItem, index: number) => {
    const isLast = index === items.length - 1;

    const baseClasses = [
      'rbc-overflow-hidden rbc-transition-colors rbc-duration-200',
      item.disabled && 'rbc-opacity-50',
    ];

    switch (variant) {
      case 'separated':
        baseClasses.push('rbc-border rbc-rounded-lg');
        break;
      case 'bordered':
        !isLast && baseClasses.push('rbc-border-b');
        break;
      default:
        !isLast && baseClasses.push('rbc-border-b');
        break;
    }

    return baseClasses.filter(Boolean).join(' ');
  };

  const getTriggerClasses = (isExpanded: boolean) => {
    const baseClasses = [
      'rbc-flex rbc-w-full rbc-items-center rbc-justify-between',
      'rbc-text-left rbc-transition-colors rbc-duration-200',
      'hover:rbc-bg-hover',
      'focus:rbc-outline-none focus:rbc-ring-2',
      'disabled:rbc-cursor-not-allowed',
      isExpanded && 'rbc-bg-selected',
    ];

    switch (size) {
      case 'sm':
        baseClasses.push('rbc-px-4 rbc-py-2 rbc-text-sm');
        break;
      case 'lg':
        baseClasses.push('rbc-px-6 rbc-py-4 rbc-text-lg');
        break;
      default:
        baseClasses.push('rbc-px-4 rbc-py-3');
        break;
    }

    return baseClasses.filter(Boolean).join(' ');
  };

  const getContentClasses = (isExpanded: boolean) => {
    return `rbc-overflow-hidden rbc-transition-all rbc-duration-200 ${
      isExpanded ? 'rbc-max-h-screen' : 'rbc-max-h-0'
    }`;
  };

  const containerStyle = {
    '--accordion-border-color': 'var(--rbc-border-color)',
    '--accordion-bg-hover': 'var(--rbc-bg-hover)',
    '--accordion-bg-selected': 'var(--rbc-bg-selected)',
    '--accordion-text-primary': 'var(--rbc-text-primary)',
    '--accordion-text-secondary': 'var(--rbc-text-secondary)',
    '--accordion-focus-ring': 'var(--rbc-primary)',
    ...style
  } as React.CSSProperties;

  return (
    <div 
      className={containerClasses} 
      dir="rtl"
      style={containerStyle}
    >
      {items.map((item, index) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={getItemClasses(item, index)}
            style={{ borderColor: 'var(--accordion-border-color)' }}
          >
            <button
              type="button"
              onClick={() => !item.disabled && handleItemClick(item.id)}
              className={getTriggerClasses(isExpanded)}
              disabled={item.disabled}
              aria-expanded={isExpanded}
              aria-controls={`accordion-${item.id}`}
              style={{ 
                color: 'var(--accordion-text-primary)',
                '--tw-ring-color': 'var(--accordion-focus-ring)',
                backgroundColor: isExpanded 
                  ? 'var(--accordion-bg-selected)' 
                  : 'transparent'
              }}
            >
              <div className="rbc-flex rbc-items-center rbc-gap-3">
                {item.icon}
                {item.title}
              </div>
              <div className="rbc-flex rbc-items-center rbc-gap-3">
                {(item.notificationIcon || item.notificationCount) && (
                  <div className="rbc-flex rbc-items-center rbc-gap-2">
                    {item.notificationIcon}
                    {item.notificationCount !== undefined && (
                      <span 
                        className="rbc-flex rbc-items-center rbc-justify-center rbc-min-w-[20px] rbc-h-5 rbc-px-1.5 rbc-text-xs rbc-font-medium rbc-rounded-full"
                        style={{
                          backgroundColor: 'var(--rbc-primary)',
                          color: 'var(--rbc-bg-primary)'
                        }}
                      >
                        {item.notificationCount}
                      </span>
                    )}
                  </div>
                )}
                <ChevronDown 
                  className={`rbc-h-5 rbc-w-5 rbc-transition-transform rbc-duration-200 ${
                    isExpanded ? 'rbc-rotate-180' : ''
                  }`}
                  style={{ color: 'var(--accordion-text-secondary)' }}
                />
              </div>
            </button>
            <div
              id={`accordion-${item.id}`}
              role="region"
              aria-labelledby={item.id}
              className={getContentClasses(isExpanded)}
            >
              <div 
                className={`rbc-px-4 rbc-py-4 ${size === 'lg' ? 'rbc-px-6' : ''}`}
                style={{ color: 'var(--accordion-text-primary)' }}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};