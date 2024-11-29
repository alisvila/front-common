

type Props = {
  text?: string
}

function SelectEmptyState({text}: Props) {
  return (
    <div className="rbc-relative rbc-cursor-default rbc-select-none rbc-py-2 rbc-px-4 rbc-text-gray-700">
      {text || 'موردی یافت نشد'}
    </div>
  );
}

export default SelectEmptyState