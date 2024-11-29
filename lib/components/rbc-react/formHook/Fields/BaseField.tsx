import React from "react";
import { useFormContext } from "./FormContext";
import { FieldProps, FieldRenderProps } from "./types";

interface BaseFieldProps extends FieldProps {
  render: (props: FieldRenderProps) => ReactNode;
}

export const BaseField: React.FC<BaseFieldProps> = ({
  name,
  label,
  helpText,
  validate,
  render,
  required,
}) => {
  const { getFieldProps, getFieldMeta } = useFormContext();

  const field = getFieldProps(name);
  const meta = getFieldMeta(name);

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {render({ field, meta })}
      {helpText && <div className="help-text">{helpText}</div>}
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </div>
  );
};
