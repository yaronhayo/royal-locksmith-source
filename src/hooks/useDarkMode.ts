import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

/**
 * Hook to manage dark mode state
 * @returns [theme, setTheme, isDark]
 */
export function useDarkMode(): [Theme, (theme: Theme) => void, boolean] {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Get initial theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let dark = false;
    if (theme === 'dark') {
      dark = true;
    } else if (theme === 'light') {
      dark = false;
    } else {
      dark = systemDark;
    }

    setIsDark(dark);

    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        setIsDark(mediaQuery.matches);
        if (mediaQuery.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return [theme, setTheme, isDark];
}

export default useDarkMode;
