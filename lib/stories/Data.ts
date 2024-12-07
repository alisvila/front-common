export const sampleData = [
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

  export const columns = [
    { key: "id", header: "ردیف", sortable: true },
    { key: "name", header: "نام", sortable: true },
    { key: "email", header: "ایمیل", sortable: true },
    { key: "role", header: "نفش", sortable: true },
    { key: "status", header: "وضعیت", sortable: true },
  ];
  
  export const bulkActions: any = [
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