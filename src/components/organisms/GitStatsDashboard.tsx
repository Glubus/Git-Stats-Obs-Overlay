import React from 'react';
import type { GitStats } from '../../types/git-stats';
import { TodayStats } from '../molecules/TodayStats';
import { CommitCard } from '../molecules/CommitCard';
import { RefreshCw } from 'lucide-react';

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
  const formatMessage = (message: string, maxLength: number = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      {/* Header */}
      <div className="navbar bg-base-200 rounded-box mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-mono ml-4">
            📊 Git Stats - {gitStats.project_name}
          </h1>
        </div>
        <div className="flex-none gap-4">
          <span className="text-base-content/70 text-sm font-mono">
            Mise à jour: {gitStats.last_updated}
          </span>
          <button 
            className={`btn btn-square btn-ghost ${loading ? 'loading' : ''}`}
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Stats */}
        <div className="w-full lg:w-1/3">
          <TodayStats
            insertions={gitStats.today_insertions}
            deletions={gitStats.today_deletions}
            commits={gitStats.today_commits}
          />
        </div>

        {/* Commit Info */}
        <div className="w-full lg:w-2/3">
          <CommitCard
            commit={gitStats.latest_commit}
            formatMessage={formatMessage}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-sm text-base-content/50 font-mono">
          Actualisation automatique toutes les 30 secondes
        </p>
      </div>
    </div>
  );
}; 