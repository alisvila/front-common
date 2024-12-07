import type { Meta, StoryObj } from '@storybook/react';
import { TableWithAdvanceSearch } from './TableWithAdvanceSearch';

// Mock interfaces
interface NahadMali {
  id: number;
  full_name: string;
  created: string;
  flow_step_name: string;
  process: {
    nahadmaliapprovalprocess: {
      pre_request: {
        nahad_mali: {
          name: string;
          shenase_melli: string;
        };
        trace_code: string;
      };
    };
  };
  semat: 'MODIR_AMEL' | 'OZV_GHEYRE_MOVAZAF_HEYAT_MODIREH' | 'OZV_MOVAZAF_HEYAT_MODIREH';
}

// Mock filter options based on the provided Swagger/OpenAPI spec
const filterOptions = [
  {
    name: "created__gte",
    type: "date",
    label: "تاریخ ایجاد از"
  },
  {
    name: "created__lte",
    type: "date",
    label: "تاریخ ایجاد تا"
  },
  {
    name: "flow_step_name",
    type: "select",
    label: "مرحله",
    options: [
      { label: "تکمیل اطلاعات", value: "complete_info" },
      { label: "ثبت مستندات سهامداری", value: "upload_docs_legal_person" },
      { label: "بررسی کامل بودن مدارک توسط کارشناس", value: "approve_karshenas" }
      // Add more options as needed
    ],
    multiple: true
  },
  {
    name: "full_name__icontains",
    type: "text",
    label: "جستجو در نام"
  },
  {
    name: "responsible",
    type: "select",
    label: "مسئول",
    options: [
      { label: "کارهای من", value: "MY_TASKS" },
      { label: "کارهای سایر اشخاص", value: "OTHERS_TASKS" },
      { label: "همه کارها", value: "ALL_TASKS" }
    ]
  },
  {
    name: "semat",
    type: "select",
    label: "سمت",
    options: [
      { label: "عضو موظف هیئت‌مدیره", value: "OZV_MOVAZAF_HEYAT_MODIREH" },
      { label: "عضو غیرموظف هیئت‌مدیره", value: "OZV_GHEYRE_MOVAZAF_HEYAT_MODIREH" },
      { label: "مدیرعامل", value: "MODIR_AMEL" }
    ],
    multiple: true
  }
];

// Mock data
const mockData: NahadMali[] = [
  {
    id: 1,
    full_name: "علی محمدی",
    created: "2024-01-01",
    flow_step_name: "complete_info",
    process: {
      nahadmaliapprovalprocess: {
        pre_request: {
          nahad_mali: {
            name: "شرکت سرمایه‌گذاری الف",
            shenase_melli: "10101234567"
          },
          trace_code: "TR-001"
        }
      }
    },
    semat: "MODIR_AMEL"
  },
  {
    id: 2,
    full_name: "علی محمدی",
    created: "2024-01-01",
    flow_step_name: "complete_info",
    process: {
      nahadmaliapprovalprocess: {
        pre_request: {
          nahad_mali: {
            name: "شرکت سرمایه‌گذاری الف",
            shenase_melli: "10101234567"
          },
          trace_code: "TR-001"
        }
      }
    },
    semat: "MODIR_AMEL"
  },
  {
    id: 3,
    full_name: "علی محمدی",
    created: "2024-01-01",
    flow_step_name: "complete_info",
    process: {
      nahadmaliapprovalprocess: {
        pre_request: {
          nahad_mali: {
            name: "شرکت سرمایه‌گذاری الف",
            shenase_melli: "10101234567"
          },
          trace_code: "TR-001"
        }
      }
    },
    semat: "MODIR_AMEL"
  },
  // Add more mock data as needed
];

// Mock headers
const headers = [
  {
    columnName: "نام و نام خانوادگی",
    accessor: "full_name",
    sortableFieldName: "full_name",
    id: 1
  },
  {
    columnName: "کد رهگیری",
    accessor: "process.nahadmaliapprovalprocess.pre_request.trace_code",
    sortableFieldName: "process__nahadmaliapprovalprocess__pre_request__trace_code",
    id: 2
  },
  {
    columnName: "نام شرکت",
    accessor: "process.nahadmaliapprovalprocess.pre_request.nahad_mali.name",
    sortableFieldName: "process__nahadmaliapprovalprocess__pre_request__nahad_mali__name",
    id: 3
  },
  {
    columnName: "مرحله",
    accessor: "flow_step_name",
    id: 4,
    component: (item: NahadMali) => {
      const stepLabels = {
        complete_info: "تکمیل اطلاعات",
        upload_docs_legal_person: "ثبت مستندات سهامداری",
        approve_karshenas: "بررسی کامل بودن مدارک"
      };
      return <span>{stepLabels[item.flow_step_name] || item.flow_step_name}</span>;
    }
  }
];

// Mock data hook
const mockDataHook = ({ page, sortList, queryParams }) => {
  return {
    data: {
      count: mockData.length,
      next: null,
      previous: null,
      results: mockData
    },
    isLoading: false,
    mutate: () => {},
    isError: false,
    error: null
  };
};

// Mock detail component
const DetailComponent = ({ data }: { data: NahadMali }) => {
  if (!data) return null;
  
  return (
    <div className="rbc-p-4 rbc-space-y-2">
      <h3 className="rbc-text-lg rbc-font-medium">جزئیات درخواست</h3>
      <div className="rbc-grid rbc-grid-cols-2 rbc-gap-4">
        <div>
          <p className="rbc-text-sm rbc-text-gray-500">شناسه ملی</p>
          <p className="rbc-text-sm">
            {data.process.nahadmaliapprovalprocess.pre_request.nahad_mali.shenase_melli}
          </p>
        </div>
        <div>
          <p className="rbc-text-sm rbc-text-gray-500">تاریخ ایجاد</p>
          <p className="rbc-text-sm">{data.created}</p>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof TableWithAdvanceSearch> = {
  title: 'Components/RBC-Utils/TableWithAdvanceSearch',
  component: TableWithAdvanceSearch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A table component with advanced filtering capabilities for financial institution data.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    filterOptions: { control: 'object' },
    headers: { control: 'object' },
    dataHook: { control: 'function' },
    DetailComponent: { control: 'function' },
    onAddNew: { action: 'onAddNew' },
    addNewButtonLabel: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof TableWithAdvanceSearch>;

// Basic example
export const Default: Story = {
  args: {
    title: "لیست درخواست‌ها",
    description: "مدیریت درخواست‌های نهاد مالی",
    filterOptions,
    headers,
    dataHook: mockDataHook,
    DetailComponent,
    addNewButtonLabel: "افزودن درخواست",
    onAddNew: () => console.log("Add new clicked")
  }
};

// Loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    dataHook: () => ({
      data: { count: 0, next: null, previous: null, results: [] },
      isLoading: true,
      mutate: () => {},
      isError: false,
      error: null
    })
  }
};

// Empty state
export const Empty: Story = {
  args: {
    ...Default.args,
    dataHook: () => ({
      data: { count: 0, next: null, previous: null, results: [] },
      isLoading: false,
      mutate: () => {},
      isError: false,
      error: null
    })
  }
};

// With filters applied
export const WithFiltersApplied: Story = {
  args: {
    ...Default.args,
    dataHook: ({ queryParams }) => ({
      data: {
        count: mockData.length,
        next: null,
        previous: null,
        results: mockData.filter(item => {
          if (queryParams.semat && !queryParams.semat.includes(item.semat)) {
            return false;
          }
          if (queryParams.flow_step_name && !queryParams.flow_step_name.includes(item.flow_step_name)) {
            return false;
          }
          return true;
        })
      },
      isLoading: false,
      mutate: () => {},
      isError: false,
      error: null
    })
  }
};