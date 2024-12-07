import React, { useState } from 'react';
import { MessageSquare, Vote, Users, BellDot, Bell,  Radio, MessageCircle, Sun, Moon, Settings } from 'lucide-react';
import { ThemeProvider, useTheme } from '@lib/components/rbc-react/Theme/ThemeContext';
import TwitchChat from '@lib/components/rbc-system/chat';
import CompactParticipantList from '@lib/components/rbc-system/Participant/compact';
import VoteComponent from '@lib/components/rbc-system/Vote';
import { Accordion } from '@lib/main';
import IconGroup from '@lib/components/rbc-base/Icongroup';


// Theme presets
const themes = {
  light: {
    primary: '#7C3AED', // Purple
    'primary-hover': '#6D28D9',
    secondary: '#F4F4F5',
    'secondary-hover': '#E4E4E7',
    'text-primary': '#18181B',
    'text-secondary': '#71717A',
    'bg-primary': '#FFFFFF',
    'bg-secondary': '#F4F4F5',
    'bg-hover': '#ededed',
    'bg-selected': '#F5F3FF',
    'border-color': '#E4E4E7',
    'table-header-bg': '#F4F4F5',
    'table-row-hover': '#F8FAFC',
    'table-border': '#E4E4E7',
    'table-stripe': '#F4F4F5',
  },
  dark: {
    primary: '#A78BFA',
    'primary-hover': '#8B5CF6',
    secondary: '#374151',
    'secondary-hover': '#4B5563',
    'text-primary': '#F9FAFB',
    'text-secondary': '#D1D5DB',
    'bg-primary': '#1F2937',
    'bg-secondary': '#111827',
    'bg-hover': '#374151',
    'bg-selected': '#312E81',
    'border-color': '#4B5563',
    'table-header-bg': '#374151',
    'table-row-hover': '#4B5563',
    'table-border': '#4B5563',
    'table-stripe': '#374151',
  },
  stream: {
    primary: '#9146FF', // Twitch Purple
    'primary-hover': '#7B2FFF',
    secondary: '#2D2D39',
    'secondary-hover': '#3D3D4D',
    'text-primary': '#EFEFF1',
    'text-secondary': '#ADADB8',
    'bg-primary': '#0E0E10',
    'bg-secondary': '#1F1F23',
    'bg-hover': '#26262C',
    'bg-selected': '#3D2A55',
    'border-color': '#2D2D39',
    'table-header-bg': '#18181B',
    'table-row-hover': '#26262C',
    'table-border': '#2D2D39',
    'table-stripe': '#18181B',
  }
};

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const { updateTheme } = useTheme();

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    updateTheme(themes[theme]); // Your theme object
  };

  const iconItems = [
    { icon: Sun, value: 'light', tooltip: 'Light Theme' },
    { icon: Moon, value: 'dark', tooltip: 'Dark Theme' },
    { icon: Settings, value: 'stream', tooltip: 'Stream Theme' },
    { icon: Bell, value: 'notifications', tooltip: 'Notifications' }
  ];

  return (
    <IconGroup
      items={iconItems}
      value={currentTheme}
      onChange={handleThemeChange}
      direction="row-reverse"
    />
  );
};

const participants = [
  {
    id: '1',
    name: 'John Doe',
    imageUrl: '',
    isActive: true,
    hasVoted: true,
    lastMessage: 'Great stream!',
    lastMessageTime: '2m ago'
  },
  {
    id: '2',
    name: 'Jane Smith',
    imageUrl: '',
    isActive: false,
    hasVoted: false,
    lastMessage: 'Amazing content!',
    lastMessageTime: '5m ago'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    imageUrl: '',
    isActive: true,
    hasVoted: true,
    lastMessage: 'Keep it up!',
    lastMessageTime: '1m ago'
  },
];

const StreamPage = () => {
  const [newMessages] = useState(3);
  const [activeParticipants] = useState(2);
  const [hasNewPoll] = useState(true);
  const [isLive] = useState(true);

  // Sample data...
  const participants = [
    {
      id: '1',
      name: 'John Doe',
      imageUrl: '',
      isActive: true,
      hasVoted: true,
      lastMessage: 'Great stream!',
      lastMessageTime: '2m ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      imageUrl: '',
      isActive: false,
      hasVoted: false,
      lastMessage: 'Amazing content!',
      lastMessageTime: '5m ago'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      imageUrl: '',
      isActive: true,
      hasVoted: true,
      lastMessage: 'Keep it up!',
      lastMessageTime: '1m ago'
    },
  ];
  const voteOptions = [
    { id: '1', label: 'خوب', votes: 150 },
    { id: '2', label: 'متوسط', votes: 100 },
    { id: '3', label: 'بد', votes: 75 }
  ];


  const accordionItems = [
    {
      id: 'chat',
      title: 'گفتگو',
      icon: <MessageSquare className="rbc-w-5 rbc-h-5" />,
      notificationCount: newMessages,
      content: (
        <div className="rbc-h-[calc(100vh-17rem)]">
          <TwitchChat className="rbc-h-full rbc-shadow-sm rbc-rounded-none" />
        </div>
      )
    },
    {
      id: 'participants',
      title: `شرکت کنندگان (${participants.length})`,
      icon: <Users className="rbc-w-5 rbc-h-5" />,
      content: (
        <CompactParticipantList 
          participants={participants}
          className="rbc-p-2"
        />
      )
    },
    {
      id: 'vote',
      title: 'رای گیری',
      icon: <Vote className="rbc-w-5 rbc-h-5" />,
      notificationIcon: hasNewPoll ? <Radio className="rbc-w-4 rbc-h-4 rbc-text-red-500 rbc-animate-pulse" /> : undefined,
      content: (
        <VoteComponent
          question="نظر سنجی در مورد کیفیت برنامه؟"
          options={voteOptions}
          onVote={(optionId) => console.log('Voted for:', optionId)}
          totalVotes={325}
          className="rbc-border-none"
        />
      )
    }
  ];

  return (
    <ThemeProvider initialTheme={themes.light}>
      <div className="rbc-min-h-screen rbc-transition-colors rbc-duration-200" 
           style={{ backgroundColor: 'var(--rbc-bg-secondary)' }}>
        <div className="rbc-max-w-[1920px] rbc-mx-auto rbc-px-4">
          {/* Header with Theme Selector */}
          <div className=" rbc-pt-2 rbc-flex rbc-flex-row-reverse rbc-justify-between rbc-items-center rbc-mb-4">
            <div className="rbc-bg-white rbc-py-2 rbc-px-4 rbc-rounded-lg rbc-flex rbc-items-center rbc-gap-4">
              <h1 className="rbc-text-2xl rbc-font-bold" style={{ color: 'var(--rbc-text-primary)' }}>
               جلسه ی اول تصمیم گیری در مورد پروژه
              </h1>

            </div>
            <div style={{boxShadow:' rgb(79 67 85 / 27%) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}}>
            <ThemeSelector />
            </div>
          </div>

          <div className="rbc-flex rbc-flex-col lg:rbc-flex-row rbc-gap-4">
            {/* Left Column - Video Player & Content */}
            <div className="lg:rbc-w-[70%] rbc-space-y-4">
              {/* Video Player */}
              <div className="rbc-relative rbc-bg-gray-900 rbc-rounded-lg rbc-aspect-video rbc-shadow-lg rbc-overflow-hidden">
                <div className="rbc-absolute rbc-inset-0 rbc-flex rbc-items-center rbc-justify-center rbc-text-white">
                  <span>Video Player</span>
                  
                </div>
                {isLive && (
                <span className="rbc-inline-flex rbc-absolute rbc-top-2 rbc-left-2 rbc-px-2 rbc-py-1 rbc-text-sm rbc-font-medium rbc-bg-red-500 rbc-text-white rbc-rounded-md rbc-flex rbc-items-center rbc-gap-1">
                  <span className="rbc-w-2 rbc-h-2 rbc-bg-white rbc-rounded-full rbc-animate-pulse"></span>
                  LIVE
                </span>
              )}
              </div>

              {/* Stream Info */}
              <div className="rbc-rounded-lg rbc-p-6 rbc-shadow-sm rbc-transition-colors rbc-duration-200"
                   style={{ backgroundColor: 'var(--rbc-bg-primary)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }} dir='rtl'>
                <div className="rbc-flex rbc-justify-between rbc-items-start">
                  <div>
                    <h1 className="rbc-text-2xl rbc-font-bold" 
                        style={{ color: 'var(--rbc-text-primary)' }}>
                      گفتگوی مجمع
                    </h1>
                    <p style={{ color: 'var(--rbc-text-secondary)' }} 
                       className="rbc-mt-2">
                      توضیحات کوتاه
                    </p>
                  </div>
                  <button className="rbc-px-4 rbc-py-2 rbc-rounded-lg rbc-transition-colors rbc-duration-200 rbc-text-white"
                          style={{ backgroundColor: 'var(--rbc-primary)' }}>
                    جزییات
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Accordion with Chat, Participants, and Vote */}
            <div className="lg:rbc-w-[30%]">
              <Accordion
                items={accordionItems}
                allowMultiple={false}
                variant="bordered"
                size="md"
                defaultExpanded={['chat']}
                className="rbc-shadow-sm rbc-transition-colors rbc-duration-200"
                style={{ backgroundColor: 'var(--rbc-bg-primary)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default StreamPage;