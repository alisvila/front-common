import Button from "@lib/components/rbc-base/Button";
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
  const icon =
    direction === "prev" ? (
      <ChevronLeft size={20} />
    ) : (
      <ChevronRight size={20} />
    );

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={disabled}
      onClick={onClick}
      icon={icon}
    />
  );
}
