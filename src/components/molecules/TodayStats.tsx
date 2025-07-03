import React from 'react';
import { StatCard } from '../atoms/StatCard';

interface TodayStatsProps {
  insertions: number;
  deletions: number;
  commits: number;
}

export const TodayStats: React.FC<TodayStatsProps> = ({
  insertions,
  deletions,
  commits,
}) => {
  const totalChanges = insertions + deletions;

  return (
    <div className="stats stats-vertical shadow bg-base-200 w-full">
      <StatCard
        title="Lignes ajoutées"
        value={insertions}
        type="insertions"
      />
      <StatCard
        title="Lignes supprimées"
        value={deletions}
        type="deletions"
      />
      <StatCard
        title="Commits"
        value={commits}
        type="commits"
      />
    </div>
  );
}; 