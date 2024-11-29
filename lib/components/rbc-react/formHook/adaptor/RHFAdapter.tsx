import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from './FormContext';

export const RHFAdapter = ({ children, defaultValues, validationSchema, onSubmit }) => {
  const methods = useForm({
    defaultValues,
    resolver: validationSchema,
  });

  const formContext = {
    registerField: methods.register,
    setFieldValue: (name: string, value: any) => methods.setValue(name, value),
    setFieldTouched: (name: string) => methods.trigger(name),
    getFieldProps: (name: string) => ({
      name,
      value: methods.watch(name),
      onChange: (e: any) => methods.setValue(name, e.target.value),
      onBlur: () => methods.trigger(name),
    }),
    getFieldMeta: (name: string) => ({
      touched: methods.formState.touchedFields[name],
      error: methods.formState.errors[name]?.message,
      invalid: Boolean(methods.formState.errors[name]),
    }),
    errors: methods.formState.errors,
    touched: methods.formState.touchedFields,
  };

  return (
    <FormProvider value={formContext}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};