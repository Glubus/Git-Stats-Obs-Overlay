import React from 'react';
import { GitCommit, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from '../../../i18n';

interface TodayStatsProps {
  commits: number;
  insertions: number;
  deletions: number;
}

export const TodayStats: React.FC<TodayStatsProps> = ({
  commits,
  insertions,
  deletions
}) => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body p-4">
        <h2 className="text-3xl font-bold mb-4">{t('stats.today')}</h2>
        
        <div className="stats stats-vertical shadow bg-base-200 w-full">
          <div className="stat p-4">
            <div className="stat-title text-lg mb-1">{t('stats.commits')}</div>
            <div className="stat-value text-2xl">{commits}</div>
            <div className="stat-figure text-primary">
              <GitCommit className="w-6 h-6" />
            </div>
          </div>
          
          <div className="stat p-4">
            <div className="stat-title text-lg mb-1">{t('stats.additions')}</div>
            <div className="stat-value text-2xl text-success">{insertions}</div>
            <div className="stat-figure text-success">
              <Plus className="w-6 h-6" />
            </div>
          </div>
          
          <div className="stat p-4">
            <div className="stat-title text-lg mb-1">{t('stats.deletions')}</div>
            <div className="stat-value text-2xl text-error">{deletions}</div>
            <div className="stat-figure text-error">
              <Minus className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 