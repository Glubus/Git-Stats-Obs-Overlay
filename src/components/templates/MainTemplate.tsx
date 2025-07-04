import React from 'react';
import { GitStatsDashboard as HorizontalDashboard } from '../organisms/horizontal/GitStatsDashboard';
import { GitStatsDashboard as VerticalDashboard } from '../organisms/vertical/GitStatsDashboard';
import { useGitStats } from '../../hooks/useGitStats';
import { useSettings } from '../../contexts/SettingsContext';
import { SettingsManager } from '../organisms/settings/SettingsManager';

export const MainTemplate: React.FC = () => {
  const { layout, path } = useSettings();
  const Dashboard = layout === 'horizontal' ? HorizontalDashboard : VerticalDashboard;
  const { gitStats, loading, error, refresh } = useGitStats(path);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="w-full p-4">
        <SettingsManager />
        {error ? (
          <div className="text-center mt-8">
            <p className="text-lg text-error">{error}</p>
            <p className="text-sm text-gray-500 mt-2">
              Chemin actuel : {path}
            </p>
          </div>
        ) : loading && !gitStats ? (
          <div className="text-center mt-8">
            <p className="text-lg">Chargement des statistiques...</p>
            <p className="text-sm text-gray-500 mt-2">
              Chemin actuel : {path}
            </p>
          </div>
        ) : gitStats ? (
          <Dashboard
            gitStats={gitStats}
            loading={loading}
            onRefresh={refresh}
          />
        ) : null}
      </div>
    </div>
  );
}; 