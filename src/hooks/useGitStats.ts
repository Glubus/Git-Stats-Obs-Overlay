import { useState, useCallback, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import type { GitStats } from '../types/git-stats';

const REFRESH_INTERVAL = 30000; // 30 secondes

interface UseGitStatsReturn {
  gitStats: GitStats | null;
  loading: boolean;
  error: string | null;
  lastRefresh: Date;
  refresh: () => Promise<void>;
}

export const useGitStats = (path: string): UseGitStatsReturn => {
  const [gitStats, setGitStats] = useState<GitStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadGitStats = useCallback(async () => {
    if (!path || path === '.') {
      setError('Aucun chemin Git valide spécifié');
      return;
    }

    try {
      setLoading(true);
      const jsonStr = await invoke<string>('get_git_stats', { path });
      const stats = JSON.parse(jsonStr);
      
      if (Object.keys(stats).length > 0) {
        setGitStats(stats);
        setLastRefresh(new Date());
        setError(null);
      } else {
        setError('Aucune statistique trouvée');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setGitStats(null);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    loadGitStats();
    const intervalId = setInterval(loadGitStats, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [loadGitStats]);

  return {
    gitStats,
    loading,
    error,
    lastRefresh,
    refresh: loadGitStats
  };
}; 