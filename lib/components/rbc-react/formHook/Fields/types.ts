import { ReactNode } from 'react';

export interface FieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  helpText?: string;
  className?: string;
  required?: boolean;
  validate?: (value: any) => string | undefined;
}

export interface TextFieldProps extends FieldProps {
  type?: 'text' | 'password' | 'email' | 'tel' | 'url';
  maxLength?: number;
  minLength?: number;
}

export interface SelectFieldProps extends FieldProps {
  options: Array<{ label: string; value: any }>;
  multiple?: boolean;
}

export interface CheckboxFieldProps extends FieldProps {
  checked?: boolean;
}

export interface FieldRenderProps {
  field: {
    name: string;
    value: any;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
  };
  meta: {
    touched: boolean;
    error?: string;
    invalid: boolean;
  };
}

export interface FormContextValue {
  registerField: (name: string, config: any) => void;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  getFieldProps: (name: string) => any;
  getFieldMeta: (name: string) => any;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

import { FieldProps as FormikFieldProps } from 'formik';

export interface BaseFieldProps extends FormikFieldProps {
  name: string;
  label?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}