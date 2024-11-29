// Theme context
import { defaultTheme, ThemeConfig } from "@lib/theme.config";
import React, { createContext } from "react";

const ThemeContext = createContext<ThemeConfig>(defaultTheme);

export const ThemeProvider: React.FC<{
  theme: Partial<ThemeConfig>;
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const mergedTheme = {
    ...defaultTheme,
    ...theme,
    colors: {
      ...defaultTheme.colors,
      ...theme.colors,
    },
    spacing: {
      ...defaultTheme.spacing,
      ...theme.spacing,
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      ...theme.borderRadius,
    },
  };

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
