import { useState } from "react";
import { X, Plus, Filter } from "lucide-react";
import Button from "@lib/components/rbc-base/Button";
import { useTableState } from './TableStateManager';

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
    type?: "text" | "number" | "select" | "date";
    options?: { label: string; value: string | number }[];
  }[];
}

const operatorOptions = {
  text: [
    { label: "شامل", value: "contains" },
    { label: "برابر با", value: "equals" },
    { label: "شروع با", value: "startsWith" },
    { label: "پایان با", value: "endsWith" },
  ],
  number: [
    { label: "برابر با", value: "equals" },
    { label: "بزرگتر از", value: "greaterThan" },
    { label: "کوچکتر از", value: "lessThan" },
    { label: "بین", value: "between" },
  ],
  date: [
    { label: "برابر با", value: "equals" },
    { label: "قبل از", value: "before" },
    { label: "بعد از", value: "after" },
    { label: "بین", value: "between" },
  ],
  select: [
    { label: "برابر با", value: "equals" },
    { label: "نیست", value: "notEquals" },
  ],
};

export default function FilterPanel<T>({
  columns,
}: FilterPanelProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const { filters, dispatch } = useTableState<T>();
  
  const [localRules, setLocalRules] = useState<FilterRule[]>(
    filters.length > 0 ? filters : [{ id: "1", field: "", operator: "", value: "" }]
  );

  const handleAddRule = () => {
    setLocalRules([
      ...localRules,
      { id: Math.random().toString(), field: "", operator: "", value: "" },
    ]);
  };

  const handleRemoveRule = (id: string) => {
    setLocalRules(localRules.filter((rule) => rule.id !== id));
  };

  const handleRuleChange = (
    id: string,
    field: keyof FilterRule,
    value: string
  ) => {
    setLocalRules(
      localRules.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule))
    );
  };

  const handleApply = () => {
    const validRules = localRules.filter(
      (rule) => rule.field && rule.operator && rule.value
    );
    
    dispatch({
      type: 'SET_FILTERS',
      payload: validRules
    });
    
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalRules([{ id: "1", field: "", operator: "", value: "" }]);
    dispatch({
      type: 'SET_FILTERS',
      payload: []
    });
  };

  return (
    <div className="rbc-relative" dir="rtl">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        icon={<Filter size={18} />}
        iconPosition="left"
      >
        فیلتر پیشرفته
        {filters.length > 0 && (
          <span className="rbc-ml-2 rbc-px-2 rbc-py-1 rbc-bg-blue-100 rbc-text-blue-600 rbc-rounded-full rbc-text-xs">
            {filters.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="rbc-absolute rbc-right-0 rbc-mt-2 rbc-w-[600px] rbc-bg-white rbc-rounded-lg rbc-shadow-xl rbc-border rbc-border-gray-200 rbc-z-50">
          <div className="rbc-p-4">
            <div className="rbc-space-y-4">
              {localRules.map((rule) => (
                <div
                  key={rule.id}
                  className="rbc-flex rbc-items-center rbc-gap-3"
                >
                  <select
                    value={rule.field}
                    onChange={(e) =>
                      handleRuleChange(rule.id, "field", e.target.value)
                    }
                    className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                  >
                    <option value="">انتخاب فیلد</option>
                    {columns.map((column) => (
                      <option
                        key={column.key.toString()}
                        value={column.key.toString()}
                      >
                        {column.header}
                      </option>
                    ))}
                  </select>

                  <select
                    value={rule.operator}
                    onChange={(e) =>
                      handleRuleChange(rule.id, "operator", e.target.value)
                    }
                    className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                  >
                    <option value="">انتخاب عملگر</option>
                    {rule.field &&
                      columns.find((col) => col.key.toString() === rule.field)
                        ?.type &&
                      operatorOptions[
                        columns.find((col) => col.key.toString() === rule.field)
                          ?.type || "text"
                      ].map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.label}
                        </option>
                      ))}
                  </select>

                  {rule.field &&
                  columns.find((col) => col.key.toString() === rule.field)
                    ?.type === "select" ? (
                    <select
                      value={rule.value}
                      onChange={(e) =>
                        handleRuleChange(rule.id, "value", e.target.value)
                      }
                      className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                    >
                      <option value="">انتخاب مقدار</option>
                      {columns
                        .find((col) => col.key.toString() === rule.field)
                        ?.options?.map((option) => (
                          <option
                            key={option.value}
                            value={option.value.toString()}
                          >
                            {option.label}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <input
                      type={
                        columns.find((col) => col.key.toString() === rule.field)
                          ?.type || "text"
                      }
                      value={rule.value}
                      onChange={(e) =>
                        handleRuleChange(rule.id, "value", e.target.value)
                      }
                      placeholder="مقدار"
                      className="rbc-flex-1 rbc-rounded-lg rbc-border rbc-border-gray-300 rbc-p-2 focus:rbc-ring-2 focus:rbc-ring-blue-500"
                    />
                  )}

                  {localRules.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRule(rule.id)}
                      icon={<X size={18} />}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="rbc-flex rbc-items-center rbc-gap-2 rbc-mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddRule}
                icon={<Plus size={16} />}
                iconPosition="left"
              >
                افزودن شرط
              </Button>
            </div>

            <div className="rbc-flex rbc-justify-end rbc-gap-3 rbc-mt-6 rbc-pt-4 rbc-border-t rbc-border-gray-200">
              <Button variant="secondary" onClick={handleClear}>
                پاک کردن
              </Button>
              <Button variant="primary" onClick={handleApply}>
                اعمال فیلتر
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}