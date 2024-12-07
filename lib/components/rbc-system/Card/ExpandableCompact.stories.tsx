import type { Meta, StoryObj } from '@storybook/react';
import {TableComponent} from "../Table"
import {ExpandableContent} from './'

const meta: Meta<typeof ExpandableContent> = {
  title: 'Components/RBC-System/Card',
  component: ExpandableContent,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableContent>;


export const DefaultRTL: Story = {
  args: {
    title: 'اطلاعات کاربر',
    sections: [
      { label: 'نام', value: 'علی محمدی' },
      { label: 'ایمیل', value: 'ali@example.com' },
      { label: 'تلفن', value: '۰۹۱۲۳۴۵۶۷۸۹' },
      { label: 'نقش', value: 'مدیر' },
    ],
    compact: true
  },
};

export const extendedView: Story = {
  args: {
    title: 'اطلاعات کاربر',
    sections: [
      { label: 'نام', value: 'علی محمدی' },
      { label: 'ایمیل', value: 'ali@example.com' },
      { label: 'تلفن', value: '۰۹۱۲۳۴۵۶۷۸۹' },
      { label: 'نقش', value: 'مدیر' },
    ],
    compact: false
  },
};

export const WithBoldHeader: Story = {
  args: {
    title: 'اطلاعات سفارش',
    headerStyle: 'bold',
    sections: [
      { label: 'شماره سفارش', value: '۱۲۳۴۵' },
      { label: 'وضعیت', value: 'در حال پردازش' },
      { label: 'آدرس', value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳', span: 'full' },
      { label: 'توضیحات', value: 'لطفا در ساعات اداری تحویل داده شود', span: 'full' },
    ],
    compact: true
  },
};

export const WithActionsRTL: Story = {
  args: {
    title: 'جزئیات محصول',
    headerStyle: 'bold',
    sections: [
      { label: 'نام محصول', value: 'محصول ویژه' },
      { label: 'کد', value: 'WID-123' },
      { label: 'دسته‌بندی', value: 'الکترونیک' },
      { label: 'موجودی', value: '۱۵۰ عدد' },
      { label: 'توضیحات', value: 'محصول با کیفیت برای مصارف حرفه‌ای', span: 'full' },
    ],
    actions: (
      <>
        <button className="rbc-px-3 rbc-py-1.5 rbc-text-gray-600 rbc-bg-gray-100 rbc-rounded hover:rbc-bg-gray-200">
          انصراف
        </button>
        <button className="rbc-px-3 rbc-py-1.5 rbc-text-white rbc-bg-blue-600 rbc-rounded hover:rbc-bg-blue-700">
          ویرایش
        </button>
      </>
    ),
    compact: true
  },
};


// Example of using it with the TableComponent
const TableUsageExample = () => {
  const mockData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      phone: '+1 234 567 890',
      address: '123 Main St, City, Country',
      joinDate: '2023-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      phone: '+1 234 567 891',
      address: '456 Oak St, Town, Country',
      joinDate: '2023-02-20',
    },
  ];

  const expandableContent = async (row: any) => {
    return (
      <ExpandableContent
        title="User Details"
        sections={[
          { label: 'Full Name', value: row.name },
          { label: 'Email', value: row.email },
          { label: 'Phone', value: row.phone },
          { label: 'Role', value: row.role },
          { label: 'Address', value: row.address, span: 'full' },
          { label: 'Join Date', value: row.joinDate },
        ]}
        actions={
          <>
            <button className="rbc-px-4 rbc-py-2 rbc-text-gray-600 rbc-bg-gray-100 rbc-rounded-lg hover:rbc-bg-gray-200">
              View Profile
            </button>
            <button className="rbc-px-4 rbc-py-2 rbc-text-white rbc-bg-blue-600 rbc-rounded-lg hover:rbc-bg-blue-700">
              Edit User
            </button>
          </>
        }
      />
    );
  };

  return (
    <TableComponent
      data={mockData}
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Role' },
      ]}
      expandableContent={expandableContent}
    />
  );
};

export const TableExample: Story = {
  render: () => <TableUsageExample />
};