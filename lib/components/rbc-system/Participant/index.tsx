import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Users, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
  hasVoted?: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface ParticipantListProps {
  participants: Participant[];
  itemsPerPage?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParticipantList({ 
  participants,
  itemsPerPage = 8,
  className = '',
  style
}: ParticipantListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(participants.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleParticipants = participants.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const containerStyle = {
    '--participant-border-color': 'var(--rbc-border-color)',
    '--participant-bg-primary': 'var(--rbc-bg-primary)',
    '--participant-bg-secondary': 'var(--rbc-bg-secondary)',
    '--participant-text-primary': 'var(--rbc-text-primary)',
    '--participant-text-secondary': 'var(--rbc-text-secondary)',
    '--participant-hover-bg': 'var(--rbc-bg-hover)',
    '--participant-accent-color': 'var(--rbc-primary)',
    '--participant-accent-hover': 'var(--rbc-primary-hover)',
    '--participant-online-color': '#10B981',
    '--participant-offline-color': '#6B7280',
    ...style
  } as React.CSSProperties;

  return (
    <div className={`rbc-mt-6 ${className}`} style={containerStyle}>
      {/* Header */}
      <div className="rbc-flex rbc-items-center rbc-justify-between rbc-mb-4">
        <div className="rbc-flex rbc-items-center rbc-gap-2">
          <Users 
            className="rbc-w-5 rbc-h-5"
            style={{ color: 'var(--participant-accent-color)' }}
          />
          <h2 
            className="rbc-text-xl rbc-font-semibold"
            style={{ color: 'var(--participant-text-primary)' }}
          >
            Participants ({participants.length})
          </h2>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="rbc-flex rbc-items-center rbc-gap-2">
            <span 
              className="rbc-text-sm"
              style={{ color: 'var(--participant-text-secondary)' }}
            >
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="rbc-flex rbc-gap-1">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`rbc-p-1 rbc-rounded-lg rbc-transition-colors ${
                  currentPage === 0 ? 'rbc-opacity-50 rbc-cursor-not-allowed' : ''
                }`}
                style={{
                  backgroundColor: 'var(--participant-bg-primary)',
                  color: 'var(--participant-text-primary)',
                  '--tw-ring-color': 'var(--participant-accent-color)',
                }}
              >
                <ChevronLeft className="rbc-w-5 rbc-h-5" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`rbc-p-1 rbc-rounded-lg rbc-transition-colors ${
                  currentPage === totalPages - 1 ? 'rbc-opacity-50 rbc-cursor-not-allowed' : ''
                }`}
                style={{
                  backgroundColor: 'var(--participant-bg-primary)',
                  color: 'var(--participant-text-primary)',
                  '--tw-ring-color': 'var(--participant-accent-color)',
                }}
              >
                <ChevronRight className="rbc-w-5 rbc-h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Participants Grid */}
      <div className="rbc-grid rbc-grid-cols-1 md:rbc-grid-cols-2 lg:rbc-grid-cols-4 rbc-gap-4">
        {visibleParticipants.map((participant) => (
          <div
            key={participant.id}
            className="rbc-p-4 rbc-rounded-lg rbc-transition-all rbc-duration-200 rbc-shadow-sm hover:rbc-shadow-md"
            style={{
              backgroundColor: 'var(--participant-bg-primary)',
              borderColor: 'var(--participant-border-color)',
            }}
          >
            {/* Participant Header */}
            <div className="rbc-flex rbc-items-start rbc-gap-3">
              {/* Avatar */}
              <div className="rbc-relative">
                {participant.imageUrl ? (
                  <img
                    src={participant.imageUrl}
                    alt={participant.name}
                    className="rbc-w-16 rbc-h-16 rbc-rounded-lg rbc-object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('rbc-hidden');
                    }}
                  />
                ) : null}
                <div 
                  className={`rbc-w-16 rbc-h-16 rbc-rounded-lg rbc-flex rbc-items-center rbc-justify-center rbc-transition-colors rbc-duration-200 ${
                    participant.imageUrl ? 'rbc-hidden' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--participant-bg-secondary)',
                    color: 'var(--participant-text-secondary)',
                  }}
                >
                  <User className="rbc-w-8 rbc-h-8" />
                </div>
                {participant.isActive && (
                  <span
                    className="rbc-absolute -rbc-top-1 -rbc-right-1 rbc-w-4 rbc-h-4 rbc-rounded-full rbc-border-2 rbc-transition-colors rbc-duration-200"
                    style={{ 
                      backgroundColor: 'var(--participant-online-color)',
                      borderColor: 'var(--participant-bg-primary)',
                    }}
                  />
                )}
              </div>

              {/* Participant Info */}
              <div className="rbc-flex-1">
                <h3 
                  className="rbc-font-semibold"
                  style={{ color: 'var(--participant-text-primary)' }}
                >
                  {participant.name}
                </h3>
                <div className="rbc-flex rbc-items-center rbc-gap-2 rbc-mt-1">
                  <span 
                    className="rbc-text-xs rbc-px-2 rbc-py-0.5 rbc-rounded-full rbc-transition-colors rbc-duration-200"
                    style={{
                      backgroundColor: participant.isActive 
                        ? `rgb(var(--participant-online-color), 0.1)`
                        : `rgb(var(--participant-offline-color), 0.1)`,
                      color: participant.isActive
                        ? 'var(--participant-online-color)'
                        : 'var(--participant-offline-color)',
                    }}
                  >
                    {participant.isActive ? "Online" : "Away"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Participant Details */}
            <div className="rbc-mt-3 rbc-space-y-2">
              {/* Vote Status */}
              <div 
                className="rbc-flex rbc-items-center rbc-gap-2 rbc-text-sm"
                style={{ color: 'var(--participant-text-secondary)' }}
              >
                <ThumbsUp className="rbc-w-4 rbc-h-4" />
                <span>{participant.hasVoted ? "Voted" : "Hasn't voted"}</span>
              </div>

              {/* Last Message */}
              {participant.lastMessage && (
                <div className="rbc-flex rbc-items-start rbc-gap-2">
                  <MessageSquare 
                    className="rbc-w-4 rbc-h-4 rbc-mt-1"
                    style={{ color: 'var(--participant-text-secondary)' }}
                  />
                  <div className="rbc-flex-1">
                    <p 
                      className="rbc-text-sm rbc-line-clamp-2"
                      style={{ color: 'var(--participant-text-primary)' }}
                    >
                      {participant.lastMessage}
                    </p>
                    {participant.lastMessageTime && (
                      <span 
                        className="rbc-text-xs"
                        style={{ color: 'var(--participant-text-secondary)' }}
                      >
                        {participant.lastMessageTime}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}