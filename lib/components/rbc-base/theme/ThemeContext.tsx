import React, { createContext, useContext, ReactNode } from 'react';
import './variables.css';

export interface ThemeVariables {
  primary?: string;
  'primary-hover'?: string;
  secondary?: string;
  'secondary-hover'?: string;
  'text-primary'?: string;
  'text-secondary'?: string;
  'bg-primary'?: string;
  'bg-secondary'?: string;
  'bg-hover'?: string;
  'bg-selected'?: string;
  'border-color'?: string;
  'table-header-bg'?: string;
  'table-row-hover'?: string;
  'table-border'?: string;
  'table-stripe'?: string;
}

interface ThemeContextType {
  updateTheme: (variables: ThemeVariables) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  updateTheme: () => {},
  resetTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeVariables;
}

const defaultTheme: ThemeVariables = {
  primary: '#3B82F6',
  'primary-hover': '#2563EB',
  secondary: '#E5E7EB',
  'secondary-hover': '#D1D5DB',
  'text-primary': '#111827',
  'text-secondary': '#6B7280',
  'bg-primary': '#FFFFFF',
  'bg-secondary': '#F3F4F6',
  'bg-hover': '#F9FAFB',
  'bg-selected': '#EFF6FF',
  'border-color': '#E5E7EB',
  'table-header-bg': '#e9f1f9',
  'table-row-hover': '#F9FAFB',
  'table-border': '#E5E7EB',
  'table-stripe': '#F3F4F6',
};

export function ThemeProvider({ children, initialTheme = {} }: ThemeProviderProps) {
  const updateTheme = (variables: ThemeVariables) => {
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--rbc-${key}`, value);
      }
    });
  };

  const resetTheme = () => {
    const root = document.documentElement;
    Object.entries(defaultTheme).forEach(([key, value]) => {
      root.style.setProperty(`--rbc-${key}`, value);
    });
  };

  // Apply initial theme on mount
  React.useEffect(() => {
    if (Object.keys(initialTheme).length > 0) {
      console.log(initialTheme, "initialThemeinitialThemeinitialTheme")
      updateTheme(initialTheme);
    }
    return () => resetTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}