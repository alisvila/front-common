import React from "react";

interface PaginationNumbersProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function PaginationNumbers({totalPages, currentPage, onPageChange}: PaginationNumbersProps) {
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
            <button
              onClick={() => onPageChange(page)}
              className={`rbc-w-8 rbc-h-8 rbc-rounded-lg rbc-text-sm rbc-font-medium ${
                currentPage === page
                  ? "rbc-bg-blue-600 rbc-text-white"
                  : "rbc-text-gray-700 hover:rbc-bg-gray-50"
              }`}
            >
              {page}
            </button>
          </React.Fragment>
        ))}
    </div>
  );
}
