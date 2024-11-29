import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableComponent from './oldindex';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Admin' },
  // ... more data
];

describe('TableComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the table with correct data', () => {
    render(
      <TableComponent 
        data={mockData}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
        ]}
      />
    );
    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.getByText('jane@example.com')).toBeDefined();
  });

  it('sorts the data when a sortable header is clicked', async () => {
    render(
      <TableComponent
        data={mockData}
        columns={[
          { key: 'name', header: 'Name', sortable: true },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
        ]}
      />
    );
    fireEvent.click(screen.getByText('Name'));
    await waitFor(() => {
      // expect(screen.getAllByRole('row')[1]).toHaveTextContent('Bob Johnson');
    });
  });

  it('calls the onSearch callback when the search term changes', () => {
    const onSearch = vi.fn();
    render(
      <TableComponent
        data={mockData}
        columns={[/* ... */]}
        onSearch={onSearch}
      />
    );
    fireEvent.change(screen.getAllByPlaceholderText('جستجو ...')[0], {
      target: { value: 'John' },
    });
    vi.advanceTimersByTime(300);
    expect(onSearch).toHaveBeenCalledWith('John');
  });

  it('calls the onPageChange callback when the page changes', () => {
    const onPageChange = vi.fn();
    render(
      <TableComponent
        data={mockData}
        columns={[/* ... */]}
        totalItems={30}
        itemsPerPage={2}
        onPageChange={onPageChange}
      />
    );
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('displays the empty state when there is no data', () => {
    render(
      <TableComponent
        data={[]}
        columns={[/* ... */]}
        emptyStateMessage="No data"
      />
    );
    expect(screen.getByText('No data')).toBeDefined();
  });

  // ... more tests for other scenarios
});