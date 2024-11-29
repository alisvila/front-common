import { Field } from "./Field";
import { BaseFieldProps } from "./types";

export interface InputProps extends BaseFieldProps {
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
}

export const Input = ({ type = "text", ...props }: InputProps) => {
  return (
    <Field {...props}>
      {({ field, error }) => (
        <input
          {...field}
          type={type}
          id={props.name}
          disabled={props.disabled}
          placeholder={props.placeholder}
          className={`form-input ${error ? "is-invalid" : ""} ${
            props.className || ""
          }`}
        />
      )}
    </Field>
  );
};
