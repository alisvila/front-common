// TableComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import MultiSelectWithInfiniteScroll from '.';

const meta: Meta<typeof MultiSelectWithInfiniteScroll> = {
  title: 'Components/RBC-Base/Select',
  component: MultiSelectWithInfiniteScroll,
  parameters: {
    layout: 'padded',
  },
};
const mockLoadOptions = async (page: number): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
  return Array.from({ length: 20 }, (_, i) => ({
    id: page * 20 + i,
    label: `Option ${page * 20 + i + 1}`,
  }));
};

export default meta;
type Story = StoryObj<typeof MultiSelectWithInfiniteScroll>;


export const Default: Story = {
  args: {
    loadOptions: mockLoadOptions,
  },
};

export const Multiple: Story = {
  args: {
    loadOptions: mockLoadOptions,
    multiple: true,
    searchable: true,
  },
};
