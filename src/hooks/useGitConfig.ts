import { useState, useEffect } from 'react';
import type { GitStatsConfig } from '../types/git-stats';

interface UseGitConfigReturn {
  config: GitStatsConfig | null;
  loading: boolean;
  error: string | null;
}

export const useGitConfig = (): UseGitConfigReturn => {
  const [config, setConfig] = useState<GitStatsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Charger depuis public/config.json
        const response = await fetch('/config.json');
        
        if (!response.ok) {
          throw new Error('Fichier de configuration non trouvé');
        }
        
        const data: GitStatsConfig = await response.json();
        setConfig(data);
      } catch (err) {
        console.error('Error loading git config:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return {
    config,
    loading,
    error
  };
}; 