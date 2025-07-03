import React, { useEffect, useState } from 'react';
import { GitStatsDashboard } from './components/organisms/GitStatsDashboard';
import { useGitStats } from './hooks/useGitStats';
import { useGitConfig } from './hooks/useGitConfig';
import { LoadingState } from './components/molecules/LoadingState';
import { ErrorState } from './components/molecules/ErrorState';
import { SettingsManager } from './components/organisms/SettingsManager';
import './App.css';

function App() {
  const [theme, setTheme] = useState('retro');
  const { config, updateConfig } = useGitConfig();
  const { gitStats, loading, error, refresh } = useGitStats();

  useEffect(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    if (urlTheme) {
      setTheme(urlTheme);
      localStorage.setItem('theme', urlTheme);
    } else {
      // Fallback to localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // Update URL without reloading the page
    const url = new URL(window.location.href);
    url.searchParams.set('theme', newTheme);
    window.history.pushState({}, '', url);
  };

  const handlePathChange = (newPath: string) => {
    updateConfig({ project_path: newPath });
  };

  if (error) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  if (!config) {
    return <LoadingState />;
  }

  return (
    <div data-theme={theme} className="min-h-screen compact-layout">
      <div className="absolute bottom-4 left-4 z-10">
        <SettingsManager
          currentPath={config.project_path}
          currentTheme={theme}
          onPathChange={handlePathChange}
          onThemeChange={handleThemeChange}
        />
      </div>
      
      {loading ? (
        <LoadingState />
      ) : (
        gitStats && (
          <GitStatsDashboard
            gitStats={gitStats}
            onRefresh={refresh}
            loading={loading}
          />
        )
      )}
    </div>
  );
}

export default App;
