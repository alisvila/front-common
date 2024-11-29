// TableComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import TableComponent from ".";
import DataTable from "./TableWrapperComponent";
import DataTableAlt from "./TableWrapperAlt";

const meta: Meta<typeof TableComponent> = {
  title: "Components/TableComponent",
  component: TableComponent,
  parameters: {
    layout: "padded",
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
