import Button from "@lib/components/rbc-base/Button";
import { FileX } from "lucide-react";

interface EmptyStateProps {
  message: string;
  description: string;
  onAddNew: () => void;
  addNewButtonLabel: string;
}

export default function EmptyState({
  message,
  description,
  onAddNew,
  addNewButtonLabel,
}: EmptyStateProps) {
  
  return (
    <div className="rbc-flex rbc-flex-col rbc-items-center rbc-justify-center rbc-py-12 rbc-px-4">
      <div className="rbc-bg-gray-50 rbc-rounded-full rbc-p-4 rbc-mb-4">
        <FileX className="rbc-w-12 rbc-h-12 rbc-text-gray-400" />
      </div>
      <h3 className="rbc-text-lg rbc-font-medium rbc-text-gray-900 rbc-mb-1">
        {message}
      </h3>
      <p className="rbc-text-sm rbc-text-gray-500 rbc-text-center rbc-max-w-sm">
        {description}
      </p>
      {onAddNew && (
        <Button variant="primary" onClick={onAddNew}>
          {addNewButtonLabel}
        </Button>
      )}
    </div>
  );
}
