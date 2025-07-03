import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-lg">Chargement des statistiques Git...</p>
      </div>
    </div>
  );
}; 