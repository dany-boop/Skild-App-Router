'use client';
import { FC, createContext, useState, useEffect } from 'react';

export interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode; // Define children prop explicitly
}

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleTheme: () => {},
});

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDark(true);
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute(
      'data-bs-theme',
      newTheme ? 'dark' : 'light'
    );
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
