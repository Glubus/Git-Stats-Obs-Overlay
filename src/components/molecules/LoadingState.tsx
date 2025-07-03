import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <Loader2 className="w-12 h-12 animate-spin" />
          <h2 className="card-title font-mono mt-4">Chargement...</h2>
          <p className="text-base-content/70 font-mono">
            Récupération des statistiques Git
          </p>
        </div>
      </div>
    </div>
  );
}; 