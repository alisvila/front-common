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
  style?: React.CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  orientation = 'horizontal',
  variant = 'contained',
  defaultActiveId,
  onChange,
  className = '',
  fullWidth = false,
  style: propStyle,
}) => {
  const [activeId, setActiveId] = React.useState(defaultActiveId || items[0]?.id);

  const handleTabClick = (id: string) => {
    if (id !== activeId) {
      setActiveId(id);
      onChange?.(id);
    }
  };

  // Base styles using CSS variables
  const baseContainerStyle = {
    '--rbc-tabs-bg': 'var(--rbc-bg-primary, #FFFFFF)',
    '--rbc-tabs-border-color': 'var(--rbc-border-color, #E5E7EB)',
    '--rbc-tabs-text-active': 'var(--rbc-primary, #3B82F6)',
    '--rbc-tabs-text-default': 'var(--rbc-text-secondary, #6B7280)',
    '--rbc-tabs-text-hover': 'var(--rbc-text-primary, #111827)',
    '--rbc-tabs-bg-active': 'var(--rbc-bg-selected, #EFF6FF)',
    '--rbc-tabs-bg-hover': 'var(--rbc-bg-hover, #F9FAFB)',
    '--rbc-tabs-shadow': 'var(--rbc-shadow, 0 1px 2px 0 rgb(0 0 0 / 0.05))',
    ...propStyle,
  } as React.CSSProperties;

  // Base container classes
  const containerClasses = [
    'rbc-flex',
    orientation === 'vertical' ? 'rbc-flex-row' : 'rbc-flex-col',
    className,
  ].join(' ');

  // Tab list classes and styles
  const tabListStyle = {
    borderColor: 'var(--rbc-tabs-border-color)',
    backgroundColor: variant === 'contained' ? 'var(--rbc-tabs-bg-hover)' : 'transparent',
  } as React.CSSProperties;

  const tabListClasses = [
    'rbc-flex',
    orientation === 'vertical' 
      ? 'rbc-flex-col rbc-border-r' 
      : `rbc-flex-row ${variant === 'line' ? 'rbc-border-b' : ''}`,
    variant === 'contained' ? 'rbc-p-1 rbc-rounded-lg' : '',
    fullWidth && orientation === 'horizontal' ? 'rbc-w-full' : '',
  ].join(' ');

  // Get styles and classes for individual tab
  const getTabStyles = (item: TabItem, isActive: boolean) => {
    const baseStyle = {
      color: isActive 
        ? 'var(--rbc-tabs-text-active)' 
        : 'var(--rbc-tabs-text-default)',
      borderColor: isActive && variant === 'line' 
        ? 'var(--rbc-tabs-text-active)' 
        : 'transparent',
    } as React.CSSProperties;

    if (variant === 'contained' && isActive) {
      baseStyle.backgroundColor = 'var(--rbc-tabs-bg)';
      baseStyle.boxShadow = 'var(--rbc-tabs-shadow)';
    } else if (variant === 'pill' && isActive) {
      baseStyle.backgroundColor = 'var(--rbc-tabs-text-active)';
      baseStyle.color = '#FFFFFF';
    }

    return baseStyle;
  };

  const getTabClasses = (item: TabItem) => {
    const baseClasses = [
      'rbc-flex rbc-items-center rbc-gap-2 rbc-px-4 rbc-py-2.5 rbc-text-sm rbc-font-medium rbc-transition-all rbc-duration-200',
      item.disabled ? 'rbc-opacity-50 rbc-cursor-not-allowed' : 'rbc-cursor-pointer hover:rbc-text-gray-700',
      fullWidth && orientation === 'horizontal' ? 'rbc-flex-1 rbc-justify-center' : '',
    ];

    switch (variant) {
      case 'line':
        baseClasses.push(
          orientation === 'horizontal'
            ? 'rbc-border-b-2'
            : 'rbc-border-r-2'
        );
        break;
      
      case 'pill':
        baseClasses.push(
          'rbc-rounded-lg hover:rbc-bg-gray-100'
        );
        break;
      
      case 'contained':
        baseClasses.push(
          'rbc-rounded-md hover:rbc-bg-gray-50'
        );
        break;
    }

    return baseClasses.join(' ');
  };

  // Panel styles
  const panelStyle = {
    backgroundColor: 'var(--rbc-tabs-bg)',
  } as React.CSSProperties;

  return (
    <div className={containerClasses} style={baseContainerStyle}>
      {/* Tab List */}
      <div 
        role="tablist" 
        aria-orientation={orientation}
        className={tabListClasses}
        style={tabListStyle}
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`panel-${item.id}`}
            tabIndex={activeId === item.id ? 0 : -1}
            className={getTabClasses(item)}
            style={getTabStyles(item, activeId === item.id)}
            onClick={() => !item.disabled && handleTabClick(item.id)}
            disabled={item.disabled}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div 
        className={`rbc-flex-1 ${orientation === 'vertical' ? 'rbc-pl-6' : 'rbc-pt-6'}`}
        style={panelStyle}
      >
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
