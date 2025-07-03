import React from 'react';
import type { GitStats } from '../../types/git-stats';
import { TodayStats } from '../molecules/TodayStats';
import { CommitCard } from '../molecules/CommitCard';
import { useGitConfig } from '../../hooks/useGitConfig';

interface GitStatsDashboardProps {
  gitStats: GitStats;
  onRefresh: () => void;
  loading: boolean;
}

export const GitStatsDashboard: React.FC<GitStatsDashboardProps> = ({
  gitStats,
  onRefresh,
  loading
}) => {
  const { config } = useGitConfig();
  
  const formatMessage = (message: string, maxLength: number = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          📊 Git Stats - {gitStats.project_name}
        </h1>
        <div className="space-y-1">
          <p className="text-base-content/70">
            Dernière mise à jour: {gitStats.last_updated}
          </p>
          {config && (
            <p className="text-sm text-base-content/60">
              Chemin du projet: {config.project_path}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayStats
          insertions={gitStats.today_insertions}
          deletions={gitStats.today_deletions}
          commits={gitStats.today_commits}
        />

        <CommitCard
          commit={gitStats.latest_commit}
          formatMessage={formatMessage}
        />
      </div>

      {/* Footer with refresh button */}
      <div className="text-center mt-8">
        <button 
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? 'Actualisation...' : '🔄 Actualiser'}
        </button>
        <p className="text-sm text-base-content/50 mt-2">
          Actualisation automatique toutes les 30 secondes
        </p>
      </div>
    </div>
  );
}; 