import type { Meta, StoryObj } from "@storybook/react";
import TwitchChat from ".";
import { ThemeProvider } from "@lib/main";

const meta: Meta<typeof TwitchChat> = {
  title: "Components/RBC-React/TwitchChat",
  component: TwitchChat,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    initialMessages: {
      control: "object",
      description: "Initial set of chat messages",
      defaultValue: [
        { id: 1, user: "JohnDoe", content: "Hello everyone!", color: "#FF4500" },
        { id: 2, user: "ChatBot", content: "Welcome to the stream!", color: "#00FF00" },
        { id: 3, user: "GameMaster", content: "Don't forget to follow!", color: "#9146FF" },
      ],
    },
    announcement: {
      control: "text",
      description: "Announcement text that scrolls at the top",
      defaultValue: "Welcome to the stream! Follow for more content!",
    },
    pinnedMessage: {
      control: "object",
      description: "Message to be pinned at the top",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Theme variant",
      defaultValue: "light",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TwitchChat>;

// Default story with standard chat layout
export const Default: Story = {
  args: {},
};

// Story with pre-pinned message
export const WithPinnedMessage: Story = {
  args: {
    pinnedMessage: {
      id: 1,
      user: "Moderator",
      content: "Stream starting in 5 minutes!",
      color: "#9146FF",
    },
  },
};

// Story with long announcement
export const LongAnnouncement: Story = {
  args: {
    announcement: "🎉 Special stream today! We're doing a 12-hour marathon with special guests and awesome giveaways! Make sure to follow and turn on notifications! 🎮",
  },
};

// Story with many messages
export const ManyMessages: Story = {
  args: {
    initialMessages: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      user: `User${i + 1}`,
      content: `This is message number ${i + 1} in the chat!`,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    })),
  },
};

// Story with dark theme
export const DarkTheme: Story = {
  args: {
    theme: "dark",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

// Story showing empty state
export const EmptyChat: Story = {
  args: {
    initialMessages: [],
    announcement: "",
  },
};

// Story with moderator actions
export const ModeratorView: Story = {
  args: {
    initialMessages: [
      {
        id: 1,
        user: "Moderator",
        content: "Welcome everyone to the stream!",
        color: "#9146FF",
        isModerator: true,
      },
      {
        id: 2,
        user: "User1",
        content: "Hello! Excited to be here!",
        color: "#FF4500",
      },
      {
        id: 3,
        user: "Moderator",
        content: "Please keep the chat family-friendly!",
        color: "#9146FF",
        isModerator: true,
      },
    ],
  },
};

// Story with different chat interactions
export const InteractiveDemo: Story = {
  args: {
    initialMessages: [
      {
        id: 1,
        user: "StreamBot",
        content: "Try interacting with the chat! You can send messages and pin them.",
        color: "#00FF00",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "This story demonstrates the interactive features of the chat component. Users can send messages and pin them to the top.",
      },
    },
  },
};