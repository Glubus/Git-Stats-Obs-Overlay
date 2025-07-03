import React from 'react';
import type { CommitInfo } from '../../types/git-stats';
import { GitCommit, User, Calendar, FileCode, Plus, Minus } from 'lucide-react';

interface CommitCardProps {
  commit: CommitInfo;
  formatMessage: (message: string, maxLength?: number) => string;
}

export const CommitCard: React.FC<CommitCardProps> = ({ commit, formatMessage }) => {
  return (
    <div className="card bg-base-200 shadow-xl font-mono">
      <div className="card-body">
        <h2 className="card-title gap-2">
          <GitCommit className="w-6 h-6" />
          Dernier Commit
          <div className="badge badge-neutral">{commit.hash}</div>
        </h2>
        
        <p className="text-base-content/80 whitespace-pre-wrap">
          {formatMessage(commit.message)}
        </p>
        
        <div className="divider"></div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{commit.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{commit.date}</span>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              <span>{commit.files_changed} fichiers</span>
            </div>
            
            <div className="flex items-center gap-2 text-success">
              <Plus className="w-4 h-4" />
              <span>{commit.insertions}</span>
            </div>
            
            <div className="flex items-center gap-2 text-error">
              <Minus className="w-4 h-4" />
              <span>{commit.deletions}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 