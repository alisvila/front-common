// theme-config.ts
export type ThemeConfig = {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  
  // Create a default theme
  export const defaultTheme: ThemeConfig = {
    colors: {
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      accent: 'hsl(var(--accent))',
      background: 'hsl(var(--background))',
      text: 'hsl(var(--foreground))'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem'
    }
  };
  

  
  // export const useTheme = () => useContext(ThemeContext);
  
  // // Example custom component using the theme
  // import { Card, CardContent } from '@/components/ui/card';
  
  // export const ThemedCard: React.FC<{
  //   children: React.ReactNode;
  // }> = ({ children }) => {
  //   const theme = useTheme();
    
  //   return (
  //     <Card 
  //       className="shadow-lg" 
  //       style={{ 
  //         backgroundColor: theme.colors.background,
  //         color: theme.colors.text,
  //         padding: theme.spacing.md,
  //         borderRadius: theme.borderRadius.md
  //       }}
  //     >
  //       <CardContent>
  //         {children}
  //       </CardContent>
  //     </Card>
  //   );
  // };