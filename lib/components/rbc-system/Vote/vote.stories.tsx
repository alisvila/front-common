import type { Meta, StoryObj } from '@storybook/react';
import VoteComponent from '.';
import { useState } from 'react';

const meta: Meta<typeof VoteComponent> = {
  title: 'Components/RBC-System/VoteComponent',
  component: VoteComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A standalone voting component built with React and prefixed Tailwind CSS classes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    question: {
      description: 'The main question to be voted on',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    description: {
      description: 'Optional description or context for the question',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    options: {
      description: 'Array of voting options',
      control: 'object',
      table: {
        type: { summary: 'VoteOption[]' },
        category: 'Data',
      },
    },
    totalVotes: {
      description: 'Total number of votes cast',
      control: 'number',
      table: {
        type: { summary: 'number' },
        category: 'Data',
      },
    },
    hasVoted: {
      description: 'Whether the user has already voted',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'State',
      },
    },
    onVote: {
      description: 'Callback when user submits a vote',
      table: {
        type: { summary: '(optionId: string) => void' },
        category: 'Events',
      },
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Styling',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VoteComponent>;

// Base template for interactive stories
const VoteTemplate: Story = {
  render: (args) => {
    const [voteData, setVoteData] = useState({
      options: args.options,
      totalVotes: args.totalVotes || 0,
      hasVoted: args.hasVoted || false,
    });

    const handleVote = (optionId: string) => {
      setVoteData(prev => {
        const newOptions = prev.options.map(opt =>
          opt.id === optionId
            ? { ...opt, votes: (opt.votes || 0) + 1 }
            : opt
        );
        
        return {
          options: newOptions,
          totalVotes: prev.totalVotes + 1,
          hasVoted: true,
        };
      });
    };

    return (
      <div className="rbc-p-4">
        <VoteComponent
          {...args}
          options={voteData.options}
          totalVotes={voteData.totalVotes}
          hasVoted={voteData.hasVoted}
          onVote={handleVote}
        />
      </div>
    );
  },
};

export const Default: Story = {
  ...VoteTemplate,
  args: {
    question: "What's your favorite frontend framework?",
    description: "Vote for your preferred framework for building web applications.",
    options: [
      { id: '1', label: 'React', votes: 150 },
      { id: '2', label: 'Vue', votes: 85 },
      { id: '3', label: 'Angular', votes: 120 },
      { id: '4', label: 'Svelte', votes: 45 },
    ],
    totalVotes: 400,
    hasVoted: false,
  },
};

export const ShowingResults: Story = {
  ...VoteTemplate,
  args: {
    ...Default.args,
    hasVoted: true,
  },
};

export const NoVotesYet: Story = {
  ...VoteTemplate,
  args: {
    question: "Which feature should we build next?",
    description: "Help us prioritize our development roadmap.",
    options: [
      { id: '1', label: 'Dark Mode', votes: 0 },
      { id: '2', label: 'Mobile App', votes: 0 },
      { id: '3', label: 'API Integration', votes: 0 },
      { id: '4', label: 'Analytics Dashboard', votes: 0 },
    ],
    totalVotes: 0,
    hasVoted: false,
  },
};

export const RTLSupport: Story = {
  ...VoteTemplate,
  args: {
    question: "کدام چارچوب را ترجیح می‌دهید؟",
    description: "برای چارچوب مورد علاقه خود در توسعه وب رای دهید.",
    options: [
      { id: '1', label: 'ری‌اکت', votes: 150 },
      { id: '2', label: 'ویو', votes: 85 },
      { id: '3', label: 'انگولار', votes: 120 },
      { id: '4', label: 'سوئلت', votes: 45 },
    ],
    totalVotes: 400,
    hasVoted: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The component supports RTL languages out of the box.',
      },
    },
  },
};

export const ManyOptions: Story = {
  ...VoteTemplate,
  args: {
    question: "What's your favorite programming language?",
    description: "Vote for your go-to programming language.",
    options: [
      { id: '1', label: 'JavaScript', votes: 120 },
      { id: '2', label: 'Python', votes: 150 },
      { id: '3', label: 'Java', votes: 90 },
      { id: '4', label: 'C++', votes: 70 },
      { id: '5', label: 'Ruby', votes: 45 },
      { id: '6', label: 'Go', votes: 80 },
      { id: '7', label: 'Rust', votes: 60 },
      { id: '8', label: 'TypeScript', votes: 110 },
    ],
    totalVotes: 725,
    hasVoted: false,
  },
};

export const Minimal: Story = {
  ...VoteTemplate,
  args: {
    question: "Quick Poll: Dark or Light Theme?",
    options: [
      { id: '1', label: 'Dark', votes: 25 },
      { id: '2', label: 'Light', votes: 18 },
    ],
    totalVotes: 43,
    hasVoted: false,
  },
};