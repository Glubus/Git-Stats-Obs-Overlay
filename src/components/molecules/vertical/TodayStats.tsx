import React from 'react';
import { GitCommit, Plus, Minus } from 'lucide-react';

interface TodayStatsProps {
  commits: number;
  insertions: number;
  deletions: number;
}

export const TodayStats: React.FC<TodayStatsProps> = ({
  commits,
  insertions,
  deletions
}) => {
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body p-4">
        <h2 className="text-2xl font-bold mb-4">Aujourd'hui</h2>
        
        <div className="stats stats-vertical shadow bg-base-200 w-full">
          <div className="stat p-2">
            <div className="stat-figure text-primary">
              <GitCommit className="w-5 h-5" />
            </div>
            <div className="stat-title text-base">Commits</div>
            <div className="stat-value text-xl">{commits}</div>
          </div>
          
          <div className="stat p-2">
            <div className="stat-figure text-success">
              <Plus className="w-5 h-5" />
            </div>
            <div className="stat-title text-base">Ajouts</div>
            <div className="stat-value text-xl text-success">{insertions}</div>
          </div>
          
          <div className="stat p-2">
            <div className="stat-figure text-error">
              <Minus className="w-5 h-5" />
            </div>
            <div className="stat-title text-base">Retraits</div>
            <div className="stat-value text-xl text-error">{deletions}</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 