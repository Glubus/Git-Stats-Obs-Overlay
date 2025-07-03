import React from 'react';
import type { GitStats } from '../../types/git-stats';
import { TodayStats } from '../molecules/TodayStats';
import { CommitCard } from '../molecules/CommitCard';
import { Header } from './Header';

interface GitStatsDashboardProps {
  gitStats: GitStats;
  onRefresh: () => void;
  loading: boolean;
  layout: 'horizontal' | 'vertical';
}

export const GitStatsDashboard: React.FC<GitStatsDashboardProps> = ({
  gitStats,
  onRefresh,
  loading,
  layout
}) => {
  const formatMessage = (message: string, maxLength: number = 50) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  const isVertical = layout === 'vertical';

  return (
    <div style={{ background: 'transparent' }} className="p-4">
      <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} gap-4`}>
        {/* Stats */}
        <div className={isVertical ? 'w-full' : 'w-1/3'}>
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

        {/* Commit Info */}
        <div className={isVertical ? 'w-full' : 'w-2/3'}>
          <CommitCard
            commit={gitStats.latest_commit}
            formatMessage={formatMessage}
          />
        </div>
      </div>
    </div>
  );
}; 