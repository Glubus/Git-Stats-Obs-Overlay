import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from '../../../i18n';
import { TodayCard } from '../../atoms/horizontal/TodayCard';

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
        <h2 className="text-3xl font-bold mb-4">{t('stats.today.title')}</h2>
        
        <div className="stats stats-horizontal shadow bg-base-200 w-full">
          <TodayCard
            title={t('stats.today.commits')}
            value={commits}
            type="commits"
          />
          <TodayCard
            title={t('stats.today.insertions')}
            value={insertions}
            type="additions"
          />
          <TodayCard
            title={t('stats.today.deletions')}
            value={deletions}
            type="deletions"
          />
        </div>
      </div>
    </div>
  );
}; 