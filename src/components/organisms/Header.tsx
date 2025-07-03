import React from 'react';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  projectName: string;
  lastUpdated: string;
  onRefresh: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  projectName,
  lastUpdated,
  onRefresh,
  loading
}) => {
  return (
    <div className="card bg-base-300 shadow-xl mb-3">
      <div className="card-body p-4 flex-row items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span>📊</span>
          <span>{projectName}</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-lg opacity-80">
            {lastUpdated}
          </span>
          <button 
            className={`btn btn-primary ${loading ? 'loading' : ''}`}
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}; 