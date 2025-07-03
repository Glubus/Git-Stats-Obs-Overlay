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
      // Si c'est le premier chargement, on met loading à true
      if (!gitStats) {
        setLoading(true);
      }
      setError(null);
      
      const jsonStr = await invoke<string>('get_git_stats', { path: 'G:/potential' });
      const stats = JSON.parse(jsonStr);
      
      if (Object.keys(stats).length > 0) {
        // On compare les valeurs importantes pour voir si on doit mettre à jour
        const shouldUpdate = !gitStats || 
          gitStats.today_commits !== stats.today_commits ||
          gitStats.today_insertions !== stats.today_insertions ||
          gitStats.today_deletions !== stats.today_deletions ||
          gitStats.latest_commit.hash !== stats.latest_commit.hash;

        if (shouldUpdate) {
          setGitStats(stats);
          setLastRefresh(new Date());
        }
      }
    } catch (err) {
      console.error('Error loading git stats:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [gitStats]);

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