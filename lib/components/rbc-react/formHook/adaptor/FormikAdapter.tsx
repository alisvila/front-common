import React from 'react';
import { useFormik } from 'formik';
import { FormProvider } from '../Fields/FormContext';

export const FormikAdapter = ({ children, initialValues, validationSchema, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const formContext = {
    registerField: () => {},
    setFieldValue: formik.setFieldValue,
    setFieldTouched: formik.setFieldTouched,
    getFieldProps: (name: string) => formik.getFieldProps(name),
    getFieldMeta: (name: string) => ({
      touched: formik.touched[name],
      error: formik.errors[name],
      invalid: formik.touched[name] && Boolean(formik.errors[name]),
    }),
    errors: formik.errors,
    touched: formik.touched,
  };

  return (
    <FormProvider value={formContext}>
      <form onSubmit={formik.handleSubmit}>{children}</form>
    </FormProvider>
  );
};