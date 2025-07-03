import React from 'react';
import type { GitStats } from '../../types/git-stats';

interface GitStatsCardProps {
  gitStats: GitStats;
  onRefresh: () => void;
  loading: boolean;
}

export const GitStatsCard: React.FC<GitStatsCardProps> = ({
  gitStats,
  onRefresh,
  loading
}) => {
  const formatMessage = (message: string, maxLength: number = 30) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-80 h-60 bg-base-100 shadow-xl rounded-lg p-4 text-sm obs-card fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-primary">
          📊 {gitStats.project_name}
        </h2>
        <button 
          className={`btn btn-xs btn-primary ${loading ? 'loading' : ''}`}
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? '' : '🔄'}
        </button>
      </div>

      {/* Stats Today */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center bg-success/10 rounded p-2">
          <div className="text-xs text-success font-medium">Ajouts</div>
          <div className="text-lg font-bold text-success">
            +{gitStats.today_insertions}
          </div>
        </div>
        <div className="text-center bg-error/10 rounded p-2">
          <div className="text-xs text-error font-medium">Retraits</div>
          <div className="text-lg font-bold text-error">
            -{gitStats.today_deletions}
          </div>
        </div>
        <div className="text-center bg-primary/10 rounded p-2">
          <div className="text-xs text-primary font-medium">Commits</div>
          <div className="text-lg font-bold text-primary">
            {gitStats.today_commits}
          </div>
        </div>
      </div>

      {/* Latest Commit */}
      <div className="bg-base-200 rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-6 h-6">
              <span className="text-xs">
                {gitStats.latest_commit.author.substring(0, 1).toUpperCase()}
              </span>
            </div>
          </div>
          <span className="font-semibold text-xs">{gitStats.latest_commit.author}</span>
          <span className="badge badge-xs badge-outline">
            {gitStats.latest_commit.hash}
          </span>
        </div>
        
        <p className="text-xs mb-2 font-medium">
          {formatMessage(gitStats.latest_commit.message)}
        </p>
        
        <div className="flex justify-between text-xs text-base-content/70">
          <span>{gitStats.latest_commit.files_changed} fichiers</span>
          <span className="text-success">+{gitStats.latest_commit.insertions}</span>
          <span className="text-error">-{gitStats.latest_commit.deletions}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-base-content/50 mt-2 text-center">
        {new Date(gitStats.last_updated).toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </div>
  );
}; 