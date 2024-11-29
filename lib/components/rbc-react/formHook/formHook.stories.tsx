import {formHook} from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "component/formHook",
  component: formHook,
} satisfies Meta<typeof formHook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "formHook",
  },
};
