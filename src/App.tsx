import React from 'react';
import { useGitStats } from './hooks/useGitStats';
import { GitStatsCard } from './components/organisms/GitStatsCard';
import { LoadingState } from './components/molecules/LoadingState';
import { ErrorState } from './components/molecules/ErrorState';
import './App.css';

const App = () => {
  const { gitStats, loading, error, refresh } = useGitStats();

  if (loading && !gitStats) {
    return <LoadingState />;
  }

  if (error && !gitStats) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  if (!gitStats) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      <GitStatsCard
        gitStats={gitStats}
        onRefresh={refresh}
        loading={loading}
      />
    </div>
  );
};

export default App;
