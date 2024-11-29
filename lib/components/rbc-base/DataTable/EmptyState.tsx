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
        <button
          onClick={onAddNew}
          className="rbc-mt-4 rbc-px-4 rbc-py-2 rbc-bg-blue-600 rbc-text-white rbc-rounded-lg hover:rbc-bg-blue-700 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-ring-offset-2 rbc-transition-all rbc-duration-200"
        >
          {addNewButtonLabel}
        </button>
      )}
    </div>
  );
}
