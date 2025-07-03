import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <AlertTriangle className="w-12 h-12 text-error" />
          <h2 className="card-title font-mono mt-4">Erreur</h2>
          <p className="text-error font-mono whitespace-pre-wrap">
            {error}
          </p>
          <div className="card-actions mt-4">
            <button 
              className="btn btn-primary font-mono"
              onClick={onRetry}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 