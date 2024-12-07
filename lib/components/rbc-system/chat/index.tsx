import React, { useState, useRef, useEffect } from 'react';
import { Settings, Pin, Send } from 'lucide-react';
import { Button } from '@lib/main';

interface Message {
  id: number;
  user: string;
  content: string;
  color: string;
  isModerator?: boolean;
}

interface TwitchChatProps {
  initialMessages?: Message[];
  announcement?: string;
  pinnedMessage?: Message | null;
  className?: string;
  style?: React.CSSProperties;
  withHeader?: boolean;
}

const TwitchChat = ({
  initialMessages = [
    { id: 1, user: 'JohnDoe', content: 'Hello everyone!', color: '#FF4500' },
    { id: 2, user: 'ChatBot', content: 'Welcome to the stream!', color: '#00FF00' },
    { id: 3, user: 'GameMaster', content: "Don't forget to follow!", color: '#9146FF' }
  ],
  announcement = 'خوش آمدید',
  pinnedMessage: initialPinnedMessage = null,
  className = '',
  style,
  withHeader=false
}: TwitchChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [pinnedMessage, setPinnedMessage] = useState<Message | null>(initialPinnedMessage);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: 'User',
        content: newMessage,
        color: randomColor
      }]);
      setNewMessage('');
    }
  };

  const handlePinMessage = (message: Message) => {
    setPinnedMessage(pinnedMessage?.id === message.id ? null : message);
  };

  const containerStyle = {
    '--chat-border-color': 'var(--rbc-border-color)',
    '--chat-bg-primary': 'var(--rbc-bg-primary)',
    '--chat-bg-secondary': 'var(--rbc-bg-secondary)',
    '--chat-text-primary': 'var(--rbc-text-primary)',
    '--chat-text-secondary': 'var(--rbc-text-secondary)',
    '--chat-accent-color': 'var(--rbc-primary)',
    '--chat-accent-hover': 'var(--rbc-primary-hover)',
    '--chat-announcement-bg': 'var(--rbc-bg-selected)',
    '--chat-announcement-text': 'var(--rbc-primary)',
    ...style
  } as React.CSSProperties;

  return (
    <div 
      className={`rbc-h-full rbc-flex rbc-flex-col rbc-rounded-lg rbc-overflow-hidden rbc-transition-colors rbc-duration-200 ${className}`}
      style={{
        ...containerStyle,
        backgroundColor: 'var(--chat-bg-primary)',
      }}
    >
      {/* Settings Header */}
      {withHeader && <div 
        className="rbc-p-3 rbc-flex rbc-justify-between rbc-items-center rbc-border-b rbc-transition-colors rbc-duration-200"
        style={{
          backgroundColor: 'var(--chat-bg-secondary)',
          borderColor: 'var(--chat-border-color)',
        }}
      >
        <h2 
          className="rbc-font-semibold"
          style={{ color: 'var(--chat-text-primary)' }}
        >
          گفتگو
        </h2>
        <button 
          className="rbc-transition-colors rbc-duration-200 hover:rbc-opacity-80"
          style={{ color: 'var(--chat-text-secondary)' }}
        >
          <Settings size={20} />
        </button>
      </div>}

      {/* Announcement Banner */}
      <div 
        className="rbc-px-4 rbc-py-2 rbc-border-b rbc-transition-colors rbc-duration-200"
        style={{
          backgroundColor: 'var(--chat-announcement-bg)',
          borderColor: 'var(--chat-border-color)',
        }}
      >
        <p 
          className="rbc-text-sm rbc-font-medium"
          style={{ color: 'var(--chat-announcement-text)' }}
        >
          {announcement}
        </p>
      </div>

      {/* Pinned Message */}
      {pinnedMessage && (
        <div 
          className="rbc-p-3 rbc-border-b rbc-transition-colors rbc-duration-200"
          style={{
            backgroundColor: 'var(--chat-bg-secondary)',
            borderColor: 'var(--chat-border-color)',
          }}
        >
          <div className="rbc-flex rbc-items-center rbc-gap-2">
            <Pin 
              size={16} 
              style={{ color: 'var(--chat-text-primary)' }}
            />
            <span style={{ color: pinnedMessage.color }} className="rbc-font-semibold">
              {pinnedMessage.user}:
            </span>
            <span style={{ color: 'var(--chat-text-secondary)' }}>
              {pinnedMessage.content}
            </span>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div 
        ref={chatRef}
        className="rbc-flex-1 rbc-overflow-y-auto rbc-p-4 rbc-space-y-4 rbc-transition-colors rbc-duration-200"
        style={{ backgroundColor: 'var(--chat-bg-primary)' }}
      >
        {messages.map((message) => (
          <div key={message.id} className="rbc-flex rbc-items-start rbc-gap-2 rbc-group">
            <div className="rbc-flex-1">
              <div className="rbc-flex rbc-items-center rbc-gap-2">
                <span style={{ color: message.color }} className="rbc-font-semibold">
                  {message.user}
                </span>
                <button 
                  onClick={() => handlePinMessage(message)}
                  className="rbc-opacity-0 group-hover:rbc-opacity-100 rbc-transition-opacity"
                >
                  <Pin 
                    size={14} 
                    className="hover:rbc-opacity-80 rbc-transition-opacity"
                    style={{ color: 'var(--chat-text-secondary)' }}
                  />
                </button>
              </div>
              <p style={{ color: 'var(--chat-text-secondary)' }}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div 
        className="rbc-p-4 rbc-border-t rbc-transition-colors rbc-duration-200"
        style={{
          backgroundColor: 'var(--chat-bg-secondary)',
          borderColor: 'var(--chat-border-color)',
        }}
      >
        <div className="rbc-flex rbc-gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="ارسال پیام..."
            className="rbc-flex-1 rbc-px-3 rbc-py-2 rbc-rounded-md rbc-border rbc-transition-colors rbc-duration-200 focus:rbc-outline-none focus:rbc-ring-2"
            style={{
              backgroundColor: 'var(--chat-bg-primary)',
              color: 'var(--chat-text-primary)',
              borderColor: 'var(--chat-border-color)'
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            variant="primary"
            icon={<Send size={18}/>}
          />
        </div>
      </div>
    </div>
  );
};

export default TwitchChat;