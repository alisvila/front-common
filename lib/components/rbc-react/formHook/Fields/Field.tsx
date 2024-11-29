import React, { ReactNode } from "react";
import { useField } from "formik";
import { BaseFieldProps } from "./types";

export const Field = ({
  name,
  label,
  helpText,
  children,
  required: explicitRequired,
  ...props
}: BaseFieldProps & { children: (fieldProps: any) => ReactNode }) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {explicitRequired && <span className="required">*</span>}
        </label>
      )}

      {children({
        field,
        meta,
        required: explicitRequired,
        error: touched && error,
        ...props,
      })}

      {helpText && <div className="help-text">{helpText}</div>}
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  );
};
