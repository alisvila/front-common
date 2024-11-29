import React, { useState } from 'react';
import { X, Plus, Filter } from 'lucide-react';

interface FilterRule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface FilterPanelProps<T> {
  columns: {
    key: keyof T | string;
    header: string;
    type?: 'text' | 'number' | 'select' | 'date';
    options?: { label: string; value: string | number }[];
  }[];
  onApplyFilters: (filters: FilterRule[]) => void;
}

const operatorOptions = {
  text: [
    { label: 'شامل', value: 'contains' },
    { label: 'برابر با', value: 'equals' },
    { label: 'شروع با', value: 'startsWith' },
    { label: 'پایان با', value: 'endsWith' },
  ],
  number: [
    { label: 'برابر با', value: 'equals' },
    { label: 'بزرگتر از', value: 'greaterThan' },
    { label: 'کوچکتر از', value: 'lessThan' },
    { label: 'بین', value: 'between' },
  ],
  date: [
    { label: 'برابر با', value: 'equals' },
    { label: 'قبل از', value: 'before' },
    { label: 'بعد از', value: 'after' },
    { label: 'بین', value: 'between' },
  ],
  select: [
    { label: 'برابر با', value: 'equals' },
    { label: 'نیست', value: 'notEquals' },
  ],
};

export default function FilterPanel<T>({ columns, onApplyFilters }: FilterPanelProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [rules, setRules] = useState<FilterRule[]>([
    { id: '1', field: '', operator: '', value: '' },
  ]);

  const handleAddRule = () => {
    setRules([...rules, { id: Math.random().toString(), field: '', operator: '', value: '' }]);
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleRuleChange = (id: string, field: keyof FilterRule, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const handleApply = () => {
    const validRules = rules.filter(rule => rule.field && rule.operator && rule.value);
    onApplyFilters(validRules);
    setIsOpen(false);
  };

  const handleClear = () => {
    setRules([{ id: '1', field: '', operator: '', value: '' }]);
    onApplyFilters([]);
  };

  return (
    <div className="rbc-relative" dir='rtl'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rbc-inline-flex rbc-items-center rbc-gap-2 rbc-px-4 rbc-py-2 rbc-bg-white rbc-text-gray-700 rbc-border rbc-border-gray-300 rbc-rounded-lg hover:rbc-bg-gray-50 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500"
      >
        <Filter size={18} />
        <span>فیلتر پیشرفته</span>
      </button>

      {isOpen && (
        <div className="rbc-absolute rbc-right-0 rbc-mt-2 rbc-w-[600px] rbc-bg-white rbc-rounded-lg rbc-shadow-xl rbc-border rbc-border-gray-200 rbc-z-50">
          <div className="rbc-p-4">
            <div className="rbc-space-y-4">
              {rules.map((rule, index) => (
                <div key={rule.id} className="rbc-flex rbc-items-center rbc-gap-3">
                  <select
                    value={rule.field}
                    onChange={(e) => handleRuleChange(rule.id, 'field', e.target.value)}
                    className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                  >
                    <option value="">انتخاب فیلد</option>
                    {columns.map(column => (
                      <option key={column.key.toString()} value={column.key.toString()}>
                        {column.header}
                      </option>
                    ))}
                  </select>

                  <select
                    value={rule.operator}
                    onChange={(e) => handleRuleChange(rule.id, 'operator', e.target.value)}
                    className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                  >
                    <option value="">انتخاب عملگر</option>
                    {rule.field && columns.find(col => col.key.toString() === rule.field)?.type &&
                      operatorOptions[columns.find(col => col.key.toString() === rule.field)?.type || 'text']
                        .map(op => (
                          <option key={op.value} value={op.value}>
                            {op.label}
                          </option>
                        ))
                    }
                  </select>

                  {rule.field && columns.find(col => col.key.toString() === rule.field)?.type === 'select' ? (
                    <select
                      value={rule.value}
                      onChange={(e) => handleRuleChange(rule.id, 'value', e.target.value)}
                      className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                    >
                      <option value="">انتخاب مقدار</option>
                      {columns.find(col => col.key.toString() === rule.field)?.options?.map(option => (
                        <option key={option.value} value={option.value.toString()}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={columns.find(col => col.key.toString() === rule.field)?.type || 'text'}
                      value={rule.value}
                      onChange={(e) => handleRuleChange(rule.id, 'value', e.target.value)}
                      placeholder="مقدار"
                      className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                    />
                  )}

                  {rules.length > 1 && (
                    <button
                      onClick={() => handleRemoveRule(rule.id)}
                      className="rbc-p-2 rbc-text-gray-400 hover:rbc-text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="rbc-flex rbc-items-center rbc-gap-2 rbc-mt-4">
              <button
                onClick={handleAddRule}
                className="rbc-inline-flex rbc-items-center rbc-gap-1 rbc-text-sm rbc-text-gray-600 hover:rbc-text-gray-800"
              >
                <Plus size={16} />
                <span>افزودن شرط</span>
              </button>
            </div>

            <div className="rbc-flex rbc-justify-end rbc-gap-3 rbc-mt-6 rbc-pt-4 rbc-border-t rbc-border-gray-200">
              <button
                onClick={handleClear}
                className="rbc-px-4 rbc-py-2 rbc-text-gray-700 rbc-bg-gray-100 rbc-rounded-lg hover:rbc-bg-gray-200"
              >
                پاک کردن
              </button>
              <button
                onClick={handleApply}
                className="rbc-px-4 rbc-py-2 rbc-text-white rbc-bg-blue-600 rbc-rounded-lg hover:rbc-bg-blue-700"
              >
                اعمال فیلتر
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}