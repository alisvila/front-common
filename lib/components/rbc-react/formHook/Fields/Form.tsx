import { Formik, Form as FormikForm } from 'formik';

interface FormProps {
  initialValues: Record<string, any>;
  validationSchema: any;
  onSubmit: (values: any, actions: any) => void | Promise<void>;
  children: ReactNode;
}

export const Form = ({
  initialValues,
  validationSchema,
  onSubmit,
  children
}: FormProps) => {
  return (
    <ValidationSchemaProvider schema={validationSchema}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <FormikForm>{children}</FormikForm>
      </Formik>
    </ValidationSchemaProvider>
  );
};
