import { useState, useEffect, useCallback } from 'react';
import type { GitStats } from '../types/git-stats';
import appConfig from '../config/app.config';

interface UseGitStatsReturn {
  gitStats: GitStats | null;
  loading: boolean;
  error: string | null;
  lastRefresh: Date;
  refresh: () => void;
}

export const useGitStats = (): UseGitStatsReturn => {
  const [gitStats, setGitStats] = useState<GitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadGitStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Charger depuis public/ avec le chemin configuré
      const response = await fetch(`${appConfig.statsFilePath}?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error('Fichier de statistiques non trouvé. Exécutez update-git-stats.bat');
      }
      
      const text = await response.text();
      console.log('Received JSON text:', text.substring(0, 100) + '...');
      
      if (!text.trim()) {
        throw new Error('Le fichier git-stats.json est vide');
      }
      
      const data: GitStats = JSON.parse(text);
      setGitStats(data);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Error loading git stats:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGitStats();
    
    // Auto-refresh using configured interval
    const interval = setInterval(loadGitStats, appConfig.refreshInterval);
    
    return () => clearInterval(interval);
  }, [loadGitStats]);

  return {
    gitStats,
    loading,
    error,
    lastRefresh,
    refresh: loadGitStats
  };
}; 