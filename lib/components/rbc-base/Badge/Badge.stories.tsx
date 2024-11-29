import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from '.';
import { Bell, Check, AlertCircle, Info } from 'lucide-react';
import { ThemeProvider } from '../Theme/ThemeContext';

const meta: Meta<typeof Badge> = {
  title: 'Components/RBC-Base/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
        description: {
          component: 'A flexible and reusable Badge component that supports various styles, sizes, and states.'
        }
      }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'outline'],
      description: 'The variant of the badge',
      table: { category: 'Appearance' }
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
      table: { category: 'Appearance' }
    },
    removable: {
      control: 'boolean',
      description: 'Whether the badge can be removed',
      table: { category: 'Behavior' }
    },
    children: {
      control: 'text',
      description: 'The content of the badge',
      table: { category: 'Content' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic Badge
export const Default: Story = {
  args: {
    children: 'Badge',
  }
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="rbc-flex rbc-flex-wrap rbc-gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="rbc-flex rbc-flex-wrap rbc-gap-2 rbc-items-center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="rbc-flex rbc-flex-wrap rbc-gap-2">
      <Badge variant="primary" icon={<Bell size={14} />}>
        Notifications
      </Badge>
      <Badge variant="success" icon={<Check size={14} />}>
        Completed
      </Badge>
      <Badge variant="warning" icon={<AlertCircle size={14} />}>
        Warning
      </Badge>
      <Badge variant="info" icon={<Info size={14} />} iconPosition="right">
        Information
      </Badge>
    </div>
  ),
};

// Removable Badges
export const Removable: Story = {
  render: () => (
    <div className="rbc-flex rbc-flex-wrap rbc-gap-2">
      <Badge variant="primary" removable onRemove={() => console.log('removed')}>
        Removable
      </Badge>
      <Badge variant="success" removable onRemove={() => console.log('removed')}>
        Click X
      </Badge>
      <Badge 
        variant="warning" 
        removable 
        onRemove={() => console.log('removed')}
        icon={<AlertCircle size={14} />}
      >
        With Icon
      </Badge>
    </div>
  ),
};

// Custom Themed
export const CustomThemed: Story = {
  render: () => (
    <ThemeProvider
      initialTheme={{
        'badge-primary-bg': '#8B5CF6',
        'badge-primary-text': '#FFFFFF',
        'badge-radius': '0.25rem',
      }}
    >
      <div className="rbc-flex rbc-flex-wrap rbc-gap-2">
        <Badge variant="primary">Custom Theme</Badge>
        <Badge variant="primary" icon={<Bell size={14} />}>
          Notifications
        </Badge>
        <Badge variant="primary" removable>
          Removable
        </Badge>
      </div>
    </ThemeProvider>
  ),
};