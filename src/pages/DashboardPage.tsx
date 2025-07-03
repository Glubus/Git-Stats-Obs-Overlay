import React, { useEffect, useState } from 'react';
import { MainTemplate } from '../components/templates/MainTemplate';
import { GitStatsDashboard as HorizontalDashboard } from '../components/organisms/horizontal/GitStatsDashboard';
import { GitStatsDashboard as VerticalDashboard } from '../components/organisms/vertical/GitStatsDashboard';
import { useGitStats } from '../hooks/useGitStats';
import { useGitConfig } from '../hooks/useGitConfig';
import { SettingsManager } from '../components/organisms/SettingsManager';
import { ThemeManager } from '../components/organisms/ThemeManager';

export const DashboardPage: React.FC = () => {
  const { gitStats, loading, refresh } = useGitStats();
  const { path, setPath, theme, setTheme } = useGitConfig();
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');

  useEffect(() => {
    // Charger le layout depuis le localStorage
    const savedLayout = localStorage.getItem('layout');
    if (savedLayout === 'horizontal' || savedLayout === 'vertical') {
      setLayout(savedLayout);
    }
  }, []);

  const handleLayoutChange = (newLayout: 'horizontal' | 'vertical') => {
    setLayout(newLayout);
    localStorage.setItem('layout', newLayout);
  };

  if (!gitStats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement des statistiques...</h1>
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  const Dashboard = layout === 'vertical' ? VerticalDashboard : HorizontalDashboard;

  return (
    <MainTemplate
      theme={theme}
      header={
        <div className="flex gap-2">
          <SettingsManager
            currentPath={path}
            currentTheme={theme}
            currentLayout={layout}
            onPathChange={setPath}
            onThemeChange={setTheme}
            onLayoutChange={handleLayoutChange}
          />
          <ThemeManager theme={theme} />
        </div>
      }
    >
      <Dashboard
        gitStats={gitStats}
        onRefresh={refresh}
        loading={loading}
      />
    </MainTemplate>
  );
}; 