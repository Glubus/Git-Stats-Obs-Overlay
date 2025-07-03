import { useState, useEffect } from 'react';

interface GitConfig {
  project_path: string;
}

export interface UseGitConfigReturn {
  config: GitConfig | null;
  updateConfig: (newConfig: Partial<GitConfig>) => void;
}

export const useGitConfig = (): UseGitConfigReturn => {
  const [config, setConfig] = useState<GitConfig | null>(null);

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => setConfig(data))
      .catch(error => console.error('Error loading config:', error));
  }, []);

  const updateConfig = async (newConfig: Partial<GitConfig>) => {
    if (!config) return;
    
    const updatedConfig = { ...config, ...newConfig };
    
    try {
      const response = await fetch('/config.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedConfig),
      });
      
      if (response.ok) {
        setConfig(updatedConfig);
      }
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  return { config, updateConfig };
}; 