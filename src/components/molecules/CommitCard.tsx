import React from 'react';
import type { CommitInfo } from '../../types/git-stats';

interface CommitCardProps {
  commit: CommitInfo;
  formatMessage: (message: string, maxLength?: number) => string;
}

export const CommitCard: React.FC<CommitCardProps> = ({ commit, formatMessage }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          Dernier commit
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span className="text-sm">
                  {commit.author.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{commit.author}</span>
                <span className="badge badge-outline text-xs">
                  {commit.hash}
                </span>
              </div>
              <p className="text-sm text-base-content/70 mt-1">
                {commit.date}
              </p>
            </div>
          </div>

          <div className="bg-base-200 rounded-lg p-4">
            <p className="text-base font-medium">
              {formatMessage(commit.message)}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-2 bg-base-200 rounded">
              <div className="font-semibold text-lg">{commit.files_changed}</div>
              <div className="text-base-content/70">fichiers</div>
            </div>
            <div className="text-center p-2 bg-success/10 rounded">
              <div className="font-semibold text-lg text-success">+{commit.insertions}</div>
              <div className="text-base-content/70">ajouts</div>
            </div>
            <div className="text-center p-2 bg-error/10 rounded">
              <div className="font-semibold text-lg text-error">-{commit.deletions}</div>
              <div className="text-base-content/70">retraits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 