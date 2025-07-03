import React from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
      <div className="card w-96 bg-error text-error-content shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title justify-center">Erreur</h2>
          <p>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-outline" onClick={onRetry}>
              Réessayer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 