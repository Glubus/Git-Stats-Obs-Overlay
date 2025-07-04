import React from 'react';
import type { GitStats } from '../../../types/git-stats';
import { TodayStats } from '../../molecules/horizontal/TodayStats';
import { CommitCard } from '../../molecules/horizontal/CommitCard';
import { Header } from '../Header';

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
  const formatMessage = (message: string, maxLength: number = 50) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-2">
          <Header
            projectName={gitStats.project_name}
            lastUpdated={gitStats.last_updated}
            onRefresh={onRefresh}
            loading={loading}
          />
          <TodayStats
            insertions={gitStats.today_insertions}
            deletions={gitStats.today_deletions}
            commits={gitStats.today_commits}
          />
        </div>
      <div className="col-span-3">
          <CommitCard
            commit={gitStats.latest_commit}
            formatMessage={formatMessage}
          />
      </div>
    </div>
  );
}; 