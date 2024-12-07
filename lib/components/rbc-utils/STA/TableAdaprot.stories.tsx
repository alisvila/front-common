import type { Meta, StoryObj } from "@storybook/react";
import { DetailComponentProps, SortableHeaderItem, TableAdapter, WithCount } from "./TableAdaprot";

// Mock data interface
interface User extends WithCount {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    count: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    count: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
    createdAt: "2024-01-02",
  },
  // Add more mock data as needed
];

// Mock data hook
const mockDataHook = () => {
  return {
    data: {
      count: mockUsers.length,
      next: null,
      previous: null,
      results: mockUsers,
    },
    isLoading: false,
    mutate: () => {},
    isError: false,
    error: null,
  };
};

// Mock headers
const headers: SortableHeaderItem[] = [
  {
    columnName: "Name",
    accessor: "name",
    sortableFieldName: "name",
    id: 1,
  },
  {
    columnName: "Email",
    accessor: "email",
    sortableFieldName: "email",
    id: 2,
  },
  {
    columnName: "Role",
    accessor: "role",
    sortableFieldName: "role",
    id: 3,
  },
  {
    columnName: "Status",
    accessor: "status",
    sortableFieldName: "status",
    id: 4,
    component: (item: User) => (
      <span
        className={`rbc-px-2 rbc-py-1 rbc-rounded-full ${
          item.status === "Active"
            ? "rbc-bg-green-100 rbc-text-green-800"
            : "rbc-bg-red-100 rbc-text-red-800"
        }`}
      >
        {item.status}
      </span>
    ),
  },
];

// Mock detail component
const DetailComponent: React.FC<DetailComponentProps<User>> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="rbc-p-4 rbc-space-y-2">
      <h3 className="rbc-text-lg rbc-font-medium">User Details</h3>
      <div className="rbc-grid rbc-grid-cols-2 rbc-gap-4">
        <div>
          <p className="rbc-text-sm rbc-text-gray-500">Created At</p>
          <p className="rbc-text-sm">{data.createdAt}</p>
        </div>
        <div>
          <p className="rbc-text-sm rbc-text-gray-500">Role</p>
          <p className="rbc-text-sm">{data.role}</p>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof TableAdapter> = {
  title: "Components/RBC-Utils/TableAdapter",
  component: TableAdapter,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A table adapter component that transforms old STA headers into a format compatible with the TableComponent.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    headers: {
      description:
        "Array of header definitions with sorting and rendering options",
      control: "object",
    },
    dataHook: {
      description: "Hook function that fetches and manages data",
      control: "function",
    },
    objectID: {
      description: "Optional ID for fetching specific object data",
      control: "text",
    },
    dataHookProps: {
      description: "Additional properties to pass to the data hook",
      control: "object",
    },
    canDisableColumns: {
      description: "Whether columns can be disabled/hidden",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableAdapter>;

// Basic example
export const Default: Story = {
  args: {
    headers: headers,
    dataHook: mockDataHook,
    itemsPerPage: 5,
  },
};

// With detail component
export const WithExpandableRows: Story = {
  args: {
    headers: headers,
    dataHook: mockDataHook,
    DetailComponent: DetailComponent,
    itemsPerPage: 5,
  },
};

// With row selection
export const WithRowSelection: Story = {
  args: {
    headers: headers,
    dataHook: mockDataHook,
    enableRowSelection: true,
    itemsPerPage: 5,
  },
};

// With search enabled
export const WithSearch: Story = {
  args: {
    headers: headers,
    dataHook: mockDataHook,
    hideSearch: false,
    itemsPerPage: 5,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    headers: headers,
    dataHook: () => ({
      data: { count: 0, next: null, previous: null, results: [] },
      isLoading: true,
      mutate: () => {},
      isError: false,
      error: null,
    }),
    itemsPerPage: 5,
  },
};

// Error state
export const Error: Story = {
  args: {
    headers: headers,
    dataHook: () => ({
      data: { count: 0, next: null, previous: null, results: [] },
      isLoading: false,
      mutate: () => {},
      isError: true,
      error: "Failed to fetch data",
    }),
    itemsPerPage: 5,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    headers: headers,
    dataHook: () => ({
      data: { count: 0, next: null, previous: null, results: [] },
      isLoading: false,
      mutate: () => {},
      isError: false,
      error: null,
    }),
    itemsPerPage: 5,
  },
};
