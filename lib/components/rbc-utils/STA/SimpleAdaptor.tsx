// types.ts
export interface SortableHeaderItem {
  columnName: string;
  accessor?: string | undefined;
  sortableFieldName?: string;
  id: number;
  component?: (item: any) => JSX.Element;
}

interface WithCount {
  count: number;
  id: number | string;
}

interface MySortableTableProps {
  headers: SortableHeaderItem[];
  data: any;
  DetailComponent?: any;
}

export interface CompleteUrlParams {
  sortList: string[] | undefined,
  page?: number,
  queryParams: any
}

export type DataHookWithId<T> = (
  params: CompleteUrlParams,
  id?: number,
) => BetterSWR<T>;

interface BetterSWR<T>{
  data: ResponseWithPagination<T>,
  isLoading: boolean,
  mutate: () => void;
  isError: boolean;
  error: any;
}

export interface ResponseWithPagination<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

// TableAdapter.tsx
import TableComponent from '@lib/components/rbc-base/DataTable';
import { ConvertHeaders } from './ConvertHeaders';

export function SimpleAdaptor<T extends WithCount>(
  {headers, data, DetailComponent
}: MySortableTableProps) {

  // Convert old headers to new column format
  const columns = ConvertHeaders<T>(headers);
    
  // Create expandable content handler
  const expandableContent = DetailComponent 
    ? (row: T) => Promise.resolve(
        <DetailComponent 
        rowDetail={row} 
        />
      )
    : undefined;

  return (
      <TableComponent<T>
        columns={columns}
        data={data || []}
        expandableContent={expandableContent}
        itemsPerPage={Number(process.env.NEXT_PUBLIC_PAGE_LIMIT ?? 10)}
        emptyStateMessage="داده‌ای یافت نشد"
        emptyStateDescription="هیچ داده‌ای برای نمایش وجود ندارد"
      />
  );
}
