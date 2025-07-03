import React, { useEffect } from 'react';

interface ThemeManagerProps {
  onThemeChange: (theme: string) => void;
  children: React.ReactNode;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({ onThemeChange, children }) => {
  useEffect(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    if (urlTheme) {
      onThemeChange(urlTheme);
      localStorage.setItem('theme', urlTheme);
    } else {
      // Fallback to localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        onThemeChange(savedTheme);
      }
    }
  }, [onThemeChange]);

  const handleThemeChange = (newTheme: string) => {
    onThemeChange(newTheme);
    localStorage.setItem('theme', newTheme);
    // Update URL without reloading the page
    const url = new URL(window.location.href);
    url.searchParams.set('theme', newTheme);
    window.history.pushState({}, '', url);
  };

  return children;
}; 