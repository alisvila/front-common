import MultiSelectWithInfiniteScroll from "@lib/components/rbc-base/Select";
import { Field } from "./Field";
import { BaseFieldProps } from "./types";

export interface SelectProps extends BaseFieldProps {
  options: Array<{ value: any; label: string }>;
  loadOptions?: (search: string) => Promise<Array<{ value: any; label: string }>>;
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
}

export const Select = ({ loadOptions, ...props }: SelectProps) => {
  return (
    <Field {...props}>
      {({ field, meta, error }) => (
        <MultiSelectWithInfiniteScroll
          {...field}
          loadOptions={loadOptions}
          multiple={props.multiple}
          searchable={props.searchable}
          placeholder={props.placeholder}
          className={`form-select ${error ? 'is-invalid' : ''} ${props.className || ''}`}
          value={field.value}
          onChange={(value) => {
            field.onChange({
              target: { name: field.name, value }
            });
          }}
        />
      )}
    </Field>
  );
};