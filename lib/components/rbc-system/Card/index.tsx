import React from 'react';

interface ExpandableContentProps {
  title?: string;
  sections: {
    label: string;
    value: string | number;
    span?: 'full' | 'half';
  }[];
  actions?: React.ReactNode;
  headerStyle?: 'simple' | 'bold';
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ExpandableContent: React.FC<ExpandableContentProps> = ({
  title,
  sections,
  actions,
  headerStyle = 'simple',
  compact = true,
  className = '',
  style: propStyle,
}) => {
  // Base theme variables
  const baseStyle = {
    '--rbc-expandable-bg': 'var(--rbc-bg-primary, #FFFFFF)',
    '--rbc-expandable-border': 'var(--rbc-border-color, #E5E7EB)',
    '--rbc-expandable-shadow': 'var(--rbc-shadow, 0 1px 2px 0 rgb(0 0 0 / 0.05))',
    '--rbc-expandable-title-color': 'var(--rbc-text-primary, #111827)',
    '--rbc-expandable-label-color': 'var(--rbc-text-secondary, #6B7280)',
    '--rbc-expandable-value-color': 'var(--rbc-text-primary, #111827)',
    '--rbc-expandable-section-bg': 'var(--rbc-bg-secondary, #F3F4F6)',
    '--rbc-expandable-divider-color': 'var(--rbc-border-color, #E5E7EB)',
    '--rbc-expandable-accent-color': 'var(--rbc-primary, #3B82F6)',
    ...propStyle,
  } as React.CSSProperties;

  const containerStyle = {
    backgroundColor: 'var(--rbc-expandable-bg)',
    borderColor: 'var(--rbc-expandable-border)',
    boxShadow: 'var(--rbc-expandable-shadow)',
  };

  const renderHeader = () => {
    if (!title) return null;

    const headerTitleStyle = {
      color: 'var(--rbc-expandable-title-color)',
    };

    if (compact) {
      if (headerStyle === 'bold') {
        return (
          <div className="rbc-mb-3 rbc-border-b" style={{ borderColor: 'var(--rbc-expandable-divider-color)' }}>
            <h3 
              className="rbc-text-base rbc-font-bold rbc-pb-2"
              style={headerTitleStyle}
            >
              {title}
            </h3>
          </div>
        );
      }

      return (
        <div className="rbc-mb-3 rbc-flex rbc-items-center rbc-gap-2">
          <h3 
            className="rbc-text-base rbc-font-semibold"
            style={headerTitleStyle}
          >
            {title}
          </h3>
          <div 
            className="rbc-h-0.5 rbc-flex-1"
            style={{ backgroundColor: 'var(--rbc-expandable-divider-color)' }}
          />
        </div>
      );
    }

    return (
      <div className="rbc-mb-4">
        <h3 
          className="rbc-text-lg rbc-font-semibold"
          style={headerTitleStyle}
        >
          {title}
        </h3>
        <div 
          className="rbc-mt-1 rbc-h-0.5 rbc-w-20"
          style={{ backgroundColor: 'var(--rbc-expandable-accent-color)' }}
        />
      </div>
    );
  };

  const sectionStyle = {
    backgroundColor: 'var(--rbc-expandable-section-bg)',
  };

  const labelStyle = {
    color: 'var(--rbc-expandable-label-color)',
  };

  const valueStyle = {
    color: 'var(--rbc-expandable-value-color)',
  };

  return (
    <div 
      className={`rbc-rounded-lg rbc-shadow-sm rbc-border ${className}`}
      style={{ ...containerStyle, ...baseStyle }}
      dir="rtl"
    >
      <div className={`${compact ? 'rbc-p-4' : 'rbc-p-6'}`}>
        {renderHeader()}
        
        <div className={`rbc-grid rbc-grid-cols-1 md:rbc-grid-cols-2 ${compact ? 'rbc-gap-3' : 'rbc-gap-6'}`}>
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`${
                section.span === 'full' ? 'md:rbc-col-span-2' : ''
              } ${
                compact 
                  ? 'rbc-flex rbc-items-center rbc-gap-2 rbc-rounded rbc-py-2 rbc-px-3'
                  : 'rbc-rounded-lg rbc-p-4'
              }`}
              style={sectionStyle}
            >
              <div 
                className={`rbc-text-sm rbc-font-medium ${compact ? '' : 'rbc-mb-1'}`}
                style={labelStyle}
              >
                {section.label}{compact ? ':' : ''}
              </div>
              <div 
                className={`${
                  compact 
                    ? 'rbc-text-sm rbc-font-medium'
                    : 'rbc-text-base rbc-font-semibold'
                }`}
                style={valueStyle}
              >
                {section.value}
              </div>
            </div>
          ))}
        </div>

        {actions && (
          <div className={`${compact ? 'rbc-mt-4' : 'rbc-mt-6'} rbc-flex rbc-justify-end ${compact ? 'rbc-gap-2' : 'rbc-gap-3'}`}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
