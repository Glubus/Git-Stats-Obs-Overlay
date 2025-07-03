import React from 'react';
import type { CommitInfo } from '../../../types/git-stats';
import { GitCommit, GitBranch, Calendar, User } from 'lucide-react';

interface CommitCardProps {
  commit: CommitInfo;
  formatMessage: (message: string, maxLength?: number) => string;
}

export const CommitCard: React.FC<CommitCardProps> = ({
  commit,
  formatMessage
}) => {
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body p-4">
        {/* En-tête avec hash */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-base-content/20">
          <GitCommit className="w-5 h-5 text-primary" />
          <h2 className="card-title text-base font-mono">
            {commit.hash.substring(0, 7)}
          </h2>
        </div>

        {/* Message du commit */}
        <div className="mb-4 pb-3 border-b border-base-content/20">
          <p className="text-base font-medium">{formatMessage(commit.message)}</p>
        </div>

        {/* Métadonnées */}
        <div className="bg-base-200 rounded-box p-3">
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
            <div className="flex items-center gap-2 opacity-80">
              <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span>{commit.author}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <span>{new Date(commit.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center">
                <GitBranch className="w-4 h-4" />
              </div>
              <span>{commit.files_changed} fichiers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center">
                <span className="text-xs font-bold">±</span>
              </div>
              <div className="space-x-1">
                <span className="badge badge-sm badge-success">+{commit.insertions}</span>
                <span className="badge badge-sm badge-error">-{commit.deletions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 