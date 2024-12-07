import type { Meta, StoryObj } from '@storybook/react';
import ParticipantList from '.';
import { ThemeProvider } from '@lib/main';

const meta: Meta<typeof ParticipantList> = {
  title: 'Components/RBC-System/ParticipantList',
  component: ParticipantList,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    participants: {
      description: 'Array of participant objects',
      control: 'object',
    },
    itemsPerPage: {
      description: 'Number of participants to show per page',
      control: { type: 'number', min: 1 },
    },
    className: {
      description: 'Additional CSS classes to apply to the component',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParticipantList>;

const sampleParticipants = [
  {
    id: '1',
    name: 'John Doe',
    imageUrl: '/api/placeholder/64/64',
    isActive: true,
    hasVoted: true,
    lastMessage: 'I think we should proceed with the current plan.',
    lastMessageTime: '5 min ago',
  },
  {
    id: '2',
    name: 'Jane Smith',
    imageUrl: '/api/placeholder/64/64',
    isActive: false,
    hasVoted: false,
    lastMessage: 'Let me review the documents first.',
    lastMessageTime: '15 min ago',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    imageUrl: '/api/placeholder/64/64',
    isActive: true,
    hasVoted: true,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    imageUrl: '/api/placeholder/64/64',
    isActive: false,
    hasVoted: false,
    lastMessage: "I'll be back in 30 minutes.",
    lastMessageTime: '1 hour ago',
  },
];

export const Default: Story = {
  args: {
    participants: sampleParticipants,
    itemsPerPage: 4,
  },
};

export const ManyParticipants: Story = {
  args: {
    participants: Array.from({ length: 12 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Participant ${i + 1}`,
      imageUrl: '/api/placeholder/64/64',
      isActive: i % 3 === 0,
      hasVoted: i % 2 === 0,
      lastMessage: i % 2 === 0 ? `Latest message from participant ${i + 1}` : undefined,
      lastMessageTime: i % 2 === 0 ? `${i * 5} min ago` : undefined,
    })),
    itemsPerPage: 8,
  },
};

export const WithMissingImages: Story = {
  args: {
    participants: sampleParticipants.map((participant, index) => ({
      ...participant,
      imageUrl: index === 1 ? '' : participant.imageUrl // Remove image for second participant
    })),
    itemsPerPage: 4,
  },
};

export const NoMessages: Story = {
  args: {
    participants: sampleParticipants.map(({ lastMessage, lastMessageTime, ...rest }) => rest),
    itemsPerPage: 4,
  },
};

export const SingleParticipant: Story = {
  args: {
    participants: [sampleParticipants[0]],
    itemsPerPage: 4,
  },
};