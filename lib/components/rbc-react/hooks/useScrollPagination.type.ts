export type UseScrollPaginationProps = {
  allCount: number;
  rowsPerPage: number;
  currentPage: number;
  setPage: (page:number) => void;
  loading: boolean;
  dataLength: number;
  autoRefreshData?: (page?: number) => void;
  autoRefreshDep?: any[];
  autoRefreshMinutes?: number;
}
