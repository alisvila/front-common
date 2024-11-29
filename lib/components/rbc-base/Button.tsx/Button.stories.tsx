import { Meta, StoryObj } from "@storybook/react";
import Button from ".";
import { Download, Mail, Plus, Settings, Trash2 } from "lucide-react";


const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible and reusable button component that supports various styles, sizes, and states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size of the button'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take up the full width of its container'
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'The position of the icon relative to the text'
    },
    children: {
      control: 'text',
      description: 'The content of the button'
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Basic variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger'
  }
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success'
  }
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: 'warning'
  }
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="rbc-flex rbc-items-center rbc-gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

// States
export const States: Story = {
  render: () => (
    <div className="rbc-flex rbc-flex-col rbc-gap-4">
      <div className="rbc-flex rbc-gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  )
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="rbc-flex rbc-flex-col rbc-gap-4">
      <div className="rbc-flex rbc-gap-4">
        <Button icon={<Mail />}>Send Email</Button>
        <Button icon={<Plus />} iconPosition="right">Add Item</Button>
        <Button icon={<Settings />} size="icon" aria-label="Settings" />
      </div>
    </div>
  )
};

// Full Width
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true
  }
};

// Common Use Cases
export const CommonUseCases: Story = {
  render: () => (
    <div className="rbc-flex rbc-flex-col rbc-gap-4 rbc-w-[300px]">
      <Button icon={<Plus />}>Create New</Button>
      <Button variant="danger" icon={<Trash2 />}>Delete Item</Button>
      <Button variant="outline" icon={<Download />}>Download</Button>
      <Button variant="secondary" icon={<Settings />}>Settings</Button>
      <Button loading>Saving...</Button>
    </div>
  )
};

// All Variants Overview
export const AllVariants: Story = {
  render: () => (
    <div className="rbc-grid rbc-grid-cols-2 rbc-gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  )
};