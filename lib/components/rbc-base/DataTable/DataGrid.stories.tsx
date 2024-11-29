import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TableComponent from './index';
import DataTable from './TableWrapperComponent';
import DataTableAlt from './TableWrapperAlt';
import { Bell, Check, X } from 'lucide-react';

const meta: Meta<typeof TableComponent> = {
  title: 'Components/RBC-Base/Table',
  component: TableComponent,
  parameters: {
    layout: 'padded',
    // Enable automatic documentation generation
    docs: {
      description: {
        component: 'A feature-rich, customizable table component for React applications.',
      },
    },
  },
  // Tag component for better organization
  tags: ['autodocs'],
  // Define argTypes for better control panel organization
  argTypes: {
    // Data Props
    data: {
      description: 'The data to display in the table',
      control: 'object',
      table: {
        type: { summary: 'array' },
        category: 'Data',
      },
    },
    columns: {
      description: 'Column definitions for the table',
      control: 'object',
      table: {
        type: { summary: 'array' },
        category: 'Data',
      },
    },
    // Pagination Props
    itemsPerPage: {
      description: 'Number of items to display per page',
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
        category: 'Pagination',
      },
    },
    currentPage: {
      description: 'Current page number (for controlled pagination)',
      control: 'number',
      table: {
        type: { summary: 'number' },
        category: 'Pagination',
      },
    },
    totalItems: {
      description: 'Total number of items (for server-side pagination)',
      control: 'number',
      table: {
        type: { summary: 'number' },
        category: 'Pagination',
      },
    },
    // Feature Flags
    enableRowSelection: {
      description: 'Enable checkbox selection for rows',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Features',
      },
    },
    hideSearch: {
      description: 'Hide the search functionality',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
        category: 'Features',
      },
    },
    loading: {
      description: 'Show loading state',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'State',
      },
    },
    // Event Handlers
    onPageChange: {
      description: 'Callback when page changes',
      table: {
        type: { summary: '(page: number) => void' },
        category: 'Events',
      },
    },
    onSort: {
      description: 'Callback when sorting changes',
      table: {
        type: { summary: '(key: string, direction: "asc" | "desc") => void' },
        category: 'Events',
      },
    },
    onSearch: {
      description: 'Callback when search term changes',
      table: {
        type: { summary: '(term: string) => void' },
        category: 'Events',
      },
    },
    onRowClick: {
      description: 'Callback when a row is clicked',
      table: {
        type: { summary: '(row: any) => void' },
        category: 'Events',
      },
    },
    // Customization Props
    renderActionMenu: {
      description: 'Render custom actions for each row',
      table: {
        type: { summary: '(row: any) => ReactNode' },
        category: 'Customization',
      },
    },
    expandableContent: {
      description: 'Render expandable content for each row',
      table: {
        type: { summary: '(row: any) => Promise<ReactNode>' },
        category: 'Customization',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableComponent>;

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
  // Add more sample data as needed
];

const fetchUserDetails = async () => {
  // const response = await fetch(`/api/users/${user.id}/details`);
  // const details: UserDetails = await response.json();
  const details = {
    address: "some address",
    phone: "09322",
    joinDate: "1-1-1-1",
  };
  return (
    <div className="rbc-space-y-4">
      <h3 className="rbc-text-lg rbc-font-medium">جزئیات کاربر</h3>
      <div className="rbc-grid rbc-grid-cols-2 rbc-gap-4">
        <div>
          <p className="rbc-text-sm rbc-text-gray-500">آدرس</p>
          <p className="rbc-text-sm">{details.address}</p>
        </div>
        <div>
          <p className="rbc-text-sm rbc-text-gray-500">تلفن</p>
          <p className="rbc-text-sm">{details.phone}</p>
        </div>
        <div>
          <p className="rbc-text-sm rbc-text-gray-500">تاریخ عضویت</p>
          <p className="rbc-text-sm">{details.joinDate}</p>
        </div>
      </div>
    </div>
  );
};

const columns = [
  { key: "id", header: "ردیف", sortable: true },
  { key: "name", header: "نام", sortable: true },
  { key: "email", header: "ایمیل", sortable: true },
  { key: "role", header: "نفش", sortable: true },
  { key: "status", header: "وضعیت", sortable: true },
];

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

const handleExport = () => {
  // Handle export logic
};

const renderExtraActions = () => (
  <button className="rbc-px-4 rbc-py-2 rbc-text-gray-700 rbc-bg-gray-100 rbc-rounded-lg hover:rbc-bg-gray-200">
    عملیات دیگر
  </button>
);

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
    itemsPerPage: 5,
  },
};

export const WithSearch: Story = {
  args: {
    data: sampleData,
    columns: columns,
    itemsPerPage: 5,
    hideSearch: false,
    bulkActions: bulkActions,
    onExport: handleExport,
    renderExtraActions: renderExtraActions,
    onAddNew: () => {
      /* ... */
    },
    addNewButtonLabel: "افزودن کاربر",
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 2 === 0 ? "Admin" : "User",
      status: i % 3 === 0 ? "Active" : "Inactive",
    })),
    columns: columns,
    itemsPerPage: 10,
    enableRowSelection: false,
    hideSearch: true,
    loading: false,
  },
};

export const WithSelectRow: Story = {
  args: {
    enableRowSelection: true,
    data: sampleData,
    columns: columns,
    itemsPerPage: 10,
  },
};

export const withActionButton: Story = {
  args: {
    enableRowSelection: true,
    data: sampleData,
    columns: columns,
    itemsPerPage: 10,
    renderActionMenu: (row) => (
      <button
        onClick={() => alert(JSON.stringify(row))}
        className="rbc-p-2 rbc-text-blue-500 rbc-bg-blue-50 rbc-rounded"
      >
        View Details
      </button>
    ),
  },
};

export const withExpandedRow: Story = {
  args: {
    data: sampleData,
    columns: columns,
    itemsPerPage: 10,
    expandableContent: fetchUserDetails,
  },
};

export const withAddNewButton: Story = {
  args: {
    data: sampleData,
    columns: columns,
    itemsPerPage: 10,
    expandableContent: fetchUserDetails,
    addNewButtonLabel: "افزودن کاربر جدید",
    onAddNew: () => console.log(1),
    hideSearch: true,
  },
};

export const NoData: Story = {
  args: {
    data: [],
    columns: columns,
    itemsPerPage: 10,
    expandableContent: fetchUserDetails,
    addNewButtonLabel: "افزودن کاربر جدید",
    emptyStateMessage: "داده‌ای یافت نشد",
    emptyStateDescription: "هیچ داده‌ای برای نمایش وجود ندارد",
    onAddNew: () => alert("add new item"),
    hideSearch: true,
  },
};

export const TableWithModernFilter: Story = {
  render: () => (
    <DataTable
      title="لیست کاربران"
      enableRowSelection={true}
      description="مدیریت و مشاهده کاربران سیستم"
      data={sampleData}
      columns={columns}
      bulkActions={bulkActions}
      onExport={() => {
        /* ... */
      }}
      onAddNew={() => {
        /* ... */
      }}
      addNewButtonLabel="افزودن کاربر"
      // ... other props
    />
  ),
};

export const TableWithOldFilter: Story = {
  render: () => (
    <DataTableAlt
      title="لیست کاربران"
      description="مدیریت و مشاهده کاربران سیستم"
      data={sampleData}
      columns={columns}
      bulkActions={bulkActions}
      onExport={() => {
        /* ... */
      }}
      onAddNew={() => {
        /* ... */
      }}
      addNewButtonLabel="افزودن کاربر"
      // ... other props
    />
  ),
};
