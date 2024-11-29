import {InputProps} from "../../rbc-react/formHook/components/Input/types/InputProps";

export type FormInputProps = {
  fieldName: string;
  rules?: any;
  inputProps?: Partial<InputProps>;
}