import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '.';
import { Home, User, Settings, Mail, Bell, Lock } from 'lucide-react';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible tab component that supports both horizontal and vertical orientations with multiple style variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs'
    },
    variant: {
      control: 'select',
      options: ['line', 'pill', 'contained'],
      description: 'The visual style variant of the tabs'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the tabs should take full width in horizontal orientation'
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleItems = [
  {
    id: 'home',
    label: 'Home',
    content: (
      <div className="rbc-prose">
        <h3 className="rbc-text-lg rbc-font-semibold">Welcome Home</h3>
        <p className="rbc-mt-2">This is the home tab content.</p>
      </div>
    )
  },
  {
    id: 'profile',
    label: 'Profile',
    content: (
      <div className="rbc-prose">
        <h3 className="rbc-text-lg rbc-font-semibold">User Profile</h3>
        <p className="rbc-mt-2">This is the profile tab content.</p>
      </div>
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div className="rbc-prose">
        <h3 className="rbc-text-lg rbc-font-semibold">Settings</h3>
        <p className="rbc-mt-2">This is the settings tab content.</p>
      </div>
    )
  }
];

const itemsWithIcons = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home size={16} />,
    content: <div>Home Content</div>
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User size={16} />,
    content: <div>Profile Content</div>
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={16} />,
    content: <div>Settings Content</div>
  }
];

// Basic horizontal tabs
export const HorizontalTabs: Story = {
  args: {
    items: sampleItems,
    orientation: 'horizontal',
    variant: 'contained'
  }
};

// Vertical tabs
export const VerticalTabs: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    variant: 'contained'
  }
};

// Pills variant
export const PillTabs: Story = {
  args: {
    items: sampleItems,
    variant: 'pill'
  }
};

// Contained variant
export const ContainedTabs: Story = {
  args: {
    items: sampleItems,
    variant: 'contained'
  }
};

// Tabs with icons
export const TabsWithIcons: Story = {
  args: {
    items: itemsWithIcons,
    variant: 'line'
  }
};

// Full width tabs
export const FullWidthTabs: Story = {
  args: {
    items: sampleItems,
    fullWidth: true
  }
};

// Tabs with disabled item
export const TabsWithDisabledItem: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 2),
      { ...sampleItems[2], disabled: true }
    ]
  }
};

// Complex example with all features
export const ComplexExample: Story = {
  render: () => (
    <div className="rbc-grid rbc-grid-cols-2 rbc-gap-8">
      {/* Horizontal Tabs */}
      <div className="rbc-space-y-6">
        <h3 className="rbc-font-semibold">Horizontal Tabs</h3>
        <Tabs
          items={itemsWithIcons}
          variant="contained"
          fullWidth
        />
      </div>

      {/* Vertical Tabs */}
      <div className="rbc-space-y-6">
        <h3 className="rbc-font-semibold">Vertical Tabs</h3>
        <Tabs
          items={itemsWithIcons}
          orientation="vertical"
          variant="pill"
        />
      </div>
    </div>
  )
};