import React from 'react';
import type { CommitInfo } from '../../../types/git-stats';
import { GitCommit, User, Calendar, FileCode, Plus, Minus, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from '../../../i18n';
import { TodayCard } from '../../atoms/horizontal/TodayCard';
import { MarqueeText } from '../../atoms/horizontal/MarqueeText';

interface CommitCardProps {
  commit: CommitInfo;
  formatMessage: (message: string, maxLength?: number) => string;
}

export const CommitCard: React.FC<CommitCardProps> = ({ commit, formatMessage }) => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-0">
          <h2 className="text-3xl font-bold">{t('stats.commit.latest')}</h2>
          <div className="flex items-center gap-4 text-lg opacity-80">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{commit.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{commit.date}</span>
            </div>
            <div className="badge badge-primary badge-lg">{commit.hash}</div>
          </div>
        </div>
        
        <div className="card bg-base-200 p-4 mb-3">
          <div className="flex items-center gap-2 text-sm mb-0 opacity-70">
            <MessageSquare className="w-4 h-4" />
            <span>{t('stats.commit.message')}</span>
          </div>
          <MarqueeText
            className="text-xl"
            text={formatMessage(commit.message)}
          />
        </div>

                <div className="stats stats-horizontal shadow bg-base-200 w-full">
          <TodayCard
            title={t('stats.commit.files')}
            value={commit.files_changed}
            type="commits"
          />
          <TodayCard
            title={t('stats.commit.insertions')}
            value={commit.insertions}
            type="additions"
          />
          <TodayCard
            title={t('stats.commit.deletions')}
            value={commit.deletions}
            type="deletions"
          />
        </div>
      </div>
    </div>
  );
}; 