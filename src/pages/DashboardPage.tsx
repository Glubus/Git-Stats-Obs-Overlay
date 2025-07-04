import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useGitStats } from '../hooks/useGitStats';
import { SettingsTemplate } from '../components/templates/SettingsTemplate';
import { GitStatsDashboard as HorizontalDashboard } from '../components/organisms/horizontal/GitStatsDashboard';
import { GitStatsDashboard as VerticalDashboard } from '../components/organisms/vertical/GitStatsDashboard';

export const DashboardPage: React.FC = () => {
  const {
    theme,
    layout,
    language,
    path,
    marquee,
    setTheme,
    setLayout,
    setLanguage,
    setPath,
    setMarqueeSettings,
    previewTheme
  } = useSettings();

  const { gitStats, loading, error, refresh } = useGitStats(path);
  const Dashboard = layout === 'horizontal' ? HorizontalDashboard : VerticalDashboard;

  return (
    <div className="min-h-screen bg-base-100">
      <div className="w-full p-4">
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

        <SettingsTemplate
          currentPath={path}
          currentTheme={theme}
          currentLayout={layout}
          currentLanguage={language}
          currentMarquee={marquee}
          error={error || undefined}
          onPathChange={setPath}
          onThemeChange={setTheme}
          onLayoutChange={setLayout}
          onLanguageChange={setLanguage}
          onMarqueeChange={setMarqueeSettings}
          onPreviewTheme={previewTheme}
        />
      </div>
    </div>
  );
}; 