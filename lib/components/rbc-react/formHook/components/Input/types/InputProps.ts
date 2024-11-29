import {ReactNode} from "react";

type ValueType = string | number

type WrapperClassNameType = {
  margin?: string;
  extra?: string;
}

type InputClassNameType = {
  fontSize?: string;
  padding?: string;
  extra?: string;
}

type LabelClassNameType = {
  fontSize?: string;
  fontWeight?: string;
  extra?: string;
}

export type InputProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: ValueType;
  defaultValue?: ValueType;
  autoCompleteOff?: boolean;
  type?: 'text' | 'password';
  inputMode?: 'text' | 'numeric';
  disabled?: boolean;
  errorMessage?: string;
  onChange?: (e:any) => void;
  onBlur?: () => void;
  onKeyDown?: (e:any) => void;
  onKeyPress?: (e:any) => void;
  wrapperClassName?: WrapperClassNameType;
  inputClassName?: InputClassNameType;
  labelClassName?: LabelClassNameType;
  inputRef?: any;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  hiddenErrorMessageElement?: boolean;
  onClick?: () => void
  inputWrapperOnClick?: () => void;
  justSelectOnClick?: () => void | boolean;
  fileInput?: ReactNode;
  endAdornmentAspect?: string;
  labelEndAdornment?: ReactNode;
  labelEndAdornmentOnClick?: () => void;
  rows?: number;
  required?: boolean
  readOnly?: boolean,
  endAdornmentClass?: string,
  endAdornmentPadding?: string,
}