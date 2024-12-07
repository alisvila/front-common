import React, { useState, useCallback } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  content: React.ReactNode;
  isOptional?: boolean;
}

interface WizardProps {
  steps: Step[];
  onComplete: () => void;
  onStepSubmit?: (stepId: number, data: any) => Promise<boolean>;
}

export const Wizard: React.FC<WizardProps> = ({ steps, onComplete, onStepSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStepClick = (index: number) => {
    if (completedSteps.has(activeStep) || steps[activeStep].isOptional) {
      setActiveStep(index);
    }
  };

  const handleNext = useCallback(async () => {
    setIsSubmitting(true);
    try {
      if (onStepSubmit) {
        const success = await onStepSubmit(steps[activeStep].id, {});
        if (!success) return;
      }
      
      setCompletedSteps(prev => new Set(prev).add(activeStep));
      
      if (activeStep === steps.length - 1) {
        onComplete();
      } else {
        setActiveStep(prev => prev + 1);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [activeStep, steps, onStepSubmit, onComplete]);

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  // Calculate progress width for RTL
  const progressWidth = ((activeStep + 1) * (100 / steps.length));

  return (
    <div className="rbc-w-full rbc-max-w-4xl rbc-mx-auto" dir="rtl">
      {/* Steps indicator */}
      <div className="rbc-mb-8">
        <div className="rbc-flex rbc-justify-between rbc-relative">
          {/* Progress bar - RTL version */}
          <div className="rbc-absolute rbc-top-1/2 rbc-transform rbc--translate-y-1/2 rbc-h-0.5 rbc-bg-gray-200 rbc-left-0 rbc-right-0 rbc--z-10" />
          <div 
            className="rbc-absolute rbc-top-1/2 rbc-transform rbc--translate-y-1/2 rbc-h-0.5 rbc-bg-blue-500 rbc-transition-all rbc-duration-300 rbc--z-10"
            style={{
              right: 0,
              left: `${100 - progressWidth}%`
            }}
          />
          
          {/* Step circles */}
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="rbc-relative rbc-z-10 rbc-flex rbc-flex-col rbc-items-center"
              onClick={() => handleStepClick(index)}
            >
              <div 
                className={`
                  rbc-w-8 rbc-h-8 rbc-rounded-lg rbc-flex rbc-items-center rbc-justify-center rbc-transition-all rbc-duration-300 rbc-cursor-pointer
                  ${completedSteps.has(index) 
                    ? 'rbc-bg-green-500 rbc-text-white' 
                    : index === activeStep
                      ? 'rbc-bg-blue-500 rbc-text-white'
                      : 'rbc-bg-white rbc-border-2 rbc-border-gray-300 rbc-text-gray-500'}
                `}
              >
                {completedSteps.has(index) ? (
                  <Check size={16} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`
                rbc-mt-2 rbc-text-sm rbc-font-medium rbc-text-center
                ${index === activeStep ? 'rbc-text-blue-500' : 'rbc-text-gray-500'}
              `}>
                {step.title}
                {step.isOptional && (
                  <span className="rbc-text-xs rbc-text-gray-400 rbc-block">
                    (اختیاری)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rbc-bg-white rbc-rounded-lg rbc-shadow-sm rbc-border rbc-border-gray-200 rbc-p-6">
        {steps[activeStep].content}
        
        {/* Navigation buttons */}
        <div className="rbc-flex rbc-justify-between rbc-mt-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`
              rbc-flex rbc-items-center rbc-gap-2 rbc-px-4 rbc-py-2 rbc-rounded-lg rbc-transition-colors
              ${activeStep === 0
                ? 'rbc-bg-gray-100 rbc-text-gray-400 rbc-cursor-not-allowed'
                : 'rbc-bg-gray-100 rbc-text-gray-600 hover:rbc-bg-gray-200'}
            `}
          >
            <ChevronLeft size={20} />
            قبلی
          </button>
          
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="rbc-flex rbc-items-center rbc-gap-2 rbc-px-4 rbc-py-2 rbc-bg-blue-500 rbc-text-white rbc-rounded-lg hover:rbc-bg-blue-600 rbc-transition-colors disabled:rbc-opacity-50 disabled:rbc-cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="rbc-w-5 rbc-h-5 rbc-border-2 rbc-border-white rbc-border-t-transparent rbc-rounded-lg rbc-animate-spin" />
            ) : activeStep === steps.length - 1 ? (
              'پایان'
            ) : (
              <>
                بعدی
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;