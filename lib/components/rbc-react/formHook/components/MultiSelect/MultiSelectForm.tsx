import {useController, useFormContext} from "react-hook-form";
import MultiSelect, {MultiSelectProps} from "./MultiSelect";
import useGetSelectOptions from "../../../../rbc-system/Select/hooks/useGetSelectOptions";


type Props = {
  options?: MultiSelectProps["options"];
  apiAddress?: string;
  disabled?: boolean;
  fieldName: string;
  rules?: any;
  inputProps?: Partial<MultiSelectProps>;
}

function MultiSelectForm({rules, fieldName, options, inputProps, apiAddress, disabled}: Props) {

  const {control} = useFormContext()

  const {
    field: {onChange, onBlur, name, value, ref},
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: [],
  });

  const {
    loading, options: selectOptions
  } = useGetSelectOptions({url: apiAddress, defaultOptions: options})

  return (
    <MultiSelect
      onBlur={onBlur}
      name={name}
      setItems={onChange}
      items={value}
      inputRef={ref}
      options={selectOptions}
      loading={loading}
      disabled={Boolean(disabled)}
      required={rules?.required}
      {...inputProps}
    />
  );
}

export default MultiSelectForm