import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationButtonProps {
  disabled: boolean;
  onClick: () => void;
  direction: "prev" | "next";
}

export default function PaginationButton({
  disabled,
  onClick,
  direction,
}: PaginationButtonProps) {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className="rbc-p-2 rbc-border rbc-border-gray-300 rbc-rounded rbc-bg-white hover:rbc-bg-gray-50 disabled:rbc-opacity-50"
      >
        {direction === "prev" ? (
          <ChevronLeft size={20} />
        ) : (
          <ChevronRight size={20} />
        )}
      </button>
    </>
  );
}
