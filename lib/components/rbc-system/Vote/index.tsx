import React, { useState } from 'react';

interface VoteOption {
  id: string;
  label: string;
  votes?: number;
}

interface VoteComponentProps {
  question: string;
  description?: string;
  options: VoteOption[];
  onVote: (optionId: string) => void;
  totalVotes?: number;
  hasVoted?: boolean;
  className?: string;
}

const VoteComponent = ({
  question,
  description,
  options,
  onVote,
  totalVotes = 0,
  hasVoted = false,
  className = ''
}: VoteComponentProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(hasVoted);

  const handleVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
      setShowResults(true);
    }
  };

  const calculatePercentage = (votes: number = 0) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div 
      className={`rbc-w-full rbc-max-w-2xl rbc-mx-auto rbc-rounded-lg rbc-border rbc-shadow-sm ${className}`}
      style={{
        backgroundColor: 'var(--rbc-bg-primary)',
        borderColor: 'var(--rbc-border-color)',
        color: 'var(--rbc-text-primary)',
      }}
    >
      {/* Header */}
      <div className="rbc-p-6 rbc-border-b" style={{ borderColor: 'var(--rbc-border-color)' }}>
        <h2 
          className="rbc-text-xl rbc-font-semibold"
          style={{ color: 'var(--rbc-text-primary)' }}
        >
          {question}
        </h2>
        {description && (
          <p 
            className="rbc-mt-2 rbc-text-sm"
            style={{ color: 'var(--rbc-text-secondary)' }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="rbc-p-6">
        {!showResults ? (
          <div className="rbc-space-y-3">
            {options.map((option) => (
              <div
                key={option.id}
                className={`rbc-flex rbc-items-center rbc-space-x-3 rbc-space-x-reverse rbc-rounded-lg rbc-border rbc-p-4 rbc-cursor-pointer rbc-transition-colors rbc-duration-200 ${
                  selectedOption === option.id 
                    ? 'rbc-border-blue-500 rbc-bg-blue-50' 
                    : 'hover:rbc-bg-gray-50'
                }`}
                style={{ 
                  borderColor: selectedOption === option.id 
                    ? 'var(--rbc-primary)' 
                    : 'var(--rbc-border-color)' 
                }}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="rbc-flex rbc-items-center">
                  <input
                    type="radio"
                    id={option.id}
                    name="vote-option"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                    className="rbc-w-4 rbc-h-4 rbc-text-blue-600"
                    style={{ accentColor: 'var(--rbc-primary)' }}
                  />
                </div>
                <label
                  htmlFor={option.id}
                  className="rbc-flex-grow rbc-cursor-pointer"
                  style={{ color: 'var(--rbc-text-primary)' }}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="rbc-space-y-4">
            {options.map((option) => {
              const percentage = calculatePercentage(option.votes);
              return (
                <div key={option.id} className="rbc-space-y-2">
                  <div className="rbc-flex rbc-justify-between rbc-text-sm">
                    <span style={{ color: 'var(--rbc-text-primary)' }}>
                      {option.label}
                    </span>
                    <span style={{ color: 'var(--rbc-text-secondary)' }}>
                      {percentage}% ({option.votes || 0} رای)
                    </span>
                  </div>
                  <div className="rbc-h-2 rbc-rounded-full rbc-bg-gray-100 rbc-overflow-hidden">
                    <div
                      className="rbc-h-full rbc-rounded-full rbc-transition-all rbc-duration-500 rbc-ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: 'var(--rbc-primary)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
            
            <div 
              className="rbc-mt-6 rbc-p-4 rbc-rounded-lg rbc-bg-gray-50 rbc-border"
              style={{ borderColor: 'var(--rbc-border-color)' }}
            >
              <p className="rbc-text-sm" style={{ color: 'var(--rbc-text-secondary)' }}>
                 مجموع آرا : {totalVotes}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {!showResults && (
        <div 
          className="rbc-px-6 rbc-py-4 rbc-border-t rbc-flex rbc-justify-end"
          style={{ borderColor: 'var(--rbc-border-color)' }}
        >
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className={`rbc-px-4 rbc-py-2 rbc-rounded-md rbc-text-white rbc-transition-colors rbc-duration-200 ${
              !selectedOption ? 'rbc-opacity-50 rbc-cursor-not-allowed' : 'hover:rbc-opacity-90'
            }`}
            style={{
              backgroundColor: 'var(--rbc-primary)',
              opacity: !selectedOption ? 0.5 : 1
            }}
          >
            ثبت رای
          </button>
        </div>
      )}
    </div>
  );
};

export default VoteComponent;