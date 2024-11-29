import React from 'react';

interface TabItem {
  id: string;
  label: string | React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'line' | 'pill' | 'contained';
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  className?: string;
  fullWidth?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  orientation = 'horizontal',
  variant = 'contained',
  defaultActiveId,
  onChange,
  className = '',
  fullWidth = false,
}) => {
  const [activeId, setActiveId] = React.useState(defaultActiveId || items[0]?.id);

  const handleTabClick = (id: string) => {
    if (id !== activeId) {
      setActiveId(id);
      onChange?.(id);
    }
  };

  // Base container classes
  const containerClasses = [
    'rbc-flex',
    orientation === 'vertical' ? 'rbc-flex-row' : 'rbc-flex-col',
    className,
  ].join(' ');

  // Tab list classes
  const tabListClasses = [
    'rbc-flex',
    orientation === 'vertical' 
      ? 'rbc-flex-col rbc-border-r rbc-border-gray-200' 
      : `rbc-flex-row ${variant === 'line' ? 'rbc-border-b rbc-border-gray-200' : ''}`,
    variant === 'contained' ? 'rbc-bg-gray-100 rbc-p-1 rbc-rounded-lg' : '',
    fullWidth && orientation === 'horizontal' ? 'rbc-w-full' : '',
  ].join(' ');

  // Get classes for individual tab
  const getTabClasses = (item: TabItem) => {
    const isActive = activeId === item.id;
    const baseClasses = [
      'rbc-flex rbc-items-center rbc-gap-2 rbc-px-4 rbc-py-2.5 rbc-text-sm rbc-font-medium rbc-transition-all rbc-duration-200',
      item.disabled ? 'rbc-opacity-50 rbc-cursor-not-allowed' : 'rbc-cursor-pointer',
      fullWidth && orientation === 'horizontal' ? 'rbc-flex-1 rbc-justify-center' : '',
    ];

    switch (variant) {
      case 'line':
        baseClasses.push(
          isActive 
            ? 'rbc-text-blue-600 rbc-border-blue-600' 
            : 'rbc-text-gray-500 hover:rbc-text-gray-700',
          orientation === 'horizontal'
            ? `rbc-border-b-2 ${isActive ? '' : 'rbc-border-transparent'}`
            : `rbc-border-r-2 ${isActive ? '' : 'rbc-border-transparent'}`
        );
        break;
      
      case 'pill':
        baseClasses.push(
          isActive 
            ? 'rbc-bg-blue-600 rbc-text-white' 
            : 'rbc-text-gray-500 hover:rbc-text-gray-700 hover:rbc-bg-gray-100',
          'rbc-rounded-lg'
        );
        break;
      
      case 'contained':
        baseClasses.push(
          isActive 
            ? 'rbc-bg-white rbc-text-blue-600 rbc-shadow-sm' 
            : 'rbc-text-gray-500 hover:rbc-text-gray-700',
          'rbc-rounded-md'
        );
        break;
    }

    return baseClasses.join(' ');
  };

  return (
    <div className={containerClasses}>
      {/* Tab List */}
      <div 
        role="tablist" 
        aria-orientation={orientation}
        className={tabListClasses}
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`panel-${item.id}`}
            tabIndex={activeId === item.id ? 0 : -1}
            className={getTabClasses(item)}
            onClick={() => !item.disabled && handleTabClick(item.id)}
            disabled={item.disabled}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className={`rbc-flex-1 ${orientation === 'vertical' ? 'rbc-pl-6' : 'rbc-pt-6'}`}>
        {items.map((item) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`panel-${item.id}`}
            aria-labelledby={item.id}
            hidden={activeId !== item.id}
            className={activeId === item.id ? 'rbc-animate-fade-in' : ''}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;