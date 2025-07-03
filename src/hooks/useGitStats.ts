import { useState, useCallback, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import type { GitStats } from '../types/git-stats';
import appConfig from '../config/app.config';

interface UseGitStatsReturn {
  gitStats: GitStats | null;
  loading: boolean;
  error: string | null;
  lastRefresh: Date;
  refresh: () => Promise<void>;
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
      
      const jsonStr = await invoke<string>('get_git_stats', { path: 'G:/potential' });
      const stats = JSON.parse(jsonStr);
      if (Object.keys(stats).length > 0) {
        setGitStats(stats);
        setLastRefresh(new Date());
      }
    } catch (err) {
      console.error('Error loading git stats:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await loadGitStats();
      // Auto-refresh using configured interval
      const interval = setInterval(loadGitStats, appConfig.refreshInterval);
      return () => clearInterval(interval);
    };
    
    init();
  }, [loadGitStats]);

  return {
    gitStats,
    loading,
    error,
    lastRefresh,
    refresh: loadGitStats
  };
}; 