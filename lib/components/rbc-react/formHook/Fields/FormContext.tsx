
// FormContext.tsx
import { createContext, useContext } from 'react';
import { FormContextValue } from './types';

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form fields must be used within a Form component');
  }
  return context;
};

export const FormProvider = FormContext.Provider;