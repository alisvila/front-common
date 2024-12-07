import type { Meta, StoryObj } from '@storybook/react';
import IconGroup from '.';
import { Sun, Moon, Settings, Bell, Home, User, MessageSquare, Heart } from 'lucide-react';
import { useState } from 'react';
import { ThemeProvider } from '@lib/main';

const meta: Meta<typeof IconGroup> = {
  title: 'Components/RBC-Base/IconGroup',
  component: IconGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'row-reverse'],
      description: 'Direction of the icon group',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'row' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icons',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconGroup>;

// Theme switcher items
const themeItems = [
  { icon: Sun, value: 'light', tooltip: 'Light Theme' },
  { icon: Moon, value: 'dark', tooltip: 'Dark Theme' },
  { icon: Settings, value: 'system', tooltip: 'System Theme' },
];

// Navigation items
const navigationItems = [
  { icon: Home, value: 'home', tooltip: 'Home' },
  { icon: User, value: 'profile', tooltip: 'Profile' },
  { icon: MessageSquare, value: 'messages', tooltip: 'Messages' },
  { icon: Heart, value: 'favorites', tooltip: 'Favorites' },
];

// Wrapper component for handling state
const IconGroupWrapper = ({ items, direction, size, className }: any) => {
  const [value, setValue] = useState(items[0].value);

  return (
    <ThemeProvider>
      <IconGroup
        items={items}
        value={value}
        onChange={setValue}
        direction={direction}
        size={size}
        className={className}
      />
    </ThemeProvider>
  );
};

// Default Theme Switcher Story
export const ThemeSwitcher: Story = {
  render: (args) => <IconGroupWrapper {...args} items={themeItems} />,
  args: {
    direction: 'row',
    size: 'md',
  },
};

// Navigation Story
export const Navigation: Story = {
  render: (args) => <IconGroupWrapper {...args} items={navigationItems} />,
  args: {
    direction: 'row',
    size: 'md',
  },
};

// Row Reverse Story
export const RowReverse: Story = {
  render: (args) => <IconGroupWrapper {...args} items={themeItems} />,
  args: {
    direction: 'row-reverse',
    size: 'md',
  },
};

// Different Sizes Story
const SizesTemplate = () => (
  <div className="rbc-space-y-4">
    <ThemeProvider>
      <IconGroup
        items={themeItems}
        value="light"
        size="sm"
        className="rbc-mb-4"
      />
      <IconGroup
        items={themeItems}
        value="dark"
        size="md"
        className="rbc-mb-4"
      />
      <IconGroup
        items={themeItems}
        value="system"
        size="lg"
      />
    </ThemeProvider>
  </div>
);

export const Sizes: Story = {
  render: () => <SizesTemplate />,
};

// Custom Styling Story
export const CustomStyling: Story = {
  render: (args) => (
    <IconGroupWrapper
      {...args}
      items={themeItems}
      className="rbc-bg-blue-100 rbc-shadow-lg"
    />
  ),
  args: {
    direction: 'row',
    size: 'md',
  },
};

// Interactive Example
const InteractiveTemplate = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="rbc-w-full rbc-max-w-md rbc-p-4 rbc-bg-white rbc-rounded-lg rbc-shadow-md">
      <ThemeProvider>
        <IconGroup
          items={navigationItems}
          value={activeTab}
          onChange={setActiveTab}
          size="md"
          className="rbc-mb-4"
        />
        <div className="rbc-p-4 rbc-bg-gray-50 rbc-rounded-md rbc-text-sm">
          Active Tab: <span className="rbc-font-semibold">{activeTab}</span>
        </div>
      </ThemeProvider>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Playground Story
export const Playground: Story = {
  render: (args) => <IconGroupWrapper {...args} items={themeItems} />,
  args: {
    direction: 'row',
    size: 'md',
    className: '',
  },
};