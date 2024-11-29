# React Table Component

This is a feature-rich, customizable table component for React applications. It supports:

- Server-side and client-side pagination, sorting, and search 
- Expandable rows to show additional content
- Optional row selection (checkboxes)
- Custom action menus per row
- Loading states
- Empty states with optional "Add New" button
- Tailwind CSS for styling

## Props

| Prop | Type | Required | Description | 
|------|------|----------|-------------|
| `data` | `T[]` | Yes | The data to display in the table |
| `columns` | `{ key: keyof T; header: string; sortable?: boolean; }[]` | Yes | Define the columns of the table |
| `itemsPerPage` | `number` | No | Number of rows per page (default: 10) |  
| `enableRowSelection` | `boolean` | No | Enable checkbox row selection (default: false) |
| `renderActionMenu` | `(row: T) => React.ReactNode` | No | Render a custom action menu for each row |
| `totalItems` | `number` | No | Total number of items (for server-side pagination) |
| `onPageChange` | `(page: number) => void` | No | Callback when page changes (for server-side pagination) |
| `onSort` | `(key: keyof T, direction: 'asc' | 'desc') => void` | No | Callback when sorting changes (for server-side sorting) | 
| `onSearch` | `(term: string) => void` | No | Callback when search term changes (for server-side search) |
| `currentPage` | `number` | No | Current page number (for controlled pagination state) |
| `searchTerm` | `string` | No | Current search term (for controlled search state) |
| `sortConfig` | `{ key: keyof T | null; direction: 'asc' | 'desc'; }` | No | Current sort config (for controlled sort state) |
| `loading` | `boolean` | No | Show loading spinner overlay (default: false) | 
| `expandableContent` | `(row: T) => Promise<React.ReactNode>` | No | Async function to get content of expanded row |
| `onRowClick` | `(row: T) => void` | No | Callback when a row is clicked |
| `onAddNew` | `() => void` | No | Callback when "Add New" button is clicked |
| `addNewButtonLabel` | `string` | No | Label for "Add New" button in empty state (default: 'افزودن') |
| `hideSearch` | `boolean` | No | Hide the search box (default: false) |
| `emptyStateMessage` | `string` | No | Message to show in empty state (default: 'داده‌ای یافت نشد') |
| `emptyStateDescription` | `string` | No | Description to show in empty state |
  
## Usage Scenarios

### Basic Usage

```jsx
<TableComponent 
  data={products}
  columns={[
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'price', header: 'Price', sortable: true },
  ]}
/>
```

### Client-Side Pagination, Search & Sort

```jsx
<TableComponent
  data={largeDataset} 
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
  ]}
  itemsPerPage={20}
/>
```

The table will handle pagination, search and sorting client-side. Initial sort column and direction can be set with the `sortConfig` prop.

### Server-Side Pagination, Search & Sort

```jsx
function MyComponent() {
  const [pagedData, setPagedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const fetchPageFromServer = async (page) => {
    const res = await fetch(`/api/data?page=${page}&search=${searchTerm}&sortKey=${sortConfig.key}&sortDir=${sortConfig.direction}`);
    const json = await res.json();
    setPagedData(json.data);
    setTotalItems(json.total);
    setCurrentPage(page);
  };

  const searchOnServer = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when search changes
    await fetchPageFromServer(1); // Fetch new data
  };

  const sortOnServer = async (key, direction) => {
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sort changes
    await fetchPageFromServer(1); // Fetch new data
  };

  return (
    <TableComponent
      data={pagedData}
      columns={/* ... */}
      totalItems={totalItems}
      currentPage={currentPage}
      onPageChange={fetchPageFromServer}
      searchTerm={searchTerm}
      onSearch={searchOnServer}
      sortConfig={sortConfig}
      onSort={sortOnServer}
    />
  );
}
```

In this example:
- `fetchPageFromServer` makes an API call to fetch data for a specific page, search term, and sort configuration. It updates the component state with the new data, total item count, and current page.
- `searchOnServer` updates the search term state and fetches the first page of data with the new search applied.
- `sortOnServer` updates the sort configuration state and fetches the first page of data with the new sort applied.

The `TableComponent` is provided with the current state values and these callback functions. It will call these functions when the user interacts with the pagination, search or sort controls, allowing the server to handle these operations.

When the `onPageChange`, `onSearch` and `onSort` props are provided, the table assumes the data is paginated, filtered and sorted server-side. The component will call these callbacks when the relevant events occur.

### Expandable Rows

The table comes with a built-in `ExpandableContent` component that provides a consistent and styled way to display expanded row content.

```jsx
import { ExpandableContent } from './components';

function MyComponent() {
  const expandableContent = async (row) => {
    return (
      <ExpandableContent
        title="User Details"
        sections={[
          { label: "Name", value: row.name },
          { label: "Email", value: row.email },
          { label: "Phone", value: row.phone },
          { label: "Role", value: row.role },
          // Use span: "full" for full-width sections
          { label: "Address", value: row.address, span: "full" },
          { label: "Notes", value: row.notes, span: "full" }
        ]}
        actions={
          <>
            <button className="rbc-px-4 rbc-py-2 rbc-text-gray-600 rbc-bg-gray-100 rbc-rounded-lg hover:rbc-bg-gray-200">
              View Details
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
      data={users}
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Role' },
      ]}
      expandableContent={expandableContent}
    />
  );
}
```

The `ExpandableContent` component accepts the following props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Optional title for the expanded section |
| `sections` | `{ label: string; value: string \| number; span?: 'full' \| 'half'; }[]` | Yes | Array of data sections to display |
| `actions` | `React.ReactNode` | No | Optional actions to display at the bottom |

Each section can be either half-width (default) or full-width by setting the `span` property to `"full"`. This allows you to organize your data effectively, with shorter fields like name and email taking up half the width, while longer fields like addresses or descriptions spanning the full width.

### Row Selection & Actions

```jsx
<TableComponent
  data={users}
  columns={/* ... */}
  enableRowSelection
  renderActionMenu={(row) => (
    <div>
      <button onClick={() => editUser(row)}>Edit</button>
      <button onClick={() => deleteUser(row)}>Delete</button>
    </div>
  )}
/>
```

With `enableRowSelection`, checkboxes will appear for each row. The `renderActionMenu` prop allows rendering custom action controls for each row.

### Empty State

```jsx
<TableComponent
  data={[]}
  columns={/* ... */}
  emptyStateMessage="No products found"  
  emptyStateDescription="Try adjusting your filters or add a new product."
  onAddNew={navigateToCreateProduct}
/>
```

When the `data` prop is an empty array, a customizable empty state will be shown. An optional "Add New" button can be displayed with custom text.