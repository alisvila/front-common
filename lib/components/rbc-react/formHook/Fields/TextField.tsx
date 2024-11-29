import React from 'react';
import { TextFieldProps } from './types';
import { BaseField } from './BaseField';

export const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  ...props
}) => {
  return (
    <BaseField
      {...props}
      render={({ field, meta }) => (
        <input
          {...field}
          type={type}
          className={`form-input ${meta.touched && meta.error ? 'is-invalid' : ''}`}
          aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
        />
      )}
    />
  );
};