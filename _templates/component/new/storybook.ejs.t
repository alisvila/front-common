---
to: lib/components/<%=name%>/<%=name%>.stories.tsx
---
import {<%=name%>} from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "component/<%=name%>",
  component: <%=name%>,
} satisfies Meta<typeof <%=name%>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "<%=name%>",
  },
};
