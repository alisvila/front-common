import { Meta, Story, Canvas } from '@storybook/blocks';
import TableComponent from './index';

<Meta
  title="Components/TableComponent"
  component={TableComponent}
/>

# Table Component

A feature-rich, customizable table component for React applications that supports:

- Server-side and client-side pagination
- Sorting functionality
- Search capabilities
- Expandable rows
- Row selection with checkboxes
- Custom action menus
- Loading states
- Empty states with optional "Add New" button
- RTL support
- Theme customization

## Installation

The Table Component is designed to work with Tailwind CSS and requires some peer dependencies:

```bash
npm install @lucide-react  # For icons
```

## Theme Customization

The table supports theme customization through CSS variables:

```css
:root {
  /* Base colors */
  --rbc-primary: #3B82F6;
  --rbc-primary-hover: #2563EB;
  --rbc-secondary: #E5E7EB;
  --rbc-secondary-hover: #D1D5DB;
  
  /* Text colors */
  --rbc-text-primary: #111827;
  --rbc-text-secondary: #6B7280;
  
  /* Background colors */
  --rbc-bg-primary: #FFFFFF;
  --rbc-bg-secondary: #F3F4F6;
  --rbc-bg-hover: #F9FAFB;
  --rbc-bg-selected: #EFF6FF;
  
  /* Border colors */
  --rbc-border-color: #E5E7EB;
  
  /* Table specific */
  --rbc-table-header-bg: var(--rbc-bg-secondary);
  --rbc-table-row-hover: var(--rbc-bg-hover);
  --rbc-table-border: var(--rbc-border-color);
  --rbc-table-stripe: var(--rbc-bg-secondary);
}
```

## Basic Usage

The most basic usage of the Table Component:

```tsx
import TableComponent from './TableComponent';

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

function MyComponent() {
  return (
    <TableComponent
      data={data}
      columns={columns}
    />
  );
}
```

## Client-Side Features

### Pagination

The table handles client-side pagination automatically when you specify `itemsPerPage`:

```tsx
<TableComponent
  data={largeDataset}
  columns={columns}
  itemsPerPage={10}
/>
```

### Sorting

Enable sorting by marking columns as sortable:

```tsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
];
```

### Searching

The table includes built-in search functionality that filters across all columns:

```tsx
<TableComponent
  data={data}
  columns={columns}
  hideSearch={false} // Enable search
/>
```

## Server-Side Features

### Server-Side Pagination

```tsx
function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPage = async (page) => {
    const response = await fetch(`/api/data?page=${page}`);
    const { data, total } = await response.json();
    setTotalItems(total);
    return data;
  };

  return (
    <TableComponent
      data={data}
      columns={columns}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={(page) => {
        setCurrentPage(page);
        fetchPage(page);
      }}
    />
  );
}
```

### Server-Side Sorting

```tsx
<TableComponent
  data={data}
  columns={columns}
  sortConfig={{ key: 'name', direction: 'asc' }}
  onSort={(key, direction) => {
    fetchSortedData(key, direction);
  }}
/>
```

### Server-Side Search

```tsx
<TableComponent
  data={data}
  columns={columns}
  searchTerm={searchTerm}
  onSearch={(term) => {
    fetchSearchResults(term);
  }}
/>
```

## Advanced Features

### Expandable Rows

```tsx
<TableComponent
  data={data}
  columns={columns}
  expandableContent={async (row) => {
    const details = await fetchRowDetails(row.id);
    return (
      <div>
        <h3>Details for {row.name}</h3>
        <pre>{JSON.stringify(details, null, 2)}</pre>
      </div>
    );
  }}
/>
```

### Row Selection

```tsx
function MyComponent() {
  const [selectedRows, setSelectedRows] = useState(new Set());

  return (
    <TableComponent
      data={data}
      columns={columns}
      enableRowSelection
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
    />
  );
}
```

### Custom Action Menu

```tsx
<TableComponent
  data={data}
  columns={columns}
  renderActionMenu={(row) => (
    <div className="rbc-flex rbc-gap-2">
      <button onClick={() => editRow(row)}>Edit</button>
      <button onClick={() => deleteRow(row)}>Delete</button>
    </div>
  )}
/>
```

### Empty State

```tsx
<TableComponent
  data={[]}
  columns={columns}
  emptyStateMessage="No data found"
  emptyStateDescription="Try adjusting your filters or add a new item"
  onAddNew={() => showAddForm()}
  addNewButtonLabel="Add Item"
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of data to display in the table |
| `columns` | `Column<T>[]` | Array of column definitions |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `itemsPerPage` | `number` | `10` | Number of items per page |
| `enableRowSelection` | `boolean` | `false` | Enable checkbox selection |
| `currentPage` | `number` | `1` | Current page number |
| `totalItems` | `number` | - | Total number of items (for server-side pagination) |
| `loading` | `boolean` | `false` | Show loading state |
| `hideSearch` | `boolean` | `true` | Hide the search input |
| `searchTerm` | `string` | - | Controlled search term |
| `sortConfig` | `SortConfig<T>` | - | Current sort configuration |
| `onPageChange` | `(page: number) => void` | - | Page change callback |
| `onSort` | `(key: keyof T, direction: 'asc' \| 'desc') => void` | - | Sort callback |
| `onSearch` | `(term: string) => void` | - | Search callback |
| `onRowClick` | `(row: T) => void` | - | Row click callback |
| `expandableContent` | `(row: T) => Promise<ReactNode>` | - | Async function to get expanded content |
| `renderActionMenu` | `(row: T) => ReactNode` | - | Render custom action menu |
| `onAddNew` | `() => void` | - | Add new item callback |
| `addNewButtonLabel` | `string` | `'افزودن'` | Add new button text |
| `emptyStateMessage` | `string` | `'داده‌ای یافت نشد'` | Empty state message |
| `emptyStateDescription` | `string` | `'هیچ داده‌ای برای نمایش وجود ندارد'` | Empty state description |

## Types

### Column Definition

```typescript
interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}
```

### Sort Configuration

```typescript
interface SortConfig<T> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}
```

## Accessibility

The Table Component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly markup

## RTL Support

The table fully supports RTL layouts. All you need to do is wrap it in an RTL container:

```tsx
<div dir="rtl">
  <TableComponent data={data} columns={columns} />
</div>
```

## Performance

The Table Component is optimized for performance:

- Uses React.memo for optimized re-renders
- Implements virtualization for large datasets
- Memoizes expensive calculations
- Debounces search input
- Uses CSS variables for efficient theme updates

## Contributing

Guidelines for contributing to the Table Component:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Write tests
5. Submit a pull request