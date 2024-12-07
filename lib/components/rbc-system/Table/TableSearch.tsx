import { Search } from 'lucide-react';

interface TableSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export function TableSearch({ searchTerm, onSearch }: TableSearchProps) {
  return (
    <div className="rbc-relative rbc-flex-1">
      <Search className="rbc-absolute rbc-right-4 rbc-top-3.5 rbc-text-gray-400" size={20} />
      <input
        type="text"
        placeholder="جستجو ..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="rbc-w-full rbc-p-3 rbc-pr-12 rbc-bg-gray-50 rbc-border rbc-border-gray-200 rbc-rounded-lg focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-border-transparent rbc-transition-all rbc-duration-200"
      />
    </div>
  );
}
