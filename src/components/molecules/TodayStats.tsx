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
  commits
}) => {
  const totalChanges = insertions + deletions;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          📅 Activité d'aujourd'hui
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Insertions"
            value={`+${insertions}`}
            icon={<span className="text-2xl">+</span>}
            colorClass="text-success"
            bgClass="bg-success/10"
          />
          
          <StatCard
            title="Suppressions"
            value={`-${deletions}`}
            icon={<span className="text-2xl">-</span>}
            colorClass="text-error"
            bgClass="bg-error/10"
          />
          
          <StatCard
            title="Commits"
            value={commits}
            icon={<span className="text-2xl">📝</span>}
            colorClass="text-primary"
            bgClass="bg-primary/10"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-base-content/70">
            <span>Activité du jour</span>
            <span>{totalChanges} lignes modifiées</span>
          </div>
          <progress 
            className="progress progress-primary w-full mt-2" 
            value={insertions} 
            max={totalChanges || 1}
          ></progress>
        </div>
      </div>
    </div>
  );
}; 