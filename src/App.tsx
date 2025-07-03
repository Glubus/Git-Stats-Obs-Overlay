import React from 'react';
import { useGitStats } from './hooks/useGitStats';
import { GitStatsDashboard } from './components/organisms/GitStatsDashboard';
import { LoadingState } from './components/molecules/LoadingState';
import { ErrorState } from './components/molecules/ErrorState';
import './App.css';

const App: React.FC = () => {
  const { gitStats, loading, error, refresh } = useGitStats();

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'retro');
  }, []);

  if (error) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  if (loading && !gitStats) {
    return <LoadingState />;
  }

  if (!gitStats) {
    return null;
  }

  return (
    <GitStatsDashboard
      gitStats={gitStats}
      onRefresh={refresh}
      loading={loading}
    />
  );
};

export default App;
