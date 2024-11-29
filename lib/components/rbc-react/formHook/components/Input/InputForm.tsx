import {FormInputProps} from "../../../../rbc-icons/rbc-types/FormInputProps";
import Input from "./Input";
import useInputForm from "./hooks/useInputForm";

export type InputFormPropsType = {
  maxLength?: number;
  bySeparator?: boolean;
  justNumber?: boolean;
  onEnter?: () => void;
  defaultValue?: string
} & FormInputProps

function InputForm({inputProps, rules, fieldName, maxLength, bySeparator, justNumber, onEnter, defaultValue}: InputFormPropsType) {

  const {
    name, onChangeHandler, onBlur, onKeyDownHandler, value, ref
  } = useInputForm({
    fieldName, rules, bySeparator, justNumber, onEnter, maxLength, inputProps, defaultValue
  })

  return (
    <Input
      name={name}
      inputRef={ref}
      onChange={onChangeHandler}
      onBlur={onBlur}
      onKeyPress={onKeyDownHandler}
      value={value}
      required={Boolean(rules.required)}
      {...inputProps}
    />
  );
}

export default InputForm;