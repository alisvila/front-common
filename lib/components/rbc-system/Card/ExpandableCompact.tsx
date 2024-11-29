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
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({
  title,
  sections,
  actions,
  headerStyle = 'simple',
  compact = true
}) => {
  const renderHeader = () => {
    if (!title) return null;

    if (compact) {
      if (headerStyle === 'bold') {
        return (
          <div className="rbc-mb-3 rbc-border-b rbc-border-gray-200">
            <h3 className="rbc-text-base rbc-font-bold rbc-text-gray-900 rbc-pb-2">
              {title}
            </h3>
          </div>
        );
      }

      return (
        <div className="rbc-mb-3 rbc-flex rbc-items-center rbc-gap-2">
          <h3 className="rbc-text-base rbc-font-semibold rbc-text-gray-900">
            {title}
          </h3>
          <div className="rbc-h-0.5 rbc-flex-1 rbc-bg-gray-100"></div>
        </div>
      );
    }

    return (
      <div className="rbc-mb-4">
        <h3 className="rbc-text-lg rbc-font-semibold rbc-text-gray-900">
          {title}
        </h3>
        <div className="rbc-mt-1 rbc-h-0.5 rbc-w-20 rbc-bg-blue-500"></div>
      </div>
    );
  };

  return (
    <div className="rbc-bg-white rbc-rounded-lg rbc-shadow-sm rbc-border rbc-border-gray-100" dir={"rtl"}>
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
                  ? 'rbc-flex rbc-items-center rbc-gap-2 rbc-bg-gray-50 rbc-rounded rbc-py-2 rbc-px-3'
                  : 'rbc-bg-gray-50 rbc-rounded-lg rbc-p-4'
              }`}
            >
              <div className={`rbc-text-sm rbc-font-medium rbc-text-gray-500 ${compact ? '' : 'rbc-mb-1'}`}>
                {section.label}{compact ? ':' : ''}
              </div>
              <div className={`${
                compact 
                  ? 'rbc-text-sm rbc-font-medium'
                  : 'rbc-text-base rbc-font-semibold'
              } rbc-text-gray-900`}>
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

export default ExpandableContent;