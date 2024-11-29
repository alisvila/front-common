// types.ts
interface DetailComponentProps<T> {
  id?: number | string;
  data?: T;
}

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

interface MySortableTableProps<T> {
  headers: SortableHeaderItem[];
  dataHook: any;
  objectID?: string | number;
  dataHookProps?: Partial<DataHookQueryParams>;
  DetailComponent?: React.ComponentType<DetailComponentProps<T>>;
  canDisableColumns?: boolean;
}

export interface CompleteUrlParams {
  sortList: string[] | undefined;
  page?: number;
  queryParams: any;
}

interface DataHookQueryParams {
  expand: string;
  fields: string;
  ordering: string;
  page: string;
  [k: string]: string;
}

export type DataHookWithId<T> = (
  params: CompleteUrlParams,
  id?: number
) => BetterSWR<T>;

interface BetterSWR<T> {
  data: ResponseWithPagination<T>;
  isLoading: boolean;
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
import React, { useState, useMemo, useEffect } from "react";
import { ConvertHeaders } from "./ConvertHeaders";
import useSearchParamsWrapper from "@lib/components/rbc-react/hooks/useSearchParamsWrapper";
import TableComponent from "@lib/components/rbc-base/DataTable";

export function TableAdapter<T extends WithCount>({
  headers,
  dataHook,
  objectID,
  dataHookProps,
  DetailComponent,
}: MySortableTableProps<T>) {
  const { setObject, getAll } = useSearchParamsWrapper();
  const [pageIndex, setPageIndex] = useState(1);
  const [sortList, setSortList] = useState<string[]>([]);
  const queryParams = getAll();

  // we had two different table type sortable and simple
  const tableType = headers.find((h) => "sortableFieldName" in h);

  let result;
  if (!tableType) {
    result =
      objectID != null
        ? dataHook(pageIndex, objectID, { ...dataHookProps })
        : dataHook(pageIndex, { ...dataHookProps });
  } else {
    result =
      objectID != null
        ? dataHook(
            { page: pageIndex, sortList, queryParams: dataHookProps },
            Number(objectID)
          )
        : dataHook({ page: pageIndex, sortList, queryParams: dataHookProps });
  }

  const { data, isLoading, mutate } = result;

  // Calculate total pages
  // const totalPages = useMemo(() => {
  //   if (!data?.count) return 1;
  //   return Math.ceil(data.count / Number(process.env.NEXT_PUBLIC_PAGE_LIMIT ?? 10));
  // }, [data?.count]);

  // Effect for URL page param sync
  useEffect(() => {
    if (queryParams.page) {
      setPageIndex(Number(queryParams.page));
    } else {
      setPageIndex(1);
    }
  }, [queryParams]);

  // Convert old headers to new column format
  const columns = ConvertHeaders<T>(headers);

  // Handle sort changes
  const handleSort = (key: keyof T, direction: "asc" | "desc") => {
    const header = headers.find((h) => h.accessor === key);
    if (!header?.sortableFieldName) return;

    const field = header.sortableFieldName;
    const sortDown = "-" + field;
    const sortUp = field;

    let newSortList: string[];
    if (direction === "asc") {
      newSortList = sortList.filter((item) => item !== sortDown);
      if (!sortList.includes(sortUp)) {
        newSortList.push(sortUp);
      }
    } else {
      newSortList = sortList.filter((item) => item !== sortUp);
      if (!sortList.includes(sortDown)) {
        newSortList.push(sortDown);
      }
    }

    setSortList(newSortList);
    mutate();
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setPageIndex(page);
    setObject({ page: String(page) }, true);
  };

  // Create expandable content handler
  const expandableContent = DetailComponent
    ? (row: T) => Promise.resolve(<DetailComponent id={row.id} data={row} />)
    : undefined;

  // Calculate current sort configuration for new table
  const sortConfig = useMemo(() => {
    const lastSort = sortList[sortList.length - 1];
    if (!lastSort) {
      return { key: null, direction: "asc" as const };
    }

    const direction = lastSort.startsWith("-")
      ? ("desc" as const)
      : ("asc" as const);
    const key = lastSort.replace(/^-/, "");
    const header = headers.find((h) => h.sortableFieldName === key);

    return {
      key: (header?.accessor as keyof T) || null,
      direction,
    };
  }, [sortList, headers]);

  return (
    <TableComponent<T>
      columns={columns}
      data={data?.results || []}
      loading={isLoading}
      totalItems={data?.count}
      currentPage={pageIndex}
      onPageChange={handlePageChange}
      onSort={handleSort}
      sortConfig={sortConfig}
      expandableContent={expandableContent}
      itemsPerPage={Number(process.env.NEXT_PUBLIC_PAGE_LIMIT ?? 10)}
      emptyStateMessage="داده‌ای یافت نشد"
      emptyStateDescription="هیچ داده‌ای برای نمایش وجود ندارد"
    />
  );
}
