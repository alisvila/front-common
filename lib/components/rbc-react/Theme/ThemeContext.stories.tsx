import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, ThemeVariables } from "./ThemeContext";
import {TableComponent} from "../../rbc-system/Table";

const meta: Meta<typeof ThemeProvider> = {
  title: "Components/RBC-React/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    // Theme Controls
    primary: {
      control: "color",
      description: "Primary color for buttons and interactive elements",
      table: { category: "Theme" },
    },
    "primary-hover": {
      control: "color",
      description: "Hover state for primary elements",
      table: { category: "Theme" },
    },
    "text-primary": {
      control: "color",
      description: "Main text color",
      table: { category: "Theme" },
    },
    "text-secondary": {
      control: "color",
      description: "Secondary text color",
      table: { category: "Theme" },
    },
    "bg-primary": {
      control: "color",
      description: "Primary background color",
      table: { category: "Theme" },
    },
    "bg-secondary": {
      control: "color",
      description: "Secondary background color",
      table: { category: "Theme" },
    },
    "table-header-bg": {
      control: "color",
      description: "Table header background color",
      table: { category: "Theme" },
    },
    "table-row-hover": {
      control: "color",
      description: "Table row hover color",
      table: { category: "Theme" },
    },
    "table-stripe": {
      control: "color",
      description: "Table striped row color",
      table: { category: "Theme" },
    },
    "border-color": {
      control: "color",
      description: "Border color",
      table: { category: "Theme" },
    },
  },
};

export default meta;

const bulkActions: any = [
  {
    label: "حذف موارد انتخاب شده",
    onClick: () => {
      /* ... */
    },
    variant: "danger",
  },
  {
    label: "فعال کردن",
    onClick: () => {
      /* ... */
    },
  },
  {
    label: "غیرفعال کردن",
    onClick: () => {
      /* ... */
    },
  },
];

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
];

const columns = [
  { key: "id", header: "ID", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "status", header: "Status", sortable: true },
];

const ThemedDataGrid = ({ themeVars = {} }: any) => {
  return (
    <ThemeProvider initialTheme={themeVars}>
      <TableComponent
        data={sampleData}
        columns={columns}
        itemsPerPage={5}
        hideSearch={false}
        bulkActions={bulkActions}
        onAddNew={() => {
          /* ... */
        }}
        addNewButtonLabel="افزودن کاربر"
      />
    </ThemeProvider>
  );
};

export const Default: StoryObj<typeof ThemedDataGrid> = {
  render: (args) => {
    const { ...themeControls } = args;

    return <ThemedDataGrid themeVars={themeControls as ThemeVariables} />;
  },
  args: {
    primary: "#3B82F6",
    "primary-hover": "#2563EB",
    "text-primary": "#111827",
    "text-secondary": "#6B7280",
    "bg-primary": "#FFFFFF",
    "bg-secondary": "#F3F4F6",
    "table-header-bg": "#F3F4F6",
    "table-row-hover": "#F9FAFB",
    "table-stripe": "#F3F4F6",
    "border-color": "#E5E7EB",
  },
};

export const DarkTheme: StoryObj<typeof ThemedDataGrid> = {
  ...Default,
  args: {
    ...Default.args,
    primary: "#60A5FA",
    "primary-hover": "#3B82F6",
    "text-primary": "#F9FAFB",
    "text-secondary": "#D1D5DB",
    "bg-primary": "#1F2937",
    "bg-secondary": "#374151",
    "table-header-bg": "#4C4E51",
    "table-row-hover": "#4B5563",
    "table-stripe": "#374151",
    "border-color": "#4B5563",
  },
};

export const CustomTheme: StoryObj<typeof ThemedDataGrid> = {
  ...Default,
  args: {
    ...Default.args,
    primary: "#10B981",
    "primary-hover": "#059669",
    "text-primary": "#1F2937",
    "text-secondary": "#6B7280",
    "bg-primary": "#ECFDF5",
    "bg-secondary": "#D1FAE5",
    "table-header-bg": "#D1FAE5",
    "table-row-hover": "#A7F3D0",
    "table-stripe": "#D1FAE5",
    "border-color": "#6EE7B7",
  },
};
