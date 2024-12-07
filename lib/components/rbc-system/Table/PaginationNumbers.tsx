import Button from "@lib/components/rbc-base/Button";
import React from "react";

interface PaginationNumbersProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationNumbers({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationNumbersProps) {
  return (
    <div className="rbc-flex rbc-items-center rbc-gap-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (page) =>
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
        )
        .map((page, index, array) => (
          <React.Fragment key={page}>
            {index > 0 && array[index - 1] !== page - 1 && (
              <span className="rbc-px-2">...</span>
            )}
            <Button
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? "primary" : "ghost"}
              size="sm"
              className="rbc-w-8 rbc-h-8 !rbc-p-0"
            >
              {page}
            </Button>
          </React.Fragment>
        ))}
    </div>
  );
}
