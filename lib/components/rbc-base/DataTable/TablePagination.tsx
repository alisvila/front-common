import PaginationButton from './PaginationButton';
import PaginationNumbers from './PaginationNumbers';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="rbc-flex rbc-justify-between rbc-items-center rbc-mt-4">
      <div className="rbc-flex rbc-items-center rbc-gap-2">
        <PaginationButton
          direction="prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <PaginationNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <PaginationButton
          direction="next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
      <div>
        صفحه {currentPage} از {totalPages}
      </div>
    </div>
  );
}