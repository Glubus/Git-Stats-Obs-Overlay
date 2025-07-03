import React, { useState } from 'react';
import { MainTemplate } from '../components/templates/MainTemplate';
import { GitStatsDashboard } from '../components/organisms/GitStatsDashboard';
import { ThemeManager } from '../components/organisms/ThemeManager';
import { SettingsManager } from '../components/organisms/SettingsManager';
import { LoadingState } from '../components/molecules/LoadingState';
import { ErrorState } from '../components/molecules/ErrorState';
import { useGitStats } from '../hooks/useGitStats';
import { useGitConfig } from '../hooks/useGitConfig';

export const DashboardPage: React.FC = () => {
  const [theme, setTheme] = useState('retro');
  const { config, updateConfig } = useGitConfig();
  const { gitStats, loading, error, refresh } = useGitStats();

  const handlePathChange = (newPath: string) => {
    updateConfig({ project_path: newPath });
  };

  if (error) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  if (!config) {
    return <LoadingState />;
  }

  const settingsComponent = (
    <SettingsManager
      currentPath={config.project_path}
      currentTheme={theme}
      onPathChange={handlePathChange}
      onThemeChange={setTheme}
    />
  );

  const mainContent = loading ? (
    <LoadingState />
  ) : (
    gitStats && (
      <GitStatsDashboard
        gitStats={gitStats}
        onRefresh={refresh}
        loading={loading}
      />
    )
  );

  return (
    <ThemeManager onThemeChange={setTheme}>
      <MainTemplate
        theme={theme}
        settingsComponent={settingsComponent}
        mainContent={mainContent}
      />
    </ThemeManager>
  );
}; 