import type { Meta, StoryObj } from '@storybook/react';
import Wizard from '.';
import React from 'react';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard',
  component: Wizard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Wizard>;

const StepContent = ({ title }: { title: string }) => (
  <div className="rbc-space-y-4">
    <h3 className="rbc-text-lg rbc-font-semibold">{title}</h3>
    <div className="rbc-space-y-4">
      <div>
        <label className="rbc-block rbc-text-sm rbc-font-medium rbc-text-gray-700">
          نام
        </label>
        <input
          type="text"
          className="rbc-mt-1 rbc-block rbc-w-full rbc-rounded-md rbc-border-gray-300 rbc-shadow-sm focus:rbc-border-blue-500 focus:rbc-ring-blue-500"
        />
      </div>
      <div>
        <label className="rbc-block rbc-text-sm rbc-font-medium rbc-text-gray-700">
          توضیحات
        </label>
        <textarea
          className="rbc-mt-1 rbc-block rbc-w-full rbc-rounded-md rbc-border-gray-300 rbc-shadow-sm focus:rbc-border-blue-500 focus:rbc-ring-blue-500"
          rows={3}
        />
      </div>
    </div>
  </div>
);

const steps = [
  {
    id: 1,
    title: 'اطلاعات اولیه',
    content: <StepContent title="اطلاعات اولیه" />,
  },
  {
    id: 2,
    title: 'جزئیات',
    content: <StepContent title="جزئیات" />,
  },
  {
    id: 3,
    title: 'تنظیمات',
    content: <StepContent title="تنظیمات" />,
    isOptional: true,
  },
  {
    id: 4,
    title: 'تایید نهایی',
    content: <StepContent title="تایید نهایی" />,
  },
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const Default: Story = {
  args: {
    steps,
    onComplete: () => alert('Wizard completed!'),
    onStepSubmit: async (stepId: number) => {
      // Simulate API call
      await sleep(1000);
      console.log('Step submitted:', stepId);
      return true;
    },
  },
};