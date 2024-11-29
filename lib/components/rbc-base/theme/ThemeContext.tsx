import React, { createContext, useContext } from 'react';
import './variables.css';

interface ThemeContextType {
  updateTheme: (variables: Record<string, string>) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  updateTheme: () => {},
});

export function ThemeProvider({ children }) {
  const updateTheme = (variables: Record<string, string>) => {
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(`--rbc-${key}`, value);
    });
  };

  return (
    <ThemeContext.Provider value={{ updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}