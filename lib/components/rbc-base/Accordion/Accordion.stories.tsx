import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '.';
import { CreditCard, Lock, Settings, User, Bell, Mail } from 'lucide-react';

const meta = {
  title: 'Components/RBC-Base/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible accordion component that supports various styles and configurations.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'separated', 'bordered'],
      description: 'The visual style variant of the accordion'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the accordion items'
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded at once'
    }
  }
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

// Sample items for different stories
const basicItems = [
  {
    id: '1',
    title: 'Account Settings',
    content: (
      <div className="rbc-prose">
        <p>Manage your account settings and preferences.</p>
        <ul className="rbc-mt-2 rbc-list-disc rbc-list-inside">
          <li>Profile Information</li>
          <li>Email Preferences</li>
          <li>Privacy Settings</li>
        </ul>
      </div>
    )
  },
  {
    id: '2',
    title: 'Security',
    content: (
      <div className="rbc-prose">
        <p>Update your security settings and preferences.</p>
        <ul className="rbc-mt-2 rbc-list-disc rbc-list-inside">
          <li>Password</li>
          <li>Two-factor Authentication</li>
          <li>Login History</li>
        </ul>
      </div>
    )
  },
  {
    id: '3',
    title: 'Notifications',
    content: (
      <div className="rbc-prose">
        <p>Configure your notification preferences.</p>
        <ul className="rbc-mt-2 rbc-list-disc rbc-list-inside">
          <li>Email Notifications</li>
          <li>Push Notifications</li>
          <li>SMS Alerts</li>
        </ul>
      </div>
    )
  }
];

const itemsWithIcons = [
  {
    id: '1',
    title: 'Account Settings',
    icon: <User size={20} className="rbc-text-gray-500" />,
    content: 'Account settings content...'
  },
  {
    id: '2',
    title: 'Security',
    icon: <Lock size={20} className="rbc-text-gray-500" />,
    content: 'Security settings content...'
  },
  {
    id: '3',
    title: 'Notifications',
    icon: <Bell size={20} className="rbc-text-gray-500" />,
    content: 'Notification settings content...'
  }
];

// Basic accordion
export const Default: Story = {
  args: {
    items: basicItems
  }
};

// Separated variant
export const Separated: Story = {
  args: {
    items: basicItems,
    variant: 'separated'
  }
};

// Bordered variant
export const Bordered: Story = {
  args: {
    items: basicItems,
    variant: 'bordered'
  }
};

// With icons
export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    variant: 'bordered'
  }
};

// Multiple expanded
export const MultipleExpanded: Story = {
  args: {
    items: basicItems,
    allowMultiple: true,
    defaultExpanded: ['1', '2']
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="rbc-space-y-8">
      <div>
        <h3 className="rbc-mb-2 rbc-font-medium">Small Size</h3>
        <Accordion items={basicItems.slice(0, 2)} size="sm" />
      </div>
      <div>
        <h3 className="rbc-mb-2 rbc-font-medium">Medium Size (Default)</h3>
        <Accordion items={basicItems.slice(0, 2)} size="md" />
      </div>
      <div>
        <h3 className="rbc-mb-2 rbc-font-medium">Large Size</h3>
        <Accordion items={basicItems.slice(0, 2)} size="lg" />
      </div>
    </div>
  )
};

// With disabled items
export const WithDisabledItems: Story = {
  args: {
    items: [
      ...basicItems.slice(0, 2),
      { ...basicItems[2], disabled: true }
    ],
    variant: 'bordered'
  }
};