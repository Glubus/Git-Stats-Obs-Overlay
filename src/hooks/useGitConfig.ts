import { useState, useEffect } from 'react';

interface GitConfig {
  project_path: string;
  theme: string;
}

export interface UseGitConfigReturn {
  path: string;
  theme: string;
  setPath: (path: string) => void;
  setTheme: (theme: string) => void;
}

export const useGitConfig = (): UseGitConfigReturn => {
  const [path, setPath] = useState<string>(() => {
    return localStorage.getItem('project_path') || '';
  });

  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const handleSetPath = (newPath: string) => {
    setPath(newPath);
    localStorage.setItem('project_path', newPath);
  };

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        if (data.project_path) handleSetPath(data.project_path);
        if (data.theme) handleSetTheme(data.theme);
      })
      .catch(error => console.error('Error loading config:', error));
  }, []);

  return {
    path,
    theme,
    setPath: handleSetPath,
    setTheme: handleSetTheme
  };
}; 