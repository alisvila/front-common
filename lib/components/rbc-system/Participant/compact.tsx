import React from 'react';
import { User } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
  hasVoted?: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface CompactParticipantListProps {
  participants: Participant[];
  onParticipantClick?: (participant: Participant) => void;
  className?: string;
  style?: React.CSSProperties;
}

const CompactParticipantList = ({
  participants,
  onParticipantClick,
  className = '',
  style
}: CompactParticipantListProps) => {
  const containerStyle = {
    '--participant-border-color': 'var(--rbc-border-color)',
    '--participant-bg-primary': 'var(--rbc-bg-primary)',
    '--participant-bg-secondary': 'var(--rbc-bg-secondary)',
    '--participant-text-primary': 'var(--rbc-text-primary)',
    '--participant-text-secondary': 'var(--rbc-text-secondary)',
    '--participant-hover-bg': 'var(--rbc-bg-hover)',
    '--participant-online-color': '#10B981',
    '--participant-voted-bg': 'rgba(16, 185, 129, 0.1)',
    '--participant-voted-text': '#059669',
    '--participant-inner-border-color': 'var(--rbc-bg-hover)',
    ...style
  } as React.CSSProperties;

  return (
    <div 
      className={`rbc-w-full rbc-transition-colors rbc-duration-200 ${className}`}
      style={containerStyle}
    >
      <div className="rbc-flex rbc-flex-col rbc-gap-2 rbc-max-h-[300px] rbc-overflow-y-auto">
        {participants.map((participant) => (
          <button
            key={participant.id}
            onClick={() => onParticipantClick?.(participant)}
            className="rbc-flex rbc-items-center rbc-gap-3 rbc-p-2 rbc-rounded-lg rbc-transition-all rbc-duration-200 rbc-w-full rbc-text-left"
            style={{
              backgroundColor: 'var(--participant-bg-primary)',
              color: 'var(--participant-text-primary)',
              border: '1px solid var(--participant-inner-border-color)'
            }}
          >
            {/* Avatar/Image */}
            <div className="rbc-relative">
              {participant.imageUrl ? (
                <img
                  src={participant.imageUrl}
                  alt={participant.name}
                  className="rbc-w-8 rbc-h-8 rbc-rounded-full rbc-object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('rbc-hidden');
                  }}
                />
              ) : (
                <div 
                  className="rbc-w-8 rbc-h-8 rbc-rounded-full rbc-flex rbc-items-center rbc-justify-center rbc-transition-colors rbc-duration-200"
                  style={{
                    backgroundColor: 'var(--participant-bg-secondary)',
                  }}
                >
                  <User 
                    className="rbc-w-4 rbc-h-4"
                    style={{ color: 'var(--participant-text-secondary)' }}
                  />
                </div>
              )}
              {participant.isActive && (
                <span
                  className="rbc-absolute rbc-bottom-0 rbc-right-0 rbc-w-2.5 rbc-h-2.5 rbc-rounded-full rbc-border-2 rbc-transition-colors rbc-duration-200"
                  style={{ 
                    backgroundColor: 'var(--participant-online-color)',
                    borderColor: 'var(--participant-bg-primary)'
                  }}
                />
              )}
            </div>

            {/* Participant Info */}
            <div className="rbc-flex rbc-flex-1 rbc-items-center rbc-justify-between">
              <div className="rbc-flex rbc-flex-col rbc-items-start">
                <span 
                  className="rbc-text-sm rbc-font-medium"
                  style={{ color: 'var(--participant-text-primary)' }}
                >
                  {participant.name}
                </span>
                {participant.lastMessage && (
                  <span 
                    className="rbc-text-xs rbc-truncate rbc-max-w-[150px]"
                    style={{ color: 'var(--participant-text-secondary)' }}
                  >
                    {participant.lastMessage}
                  </span>
                )}
              </div>

              {/* Status Indicators */}
              <div className="rbc-flex rbc-flex-col rbc-items-end rbc-gap-1">
                {participant.lastMessageTime && (
                  <span 
                    className="rbc-text-xs"
                    style={{ color: 'var(--participant-text-secondary)' }}
                  >
                    {participant.lastMessageTime}
                  </span>
                )}
                {participant.hasVoted && (
                  <span 
                    className="rbc-text-xs rbc-px-1.5 rbc-py-0.5 rbc-rounded-full"
                    style={{
                      backgroundColor: 'var(--participant-voted-bg)',
                      color: 'var(--participant-voted-text)'
                    }}
                  >
                    Voted
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompactParticipantList;