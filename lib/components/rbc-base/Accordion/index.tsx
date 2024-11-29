import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  variant?: 'default' | 'separated' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  defaultExpanded?: string[];
  onChange?: (expandedIds: string[]) => void;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'default',
  size = 'md',
  defaultExpanded = [],
  onChange,
  className = '',
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

  // Container styles based on variant
  const containerClasses = [
    'rbc-w-full',
    variant === 'bordered' && 'rbc-border rbc-border-gray-200 rbc-rounded-lg',
    variant === 'separated' && 'rbc-space-y-2',
    className,
  ].join(' ');

  // Get item classes based on variant and state
  const getItemClasses = (item: AccordionItem, index: number) => {
    const isExpanded = expandedIds.includes(item.id);
    const isLast = index === items.length - 1;

    const baseClasses = [
      'rbc-overflow-hidden',
      item.disabled && 'rbc-opacity-50',
    ];

    switch (variant) {
      case 'separated':
        baseClasses.push('rbc-border rbc-border-gray-200 rbc-rounded-lg');
        break;
      case 'bordered':
        !isLast && baseClasses.push('rbc-border-b rbc-border-gray-200');
        break;
      default:
        !isLast && baseClasses.push('rbc-border-b rbc-border-gray-200');
        break;
    }

    return baseClasses.join(' ');
  };

  // Get trigger button classes based on size
  const getTriggerClasses = (isExpanded: boolean) => {
    const baseClasses = [
      'rbc-flex rbc-w-full rbc-items-center rbc-justify-between',
      'rbc-text-left rbc-text-gray-900',
      'hover:rbc-bg-gray-50',
      'focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-ring-offset-2',
      'disabled:rbc-cursor-not-allowed',
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

    return baseClasses.join(' ');
  };

  return (
    <div className={containerClasses} dir="rtl">
      {items.map((item, index) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={getItemClasses(item, index)}
          >
            <button
              type="button"
              onClick={() => !item.disabled && handleItemClick(item.id)}
              className={getTriggerClasses(isExpanded)}
              disabled={item.disabled}
              aria-expanded={isExpanded}
              aria-controls={`accordion-${item.id}`}
            >
              <div className="rbc-flex rbc-items-center rbc-gap-3">
                {item.icon}
                {item.title}
              </div>
              <ChevronDown 
                className={`rbc-h-5 rbc-w-5 rbc-text-gray-500 rbc-transition-transform rbc-duration-200 ${
                  isExpanded ? 'rbc-rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={`accordion-${item.id}`}
              role="region"
              aria-labelledby={item.id}
              className={`rbc-overflow-hidden rbc-transition-all rbc-duration-200 ${
                isExpanded ? 'rbc-max-h-screen' : 'rbc-max-h-0'
              }`}
            >
              <div className={`rbc-px-4 rbc-pb-4 ${size === 'lg' ? 'rbc-px-6' : ''}`}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;