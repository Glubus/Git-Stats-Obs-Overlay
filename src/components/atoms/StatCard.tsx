import React from 'react';
import { Plus, Minus, GitCommit } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  type: 'insertions' | 'deletions' | 'commits';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'insertions':
        return <Plus className="w-6 h-6" />;
      case 'deletions':
        return <Minus className="w-6 h-6" />;
      case 'commits':
        return <GitCommit className="w-6 h-6" />;
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'insertions':
        return 'text-success';
      case 'deletions':
        return 'text-error';
      case 'commits':
        return 'text-info';
    }
  };

  return (
    <div className="stats shadow bg-base-200">
      <div className="stat">
        <div className={`stat-figure ${getColorClass()}`}>
          {getIcon()}
        </div>
        <div className="stat-title font-mono">{title}</div>
        <div className={`stat-value ${getColorClass()} font-mono`}>
          {value}
        </div>
      </div>
    </div>
  );
}; 