import React from 'react';
import { AlertTriangle } from 'lucide-react';

export interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body items-center text-center">
          <AlertTriangle className="w-16 h-16 text-error mb-4" />
          <h2 className="card-title text-2xl mb-4">Erreur</h2>
          <p className="text-xl mb-6">{error}</p>
          {onRetry && (
            <button className="btn btn-primary" onClick={onRetry}>
              Réessayer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 