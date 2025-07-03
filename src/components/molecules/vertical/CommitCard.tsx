import React from 'react';
import type { CommitInfo } from '../../../types/git-stats';
import { GitCommit, User, Calendar, FileCode, Plus, Minus, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from '../../../i18n';

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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">{t('stats.lastCommit')}</h2>
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
        
        <div className="card bg-base-200 p-4 mb-4">
          <div className="flex items-center gap-2 text-sm mb-2 opacity-70">
            <MessageSquare className="w-4 h-4" />
            <span>{t('stats.message')}</span>
          </div>
          <p className="text-xl">
            {formatMessage(commit.message)}
          </p>
        </div>
        
        <div className="stats stats-vertical shadow bg-base-200 w-full">
          <div className="stat p-4">
            <div className="stat-title text-lg mb-1">{t('stats.files')}</div>
            <div className="stat-value text-2xl">{commit.files_changed}</div>
            <div className="stat-figure">
              <FileCode className="w-6 h-6" />
            </div>
          </div>
          
          <div className="stat p-4">
            <div className="stat-title text-lg mb-1">{t('stats.additions')}</div>
            <div className="stat-value text-2xl text-success">{commit.insertions}</div>
            <div className="stat-figure text-success">
              <Plus className="w-6 h-6" />
            </div>
          </div>
          
          <div className="stat p-4">
            <div className="stat-title text-lg mb-1">{t('stats.deletions')}</div>
            <div className="stat-value text-2xl text-error">{commit.deletions}</div>
            <div className="stat-figure text-error">
              <Minus className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 