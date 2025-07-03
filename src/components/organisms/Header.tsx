import React from 'react';
import { RefreshCw, BarChart3, Clock } from 'lucide-react';

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
  // Format time to only show hours and minutes
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="card bg-base-300 shadow-xl mb-3">
      <div className="card-body p-4 flex-row items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <BarChart3 className="w-7 h-7" />
          <span>{projectName}</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-lg opacity-80">
            <Clock className="w-5 h-5" />
            <span>{formatTime(lastUpdated)}</span>
          </div>
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